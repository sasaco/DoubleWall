import { Component } from '@angular/core';
import { ResultService } from '../result/result.service';
import { SceneService } from '../three/scene.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {


  private MODEL_PATH = 'assets/jsmodel/model.json';
  private model: any;;
  constructor(
    public result: ResultService,
    private scene: SceneService) {
      this.loadModel();
  }
  
  // モデルを読み込む
  public async loadModel(): Promise<void> {
    // this.model = await tf.loadLayersModel(this.MODEL_PATH);
    console.log(this.model.summary());
    this.onChange(null);
  }

  // 引張材材料番号
  public STUDMATERIAL: {id: number, name: string}[] = [
    {id:0, name:'SS400'},
    {id:1, name:'SS490'},
  ];
  public conSelect(id: number){
    this.result.param302 = id;
    this.onChange(id);
  }

  // 土質区分
  public TYPE2s: {id: number, name: string}[] = [
    {id:0, name:'粘性土'},
    {id:1, name:'砂質土'},
  ];
  // 中詰め区分
  public type2Select(id: number){
    this.result.param113 = id;
    this.onChange(id);
  }
  // 在来地盤区分
  public type3Select(id: number){
    this.result.param102 = id;
    this.onChange(id);
  }

  private changeFlg = false;
  private calcrateFlg = false;
  public onChange(event: any){

    if(this.calcrateFlg === true){
      this.changeFlg = true;
      return; // 計算中は予約だけして無視
    }

    this.doForecast().then((value) => {
      if(this.changeFlg === true){
        this.onChange(null);
      }
      this.changeFlg = false;
    });

  }


  private async doForecast(): Promise<void> {

    this.calcrateFlg = true;

    // // インプットされているデータを取得する
    // const data_normal = this.result.getInputArray();

    // // インプットされているデータをテンソルに変換する
    // const inputs = tf.tensor(data_normal).reshape([1, data_normal.length]);

    // // AI に推論させる
    // const output = this.model.predict(inputs) as any;
    // let predictions_normal = Array.from(output.dataSync());
    // console.log(predictions_normal);

    // // 推論させたデータを表示する
    // this.result.loadResultData(predictions_normal);

    // アラート
    this.scene.changeData();

    this.calcrateFlg = false;
  }



}
