"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
var CaseAnalyzer = /** @class */ (function () {
    function CaseAnalyzer() {
    }
    CaseAnalyzer.getInstance = function () {
        if (!CaseAnalyzer.instance) {
            CaseAnalyzer.instance = new CaseAnalyzer();
        }
        return CaseAnalyzer.instance;
    };
    CaseAnalyzer.prototype.getCaseInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var caseItems = $('.case-item');
        var caseInfos = [];
        caseItems.map(function (index, element) {
            var descs = $(element).find('.case-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs
                .eq(1)
                .text()
                .split('：')[1], 10);
            caseInfos.push({ title: title, count: count });
        });
        return {
            time: new Date().getTime(),
            data: caseInfos
        };
    };
    CaseAnalyzer.prototype.generateJsonContent = function (caseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[caseInfo.time] = caseInfo.data;
        return fileContent;
    };
    CaseAnalyzer.prototype.analyze = function (html, filePath) {
        var caseInfo = this.getCaseInfo(html);
        var fileContent = this.generateJsonContent(caseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return CaseAnalyzer;
}());
exports.default = CaseAnalyzer;
