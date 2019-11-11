import _isEmpty from "lodash/isEmpty";

export function isEmpty(data: any) {
  return typeof data === "undefined" || data === null || data === "" || (typeof data === "object" && _isEmpty(data));
}
