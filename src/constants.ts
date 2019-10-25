export const STATUSES = {
  active: 1,
  inactive: 0,
};

export const BASE_ROLES = {
  admin: "ADMINISTRATOR",
  superUser: "SUPER_USER",
};

export const USER_PERMISSIONS = {
  gl: "pGeneralLedger",
  jobCost: "pJobCost",
} as {[key: string]: string};
