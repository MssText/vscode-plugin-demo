import { CancellationToken, Position, TextDocument } from "vscode";

export default function hover(vscode) {
  return vscode.languages.registerHoverProvider('vue', {
		provideHover(document: TextDocument, position: Position, token: CancellationToken) {

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