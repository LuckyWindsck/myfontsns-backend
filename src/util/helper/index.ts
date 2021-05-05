export const isSerializable = (value: any) => {
  try {
    JSON.parse(JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const omit = (obj: any, keys: string[]) => (
  // @ts-ignore
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)))
);
