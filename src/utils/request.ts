import axios from  'axios';
import * as vscode from 'vscode';
import { wbTreeItem } from '../treeView/weiboViewData';

// 封装请求类
 export class ApiService {
  private linkList: Array<wbTreeItem> = [];

  async getWbHeatData(): Promise<Array<wbTreeItem>> {
    const url = 'https://api.oioweb.cn/api/summary.php';
    let response = await axios.get(url, {
      headers: {
        'content-type': "application/json;charset=utf-8"
      }
    });
    let data = response.data;
    for (let i = 0; i < data.length;i++) {
        
      this.linkList.push(new wbTreeItem(data[i].title,data[i].heat,data[i].link,vscode.TreeItemCollapsibleState.None));
    }

    return this.linkList;
  }
}
