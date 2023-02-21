import React, { useState,useCallback, useEffect, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import { useNavigate } from 'react-router-dom';
import useSound from "use-sound";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import finishImg from '../utils/images/pose/congladuration.gif'
import Webcam from "react-webcam";
import Calculation from "../components/GameScreen/JointCal";
import CorrectJudge from "../components/GameScreen/CorrectJudge";
import Prepare from "../components/GameScreen/Prepare";
import MakeQ from "../components/GameScreen/Question/MakeQ";

//お試し///
import cor1 from "../utils/se/cor1.mp3" ;
import cor2 from "../utils/se/cor2.mp3" ;
import cor3 from "../utils/se/cor3.mp3" ;
import cor4 from "../utils/se/cor4.mp3" ;
import cor5 from "../utils/se/cor5.mp3" ;
import unCor1 from "../utils/se/unCor1.mp3" ;
import unCor2 from "../utils/se/unCor2.mp3" ;
import unCor3 from "../utils/se/unCor3.mp3" ;
import unCor4 from "../utils/se/unCor4.mp3" ;
import countDown from "../utils/se/countDown.mp3" ;
import stop from "../utils/se/stop.mp3" ;
import start1 from "../utils/se/start.mp3" ;
//import result from "../utils/se/result.mp3" ;
// import finish from "../utils/se/finish.mp3" ;
import goResult from "../utils/se/GoResult.mp3" ;
import next from "../utils/se/nextQ.mp3";

import APPLE from "../utils/images/enemy/APPLE.png"; //敵画像の読み込み→ファイルから読み込むスタイルに変更
import BALL from "../utils/images/enemy/BALL.png";
import CAR from "../utils/images/enemy/CAR.png";
import A from "../utils/images/pose/A.png";
import B from "../utils/images/pose/B.png";
import C from "../utils/images/pose/C.png";
import R from "../utils/images/pose/R.png";
import L from "../utils/images/pose/L.png";
import E from "../utils/images/pose/E.png";
import P from "../utils/images/pose/P.png";


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
    const navigate = useNavigate();
    const [url, setUrl] = useState<string|null>(null); //スクショを管理
    const [isCheckedPosition, setIsCheckedPosition] = useState<boolean>(true); //ゲーム画面に遷移時のカメラ位置確認に必要
    const { seconds, minutes, start, pause,  } =useStopwatch({ autoStart: false }); //タイマーの管理
    const [isScreenShot, setIsScreenShot] = useState<boolean>(false); //canvasの表示切り替えに必要
    const [AnswerLetter, setAnswerLetter] = useState<string>(''); //判定された文字を受け取る

    const { nmb, increment} = UseNmb(vocabulary.length); // 解いた問題数
    //const [ text, setText ] = useState<string>(''); // タイピングゲームに用いているテキスト, 位置付けは回答者の回答
    const [ isclear, setIsclear ] = useState<boolean>(false); // ゲームをクリアしたかの判定、設定した問題数を解いたかどうか
    const [ isStart, setIsStart ] = useState<boolean>(false); // ゲームをスタートしたかどうか
    const { corNmb, corIncrement, setCorNmb } = UseCorNmb(0);
    const [delay, ] = useState<number>(1);
    const [ isAvailable, setIsAvailable ] = useState<boolean>(false); //次のイベントが使用できる状態か
    const [countdown, setCountdown] = useState<number>(3); //キャプチャまでのカウントダウン

    // const [playCorSe] = useSound(corSe); //1文字正解音
    // const [playCorSe2] = useSound(corSe2); //任意の単語の最後の文字を答えた時に鳴る
    // const [playUncorSe] = useSound(uncorSe); //不正解音
    // const [playButton2] = useSound(ButtonSE2);
    // const [playPAUSE] = useSound(Pause);

    //sample//
    const [playCor1] = useSound(cor1);
    const [playCor2] = useSound(cor2);
    const [playCor3] = useSound(cor3);
    const [playCor4] = useSound(cor4);
    const [playCor5] = useSound(cor5);
    const [playUnCor1] = useSound(unCor1);
    const [playUnCor2] = useSound(unCor2);
    const [playUnCor3] = useSound(unCor3);
    const [playUnCor4] = useSound(unCor4);
    const [playStop] = useSound(stop);
    const [playStart1] = useSound(start1);
    const [playCountDown] = useSound(countDown);
    // const [playResult] = useSound(result);
    // const [playFinish] = useSound(finish);
    const [playGoResult] = useSound(goResult);
    const [playNextQ] = useSound(next);
    //sample//

    //retrun random se 
    const playRandomCorSE = () => {
        const random_num:number = Math.random();
        if (random_num <= 1/5){
            return playCor1();
        } else if (random_num <= 2/5){
            return playCor2();
        } else if (random_num <= 3/5){
            return playCor3();
        } else if (random_num <= 4/5){
            return playCor4();
        } else {
            return playCor5();
        }
    };

    const playRandomUnCorSE = () => {
        const random_num:number = Math.random();
        if (random_num <= 1/4){
            return playUnCor1();
        } else if (random_num <= 2/4){
            return playUnCor2();
        } else if (random_num <= 3/4){
            return playUnCor3();
        } else {
            return playUnCor4();
        }
    };

    

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

    //画面静止用Canvsの用意と描画
    // const canvas = document.getElementById("canvas") as HTMLCanvasElement;        
    // let imagePath = url;
    // draw(canvas,imagePath);
    // function draw(canvas:HTMLCanvasElement,imagePath:string|null){
    //     const image = new Image();
    //     image.addEventListener("load", async ()=>{ 
    //         canvas.width = image.naturalWidth;
    //         canvas.height = image.naturalHeight;
    //         const ctx = canvas.getContext("2d")!;
    //         ctx.drawImage(image, 0, 0,);
    //     });
    //     image.src = imagePath!;
    // };

    useInterval(
        () => {
            setCountdown(prevState => prevState -1)
            if(countdown === 4){
                playCountDown()
                start() //タイマー再開
            }
            if (countdown === 3){
                changeScreenShotFlag();
            } else if (countdown === 0){
                setCountdown(6)
                captureCalc();
                judgeCamera();
                pause() //写真撮ると一時タイマーを止める
                // setIsAvailable(false);
            }
        },
        isAvailable ? delay * 1000 : null
    );

    //canvasの表示を戻してビデオに表示を戻す関数
    const changeScreenShotFlag = () => {
        setIsScreenShot(!isScreenShot);
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
        playStart1();
        setIsAvailable(true);
        start(); // timerStart
        setIsStart(true); // game開始
        setIsclear(false); //isclearをfalseにすることで初期化する
    };
    const gameStop = () => {
        pause();
        playStop();
        setIsAvailable(false);
        setIsCheckedPosition(true); //説明画面を出す
    };

    //不正解なら不正解の表示と音声
    //正解なら正解エフェクトを出して次の文字へ．
    const judgeCamera = () => {
        if (judgePose(vocabulary[questionOrder[nmb]].Words.slice(corNmb-1, corNmb))) {
            showCor();
            corIncrement();
            if (corNmb >= vocabulary[questionOrder[nmb]].Words.length) {
                increment();
                setCorNmb(1);
                playNextQ();
                if (nmb+1 === vocabulary.length) {
                    setIsclear(true);
                    setIsAvailable(false);
                    pause();
                }
            } else {
                playRandomCorSE();
            }
        } else {
            showUncor();
            playRandomUnCorSE();
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
    
    //答える単語に該当する敵画像を表示する
    var enemy = vocabulary[questionOrder[nmb]].Words; 
    const showEnemy = () => {
        if ('APPLE' === enemy){
            return APPLE
        }else if('BALL' === enemy){
            return BALL
        }else if('CAR' === enemy){
            return CAR
        }
    };
    var Enemy = showEnemy();


    //答える単語の文字に該当している画像をキャンバスに重ねる
    var currentLetter = vocabulary[questionOrder[nmb]].Words.slice(corNmb-1, corNmb);
    const letterImage  = () => {
        if ('A' === currentLetter){
            return A
        }else if('B' === currentLetter){
            return B
        }else if('C' === currentLetter){
            return C
        }else if('E' === currentLetter){
            return E
        }else if('L' === currentLetter){
            return L
        }else if('P' === currentLetter){
            return P
        }else{
            return R
        };
    };
    var LetterPose:string = letterImage();

    // ポーズアシスト用のキャンバス
    const canvas = document.getElementById("pose") as HTMLCanvasElement;        
    let imagePath = LetterPose;
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


    return(
        <>
            <div style={styles.mainScreen}>
            <img src={bgImage} alt="" style={styles.back_img}/>
                <div style={styles.leftScreen}>
                    {/* 撮影までの秒数 */}
                    {isStart&&
                    <div style={styles.absoluteArea}>

                        {!isclear ? 
                        <>
                            {countdown <= 3 &&
                                <h2 style={styles.count3}>{countdown}</h2>
                            }
                            <h1 style={styles.word}>{vocabulary[questionOrder[nmb]].Words.slice(corNmb-1, corNmb)}</h1>
                        </>
                        :
                        <></>
                        }
                    </div>
                    }
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
                    {isStart  && 
                        <>
                            { !isclear &&
                                <canvas id="pose" style={styles.pose}></canvas>
                            }
                        </>
                    }
                    {isScreenShot ?
                        <>
                            {/* <canvas id="pose" style={styles.pose}></canvas> */}
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
                        <div style={styles.prepareArea}>
                            <Prepare setIsCheckedPosition={setIsCheckedPosition} />
                        </div>
                        :
                        <>
                        {/* ここにゲームコンテンツの要素を入れていく */}
                            <div style={styles.gameContents}>
                                <>
                                    {isclear ? 
                                        <>
                                        <img src={finishImg} alt="finish" style={styles.gif}/>
                                        <h3 style={styles.clearString}>
                                            クリア!
                                        </h3>
                                        <div style={styles.resultArea}>
                                            <button onClick={() => {
                                                playGoResult();
                                                console.log('button is pushed')
                                                navigate('/ResultScreen')
                                                navigate("/ResultScreen",{ state: {min: ('00' + minutes).slice(-2), sec: ('00' + seconds).slice(-2)}})
                                                }} style={styles.resultButton}><ruby>結果<rt>けっか</rt></ruby>へ</button>
                                        </div>
                                        </>
                                    :
                                    isStart ?
                                        <>
                                            <h1 style={styles.wordString}>
                                                <span style={styles.CorStyle}>{vocabulary[questionOrder[nmb]].Words.slice(0, corNmb-1)}</span>{vocabulary[questionOrder[nmb]].Words.slice(corNmb-1)}
                                            </h1>
                                            <h2 style={styles.countUp}>{('00' + minutes).slice(-2)}:{('00' + seconds).slice(-2)}</h2>
                                            <div style={styles.enemyArea} >
                                                <img src={Enemy} alt="enemy" style={styles.enemy}/>
                                                <img src={url!} id='img' alt="Screenshot" style={styles.img} />
                                            </div>
                                            <div style={styles.judge}>
                                                <p id="cor" style={styles.correct}>
                                                    {"○"}
                                                </p>
                                                <p id="uncor" style={styles.uncorrect}>
                                                    {"×"}
                                                </p>
                                            </div>
                                        </>
                                        : 
                                        <></>
                                    }
                                </>
                                {!isclear ? 
                                  <>
                                      {!isAvailable ? (
                                          <button onClick={gameStart} style={styles.startButton}>スタート</button>
                                          ) : (
                                          <button onClick={gameStop} style={styles.start_stop}>ストップ</button>
                                      )}
                                  </>
                                   :
                                   <></>
                                   }
                            </div>
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
        // border:'solid',
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
        // border: "solid",
        display: 'flex',
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight:'100%',
    },
    absoluteArea: {
        position: 'relative',
        zIndex: 20
    },
    prepareArea: {
        position: 'relative',
        zIndex: 30
    },
    count3: {
        //display: 'inline-block',
        margin: 0,
        position: 'fixed',
        top: '0%',
        left: '50%',
        transform: 'translateX(-100%)',
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        // border: 'solid',
        fontSize: 40,
        fontFamily: 'monospace',
    },
    word: {
        margin: 0,
        position: 'fixed',
        top: '0%',
        left: '25%',
        transform: 'translateX(-50%)',
        fontSize: 60,
        fontFamily: 'monospace',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 20,
        paddingLeft: 20,
        color: 'red',
        border: 'solid black',
    },
    cameraArea:{
        position:"relative",
        // border: 'solid',
        padding:0,
        margin:0,
        zIndex: 10
        // display:"none",
    },
    camera:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',
    },
    pose:{
        margin:0,
        paddingLeft:0,
        // border:"solid",
        borderColor:"red",
        position: 'absolute',
        display:'flex',
        top: 0,
        right: 0,
        width:'100%',
        height:'100%',
        opacity:'60%',
        
        // backgroundColor:'red',
        // display: 'none',
    },
    canvas:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',
        // border:"solid",
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
        // border:'solid',
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
        position:"relative",
        width:'80vh',
        height:'60vh',
        // border:"solid",
        margin: 5,
        padding:10,
        backgroundColor:'gray',
        marginTop: 100,
    },
    enemy:{
        position:"absolute",
        top: '0%',
        left:0,
        width:'100%',
        height:'100%',
    },
    gameContents:{
        alignContent:"center",
        // position:"relative",
    },
    wordString:{
        position: 'fixed',
        top: '0%',
        left: '75%',
        transform: 'translateX(-50%)',
        fontSize:80,
        fontFamily: 'monospace',
    },
    countUp: {
        margin: 0,
        position: 'fixed',
        top: '0%',
        left: '100%',
        fontSize:40,
        fontFamily: 'monospace',
        transform: 'translateX(-100%)',
        padding: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        border: 'solid',
    },
    CorStyle:{
        color: "red",
        margin:0,
        padding:0,
        fontSize:80,
    },
    judge: {
        margin: 0,
        position: 'fixed',
        left: '25%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 30
    },
    correct: {
        display: "none",
        fontSize: 500,
        color: 'red'
    },
    uncorrect: {
        display: "none",
        fontSize: 500,
        color: 'blue',
    },
    // startButton: {
    //     backgroundColor: 'gray',
    //     color: 'white',
    //     borderRadius: 10,
    //     border: 'solid black',
    //     fontSize: 30,
    //     paddingRight: 30,
    //     paddingLeft: 30,
    //     cursor: 'pointer',
    //     width: 'fit-content',
    //     height: "fit-content",
    //     position: 'fixed',
    //     left: '75%',
    //     transform: 'translateX(-50%)',
    //     bottom: '10%'
    // },
    stopButton: {
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: 10,
        border: 'solid black',
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
        position: 'fixed',
        right: '3%',
        bottom: '10%'
    },
    clearString: {
        // position: 'fixed',
        bottom: '5%',
        right: '65%',
        transform: 'translateX(-50%)',
        fontSize:80,
        color: 'green',
        fontFamily: 'monospace',
        zIndex:20
    },
    resultArea: {
        position: 'fixed',
        bottom: '2%',
        right: '2%'
    },
    resultButton: {
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 10,
        border: 'solid white',
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
        fontFamily: 'monospace',
    },
    gif:{
        position:"absolute",
        top:20,
        zIndex:10,
        },
    start_stop: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        border: 'solid black',
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
    },
    startButton:{
        position:"absolute",
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        border: 'solid black',
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
        bottom:'10%',
        right:'35%'
    },
}

export default GameScreen;
