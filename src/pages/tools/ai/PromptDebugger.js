import AiWorkbench, { Assessment, Findings, Revision } from "./AiWorkbench";

const SAMPLE = "Write something about our new feature for the newsletter. Make it good and not too long.";

export default function PromptDebugger() {
  return (
    <AiWorkbench
      id="pv-pd"
      endpoint="prompt-debugger"
      inputLabel="Prompt"
      inputHint="The prompt you plan to give an AI model."
      actionLabel="Debug prompt"
      sample={SAMPLE}
      sampleLabel="Load an example"
      outputTitle="Prompt analysis"
      emptyText="Paste a prompt and press Debug prompt. You will get a clarity assessment, the problems found, recommendations, and a revised prompt."
      renderResult={(r) => (
        <>
          <p className="pv-ai-meta">
            Apparent intent: <strong>{r.intent}</strong>
          </p>
          <Assessment label="Clarity" value={r.clarity} />
          <Findings title="Problems" items={r.problems} empty="No specific problems were identified." />
          <Findings title="Recommendations" items={r.recommendations} empty="No recommendations were made." />
          <Revision id="pv-pd-revised" label="Revised prompt" text={r.revisedPrompt} copyLabel="Copy revised prompt" />
        </>
      )}
    />
  );
}
