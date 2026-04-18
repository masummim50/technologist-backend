export const getPage = (query) => {
    return Number(query.page) || 1;
};
export const getTotalPage = (count, limit) => {
    return Math.ceil(count / limit);
};
export const getMetaData = (page, limit, count, totalPage) => {
    return {
        page,
        size: limit,
        total: count,
        totalPage: totalPage,
    };
};
export const getSkip = (page, limit) => {
    return (page - 1) * limit;
};
