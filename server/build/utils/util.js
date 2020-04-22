"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    /* made a response template */
}
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            sucesss: false,
            errMsg: errMsg,
            data: data
        };
    }
    return {
        sucesss: true,
        data: data
    };
};
