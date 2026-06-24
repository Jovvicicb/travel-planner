export function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm font-semibold text-red-600">{message}</p>;
}
