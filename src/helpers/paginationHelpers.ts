export const getPage = (query: any) => {
  return Number(query.page) || 1;
};

export const getTotalPage = (count: number, limit: number) => {
  return Math.ceil(count / limit);
};

export const getMetaData = (
  page: number,
  limit: number,
  count: number,
  totalPage: number
) => {
  return {
    page,
    size: limit,
    total: count,
    totalPage: totalPage,
  };
};

export const getSkip = (page: number, limit: number) => {
  return (page - 1) * limit;
};
