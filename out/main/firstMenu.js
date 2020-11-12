"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function firstMenu(vscode) {
    return vscode.commands.registerCommand('vsplugin.firstMenu', () => {
        vscode.window.showInformationMessage('点击了右键菜单的1号命令！');
    });
}
exports.default = firstMenu;
//# sourceMappingURL=firstMenu.js.map