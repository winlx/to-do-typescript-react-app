export default function hasErrors(
  fieldsError: Record<string, string[] | undefined>
): boolean {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
