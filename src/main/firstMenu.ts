export default function firstMenu(vscode) {
  return vscode.commands.registerCommand('vsplugin.firstMenu',() => {
		vscode.window.showInformationMessage('点击了右键菜单的1号命令！');
	});
}