"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const treeViewData_1 = require("./treeViewData");
const fs = require('fs');
//打开本地文件夹
function openDir(context, vscode) {
    const openDorE = vscode.commands.registerCommand('vsplugin.opendir', () => {
        let options = {
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMore: false,
            defaultUri: vscode.Uri.file("/Users/yuangong/Desktop"),
            openLabel: '选择文件夹'
        };
        // 显示"文件打开对话框"
        vscode.window.showOpenDialog(options).then(result => {
            if (!result) {
                vscode.window.showInformationMessage("打开文件夹失败，请重试！");
            }
            else {
                // 成功拿到路径
                let loadUri = result[0].path.toString();
                let loadDir = loadUri.substr(1, loadUri.length);
                vscode.window.showInformationMessage(`你打开的文件夹路径是：${loadDir}`);
                // 将数据注册到视图 这样treeView就可以正常的渲染数据了
                vscode.window.registerTreeDataProvider("fileList", new treeViewData_1.MyTreeData(loadDir));
            }
        });
    });
    const itemClickE = vscode.commands.registerCommand("vsplugin.itemClick", (label, filePath) => {
        // 将回调接收到的数据传给webView
        let content;
        try {
            content = fs.readFileSync(filePath, 'utf-8');
        }
        catch (e) {
            content = "文件内容读取失败！";
            vscode.window.showInformationMessage("文件内容读取失败！");
        }
        const panel = vscode.window.createWebviewPanel('fileDetailWebView', label, vscode.ViewColumn.One, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        panel.iconPath = {
            dark: vscode.Uri.file(context.extensionPath + '/src/assets/flower.png'),
            light: vscode.Uri.file(context.extensionPath + '/src/assets/flower.png')
        };
        panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div>
        ${content}
      </div>
    </body>
    </html>`;
    });
    return {
        openDorE,
        itemClickE
    };
}
exports.default = openDir;
//# sourceMappingURL=treeView.js.map