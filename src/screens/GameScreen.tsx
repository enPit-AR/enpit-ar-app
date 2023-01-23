import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import useSound from "use-sound";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import Camera from "../components/GameScreen/Camera";
// import Timer from "../components/GameScreen/Timer";
import Prepare from "../components/GameScreen/Prepare";
import MakeQ from "../components/GameScreen/Question/MakeQ";
import Enemy from "../utils/images/enemy/sample_enemy.png";

import corSe from "../utils/sounds/corSe.mp3" //正解音（ピンポーン）
import corSe2 from "../utils/sounds/corSe2.mp3";//正解音２→ 任意の単語の最後の文字を答えた時に鳴る（ピンポンピンポーン）
import uncorSe from "../utils/sounds/uncorSe.mp3";//不正解音（ブッ）


let { vocabulary, questionOrder } = MakeQ(); // 問題と出題順番の生成

//****************************************************************************//
//GameScreen内で使用する独自フックを置く場所

// クリア判定
const UseIsclear = () => {
    const [isclear, setIsclear] = useState<boolean>(false);
    return { isclear: isclear, setIsclear: setIsclear }
};
// スタート判定
const UseIsStart = () => {
    const [isStart, setIsStart] = useState<boolean>(false);
    return { isStart: isStart, setIsStart: setIsStart }
};
const UseIsUncor = () => {
    const [isUncor, setIsUncor] = useState<boolean>(false);
    return { isUncor: isUncor, setIsUncor: setIsUncor }
};
// タイピングゲームに用いているテキスト, 位置付けは回答者の回答
const UseText = () => {
    const [text, setText] = useState<string>("");
    return { text: text, setText: setText }
};
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
    // -1
    const corDecrement = () => {
        setCorNmb((prevNmb) => prevNmb - 1);
    };
    // 初期値に戻す
    const resetCorNmb = () => {
        setCorNmb(0)
    }
    return { corNmb: corNmb, corIncrement: corIncrement, corDecrement: corDecrement, setCorNmb: setCorNmb, resetCorNmb: resetCorNmb }
};
//*********************************************************************************************//


const GameScreen = () => {
    const len = vocabulary.length;
    const [url, setUrl] = useState<string|null>(Enemy); //スクショを管理
    const [isCheckedPosition, setIsCheckedPosition] = useState<boolean>(true); //ゲーム画面に遷移時のカメラ位置確認に必要
    const [isScreenShot, setIsScreenShot] = useState<boolean>(false); //canvasの表示切り替えに必要
    const { nmb, increment, resetNmb } = UseNmb(len); // 解いた問題数
    const { text, setText } = UseText(); // タイピングゲームでテキストボックスに入力した内容
    const { isclear, setIsclear } = UseIsclear(); // ゲームをクリアしたかの判定、設定した問題数を解いたかどうか
    const { isStart, setIsStart } = UseIsStart(); // ゲームをスタートしたかどうか
    const { isUncor, setIsUncor } = UseIsUncor();
    const { corNmb, corIncrement, setCorNmb } = UseCorNmb(0);
    const { seconds, minutes, isRunning, start, pause, reset } =useStopwatch({ autoStart: false });

    const [playCorSe] = useSound(corSe); //1文字正解音
    const [playCorSe2] = useSound(corSe2); //任意の単語の最後の文字を答えた時に鳴る
    const [playUncorSe] = useSound(uncorSe); //不正解音


    //Canvsの用意と描画
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;        
    let imagePath = url;
    draw(canvas,imagePath);
    function draw(canvas:HTMLCanvasElement,imagePath:any){
        const image = new Image();
        image.addEventListener("load",function (){
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(image, 0, 0,);
        });
        image.src = imagePath;
    };

    //canvasの表示を戻してビデオに表示を戻す関数
    const changeScreenShotFlag = () => {
        setIsScreenShot(!isScreenShot);
        playCorSe();
    };

    //ゲームストップ画面に説明画面を表示
    const stopGame = () => {
        setIsCheckedPosition(true);
    };





    return(
        <>
            <div style={styles.mainScreen}>
            <img src={bgImage} alt="" style={styles.back_img}/>
                <div style={styles.leftScreen}>
                    <div style={styles.cameraArea}>
                    <Camera setUrl={setUrl} setIsScreenShot={setIsScreenShot}/>
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
                    {/* isCheckedがfalseになったらゲームのコンテンツが見えるようになる．isCheckedの初期値はtrue */}
                    <>{isCheckedPosition ?
                        <>
                            <Prepare setIsCheckedPosition={setIsCheckedPosition} />
                        </>
                        :
                        <>
                        {/* ここにゲームコンテンツの要素を入れていく */}
                        {/* Timerはコンテンツ終了後に遷移ボタンだけ押す　or もうこの画面で結果まで表示してしまう． */}
                            <div style={styles.gameContents}>
                                <button onClick={changeScreenShotFlag}>delete</button>
                                <div style={styles.enemyArea}>
                                    <img src={Enemy} alt="enemy" />
                                    <img src={url!} id='img' alt="Screenshot" style={styles.img}/>
                                </div>
                            
                                {/* <Timer /> */}
                                <button onClick={stopGame}>ストップ</button>
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
    cameraArea:{
        position:"relative",
        // border: 'solid',
        padding:0,
        margin:0,
        // display:"none",
    },
    canvas:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',
        // border:"solid",
        borderColor:"red",
        position: 'absolute',
        display:'flex',
        top: 15,
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
