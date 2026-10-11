#!/usr/bin/env python3
"""
Generates public/assets/audio/ambient.mp3: "Lanternlight Lane", an original,
fully synthesized loop in the mood of a cozy medieval fantasy village.

Everything is made here: the melody, chord progression, and arrangement are
written out below, and every instrument is synthesized (a Karplus-Strong string
blended with a sine for the harp, additive synthesis for the wooden flute, bells, and
pad, and a generated noise impulse response for the room). It uses
no recordings, samples or third-party material, so the output carries no
external licence. Deterministic: a fixed random seed gives the same file on every run.

Run manually: python3 scripts/generate-ambient.py   (Python 3 + ffmpeg with libmp3lame)
Not part of the build; the output is committed.
"""
import json
import math
import random
import re
import struct
import subprocess
import tempfile
import wave
from array import array
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "public/assets/audio/ambient.mp3"

SR = 32000
EIGHTH = 0.42            # seconds; 6/8 time, a dotted quarter of 1.26 s (about 48 bpm)
BAR = 6 * EIGHTH
TARGET_LUFS = -21
SEED = 1408

# ---------------------------------------------------------------- the score
# D major, 6/8, 32 bars: A (1-8), A' (9-16), B (17-24), A'' (25-32).
# Bar 32 rests on the dominant so the loop falls back into bar 1.
# Phrases are short and separated by empty bars, so the tune breathes.
CHORDS = (
    "D G Bm A D G A D "
    "D G Bm A D Em A D "
    "G D Em Bm G D Em A "
    "D G Bm A D G Em A"
).split()

PITCH_CLASSES = {
    "D": (2, 6, 9), "G": (7, 11, 2), "A": (9, 1, 4), "Bm": (11, 2, 6), "Em": (4, 7, 11),
}

# Melody as (MIDI note or None for a rest, length in eighths); each bar sums to 6.
MELODY = [
    # A: the harp
    [(78, 3), (76, 1), (74, 2)],
    [(71, 3), (74, 3)],
    [(73, 2), (71, 1), (69, 3)],
    [(None, 6)],
    [(74, 3), (76, 1), (78, 2)],
    [(79, 3), (78, 1), (76, 2)],
    [(76, 3), (73, 3)],
    [(74, 4), (None, 2)],
    # A': the flute answers, briefly
    [(None, 3), (69, 3)],
    [(74, 4), (71, 2)],
    [(73, 2), (71, 1), (74, 3)],
    [(76, 6)],
    [(None, 6)],
    [(None, 3), (71, 3)],
    [(73, 3), (69, 3)],
    [(74, 6)],
    # B: the harp, higher and sparser
    [(83, 3), (81, 3)],
    [(78, 6)],
    [(79, 2), (78, 1), (76, 3)],
    [(None, 6)],
    [(74, 3), (79, 3)],
    [(78, 3), (76, 1), (74, 2)],
    [(76, 6)],
    [(None, 6)],
    # A'': the harp returns, settling on the dominant
    [(78, 3), (76, 1), (74, 2)],
    [(71, 3), (74, 3)],
    [(73, 2), (74, 1), (78, 3)],
    [(76, 6)],
    [(None, 6)],
    [(79, 3), (78, 1), (76, 2)],
    [(74, 3), (71, 3)],
    [(73, 6)],
]

FLUTE_BARS = set(range(8, 16))
BELLS = [(3, 0, 85), (3, 3, 81), (12, 0, 86), (19, 0, 83), (23, 0, 88), (23, 3, 85), (28, 0, 86)]

LOOP_SECONDS = len(CHORDS) * BAR


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def tones(chord, low, high):
    pcs = PITCH_CLASSES[chord]
    return [m for m in range(low, high) if m % 12 in pcs]


# ---------------------------------------------------------------- synthesis
TABLE = 4096
SINE = array("f", [math.sin(2 * math.pi * i / TABLE) for i in range(TABLE)])
LOOP_N = int(round(LOOP_SECONDS * SR))
out = array("f", bytes(4 * LOOP_N))
rng = random.Random(SEED)


def add(start, samples, gain):
    """Mix into the loop buffer, wrapping past the end so tails ring into bar 1."""
    s = int(round(start * SR))
    for i, v in enumerate(samples):
        out[(s + i) % LOOP_N] += gain * v


