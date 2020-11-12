import { TextEdit, TextEditor, TextEditorEdit } from "vscode";

export default function textEdit(vscode) {
  return vscode.commands.registerTextEditorCommand('vsplugin.testEditorCommand',(textEditor: TextEditor,edit: TextEditorEdit) => {
		vscode.window.showInformationMessage(
			`该文件的类型为：${textEditor.document.languageId},
			行数为：${textEditor.document.lineCount}`);
	});
}