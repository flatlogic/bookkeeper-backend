export const trim = (str: string) => typeof str === "string" ? str.trim() : str;

export default (str: string) => trim(str);
