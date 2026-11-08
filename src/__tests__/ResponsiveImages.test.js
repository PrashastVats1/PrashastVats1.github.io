import fs from "fs";
import path from "path";
import { render } from "@testing-library/react";
import Avatar from "../components/fantasy/Avatar";
import ArtifactArt from "../pages/projects/ArtifactArt";
import InstrumentArt from "../pages/tools/InstrumentArt";
import { ARTIFACTS } from "../pages/projects/artifacts";
import { INSTRUMENTS } from "../pages/tools/instruments";
import { ARTIFACT_WIDTHS, AVATAR_WIDTHS, LAB_WIDTHS } from "../assets/manifest";

jest.mock("../generated/assetManifest", () => ({
  __esModule: true,
  default: [
    "avatar/regular.webp",
    "assets/avatar/regular-96.webp",
    "assets/avatar/regular-192.webp",
    "assets/avatar/regular-384.webp",
    "assets/artifacts/remora.webp",
    "assets/artifacts/remora-480.webp",
    "assets/artifacts/remora-720.webp",
    "assets/artifacts/remora-960.webp",
    "assets/lab/regex-alchemist.webp",
    "assets/lab/regex-alchemist-320.webp",
    "assets/lab/regex-alchemist-560.webp",
    "assets/artifacts/priya-voice-agent.webp",
    "assets/artifacts/kalpi.webp",
    "assets/artifacts/kalpi-480.webp",
    "assets/artifacts/kalpi-720.webp",
    "assets/artifacts/kalpi-960.webp",
    "assets/artifacts/re-jardinians.webp",
    "assets/artifacts/re-jardinians-480.webp",
    "assets/artifacts/re-jardinians-720.webp",
    "assets/artifacts/re-jardinians-960.webp",
  ],
}));

const root = path.resolve(__dirname, "../..");
const publicFile = (relative) => path.join(root, "public", relative);

test("the avatar offers small variants sized to its display box", () => {
  const { container } = render(<Avatar variant="regular" size="sm" />);
  const img = container.querySelector("img");
  expect(img).toHaveAttribute("src", "/avatar/regular.webp");
  expect(img).toHaveAttribute(
    "srcset",
    "/assets/avatar/regular-96.webp 96w, /assets/avatar/regular-192.webp 192w, /assets/avatar/regular-384.webp 384w"
  );
  expect(img).toHaveAttribute("sizes", "44px");
});

test("artifact and lab artwork list their committed variants", () => {
  const remora = ARTIFACTS.find((a) => a.slug === "remora");
  const { container } = render(<ArtifactArt artifact={remora} />);
  expect(container.querySelector("img").getAttribute("srcset")).toBe(
    "/assets/artifacts/remora-480.webp 480w, /assets/artifacts/remora-720.webp 720w, /assets/artifacts/remora-960.webp 960w"
  );
  expect(container.querySelector("img")).toHaveAttribute("sizes");

  const regex = INSTRUMENTS.find((i) => i.slug === "regex-alchemist");
  const lab = render(<InstrumentArt instrument={regex} />);
  expect(lab.container.querySelector("img").getAttribute("srcset")).toBe(
    "/assets/lab/regex-alchemist-320.webp 320w, /assets/lab/regex-alchemist-560.webp 560w"
  );
});

test("without variants the image falls back to the plain src", () => {
  const priya = ARTIFACTS.find((a) => a.slug === "priya");
  const { container } = render(<ArtifactArt artifact={priya} />);
  const img = container.querySelector("img");
  expect(img).toHaveAttribute("src", "/assets/artifacts/priya-voice-agent.webp");
  expect(img).not.toHaveAttribute("srcset");
});

test("Kalpi and Re-Jardinians list the committed 480/720/960 variants", () => {
  [
    ["kalpi-trade-execution", "/assets/artifacts/kalpi"],
    ["re-jardinians", "/assets/artifacts/re-jardinians"],
  ].forEach(([slug, stem]) => {
    const artifact = ARTIFACTS.find((a) => a.slug === slug);
    const { container } = render(<ArtifactArt artifact={artifact} />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", `${stem}.webp`);
    expect(img.getAttribute("srcset")).toBe(`${stem}-480.webp 480w, ${stem}-720.webp 720w, ${stem}-960.webp 960w`);
    expect(img).toHaveAttribute("sizes", "(max-width: 480px) 90vw, 450px");
    expect(img).toHaveAttribute("width", "1402");
    expect(img).toHaveAttribute("height", "1122");
  });
});

test("every published artwork has its committed variants on disk", () => {
  ARTIFACTS.forEach(({ artwork }) => {
    expect(fs.existsSync(publicFile(artwork.src))).toBe(true);
    ARTIFACT_WIDTHS.forEach((w) => {
      expect(fs.existsSync(publicFile(artwork.src.replace(/\.webp$/, `-${w}.webp`)))).toBe(true);
    });
  });
  INSTRUMENTS.forEach(({ slug }) => {
    LAB_WIDTHS.forEach((w) => expect(fs.existsSync(publicFile(`assets/lab/${slug}-${w}.webp`))).toBe(true));
  });
  ["regular", "scholar"].forEach((variant) => {
    AVATAR_WIDTHS.forEach((w) => expect(fs.existsSync(publicFile(`assets/avatar/${variant}-${w}.webp`))).toBe(true));
  });
});

test("avatar PNG originals are kept in avatar/ but not published", () => {
  expect(fs.existsSync(path.join(root, "avatar/regular.png"))).toBe(true);
  expect(fs.existsSync(path.join(root, "avatar/scholar.png"))).toBe(true);
  expect(fs.existsSync(publicFile("avatar/regular.png"))).toBe(false);
  expect(fs.existsSync(publicFile("avatar/scholar.png"))).toBe(false);
});
