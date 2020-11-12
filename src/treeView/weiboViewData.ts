import * as vscode from 'vscode';
import {ApiService} from '../utils/request';
const fs = require('fs');
const path= require('path');

// 需要实现TreeDataProvider接口 所有的treeView数据都需要满足这个接口的要求

export class wbTreeData implements vscode.TreeDataProvider<wbTreeItem> {
  private service:ApiService;
  constructor(service: ApiService) {
    this.service = service;
  }
  
  getTreeItem(element: wbTreeItem):wbTreeItem | Thenable<wbTreeItem> {
    return element;
  }

  getChildren(element?: wbTreeItem | undefined):vscode.ProviderResult<wbTreeItem[]> {
        
    return this.service.getWbHeatData();
  }
}


export class wbTreeItem extends vscode.TreeItem {
  constructor(
    public readonly label: string, // 当前热点的名称
    public readonly heat: string, // 热度值
    public readonly link: string, // 热点的链接
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ){
    super(label, collapsibleState);
  }

  //设置鼠标悬浮在此项时的工具提示文本
  tooltip = this.label;
  
  // 为每项添加点击事件的命令
  command = {
    title: this.label,
    command: "vsplugin.wbTtemClick",
    arguments: [ // 将渲染webView需要的数据透传过去
      this.label,
      this.heat,
      this.link
    ]
  };
}