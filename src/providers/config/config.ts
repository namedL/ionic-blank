import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export function configFactory(configProvider: ConfigProvider) {
  return () => configProvider.load();
}

export class Env {
  public env: string;
}

@Injectable()
export class ConfigProvider {

  /**
   * 环境
   */
  public env: Env = null;

  /**
   * 配置
   */
  public config: any = null;


  constructor(private http: HttpClient) { }

  /**
   * 加载配置
   */
  public load() {
    return new Promise((resolve, reject) => {
      this.http.get('assets/configs/env.json').subscribe(
        (res: Env) => {
          this.env = res;
          let env = res.env;
          if (env) {
            this.http.get(`assets/configs/env.${env}.json`).subscribe(
              (res: any) => {
                this.config = res;
                resolve(true);
              },
              (error: any) => {
                console.error(error);
                resolve(true);
              });
          } else console.error('Environment config file "env.json" is invalid');
        },
        (error: any) => {
          console.error(error);
          resolve(true);
        });
    });
  };

}
