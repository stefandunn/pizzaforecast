export const getOrElse = <T = any>(valFunction: () => T): T | undefined => {
  try {
    return valFunction();
  } catch {
    return undefined;
  }
};
