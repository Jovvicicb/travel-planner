export function toCreateShareRequest(data) {
  return {
    accessLevel: Number(data.accessLevel),
    expiresAt: data.expiresAt ? `${data.expiresAt}T23:59:59` : null,
  };
}
