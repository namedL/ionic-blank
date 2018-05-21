import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular';

/**
 * 通用类
 */
@Injectable()
export class CommonProvider {

  constructor(
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) { }

  /**测试 */
  public initTree2(nodes: any[] = [], pid: string = "0", keyMap: any = { id: 'id', tree_id: 'id', tree_pid: 'pid', tree_value: 'value' }) {
    // 构建树
    let create = function (nodes, n, pid) {
      let result = [];
      if (pid) {
        let i = 0, len = nodes.length;
        for (i; i < len; i++) {
          let node = nodes[i];
          let id = node[keyMap.id];
          let tree_id = node[keyMap.tree_id];
          let tree_pid = node[keyMap.tree_pid];
          let tree_value = node[keyMap.tree_value];
          if (tree_pid == pid) {
            result.push(Object.assign({ id: id, tree_id: tree_id, tree_pid: tree_pid, tree_value: tree_value }, node));
            nodes.splice(i--, 1);
            len--;
          }
        }
      }
      result.forEach(node => {
        node.childs = create(nodes, node, node.tree_id);
      })
      return result.length > 0 ? result : [];
    }
    return create(nodes, null, pid);
  }

  /**
    * 信息弹窗提示
    * @param message 消息提示
    * @param duration 时长
    * @param position 弹窗位置
    * @param isReturn 是否直接返回
    * @param onDidDismiss 弹窗结束时执行的回调函数
    * @param onDidDismiss 
    */
  public toastInfo(message, duration = 3000, position = 'top', onDidDismiss = null, OnWillDismiss = null) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    //toast.onWillDismiss(OnWillDismiss);
    toast.onDidDismiss(onDidDismiss);
    toast.present();
  }

  /**
   * 页面注入webview
   * @param func 注入成功后回调函数
   */
  public loadWebview(func) {
    var timer = setInterval(() => {
      var __rnWebview = window["__rnWebview"];
      if (__rnWebview) {
        clearInterval(timer);
        func(__rnWebview);
      }
    }, 100)
  }

  /**
   * 页面加载组件
   */
  public loadingCtrl(spinner = 'dots', content = '加载中') {
    let loading = this.loadCtrl.create({
      spinner: spinner,
      content: content
    });
    loading.present();
    return loading;
  }



}
