
// vscode包含了官方所有的能力(API)
import * as vscode from 'vscode';
import helloWorld from './main/hello-world';
import createWebview from './webView/webView';
import textEdit from './main/textEdit';
import Hover from './main/hover';
import codeCompletion from './main/codeCompletion';
import commentLine from './main/commentLine';
import openDir from './treeView/treeView';
import FirstMenu from './main/firstMenu';
import FlowerMenu from './main/flowerMenu';
import wbTreeView from './treeView/weiboTreeView';

// 插件激活的钩子函数
export function activate(context: vscode.ExtensionContext) {
	
	// 1. 使用registerCommand() 自定义命令
	let disposable = helloWorld(vscode);

	// 2. 使用registerTextEditorCommand 统计页面的代码行数
	let textEditorCommand = textEdit(vscode);

	// 3. 自定义悬停提示文字
	const hover = Hover(vscode);

	// 4. 自定义右键点击菜单
	const firstMenu = FirstMenu(vscode);

	// 5. 自定义输入提示
  const provider = codeCompletion(vscode);
	
	// 6. 注释光标所在的这一行
	// commentLine(vscode);

	// 7.编辑器顶部的菜单
	const flowerMenu = FlowerMenu(vscode);

	// 8. webview实现
	createWebview(context,vscode);

	// 9. 使用treeView 和 webView 实现打开文件夹 本地展示
	const testTreeView = openDir(context,vscode);

	// 10.使用treeView 和 webView 实现微博实时热点展示
	const wb = wbTreeView(context,vscode);

 	// 所有的命令都要放到subscriptions执行队列中去
	context.subscriptions.push(textEditorCommand);
  context.subscriptions.push(provider);
  context.subscriptions.push(hover);
	context.subscriptions.push(disposable);
	context.subscriptions.push(testTreeView.openDorE);
	context.subscriptions.push(testTreeView.itemClickE);
	context.subscriptions.push(firstMenu);
	context.subscriptions.push(flowerMenu);
	context.subscriptions.push(wb.getWbHeat);
	context.subscriptions.push(wb.wbTtemClick);
}


// 插件失活钩子函数
export function deactivate() {}
