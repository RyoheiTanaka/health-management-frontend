export const groupBy = <T extends Record<string, string | number | Date>>(items: T[], key: keyof T): Record<string, T[]> => {
  return items.reduce((result, item) => {
    const groupKey = item[key] as string;
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
};
