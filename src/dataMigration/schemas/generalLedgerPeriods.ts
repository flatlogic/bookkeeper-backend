import moment from "moment";
// @ts-ignore
import objectMapper from "object-mapper";

import { STATUSES } from "../../constants";

const schema = {} as any;

for (let i = 1; i <= 12; i++) {
  schema[`Period${i}Description`] = {
    key: `period${i}Month`,
    transform: (value: string) => moment().month(value).format("M"),
    default: null,
  };
  schema[`Period${i}Status`] = {
    key: `period${i}Status`,
    transform: (value: string|number) => !value ? STATUSES.active : STATUSES.inactive,
    default: STATUSES.active,
  };
}

export default (data: any) => objectMapper(data, schema);
