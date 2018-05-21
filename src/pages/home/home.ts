import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  /**
   * declare base url  
   */
  public baseUrl: string = "";
  constructor(
    public navCtrl: NavController,
    private configProvider: ConfigProvider) {
      this.baseUrl = this.configProvider.config.base_url || "";
  }

}
