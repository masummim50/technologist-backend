"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkip = exports.getMetaData = exports.getTotalPage = exports.getPage = void 0;
const getPage = (query) => {
    return Number(query.page) || 1;
};
exports.getPage = getPage;
const getTotalPage = (count, limit) => {
    return Math.ceil(count / limit);
};
exports.getTotalPage = getTotalPage;
const getMetaData = (page, limit, count, totalPage) => {
    return {
        page,
        size: limit,
        total: count,
        totalPage: totalPage,
    };
};
exports.getMetaData = getMetaData;
const getSkip = (page, limit) => {
    return (page - 1) * limit;
};
exports.getSkip = getSkip;
