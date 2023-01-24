import React, { useState,useCallback, useEffect, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import useSound from "use-sound";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import Camera from "../components/GameScreen/Camera";
import Webcam from "react-webcam";
import Calculation from "../components/GameScreen/JointCal";
import CorrectJudge from "../components/GameScreen/CorrectJudge";
import Prepare from "../components/GameScreen/Prepare";
import MakeQ from "../components/GameScreen/Question/MakeQ";
import Timer from "../components/GameScreen/Timer";

import corSe from "../utils/sounds/corSe.mp3" //正解音（ピンポーン）
import corSe2 from "../utils/sounds/corSe2.mp3";//正解音２→ 任意の単語の最後の文字を答えた時に鳴る（ピンポンピンポーン）
import uncorSe from "../utils/sounds/uncorSe.mp3";//不正解音（ブッ）

import Enemy from "../utils/images/enemy/sample_enemy.png"; //敵画像の読み込み→ファイルから読み込むスタイルに変更


let { vocabulary, questionOrder } = MakeQ(); // 問題と出題順番の生成

//****************************************************************************//
//GameScreen内で使用する独自フックを置く場所

// 現在解いている問題数, -1になったり問題数より大きい数字にはならない
const UseNmb = (len: number) => {
    const [nmb, setNmb] = useState<number>(0);
    // +1
    const increment = () => {
        if (nmb >= len-1) {
        }
        else {
            setNmb((prevNmb) => prevNmb + 1);
        }
    };
    // -1
    const decrement = () => {
        if (nmb <= 0) {
        }
        else {
            setNmb((prevNmb) => prevNmb - 1);
        }
    };
    // 初期値に戻す
    const resetNmb = () => {
        setNmb(0)
    }
    return { nmb: nmb, increment: increment, decrement: decrement, resetNmb: resetNmb }
};
const UseCorNmb = (len: number) => {
    // 初期値は0
    const [corNmb, setCorNmb] = useState<number>(1);
    // +1
    const corIncrement = () => {
        setCorNmb((prevNmb) => prevNmb + 1);
    };
    return { corNmb: corNmb, corIncrement: corIncrement, setCorNmb: setCorNmb}
};


const useInterval = (callback: Function, delay?: number | null) => {
  const savedCallback = useRef<Function>(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [delay]);
};
//*********************************************************************************************//


const GameScreen = () => {
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string|null>(null); //スクショを管理
    const [isCheckedPosition, setIsCheckedPosition] = useState<boolean>(true); //ゲーム画面に遷移時のカメラ位置確認に必要
    const { seconds, minutes, isRunning, start, pause, reset } =useStopwatch({ autoStart: false }); //タイマーの管理
    const [isScreenShot, setIsScreenShot] = useState<boolean>(false); //canvasの表示切り替えに必要
    const [AnswerLetter, setAnswerLetter] = useState<string>(''); //判定された文字を受け取る

    const { nmb, increment, resetNmb } = UseNmb(vocabulary.length); // 解いた問題数
    const [ text, setText ] = useState<string>(''); // タイピングゲームに用いているテキスト, 位置付けは回答者の回答
    const [ isclear, setIsclear ] = useState<boolean>(false); // ゲームをクリアしたかの判定、設定した問題数を解いたかどうか
    const [ isStart, setIsStart ] = useState<boolean>(false); // ゲームをスタートしたかどうか
    const { corNmb, corIncrement, setCorNmb } = UseCorNmb(0);
    const [delay, setDelay] = useState<number>(1);
    const [ isAvailable, setIsAvailable ] = useState<boolean>(false); //次のイベントが使用できる状態か
    const [countdown, setCountdown] = useState<number>(3); //キャプチャまでのカウントダウン

    const [playCorSe] = useSound(corSe); //1文字正解音
    const [playCorSe2] = useSound(corSe2); //任意の単語の最後の文字を答えた時に鳴る
    const [playUncorSe] = useSound(uncorSe); //不正解音

    //camera 
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
    },[webcamRef]);

    //撮影して計算. 撮影時にcanvasの用意をして画像止める．AnswerLetterを表示
    const captureCalc =async () => {
        setIsScreenShot(true);
        console.log('done')
        capture();
        var cosinResult=Calculation();
        var AnswerLetter = CorrectJudge(await cosinResult);
        setAnswerLetter(AnswerLetter);
    }

    //Canvsの用意と描画
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;        
    let imagePath = url;
    draw(canvas,imagePath);
    function draw(canvas:HTMLCanvasElement,imagePath:string|null){
        const image = new Image();
        image.addEventListener("load", async ()=>{
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(image, 0, 0,);
        });
        image.src = imagePath!;
    };

    useInterval(
        () => {
            setCountdown(prevState => prevState -1)
            if (countdown === 3){
                changeScreenShotFlag();
            } else if (countdown === 0){
                setCountdown(3)
                captureCalc();
                judgeCamera();
                // setIsAvailable(false);
            }
        },
        isAvailable ? delay * 1000 : null
    );

    //canvasの表示を戻してビデオに表示を戻す関数
    const changeScreenShotFlag = () => {
        setIsScreenShot(!isScreenShot);
    };

    //ゲームストップ画面に説明画面を表示
    const stopGame = () => {
        setIsCheckedPosition(true); //説明画面を出す
        pause(); //ゲーム止める時に時間も停止する
    };

          //1か0でかえす関数,引数は現在答えている文字
    const judgePose = (currentLetter: string) => {
        if (AnswerLetter === currentLetter) {
            return true
        } else {
            return false
        }
    }

    const gameStart =() =>{
        setIsAvailable(true);
        start(); // timerStart
        setIsStart(true); // game開始
        setIsclear(false); //isclearをfalseにすることで初期化する
    }

    //不正解なら不正解の表示と音声
    //正解なら正解エフェクトを出して次の文字へ．
    const judgeCamera = () => {
        if (judgePose(vocabulary[questionOrder[nmb]].Words.slice(corNmb-1, corNmb))) {
            showCor();
            corIncrement();
            setIsAvailable(false);
            if (corNmb >= vocabulary[questionOrder[nmb]].Words.length) {
                increment();
                setCorNmb(1);
                playCorSe2();
                if (nmb+1 === vocabulary.length) {
                    setIsclear(true);
                    pause();
                }
            } else {
                playCorSe();
            }
        } else {
            showUncor();
            playUncorSe();
        }
    };

    //成否判定に応じた表示の機能
    // show when user acts correct answer and correct-effect appear in 1s 
    const showCor = () => {
        document.getElementById("cor")!.style.display = "inline";
        setTimeout(closeShow, 1000);
    };
    // show when user acts uncorrect answer and uncorrect-effect disappear in 1s 
    const showUncor = () => {
        document.getElementById("uncor")!.style.display = "inline";
        setTimeout(closeShow, 1000);
    };

    const closeShow = () => {
        document.getElementById("cor")!.style.display = "none";
        document.getElementById("uncor")!.style.display = "none";
    }
    





    return(
        <>
            <div style={styles.mainScreen}>
            <img src={bgImage} alt="" style={styles.back_img}/>
                <div style={styles.leftScreen}>
                    {/* 撮影までの秒数 */}
                    {countdown} <br />
                    {vocabulary[questionOrder[nmb]].Words.slice(corNmb-1, corNmb)}
                    <div style={styles.cameraArea}>
                    <Webcam
                                audio={false}
                                width={'100%'}
                                height={'100%'}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                width: 720,
                                height: 720,
                                // height: 360,
                                facingMode: "user"
                                }}
                                style={styles.camera}
                            />
                    {isScreenShot ?
                        <>
                            <canvas id="canvas" style={styles.canvas}></canvas>
                        </>
                        :
                        <></>
                    }
                    </div>
                </div>
                <div style={styles.rightScreen}>
                    {/* isCheckedPositionがfalseになったらゲームのコンテンツが見えるようになる．isCheckedPositionの初期値はtrue */}
                    <>{isCheckedPosition ?
                        <>
                            <Prepare setIsCheckedPosition={setIsCheckedPosition} />
                        </>
                        :
                        <>
                        {/* ここにゲームコンテンツの要素を入れていく */}
                        {/* Timerはコンテンツ終了後に遷移ボタンだけ押す */}
                            <div style={styles.gameContents}>

                                {/* gamestart */}
                                <button onClick={gameStart}>start</button>

                                {/* canvas delete */}
                                <button onClick={changeScreenShotFlag}>delete</button>

                                <div style={styles.enemyArea}>
                                    <img src={Enemy} alt="enemy" />
                                    <img src={url!} id='img' alt="Screenshot" style={styles.img} />
                                </div>
                                
                                <>
                                    {isclear ? 
                                        <>
                                                CLEAR!
                                            <>
                                                cleartime: {('00' + minutes).slice(-2)}:{('00' + seconds).slice(-2)}
                                            </>
                                        </>
                                    
                                    :
                                    isStart ?
                                        <div style={styles.string}>
                                            <p>
                                                <span style={styles.CorStyle}>{vocabulary[questionOrder[nmb]].Words.slice(0, corNmb-1)}</span>{vocabulary[questionOrder[nmb]].Words.slice(corNmb-1)}
                                            </p>
                                            <div style={styles.string}>
                                                <p id="cor" style={{display: "none"}}>
                                                    {"⭕️"}
                                                </p>
                                                <p id="uncor" style={{display: "none"}}>
                                                    {"❌"}
                                                </p>
                                            </div>
                                            
                                        </div>

                                        : 
                                        <></>
                                    }
                                </>
                                <button onClick={stopGame}>ストップ</button>

                            </div>
                            <p>your answer is </p>
                            {AnswerLetter}
                        </>
                        }
                    </>
                </div>
            </div>
        </>
    )
};