def pluck(midi, length, brightness, ring):
    """Karplus-Strong string with fractional-delay tuning. ring = seconds to fall 60 dB."""
    f = hz(midi)
    delay = SR / f - 0.5
    n = int(length * SR)
    g = 10 ** (-3 / (ring * f))
    period = int(delay) + 2
    y = [0.0] * n
    prev = 0.0
    for i in range(min(period, n)):
        prev += brightness * (rng.uniform(-1, 1) - prev)
        y[i] = prev
    for i in range(period, n):
        d = i - delay
        k = int(d)
        fr = d - k
        a = y[k] + (y[k + 1] - y[k]) * fr
        b = y[k - 1] + (y[k] - y[k - 1]) * fr
        y[i] = g * 0.5 * (a + b)
    fade = int(0.08 * SR)
    for i in range(max(0, n - fade), n):
        y[i] *= (n - i) / fade
    peak = max(1e-9, max(abs(v) for v in y[: period * 4]))
    return [v / peak for v in y]


def harp(midi, length, ring):
    """A dark pluck blended with a decaying sine and a soft attack: rounder than a guitar."""
    string = pluck(midi, length, 0.3, ring)
    f = hz(midi)
    k = math.exp(-6.9 / (ring * SR))
    attack = int(0.006 * SR)
    a = 1.0
    phase = 0.0
    y = [0.0] * len(string)
    for i, s in enumerate(string):
        y[i] = 0.55 * s + 0.45 * a * SINE[int(phase * TABLE) % TABLE]
        if i < attack:
            y[i] *= i / attack
        phase += f / SR
        a *= k
    return y


def flute(midi, length):
    f = hz(midi)
    n = int((length + 0.25) * SR)
    attack, release = 0.14, 0.25
    y = [0.0] * n
    phase = 0.0
    noise = 0.0
    for i in range(n):
        t = i / SR
        if t < attack:
            env = (t / attack) ** 2
        elif t < length:
            env = 1.0 - 0.12 * min(1.0, (t - attack) / max(0.3, length))
        else:
            env = 0.88 * max(0.0, 1 - (t - length) / release)
        vib = 1 + 0.004 * min(1.0, max(0.0, (t - 0.25) / 0.4)) * SINE[int(5.2 * t * TABLE) % TABLE]
        phase = (phase + f * vib / SR) % 1.0
        p = int(phase * TABLE)
        tone = SINE[p] + 0.22 * SINE[(2 * p) % TABLE] + 0.07 * SINE[(3 * p) % TABLE]
        noise += 0.18 * (rng.uniform(-1, 1) - noise)
        y[i] = env * (tone + 0.12 * noise)
    return y


def bell(midi, length=4.0):
    f = hz(midi)
    partials = [(1.0, 1.0, 2.6), (2.0, 0.45, 1.6), (2.76, 0.3, 1.1), (5.4, 0.12, 0.5)]
    n = int(length * SR)
    y = [0.0] * n
    for ratio, amp, ring in partials:
        step = f * ratio / SR
        k = math.exp(-6.9 / (ring * SR))
        a = amp
        phase = 0.0
        for i in range(n):
            y[i] += a * SINE[int(phase * TABLE) % TABLE]
            phase += step
            a *= k
    attack = int(0.004 * SR)
    for i in range(attack):
        y[i] *= i / attack
    return y


def pad(midi, length):
    f = hz(midi)
    n = int((length + 1.6) * SR)
    y = [0.0] * n
    for detune in (0.9983, 1.0017):
        step = f * detune / SR
        phase = rng.random()
        for i in range(n):
            p = int(phase * TABLE) % TABLE
            y[i] += SINE[p] + 0.12 * SINE[(3 * p) % TABLE]
            phase += step
    lp = 0.0
    for i in range(n):
        t = i / SR
        env = min(1.0, t / 1.2) * (1.0 if t < length else max(0.0, 1 - (t - length) / 1.6))
        lp += 0.25 * (y[i] - lp)
        y[i] = env * lp * 0.5
    return y


def humanize(t, spread=0.007):
    return t + rng.gauss(0, spread)


