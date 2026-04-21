export const sliceDataForPage = <T>(
  data: T[],
  currentPage: number,
  postsPerPage: number
): T[] => {
  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const slicedData = data.slice(firstIndex, lastIndex);
  return slicedData;
};
