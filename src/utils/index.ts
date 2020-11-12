import * as vscode from 'vscode';
const path = require('path');
const fs = require('fs');

const utils = {

	/**
 * 获取某个扩展文件相对于webview需要的一种特殊路径格式
 * 形如：vscode-resource:/Users/yuangong/Desktop/learn/vsPlugin/src/assets/cat.png
 * @param context 上下文
 * @param relativePath 扩展中某个文件相对于根目录的路径(这点很重要)，如 images/test.jpg
 */
	getExtensionFileVscodeResource (context, relativePath, panel) {
		const diskPath = vscode.Uri.file(path.join(context.extensionPath, relativePath));
		// return diskPath.with({ scheme: 'vscode-resource' }).toString();

		// 在vscode高于1.38的版本 提供了panel.webview.asWebviewUe
		return panel.webview.asWebviewUri(diskPath);
	},

	/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param context 上下文
 * @param templatePath 相对于插件根目录的html文件相对路径
 */

getWebViewContent(context, templatePath) {
	const resourcePath = path.join(context.extensionPath, templatePath);
	const dirPath = path.dirname(resourcePath);
	let html = fs.readFileSync(resourcePath, 'utf-8');

	// vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
	html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
		return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});
	console.log(html);
	   
	return html;
}
};

export default utils;