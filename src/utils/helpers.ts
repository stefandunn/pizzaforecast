import UAParser from "ua-parser-js";

export const getOrElse = <T = any>(valFunction: () => T): T | undefined => {
  try {
    return valFunction();
  } catch {
    return undefined;
  }
};

export const getDevice = (userAgent?: string) => {
  const parser = new UAParser(userAgent);
  const { type } = parser.getDevice();
  return type || "desktop";
};
