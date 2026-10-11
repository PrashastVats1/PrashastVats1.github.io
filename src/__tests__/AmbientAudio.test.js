import fs from "fs";
import path from "path";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import { AUDIO } from "../assets/manifest";
import { TRANSITION_TIMINGS } from "../transition/transitionConfig";

jest.mock("../generated/assetManifest", () => ({ __esModule: true, default: ["assets/audio/ambient.mp3"] }));

let playImpl;
let created;

beforeEach(() => {
  created = [];
  playImpl = () => Promise.resolve();
  jest.spyOn(window.HTMLMediaElement.prototype, "play").mockImplementation(function play() {
    created.push(this);
    return playImpl.call(this);
  });
  jest.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

const refuse = () => Promise.reject(Object.assign(new Error("denied"), { name: "NotAllowedError" }));

async function renderAt(hash) {
  window.history.replaceState(null, "", `/${hash}`);
  await act(async () => {
    render(<App />);
  });
}

const control = () => within(screen.getByRole("region", { name: "Sound" })).getByRole("button");
const status = () => within(screen.getByRole("region", { name: "Sound" })).getByRole("status");
const elements = () => new Set(created);

async function press() {
  await act(async () => {
    fireEvent.click(control());
  });
}

function goTo(linkName) {
  const nav = screen.getByRole("navigation", { name: "Main" });
  fireEvent.click(within(nav).getByRole("link", { name: linkName }));
  const t = TRANSITION_TIMINGS.full;
  act(() => jest.advanceTimersByTime(t.cover + t.hold + t.reveal));
}

test("the ambience starts on entry when the browser allows autoplay", async () => {
  await renderAt("#/home");
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(created[0].src).toMatch(/\/assets\/audio\/ambient\.mp3$/);
  expect(created[0].loop).toBe(true);
  expect(created[0].volume).toBe(0.35);
  expect(control()).toHaveAccessibleName(/Stop ambience/);
  expect(control()).toHaveAttribute("aria-pressed", "true");
  expect(control()).toHaveTextContent("Ambience playing");
  expect(status()).toHaveTextContent("Ambience playing");
  expect(document.querySelector("audio")).toBeNull();
});

test("a refused autoplay stays stopped and quietly invites a press, once", async () => {
  playImpl = refuse;
  const errors = jest.spyOn(console, "error");
  await renderAt("#/home");
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(control()).toHaveAccessibleName(/Play ambience.*Press to play the music/);
  expect(control()).toHaveAttribute("aria-pressed", "false");
  expect(control()).toHaveAttribute("data-state", "autoplay-blocked");
  expect(status()).toHaveTextContent("Ambient music is available. Use the Play ambience button to turn it on.");
  expect(errors).not.toHaveBeenCalled();

  act(() => jest.advanceTimersByTime(60000));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(control()).toHaveAttribute("data-state", "autoplay-blocked");
});

test("one press after a refused autoplay plays the same audio element, without a second gesture attempt", async () => {
  playImpl = refuse;
  await renderAt("#/home");
  playImpl = () => Promise.resolve();
  await press();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(elements().size).toBe(1);
  expect(control()).toHaveAttribute("aria-pressed", "true");
  expect(control()).toHaveTextContent("Ambience playing");

  await act(async () => {
    fireEvent.keyDown(control(), { key: "Enter" });
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(control()).toHaveTextContent("Ambience playing");
});

test("after a refused autoplay, the first click elsewhere starts the same track once", async () => {
  playImpl = refuse;
  await renderAt("#/home");
  playImpl = () => Promise.resolve();
  await act(async () => {
    fireEvent.click(screen.getByRole("heading", { level: 1 }));
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(elements().size).toBe(1);
  expect(control()).toHaveAttribute("aria-pressed", "true");

  goTo(/Hall of Artifacts/);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(control()).toHaveTextContent("Ambience playing");
});

test("after a refused autoplay, the first key press starts it, but Escape does not", async () => {
  playImpl = refuse;
  await renderAt("#/home");
  playImpl = () => Promise.resolve();
  await act(async () => {
    fireEvent.keyDown(document.body, { key: "Escape" });
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  await act(async () => {
    fireEvent.keyDown(document.body, { key: "Tab" });
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(control()).toHaveTextContent("Ambience playing");
});

test("the first-interaction attempt happens only once, even if it is refused", async () => {
  playImpl = refuse;
  await renderAt("#/home");
  await act(async () => {
    fireEvent.click(document.body);
  });
  await act(async () => {
    fireEvent.click(document.body);
    fireEvent.keyDown(document.body, { key: "a" });
  });
  goTo(/Hall of Artifacts/);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(control()).toHaveAttribute("data-state", "autoplay-blocked");

  playImpl = () => Promise.resolve();
  await press();
  expect(control()).toHaveTextContent("Ambience playing");
});

test("when autoplay succeeds, interactions do not trigger further attempts", async () => {
  await renderAt("#/home");
  await act(async () => {
    fireEvent.click(document.body);
    fireEvent.keyDown(document.body, { key: "a" });
  });
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
});

test("stop and play again use the same track, and a stop survives route changes", async () => {
  await renderAt("#/home");
  await press();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(control()).toHaveAccessibleName(/Play ambience/);
  expect(control()).toHaveAttribute("aria-pressed", "false");
  expect(control()).toHaveTextContent("Sound is off");

  goTo(/Hall of Artifacts/);
  goTo(/Guild Recruitment/);
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(control()).toHaveTextContent("Sound is off");

  await press();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(elements().size).toBe(1);
  expect(control()).toHaveTextContent("Ambience playing");
});

test("the same track keeps playing across route changes with no new attempts", async () => {
  await renderAt("#/home");
  goTo(/Hall of Artifacts/);
  goTo(/Guild Recruitment/);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Guild Recruitment");
  expect(control()).toHaveAttribute("aria-pressed", "true");
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  expect(elements().size).toBe(1);
  expect(HTMLMediaElement.prototype.pause).not.toHaveBeenCalled();
});

test("a refusal after a press reports the block with a retry hint", async () => {
  playImpl = refuse;
  await renderAt("#/home");
  await press();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  expect(control()).toHaveAttribute("aria-pressed", "false");
  expect(control()).toHaveTextContent(/blocked playback/);
  expect(status()).toHaveTextContent("The browser blocked the ambience.");

  playImpl = () => Promise.resolve();
  await press();
  expect(control()).toHaveTextContent("Ambience playing");
});

test("a missing or undecodable file is reported and can be retried", async () => {
  await renderAt("#/home");
  act(() => {
    created[0].dispatchEvent(new Event("error"));
  });
  expect(control()).toHaveAttribute("aria-pressed", "false");
  expect(control()).toHaveTextContent(/could not load/);
  expect(status()).toHaveTextContent("The ambience could not be loaded.");

  await press();
  expect(created).toHaveLength(2);
  expect(created[1]).not.toBe(created[0]);
  expect(control()).toHaveTextContent("Ambience playing");
});

test("a pause from outside the page (e.g. system media keys) is reflected", async () => {
  await renderAt("#/home");
  act(() => {
    created[0].dispatchEvent(new Event("pause"));
  });
  expect(control()).toHaveAttribute("aria-pressed", "false");
  expect(control()).toHaveTextContent("Sound is off");
});

test("the committed track is small and documented as original", () => {
  const root = path.resolve(__dirname, "../..");
  const file = path.join(root, "public", AUDIO.ambient);
  expect(fs.statSync(file).size).toBeLessThan(600 * 1024);
  expect(fs.readFileSync(path.join(root, "scripts/generate-ambient.py"), "utf8")).toMatch(/no recordings, samples or third-party material/);
});
