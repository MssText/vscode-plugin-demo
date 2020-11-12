"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// vscode包含了官方所有的能力(API)
const vscode = require("vscode");
const hello_world_1 = require("./main/hello-world");
const webView_1 = require("./webView/webView");
const textEdit_1 = require("./main/textEdit");
const hover_1 = require("./main/hover");
const codeCompletion_1 = require("./main/codeCompletion");
const treeView_1 = require("./treeView/treeView");
const firstMenu_1 = require("./main/firstMenu");
const flowerMenu_1 = require("./main/flowerMenu");
const weiboTreeView_1 = require("./treeView/weiboTreeView");
// 插件激活的钩子函数
function activate(context) {
    // 1. 使用registerCommand() 自定义命令
    let disposable = hello_world_1.default(vscode);
    // 2. 使用registerTextEditorCommand 统计页面的代码行数
    let textEditorCommand = textEdit_1.default(vscode);
    // 3. 自定义悬停提示文字
    const hover = hover_1.default(vscode);
    // 4. 自定义右键点击菜单
    const firstMenu = firstMenu_1.default(vscode);
    // 5. 自定义输入提示
    const provider = codeCompletion_1.default(vscode);
    // 6. 注释光标所在的这一行
    // commentLine(vscode);
    // 7.编辑器顶部的菜单
    const flowerMenu = flowerMenu_1.default(vscode);
    // 8. webview实现
    webView_1.default(context, vscode);
    // 9. 使用treeView 和 webView 实现打开文件夹 本地展示
    const testTreeView = treeView_1.default(context, vscode);
    // 10.使用treeView 和 webView 实现微博实时热点展示
    const wb = weiboTreeView_1.default(context, vscode);
    // 所有的命令都要放到subscriptions执行队列中去
    context.subscriptions.push(textEditorCommand);
    context.subscriptions.push(provider);
    context.subscriptions.push(hover);
    context.subscriptions.push(disposable);
    context.subscriptions.push(testTreeView.openDorE);
    context.subscriptions.push(testTreeView.itemClickE);
    context.subscriptions.push(firstMenu);
    context.subscriptions.push(flowerMenu);
    context.subscriptions.push(wb.getWbHeat);
    context.subscriptions.push(wb.wbTtemClick);
}
exports.activate = activate;
// 插件失活钩子函数
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map