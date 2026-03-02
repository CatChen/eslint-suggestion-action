export function formatAnnotationMessage(
  ruleId: string,
  message: string,
  ruleUrl: string | undefined,
) {
  return ruleUrl === undefined
    ? `[${ruleId}]${message}`
    : `[${ruleId}]${message}: (${ruleUrl})`;
}

export function formatReviewMessage(
  ruleId: string,
  message: string,
  ruleUrl: string | undefined,
) {
  return ruleUrl === undefined
    ? `**${message}** \`${ruleId}\``
    : `**${message}** [\`${ruleId}\`](${ruleUrl})`;
}
