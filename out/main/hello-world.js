"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// hello-world例子
function default_1(vscode) {
    return vscode.commands.registerCommand('vsplugin.helloWorld', () => {
        vscode.window.showInformationMessage('恭喜你，打开新世界的大门！');
    });
}
exports.default = default_1;
//# sourceMappingURL=hello-world.js.map