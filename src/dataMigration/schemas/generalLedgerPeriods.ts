import { STATUSES } from "../../constants";

function importStatus(value: string | number) {
  // In the legacy file an empty flag or zero means open, and C or one means closed.
  const flag = typeof value === "string" ? value.trim().toUpperCase() : value;
  switch (flag) {
    case "":
    case "O":
    case 0:
    case "0":
      return STATUSES.active;
    case "C":
    case 1:
    case "1":
      return STATUSES.inactive;
    default:
      return value;
  }
}

export default function generalLedgerPeriods(data: any) {
  const periods: {[key: string]: string | number} = {};
  for (let i = 1; i <= 12; i++) {
    const month = data[`Period${i}Description`];
    const status = data[`Period${i}Status`];
    if (month !== undefined) {
      periods[`period${i}Month`] = month;
    }
    if (status !== undefined) {
      periods[`period${i}Status`] = importStatus(status);
    }
  }
  return periods;
}
