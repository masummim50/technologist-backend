const consoleroute = (message) => async (req, res, next) => {
    console.log(message);
    next();
};
export default consoleroute;
