import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  public param001 = 20.0; // 堤体延長
  public param002 = 5.7; // 堤体幅
  public param003 = 4.0; // 左右壁体高さ
  public param005 = 3.9; // 中詰土天端高さ
  public param006 = 0.5; // 堤外区間地表面
  public param007 = 1.0; // 堤内区間地表面
  public param008 = 1.6; // 引張材間隔
  public param101 = 12.0; // 在来地盤重量
  public param102 = 1; // 在来地盤区分
  public param103 = 7; // 在来地盤N値
  public param104 = 24; // 在来地盤摩擦角
  public param105 = 165; // 在来地盤粘着力
  public param106 = 179400; // 在来地盤変形係数
  public param111 = 12.0; // 中詰め重量
  public param113 = 1; // 中詰め区分
  public param114 = 20; // 中詰めN値
  public param115 = 42; // 中詰め摩擦角
  public param116 = 190; // 中詰め粘着力
  public param201 = 3; // 矢板型
  public param202 = 390; // 矢板材料
  public param301 = 35; // 引張材直径
  public param302 = 1; // 引張材材料番号
  public param305 = 1; // 腹起し材質
  public param401 = 1.1; // 堤外側水位
  public param402 = 3.0; // 堤内側水位
  public param501 = 0.1; // 震度
  // public せん断変形破壊
  // public 滑動、支持力
  // public 根入れ部の安定
  // public 遮水効果
  // public 矢板の耐力照査
  // public タイロッドの耐力照査
  // public 腹起しの耐力照査

  public param004 = 15.0;// 矢板の全長
  public param009 = 2.0; // 引張材位置
  // 腹起し番号

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
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
