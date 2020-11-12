"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flowerMenu(vscode) {
    return vscode.commands.registerCommand('vsplugin.flowerMenu', () => {
        vscode.window.showInformationMessage('触发了花菜单！');
    });
}
exports.default = flowerMenu;
//# sourceMappingURL=flowerMenu.js.map