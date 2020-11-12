"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTreeItem = exports.MyTreeData = void 0;
const vscode = require("vscode");
const fs = require('fs');
const path = require('path');
// 需要实现TreeDataProvider接口 所有的treeView数据都需要满足这个接口的要求
class MyTreeData {
    constructor(rootPath) {
        this.rootPath = rootPath;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!this.rootPath) {
            vscode.window.showInformationMessage("没有该目录！");
            return Promise.resolve([]);
        }
        return Promise.resolve(this.searchFiles(path.join(element.parentPath, element.label)));
    }
    // 定义查找文件的私有方法searchFiles
    searchFiles(parentPath) {
        const treeDir = [];
        if (this.pathExists(parentPath)) { // 有权限
            const fsReaderDir = fs.readdirSync(parentPath, 'utf-8');
            fsReaderDir.forEach(fileName => {
                let filePath = path.join(parentPath, fileName); // 拼接成绝对路径
                if (fs.statSync(filePath).isDirectory()) { // 目录
                    treeDir.push(new MyTreeItem(fileName, parentPath, vscode.TreeItemCollapsibleState.Collapsed));
                }
                else { // 文件
                    treeDir.push(new MyTreeItem(fileName, parentPath, vscode.TreeItemCollapsibleState.None));
                }
            });
        }
        return treeDir;
    }
    // 判断是否有指定path文件或者目录的访问权限
    pathExists(filePath) {
        try {
            fs.accessSync(filePath);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}
exports.MyTreeData = MyTreeData;
class MyTreeItem extends vscode.TreeItem {
    constructor(label, // 存储当前标签
    parentPath, // 存储当前标签的路径，不包括该标签这个目录
    collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.parentPath = parentPath;
        this.collapsibleState = collapsibleState;
        //设置鼠标悬浮在此项时的工具提示文本
        this.tooltip = path.join(this.parentPath, this.label);
        // 为每项添加点击事件的命令
        this.command = {
            title: this.label,
            command: "vsplugin.itemClick",
            arguments: [
                this.label,
                path.join(this.parentPath, this.label)
            ]
        };
    }
}
exports.MyTreeItem = MyTreeItem;
//# sourceMappingURL=treeViewData.js.map