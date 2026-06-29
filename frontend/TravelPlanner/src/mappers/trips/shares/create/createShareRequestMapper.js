import { toEndOfDayRequestValue } from "../../../../helpers/forms/dateTimeInputHelper";

export function toCreateShareRequest(data) {
  return {
    accessLevel: Number(data.accessLevel),
    expiresAt: toEndOfDayRequestValue(data.expiresAt),
  };
}
