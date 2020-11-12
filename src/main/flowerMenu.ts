export default function flowerMenu(vscode) {
  return vscode.commands.registerCommand('vsplugin.flowerMenu', () => {
    vscode.window.showInformationMessage('触发了花菜单！');
	});
}