import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from '@three-ts/orbit-controls';
import { CSS2DRenderer, CSS2DObject } from './libs/CSS2DRenderer.js';
import { ResultService } from '../result/result.service';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  // シーン
  private scene: THREE.Scene;

  // レンダラー
  private renderer!: THREE.WebGLRenderer;
  private labelRenderer!: CSS2DRenderer;

  // カメラ
  private camera!: THREE.PerspectiveCamera;
  private aspectRatio: number = 0;

  private GridHelper!: THREE.GridHelper;

  // 初期化
  public constructor(
    private result: ResultService) {
    // シーンを作成
    this.scene = new THREE.Scene();
    // シーンの背景を白に設定
    // this.scene.background = new THREE.Color(0xf0f0f0);
    this.scene.background = new THREE.Color( 0xffffff );
    // レンダラーをバインド
    this.render = this.render.bind(this);

  }

  public OnInit(aspectRatio: number,
                canvasElement: HTMLCanvasElement,
                deviceRatio: number,
                Width: number,
                Height: number): void {
    // カメラ
    this.aspectRatio = aspectRatio;
    this.createCamera(aspectRatio, Width, Height);
    // 環境光源
    this.add(new THREE.AmbientLight(0xf0f0f0));
    // レンダラー
    this.createRender(canvasElement,
                      deviceRatio,
                      Width,
                      Height);
    // コントロール
    this.addControls();

    // 床面を生成する
    // this.createHelper();

    this.camera.lookAt(new THREE.Vector3(0, 0, -7));
    this.render();
  }


  // 床面を生成する
  private createHelper() {
    this.GridHelper = new THREE.GridHelper(20, 20);
    this.GridHelper.geometry.rotateX(Math.PI / 2);
    this.scene.add(this.GridHelper);
  }

  // コントロール
  public addControls() {
    const controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
    controls.target.z = -7;
    controls.addEventListener('change', this.render);
  }

  // カメラの初期化
  public createCamera(aspectRatio: number,
                      Width: number, Height: number ) {

    aspectRatio = (aspectRatio === null) ? this.aspectRatio : aspectRatio;

    const target = this.scene.getObjectByName('camera');
    if (target !== undefined) {
      this.scene.remove(this.camera);
    }
    this.camera = new THREE.PerspectiveCamera(
      70,
      aspectRatio,
      0.1,
      1000
    );
    this.camera.position.set(10, -20, 7);
    this.camera.name = 'camera';
    this.scene.add(this.camera);

  }

  // レンダラーを初期化する
  public createRender(canvasElement: HTMLCanvasElement,
                      deviceRatio: number,
                      Width: number,
                      Height: number): void {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: canvasElement,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setPixelRatio(deviceRatio);
    this.renderer.setSize(Width, Height);
    this.renderer.shadowMap.enabled = true;

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(Width, Height);
    this.labelRenderer.domElement.style.position = 'absolute';
  }

  public labelRendererDomElement(): Node {
    return this.labelRenderer.domElement;
  }

  // リサイズ
  public onResize(deviceRatio: number,
                  Width: number,
                  Height: number): void {

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(Width, Height);
    this.labelRenderer.setSize(Width, Height);
    this.render();
  }

  // レンダリングする
  public render() {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  // レンダリングのサイズを取得する
  public getBoundingClientRect(): ClientRect | DOMRect  {
    return this.renderer.domElement.getBoundingClientRect();
  }

  // シーンにオブジェクトを追加する
  public add(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.add(obj);
    }
  }

  // シーンのオブジェクトを削除する
  public remove(...threeObject: THREE.Object3D[]): void {
    for (const obj of threeObject) {
      this.scene.remove(obj);
    }
  }

  // シーンにオブジェクトを削除する
  public removeByName(...threeName: string[]): void {
    for (const name of threeName) {
      const target = this.scene.getObjectByName(name);
      if (target === undefined) {
        continue;
      }
      this.scene.remove(target);
    }
  }

  // ファイルに視点を保存する
  public getSettingJson(): any {
    return {
      camera: {
        x: this.camera.position.x,
        y: this.camera.position.y,
        z: this.camera.position.z,
      }
    };
  }



  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  private gound0: THREE.Group = new THREE.Group();
  private gound1!: THREE.Mesh;
  private gound2!: THREE.Mesh;
  private gound3!: THREE.Mesh;

  private water1!: THREE.Mesh;
  private water3!: THREE.Mesh;

  private wall1: THREE.Group = new THREE.Group();
  private wall3: THREE.Group = new THREE.Group();

  private waling1: THREE.Group = new THREE.Group();
  private waling2: THREE.Group = new THREE.Group();

  private stud: THREE.Group = new THREE.Group();

  public initialize(): void{

    const bg = new THREE.BoxGeometry( 1, 1, 1 );

    // 中詰土
    const line = new THREE.LineSegments(
      new THREE.EdgesGeometry(bg),
      new THREE.LineBasicMaterial( { color: 0xffffff } ) );
    const mh = new THREE.Mesh(
      bg,
      new THREE.MeshBasicMaterial( {
        color: 0xd2b48c,
        opacity: 0.9,
        transparent: true
      }));
    this.gound0.add(line);
    this.gound0.add(mh);
    this.scene.add( this.gound0 );

    // 堤内地盤
    const gmh = new THREE.MeshBasicMaterial( {color: 0xd9a927} );
    this.gound1 = new THREE.Mesh(
      bg,
      gmh
    );
    this.scene.add( this.gound1 );

    // 中詰地盤
    this.gound2 = new THREE.Mesh(
      bg,
      gmh
    );
    this.scene.add( this.gound2 );

    // 堤外地盤
    this.gound3 = new THREE.Mesh(
      bg,
      gmh
    );
    this.scene.add( this.gound3 );

    // 堤内水
    const wmh = new THREE.MeshBasicMaterial({
      color: 0x87e1f5,
      opacity: 0.5,
      transparent: true
    });
    this.water1 = new THREE.Mesh(
      bg,
      wmh
    );
    const div1 = document.createElement('div');
    div1.className = 'label';
    div1.textContent = '堤内側';
    div1.style.marginTop = '-1em';
    const text1 = new CSS2DObject(div1);
    text1.name = 'text1';
    this.water1.add(text1);
    this.scene.add( this.water1 );

    // 堤外水
    this.water3 = new THREE.Mesh(
      bg,
      wmh
    );
    const div3 = document.createElement('div');
    div3.className = 'label';
    div3.textContent = '堤外側';
    div3.style.marginTop = '-1em';
    const text3 = new CSS2DObject(div3);
    text3.name = 'text3';
    this.water3.add(text3);
    this.scene.add( this.water3 );

    // 堤内側 矢板
    const line1 = new THREE.LineSegments(
      new THREE.EdgesGeometry(bg),
      new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    const mh1 = new THREE.Mesh(
      bg,
      new THREE.MeshBasicMaterial( {color: 0xc2bebe} ));

    this.wall1.add(line1);
    this.wall1.add(mh1);
    this.scene.add( this.wall1 );

    // 堤外側 矢板
    const line3 = new THREE.LineSegments(
      new THREE.EdgesGeometry(bg),
      new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    const mh3 = new THREE.Mesh(
      bg,
      new THREE.MeshBasicMaterial( {color: 0xc2bebe} ));
    this.wall3.add(line3);
    this.wall3.add(mh3);
    this.scene.add( this.wall3 );

    // 堤内側 腹起し
    const line5 = new THREE.LineSegments(
      new THREE.EdgesGeometry(bg),
      new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    const mh5 = new THREE.Mesh(
      bg,
      new THREE.MeshBasicMaterial( {color: 0x800000,
        opacity: 0.5,
        transparent: true
      }));

    this.waling1.add(line5);
    this.waling1.add(mh5);
    this.scene.add( this.waling1 );

    // 堤外側 腹起し
    const line6 = new THREE.LineSegments(
      new THREE.EdgesGeometry(bg),
      new THREE.LineBasicMaterial( { color: 0x000000 } ) );
    const mh6 = new THREE.Mesh(
      bg,
      new THREE.MeshBasicMaterial( {color: 0x800000,
        opacity: 0.5,
        transparent: true
      }));

    this.waling2.add(line6);
    this.waling2.add(mh6);
    this.scene.add( this.waling2 );

    // 引張材
    const geometry = new THREE.CylinderGeometry( 0.001, 0.001, 1, 8 );
    const material = new THREE.MeshBasicMaterial( {color: 0x000000} );
    for(var i=0; i<37; i++)
      this.stud.add(new THREE.Mesh(geometry, material).rotateZ(Math.PI/2));
    this.scene.add( this.stud );

    this.changeData();
  }

  public changeData(): void {
    this.result.param005 = this.result.param003 -0.1;
    // 中詰土
    this.gound0.scale.set( this.result.param002, this.result.param001, this.result.param005 );
    this.gound0.position.set(0,0,this.result.param005/2);

    // 堤内地盤
    const h7 = this.result.param007+20;
    this.gound1.scale.set(10, this.result.param001, h7);
    this.gound1.position.set(-(this.result.param002/2+5), 0, this.result.param007-h7/2);

    // 中詰地盤
    this.gound2.scale.set(this.result.param002, this.result.param001, 20);
    this.gound2.position.set(0,0,-10)

    // 堤外地盤
    const h6 = this.result.param006+20;
    this.gound3.scale.set(10, this.result.param001, h6);
    this.gound3.position.set(this.result.param002/2+5, 0, this.result.param006-h6/2);

    // 堤内水
    const h402 = this.result.param402 - this.result.param007;
    this.water1.scale.set(this.gound1.scale.x, this.gound1.scale.y, h402);
    this.water1.position.set(this.gound1.position.x, this.gound1.position.y,
                            this.result.param007 + h402 / 2);

    // 堤外水
    const h401 = this.result.param401 - this.result.param006;
    this.water3.scale.set(this.gound3.scale.x, this.gound3.scale.y, h401);
    this.water3.position.set(this.gound3.position.x, this.gound3.position.y,
                            this.result.param006 + h401 / 2);

    // 堤内側 矢板
    const posX = this.gound0.scale.x / 2 + 0.1;
    const posZ = this.result.param005 + 0.1 - this.result.param004/2;
    this.wall1.scale.set(0.2, this.gound0.scale.y, this.result.param004);
    this.wall1.position.set(-posX, 0, posZ);

    // 堤外側 矢板
    this.wall3.scale.set(0.2, this.gound0.scale.y, this.result.param004);
    this.wall3.position.set(posX, 0, posZ);

    // 堤内側 腹起し
    this.waling1.scale.set(0.1, this.gound0.scale.y, 0.2);
    this.waling1.position.set(-posX-0.1, 0, this.result.param009);

    // 堤外側 腹起し
    this.waling2.scale.set(0.1, this.gound0.scale.y, 0.2);
    this.waling2.position.set(posX+0.1, 0, this.result.param009);

    // 引張材
    const count = Math.floor(this.result.param001 / this.result.param008);
    for(var i=0; i<count; i++){
      const target = this.stud.children[i];
      target.visible = true;
      const dia = this.result.param301;
      target.scale.set(dia, this.result.param002+0.6, dia);
      let posY = -this.result.param001 / 2;
      posY += i*this.result.param008;
      posY += this.result.param008/ 2;
      target.position.set(0, posY, this.result.param009);
    }
    for(var i=count; i<this.stud.children.length; i++){
      const target = this.stud.children[i];
      target.visible = false;
    }

    console.log('event');

    this.render();
  }

}
