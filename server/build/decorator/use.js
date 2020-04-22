"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
{
    /* create a 'use' decorator */
}
function use(middleware) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata("middlewares", target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata("middlewares", originMiddlewares, target, key);
    };
}
exports.use = use;
