import * as poseDetection from "@tensorflow-models/pose-detection";
// import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';


const LEFT_SHOULDER = 5;
const RIGHT_SHOULDER = 6;
const LEFT_ELBOW = 7;
const RIGHT_ELBOW = 8;
const LEFT_WRIST = 9;
const RIGHT_WRIST = 10;
const LEFT_HIP = 11;
const RIGHT_HIP = 12;
const LEFT_KNEE = 13;
const RIGHT_KNEE = 14;
const LEFT_ANKLE = 15;
const RIGHT_ANKLE = 16;




async function JointCal(): Promise<poseDetection.Keypoint[]> {
    const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
    const image = document.getElementById("img") as HTMLImageElement;
    const poses = await detector.estimatePoses(image);
    //値の取得
    const jointResult = poses[0].keypoints;
    // console.log(jointResult);
    return jointResult;

};

//3点からなる2つのベクトルの間のcosθを計算する
//3つの点を引数に指定し、端の点の要素-間の点の要素の演算でベクトルを2つ生成、
//(各ベクトルの0番目の要素がx、1番目の要素がyの値)
//その内積を求めて
//ノルム(ベクトルの長さ)で割ることでcosを求めている
function InnerProductCal(Joint1:any,CenterList:any,Joint2:any){
    const vector1:number[] = [Joint1["x"]-CenterList["x"],Joint1["y"]-CenterList["y"]];
    const vector2:number[] = [Joint2["x"]-CenterList["x"],Joint2["y"]-CenterList["y"]];
    const innerProduct:number = vector1[0]*vector2[0] + vector1[1]*vector2[1];
    const nolm1:number = (vector1[0]*vector1[0] + vector1[1]*vector1[1])**0.5;
    const nolm2:number = (vector2[0]*vector2[0] + vector2[1]*vector2[1])**0.5;
    const cosin:number = innerProduct/(nolm1*nolm2);
    return cosin;
  }

/**
 * 各関節のcosinのベクトル
 * 正解ポーズ分同じようなベクトルを正解情報として作成して、
 * カメラで撮ってきた写真の関節のcosinベクトルとのユークリウッド距離でどの文字を回答してるか判断。
 * そのあと今答えるべき文字のポーズかチェックして当たってるなら正解、違うなら不正解とする。
 */
function Score(jointResult:poseDetection.Keypoint[]) {
  /***
  * movenetの出力する関節点の数は17種類
  * 鼻、目(左右)、耳(左右)、肩(左右)、ひじ(左右)、
  * 手首(左右)、腰(左右)、膝(左右)、足首(左右)の17個
  * 
  * 出力画面を見た時の線分の様子
  * 
  * 
  *     　　　　　　左耳3　左目1　鼻0　右目2　右耳4
  * 
  * 左手首9 --- 左肘7 --- 左肩5 --- 右肩6 --- 右肘8 --- 右手首10
  * 　　　　　　　　　　　 |        |
  *                    |         |
  *                  左腰11　---　右腰12
  * 　　　　　　　　　　　|          |
  *                   |           |
  *                左膝13　　　　　　右膝14
  *                   |             |
  *               左足首15　　　　　　右足首16
  * 
  * 2線間の角度を出すため、調べる角度は14個
  */
  const resulScore: number[] =[
    InnerProductCal(jointResult[LEFT_WRIST],jointResult[LEFT_ELBOW],jointResult[LEFT_SHOULDER]),//左手首、左肘、左肩
    InnerProductCal(jointResult[RIGHT_WRIST],jointResult[RIGHT_ELBOW],jointResult[RIGHT_SHOULDER]),//右手首、右肘、右肩
    InnerProductCal(jointResult[LEFT_ELBOW],jointResult[LEFT_SHOULDER],jointResult[RIGHT_SHOULDER]),//左肘、左肩、右肩
    InnerProductCal(jointResult[RIGHT_ELBOW],jointResult[RIGHT_SHOULDER],jointResult[LEFT_SHOULDER]),//右肘、右肩、左肩
    InnerProductCal(jointResult[LEFT_ELBOW],jointResult[LEFT_SHOULDER],jointResult[LEFT_HIP]),//左肘、左肩、左腰
    InnerProductCal(jointResult[RIGHT_ELBOW],jointResult[RIGHT_SHOULDER],jointResult[RIGHT_HIP]),//右肘、右肩、右腰
    InnerProductCal(jointResult[LEFT_SHOULDER],jointResult[LEFT_HIP],jointResult[RIGHT_HIP]),//左肩、左腰、右腰
    InnerProductCal(jointResult[RIGHT_SHOULDER],jointResult[RIGHT_HIP],jointResult[LEFT_HIP]),//右肩、右腰、左腰
    InnerProductCal(jointResult[LEFT_SHOULDER],jointResult[LEFT_HIP],jointResult[LEFT_KNEE]),//左肩、左腰、左膝
    InnerProductCal(jointResult[RIGHT_SHOULDER],jointResult[RIGHT_HIP],jointResult[RIGHT_KNEE]),//右肩、右腰、右膝
    InnerProductCal(jointResult[RIGHT_HIP],jointResult[LEFT_HIP],jointResult[LEFT_KNEE]),//右腰、左腰、左膝
    InnerProductCal(jointResult[LEFT_HIP],jointResult[RIGHT_HIP],jointResult[RIGHT_KNEE]),//左腰、右腰、右膝
    InnerProductCal(jointResult[LEFT_HIP],jointResult[LEFT_KNEE],jointResult[LEFT_ANKLE]),//左腰、左膝、左足首
    InnerProductCal(jointResult[RIGHT_HIP],jointResult[RIGHT_KNEE],jointResult[RIGHT_ANKLE]),//右腰、右膝、右足首
  ];
//   console.log(resulScore);
  return resulScore;
};

async function Calculation() {
  const jointResult = JointCal();
  const cosinScore = Score(await jointResult);
  return cosinScore;
};


export default Calculation;