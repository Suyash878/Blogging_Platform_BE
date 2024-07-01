"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var edge_1 = require("@prisma/client/edge");
var extension_accelerate_1 = require("@prisma/extension-accelerate");
var jwt_1 = require("hono/jwt");
var hono_1 = require("hono");
var app = new hono_1.Hono();
app.post('/api/v1/user/signup', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    var prisma, body, user, jwt, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prisma = new edge_1.PrismaClient({
                    datasourceUrl: c.env.DATABASE_URL
                }).$extends((0, extension_accelerate_1.withAccelerate)());
                return [4 /*yield*/, c.req.json()];
            case 1:
                body = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: body.email,
                            password: body.password
                        }
                    })];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, (0, jwt_1.sign)({ id: user.id }, c.env.JWT_SECRET)];
            case 4:
                jwt = _a.sent();
                return [2 /*return*/, c.json({ jwt: jwt })];
            case 5:
                e_1 = _a.sent();
                c.status(403);
                return [2 /*return*/, c.json({ error: 'error while signing up' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/api/v1/user/signin', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        c.text('This is the signin route');
        return [2 /*return*/];
    });
}); });
app.get('/api/v1/blog/:id', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        c.text('GET /');
        return [2 /*return*/];
    });
}); });
app.get('/api/v1/blog/bulk', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        c.text('GET /');
        return [2 /*return*/];
    });
}); });
app.post('/api/v1/blog', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        c.text('This is the blog posting route');
        return [2 /*return*/];
    });
}); });
app.put('/api/v1/blog', function (c) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        c.text('This route is specifically for updating your blog posts.');
        return [2 /*return*/];
    });
}); });
exports["default"] = app;
app.listen(3000);