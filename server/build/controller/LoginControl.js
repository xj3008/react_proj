"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var decorator_1 = require("../decorator");
var util_1 = require("../utils/util");
//create all the routers
var LoginControl = /** @class */ (function () {
    function LoginControl() {
    }
    LoginControl_1 = LoginControl;
    LoginControl.isLogin = function (req) {
        return !!(req.session ? req.session.login : false);
    };
    LoginControl.prototype.isLogin = function (req, res) {
        var isLogin = LoginControl_1.isLogin(req);
        var result = util_1.getResponseData(isLogin);
        res.json(result);
    };
    LoginControl.prototype.login = function (req, res) {
        console.log("login");
        var password = req.body.password;
        var isLogin = LoginControl_1.isLogin(req);
        if (isLogin) {
            res.json(util_1.getResponseData(true));
        }
        else {
            if (password === "test" && req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(true));
            }
            else {
                res.json(util_1.getResponseData(false, "login fail"));
            }
        }
    };
    LoginControl.prototype.logout = function (req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json(util_1.getResponseData(true));
    };
    var LoginControl_1;
    __decorate([
        decorator_1.get("/isLogin"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControl.prototype, "isLogin", null);
    __decorate([
        decorator_1.post("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControl.prototype, "login", null);
    __decorate([
        decorator_1.get("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginControl.prototype, "logout", null);
    LoginControl = LoginControl_1 = __decorate([
        decorator_1.controller("/api")
    ], LoginControl);
    return LoginControl;
}());
exports.LoginControl = LoginControl;
