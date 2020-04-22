"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
{
    /*
  use cheerio to crawl website.
  analyze the crawled data and store data to file.
  only crawl 'case number' and 'death number' from the website, store the timestamp and data.
  */
}
var fs_1 = __importDefault(require("fs"));
var cheerio_1 = __importDefault(require("cheerio"));
{
    /* data structure for storing the new crawled data */
}
var CaseAnalyzer = /** @class */ (function () {
    function CaseAnalyzer() {
    }
    CaseAnalyzer.getInstance = function () {
        if (!CaseAnalyzer.instance) {
            CaseAnalyzer.instance = new CaseAnalyzer();
        }
        return CaseAnalyzer.instance;
    };
    CaseAnalyzer.prototype.getVirusInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var totalCases = parseInt($("#covid-19-cases-total")
            .text()
            .replace(",", ""));
        var totalDeath = parseInt($("#covid-19-deaths-total")
            .text()
            .replace(",", ""));
        var infos = [];
        infos.push({ title: "cases", count: totalCases });
        infos.push({ title: "death", count: totalDeath });
        console.log(totalCases);
        return {
            time: new Date().getTime(),
            data: infos
        };
    };
    //store the crawled data to 'case.json' file
    //1.the json file doesn't exist, the default will be an empty object
    //2.if the json file already exists, append the new data to the preivous data
    CaseAnalyzer.prototype.generateJsonContent = function (caseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        }
        fileContent[caseInfo.time] = caseInfo.data;
        return fileContent;
    };
    CaseAnalyzer.prototype.analyze = function (html, filePath) {
        this.getVirusInfo(html);
        var caseInfo = this.getVirusInfo(html);
        var fileContent = this.generateJsonContent(caseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return CaseAnalyzer;
}());
exports.default = CaseAnalyzer;
