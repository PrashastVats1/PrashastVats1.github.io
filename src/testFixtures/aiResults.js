// Schema-conforming sample results for the three AI instruments, shared by tests.
const assessment = (rating, summary) => ({ rating, summary });

export const AI_RESULTS = {
  "prompt-debugger": {
    intent: "Creative writing (newsletter copy)",
    clarity: assessment("Needs work", "The task is clear in outline but leaves audience, length, and tone undefined."),
    problems: ["\"Something about our new feature\" does not name the feature.", "\"Make it good\" is not a measurable standard."],
    recommendations: ["Name the feature and its main benefit.", "State a word count, for example 120 words."],
    revisedPrompt: "Write a 120-word newsletter paragraph announcing [feature name] to [audience].",
  },
  "code-review": {
    language: "JavaScript",
    readability: assessment("Good", "Short and easy to follow."),
    maintainability: assessment("Needs work", "Mixes data fetching and DOM updates."),
    issues: ["`fetch` returns a promise, so `data.name` is read before the response arrives."],
    security: ["Assigning `data.name` to `innerHTML` allows HTML injection."],
    recommendations: ["Use async/await and `textContent`."],
    overall: assessment("Weak", "The function does not work as written."),
  },
  "jira-ticket": {
    ticketType: "Bug",
    quality: assessment("Weak", "There is not enough information to start work."),
    missingInformation: ["Steps to reproduce", "Browser and version"],
    acceptanceCriteria: assessment("Weak", "No acceptance criteria are given."),
    reproducibility: assessment("Weak", "\"Sometimes\" gives no way to reproduce the problem."),
    improvedTicket: "Summary: Login intermittently fails\n\nSteps to reproduce:\n1. [steps]",
  },
};