const styles: {[key: string] : React.CSSProperties} = {
    mainScreen:{
        border:'solid',
        display: "flex", 
        margin:0,
        padding:0, 
        minHeight:'100vh',
    },
    back_img: {
        width: '100%',
        minHeight:'100vh',
        maxHeight:'100%',
        position:"absolute",
    },
    leftScreen:{
        flex: 1,
        margin:0,
        padding:0, 
        position: 'relative',
        border: "solid",
        display: 'flex',
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight:'100%',
    },
    cameraArea:{
        position:"relative",
        border: 'solid',
        padding:0,
        margin:0,
        // display:"none",
    },
    camera:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',
    },
    canvas:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',
        border:"solid",
        borderColor:"red",
        position: 'absolute',
        display:'flex',
        top: 0,
        right: 0,
        width:'100%',
        height:'fit-content',
        //backgroundColor:'red',
        // display: 'none',
    },
    img:{
        display:"none",
    },

    rightScreen:{
        border:'solid',
        position:"relative",
        flex: 1,
        margin:0,
        padding:0, 
        display:"flex",
        minHeight:'100%',
        alignItems: "center",
        justifyContent: "center",
    },
    enemyArea:{
        // position:"absolute",
        border:"solid",
        margin: 5,
        padding:10,
        backgroundColor:'gray',
    },
    gameContents:{
        alignContent:"center"
    },
}

export default GameScreen;
