// hello-world例子
export default function(vscode) {
  return vscode.commands.registerCommand('vsplugin.helloWorld', () => {

		vscode.window.showInformationMessage('恭喜你，打开新世界的大门！');
		
	});
}