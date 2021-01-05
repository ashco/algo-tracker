export function formatChipText(text: string) {
  return text
    .split("_")
    .map((w) => w.toLowerCase())
    .join(" ");
}
