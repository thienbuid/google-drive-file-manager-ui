export const convertSize = (size: string | number): string => {
  const sizeNumber = typeof size === "number" ? size : parseInt(size);
  if (sizeNumber >= 1000000000) {
    return Math.round(sizeNumber / 1000000000) + " GB";
  }
  if (sizeNumber >= 1000000) {
    return Math.round(sizeNumber / 1000000) + " MB";
  }
  return Math.round(sizeNumber / 1000) + " KB";
};
