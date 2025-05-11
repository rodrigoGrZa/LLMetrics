export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function applyPromptTemplate(
  template: string,
  input: string,
  variables: Record<string, string[]>
): string {
  let result = template.replace(/{{input}}/g, input);

  result = result.replace(/{{(.*?)}}/g, (_, key: string) => {
    if (key === "input") return input;
    const options = variables[key];
    if (options && options.length > 0) {
      const random = options[Math.floor(Math.random() * options.length)];
      return random;
    }
    return `{{${key}}}`;
  });

  return result;
}
