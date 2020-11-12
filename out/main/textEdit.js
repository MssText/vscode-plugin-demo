"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function textEdit(vscode) {
    return vscode.commands.registerTextEditorCommand('vsplugin.testEditorCommand', (textEditor, edit) => {
        vscode.window.showInformationMessage(`该文件的类型为：${textEditor.document.languageId},
			行数为：${textEditor.document.lineCount}`);
    });
}
exports.default = textEdit;
//# sourceMappingURL=textEdit.js.map