// @ts-ignore
import objectMapper from "object-mapper";

const schema = {
  Period0AmountToDate: "period1Budget",
  Period1AmountToDate: "period2Budget",
  Period2AmountToDate: "period3Budget",
  Period3AmountToDate: "period4Budget",
  Period4AmountToDate: "period5Budget",
  Period5AmountToDate: "period6Budget",
  Period6AmountToDate: "period7Budget",
  Period7AmountToDate: "period8Budget",
  Period8AmountToDate: "period9Budget",
  Period9AmountToDate: "period10Budget",
  Period10AmountToDate: "period11Budget",
  Period11AmountToDate: "period12Budget",
  Period12AmountToDate: "period13Budget", // ?
};

export default (data: any) => objectMapper(data, schema);
