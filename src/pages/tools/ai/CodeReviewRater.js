import AiWorkbench, { Assessment, Findings } from "./AiWorkbench";

const SAMPLE = `function getUser(id) {
  var data = fetch("/api/users?id=" + id).then(r => r.json())
  if (data.name == null) return
  document.getElementById("name").innerHTML = data.name
  return data
}`;

export default function CodeReviewRater() {
  return (
    <AiWorkbench
      id="pv-cr"
      endpoint="code-review"
      inputLabel="Code"
      inputHint="A function or short file in any language. It is read, never run."
      code
      actionLabel="Review code"
      sample={SAMPLE}
      sampleLabel="Load an example"
      outputTitle="Code review"
      emptyText="Paste some code and press Review code. You will get readability and maintainability ratings, potential bugs, security concerns, recommendations, and an overall assessment."
      renderResult={(r) => (
        <>
          <p className="pv-ai-meta">
            Language: <strong>{r.language}</strong>
          </p>
          <Assessment label="Overall" value={r.overall} />
          <Assessment label="Readability" value={r.readability} />
          <Assessment label="Maintainability" value={r.maintainability} />
          <Findings title="Potential bugs" items={r.issues} empty="No likely bugs were spotted." />
          <Findings title="Security concerns" items={r.security} empty="No security concerns were spotted." />
          <Findings title="Recommendations" items={r.recommendations} empty="No recommendations were made." />
        </>
      )}
    />
  );
}
