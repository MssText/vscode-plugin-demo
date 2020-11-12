import * as vscode from 'vscode';
const fs = require('fs');
const path= require('path');
   

// 需要实现TreeDataProvider接口 所有的treeView数据都需要满足这个接口的要求

export class MyTreeData implements vscode.TreeDataProvider<MyTreeItem> {
  constructor(private rootPath: string) {

  }
  
  getTreeItem(element: MyTreeItem):MyTreeItem | Thenable<MyTreeItem> {
    return element;
  }

  getChildren(element?: MyTreeItem | undefined):vscode.ProviderResult<MyTreeItem[]> {
    if (!this.rootPath) {
      vscode.window.showInformationMessage("没有该目录！");
      return Promise.resolve([]);
    }

    return Promise.resolve(this.searchFiles(path.join(element.parentPath,element.label)));
  }

  // 定义查找文件的私有方法searchFiles
  private searchFiles(parentPath: string):MyTreeItem[] {
    const treeDir: MyTreeItem[] = [];

    if (this.pathExists(parentPath)) { // 有权限
      const fsReaderDir = fs.readdirSync(parentPath, 'utf-8');
      
      fsReaderDir.forEach(fileName => {
        let filePath = path.join(parentPath,fileName); // 拼接成绝对路径
        
        if (fs.statSync(filePath).isDirectory()) { // 目录
          treeDir.push(new MyTreeItem(fileName, parentPath, vscode.TreeItemCollapsibleState.Collapsed));
        } else { // 文件
          treeDir.push(new MyTreeItem(fileName, parentPath, vscode.TreeItemCollapsibleState.None));
        }
      });
    }
    
    return treeDir;
  }

  // 判断是否有指定path文件或者目录的访问权限
  private pathExists(filePath:string): boolean{
    try {
      fs.accessSync(filePath);
    } catch(err) {
      return false;
    }

    return true;
  }
}

export class MyTreeItem extends vscode.TreeItem {
  constructor(
    public label: string, // 存储当前标签
    public parentPath: string, // 存储当前标签的路径，不包括该标签这个目录
    public collapsibleState: vscode.TreeItemCollapsibleState
  ){
    super(label, collapsibleState);
  }

  //设置鼠标悬浮在此项时的工具提示文本
  tooltip = path.join(this.parentPath,this.label);

  // 为每项添加点击事件的命令
  command = {
    title: this.label,
    command: "vsplugin.itemClick",
    arguments: [ // 传递参数
      this.label,
      path.join(this.parentPath,this.label)
    ]
  };
}