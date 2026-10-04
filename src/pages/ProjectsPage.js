import { useLocation } from "../router";
import ArtifactMissing from "./projects/ArtifactMissing";
import ArtifactRecord from "./projects/ArtifactRecord";
import HallOfArtifacts from "./projects/HallOfArtifacts";
import { findArtifact, slugFromPath } from "./projects/artifacts";

export default function ProjectsPage() {
  const slug = slugFromPath(useLocation());
  if (!slug) return <HallOfArtifacts />;
  const artifact = findArtifact(slug);
  return artifact ? <ArtifactRecord artifact={artifact} /> : <ArtifactMissing />;
}
