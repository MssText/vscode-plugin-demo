"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wbTreeItem = exports.wbTreeData = void 0;
const vscode = require("vscode");
const fs = require('fs');
const path = require('path');
// 需要实现TreeDataProvider接口 所有的treeView数据都需要满足这个接口的要求
class wbTreeData {
    constructor(service) {
        this.service = service;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return this.service.getWbHeatData();
    }
}
exports.wbTreeData = wbTreeData;
class wbTreeItem extends vscode.TreeItem {
    constructor(label, // 当前热点的名称
    heat, // 热度值
    link, // 热点的链接
    collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.heat = heat;
        this.link = link;
        this.collapsibleState = collapsibleState;
        //设置鼠标悬浮在此项时的工具提示文本
        this.tooltip = this.label;
        // 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: "vsplugin.wbTtemClick",
            arguments: [
                this.label,
                this.heat,
                this.link
            ]
        };
    }
}
exports.wbTreeItem = wbTreeItem;
//# sourceMappingURL=weiboViewData.js.map