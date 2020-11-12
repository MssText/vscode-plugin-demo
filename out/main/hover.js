"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hover(vscode) {
    return vscode.languages.registerHoverProvider('vue', {
        provideHover(document, position, token) {
            const fileName = document.fileName;
            console.log(document.getWordRangeAtPosition(position));
            const word = document.getText(document.getWordRangeAtPosition(position));
            if (/\.vue$/.test(fileName) && /\bdata\b/.test(word)) {
                return new vscode.Hover("在data中定义响应式的数据！！");
            }
            return undefined;
        }
    });
}
exports.default = hover;
//# sourceMappingURL=hover.js.map