def render():
    for bar, chord in enumerate(CHORDS):
        t0 = bar * BAR

        # Pad: the warm sustained bed, overlapping from bar to bar.
        for m in tones(chord, 50, 67)[:3]:
            add(t0, pad(m, BAR), 0.08)

        # Harp: one low root, then a slow roll through three chord tones.
        # No other accompaniment, so there is no running rhythm.
        root = tones(chord, 38, 50)[0]
        add(humanize(t0), harp(root, 3.5, 3.0), 0.20)
        for k, m in enumerate(tones(chord, 55, 72)[:3]):
            add(humanize(t0 + 1.5 * EIGHTH + 0.16 * k), harp(m, 3.0, 2.6), 0.065)

        # Melody: harp throughout, the flute takes one passage.
        pos = 0
        assert sum(length for _, length in MELODY[bar]) == 6, bar
        for m, length in MELODY[bar]:
            start = t0 + pos * EIGHTH
            if m is not None:
                if bar in FLUTE_BARS:
                    add(start, flute(m, length * EIGHTH * 0.96), 0.11)
                else:
                    add(humanize(start, 0.005), harp(m, 3.2, 2.8), 0.24 * rng.uniform(0.92, 1.04))
            pos += length

    for bar, eighth, m in BELLS:
        add(bar * BAR + eighth * EIGHTH, bell(m), 0.035)


def write_wav(path, samples, rate):
    peak = max(1e-9, max(abs(v) for v in samples))
    scale = 0.89 / peak
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(b"".join(struct.pack("<h", int(v * scale * 32767)) for v in samples))


def impulse_response():
    """A small wooden room: 15 ms pre-delay, then darkening noise decaying over ~1.6 s."""
    n = int(1.8 * SR)
    pre = int(0.015 * SR)
    ir = [0.0] * n
    lp = 0.0
    for i in range(pre, n):
        t = (i - pre) / SR
        coeff = max(0.08, 0.6 * math.exp(-t / 0.5))
        lp += coeff * (rng.uniform(-1, 1) - lp)
        ir[i] = lp * math.exp(-t / 0.33)
    return ir


def run(args):
    return subprocess.run(["ffmpeg", "-hide_banner", "-y", *args], check=True, capture_output=True, text=True)


def main():
    render()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        dry = Path(tmp) / "dry.wav"
        ir = Path(tmp) / "ir.wav"
        mixed = Path(tmp) / "mixed.wav"
        write_wav(dry, out, SR)
        write_wav(ir, impulse_response(), SR)
        # The loop is played twice through the room and the second pass kept,
        # so the reverb tail of the end flows into the start exactly as it will
        # when the browser loops the file.
        graph = (
            "[0][1]concat=n=2:v=0:a=1,asplit[d][w];"
            "[w][2]afir=gtype=gn[wet];"
            "[d][wet]amix=inputs=2:weights='1 0.16':normalize=0,"
            f"atrim=start={LOOP_SECONDS}:end={2 * LOOP_SECONDS},asetpts=N/SR/TB,"
            "highpass=f=45,equalizer=f=3500:t=q:w=1:g=-2[out]"
        )
        run(["-i", str(dry), "-i", str(dry), "-i", str(ir), "-filter_complex", graph, "-map", "[out]", str(mixed)])

        measured = run(["-i", str(mixed), "-af", f"loudnorm=I={TARGET_LUFS}:TP=-2:print_format=json", "-f", "null", "-"])
        stats = json.loads(re.search(r"\{[^{}]*\}", measured.stderr).group(0))
        gain = TARGET_LUFS - float(stats["input_i"])

        run(["-i", str(mixed), "-af", f"volume={gain:.2f}dB,alimiter=limit=0.8:level=disabled",
             "-c:a", "libmp3lame", "-b:a", "56k", "-ac", "1", "-ar", str(SR),
             "-map_metadata", "-1", "-metadata", "title=Lanternlight Lane (original, synthesized)",
             str(OUTPUT)])
    print(f"{OUTPUT.relative_to(ROOT)}  {OUTPUT.stat().st_size // 1024} KB, {LOOP_SECONDS:.1f}s loop, gain {gain:+.1f} dB")


if __name__ == "__main__":
    main()
