"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const weiboViewData_1 = require("./weiboViewData");
const request_1 = require("../utils/request");
//注册命令
function getWbHeat(context, vscode) {
    const getWbHeat = vscode.commands.registerCommand('vsplugin.getWbHeat', () => {
        // 传入我们的实例
        const service = new request_1.ApiService();
        vscode.window.registerTreeDataProvider("wbHeat", new weiboViewData_1.wbTreeData(service));
    });
    const wbTtemClick = vscode.commands.registerCommand("vsplugin.wbTtemClick", (label, heat, link) => {
        //创建webView
        const panel = vscode.window.createWebviewPanel('wbWebView', label, vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.iconPath = {
            dark: vscode.Uri.file(context.extensionPath + '/src/assets/xlwb.png'),
            light: vscode.Uri.file(context.extensionPath + '/src/assets/xlwb.png')
        };
        panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta content="portrait" name="x5-orientation">
      <meta content="true" name="x5-fullscreen">
      <meta content="portrait" name="screen-orientation">
      <meta content="yes" name="full-screen">
      <meta content="webkit" name="renderer">
      <meta content="IE=Edge" http-equiv="X-UA-Compatible">
      <title>我在vscode上看微博热点</title>
    </head>
    <style>
    html,
    body,
    iframe {
      width: 100%;
      height: 100%;
      border: 0;
      overflow: hidden;
    }
  </style>
    <body>
      <iframe src="https://s.weibo.com/weibo?q=${label}&Refer=index"/>
    </body>
    </html>`;
    });
    return {
        getWbHeat,
        wbTtemClick
    };
}
exports.default = getWbHeat;
//# sourceMappingURL=weiboTreeView.js.map