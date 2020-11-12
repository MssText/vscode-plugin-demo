"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
// 创建一个简单的webView
function createWebView(context, vscode) {
    vscode.commands.registerCommand('vsplugin.openWebview', () => {
        const panel = vscode.window.createWebviewPanel('testWebview', "花花世界", vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        //设置标题前图标		
        panel.iconPath = {
            dark: vscode.Uri.file(context.extensionPath + '/src/assets/flower.png'),
            light: vscode.Uri.file(context.extensionPath + '/src/assets/flower.png')
        };
        // let url =  utils.getExtensionFileVscodeResource(context,'src/assets/cool.svg',panel);
        let templateHtml = index_1.default.getWebViewContent(context, 'src/webView/webView.html');
        // 把JSON数据 发送到webview  
        panel.webview.postMessage({ rhh: "圆红花" });
        panel.webview.html = templateHtml;
        // 处理webView传过来的数据onDidReceiveMessage
        // 这里将webview打成了webView竟然不报错
        panel.webview.onDidReceiveMessage(message => {
            vscode.window.showInformationMessage('从webView接收到的花名是:' + message.flowerName);
        }, undefined, context.subscriptions);
    });
}
exports.default = createWebView;
//# sourceMappingURL=webView.js.map