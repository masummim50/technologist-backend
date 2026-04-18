"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const seller_route_1 = __importDefault(require("../modules/seller/seller.route"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const product_route_1 = __importDefault(require("../modules/product/product.route"));
const order_route_1 = __importDefault(require("../modules/order/order.route"));
const review_route_1 = __importDefault(require("../modules/review/review.route"));
const router = express_1.default.Router();
const routes = [
    { path: "/auth", router: auth_route_1.default },
    { path: "/seller", router: seller_route_1.default },
    { path: "/user", router: user_route_1.default },
    { path: "/product", router: product_route_1.default },
    { path: "/order", router: order_route_1.default },
    { path: "/review", router: review_route_1.default },
];
routes.forEach((route) => {
    router.use(route.path, route.router);
});
exports.default = router;
