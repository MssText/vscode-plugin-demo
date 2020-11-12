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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const axios_1 = require("axios");
const vscode = require("vscode");
const weiboViewData_1 = require("../treeView/weiboViewData");
// 封装请求类
class ApiService {
    constructor() {
        this.linkList = [];
    }
    getWbHeatData() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://api.oioweb.cn/api/summary.php';
            let response = yield axios_1.default.get(url, {
                headers: {
                    'content-type': "application/json;charset=utf-8"
                }
            });
            let data = response.data;
            for (let i = 0; i < data.length; i++) {
                this.linkList.push(new weiboViewData_1.wbTreeItem(data[i].title, data[i].heat, data[i].link, vscode.TreeItemCollapsibleState.None));
            }
            return this.linkList;
        });
    }
}
exports.ApiService = ApiService;
//# sourceMappingURL=request.js.map