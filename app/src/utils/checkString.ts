export const checkString = (str: string | undefined) => {
  if (str == undefined) return false;
  return str.trim().length !== 0;
};
