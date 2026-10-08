import AiWorkbench, { Assessment, Findings, Revision } from "./AiWorkbench";

const SAMPLE = `Login is broken

Users can't log in sometimes. Please fix ASAP.`;

export default function JiraTicketScorer() {
  return (
    <AiWorkbench
      id="pv-jt"
      endpoint="jira-ticket"
      inputLabel="Ticket"
      inputHint="Paste the title and description of a ticket. Nothing is read from or written to Jira."
      actionLabel="Score ticket"
      sample={SAMPLE}
      sampleLabel="Load an example"
      outputTitle="Ticket assessment"
      emptyText="Paste a ticket and press Score ticket. You will get a quality rating, missing information, acceptance criteria and context checks, and an improved ticket."
      renderResult={(r) => (
        <>
          <p className="pv-ai-meta">
            Looks like a: <strong>{r.ticketType}</strong>
          </p>
          <Assessment label="Quality" value={r.quality} />
          <Assessment label="Acceptance criteria" value={r.acceptanceCriteria} />
          <Assessment label="Reproducibility and context" value={r.reproducibility} />
          <Findings title="Missing information" items={r.missingInformation} empty="Nothing important appears to be missing." />
          <Revision id="pv-jt-improved" label="Improved ticket" text={r.improvedTicket} copyLabel="Copy improved ticket" />
        </>
      )}
    />
  );
}
