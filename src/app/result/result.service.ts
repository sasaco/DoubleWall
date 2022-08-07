import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  // 解析結果
  public tu1: number = 0;
  public tw1: number = 0;
  public tb1: number = 0;
  
  // private result_max = 1;
  public Df = 2000;
  public b0 = 5000;
  public h0 = 5000;
  public fck = 25;
  public ds = 50;
  public condition = '一般の環境'; // 環境条件

  public coverSoilWeight = 18; // 被り土重量

  public r1 = 18; // 1層目 湿潤重量
  public type2 = '粘性土'; // 2層目 地盤区分
  public r2 = 15;
  public E02 = 15000;
  public Ko2 = 0.2;
  public type3 = '砂質土';
  public r3 = 18;
  public E03 = 23000;
  public Ko3 = 0.5;
}
