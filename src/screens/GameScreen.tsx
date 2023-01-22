import React, { useState } from "react";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import Camera from "../components/GameScreen/Camera";
import Timer from "../components/GameScreen/Timer";
import Prepare from "../components/GameScreen/Prepare";
import Enemy from "../utils/images/enemy/sample_enemy.png";

const GameScreen = () => {
    const [url, setUrl] = useState<string|null>(null); //スクショを管理
    const [isCheckedPosition, setIsCheckedPosition] = useState<boolean>(true); //ゲーム画面に遷移時のカメラ位置確認に必要
    const [isScreenShot, setIsScreenShot] = useState<boolean>(false); //canvasの表示切り替えに必要

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
    }


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
                            <Prepare setIsCheckedPosition={setIsCheckedPosition}/>
                        </>
                        :
                        <>
                        {/* ここにゲームコンテンツの要素を入れていく */}
                        {/* Timerはコンテンツ終了後に遷移ボタンだけ押す　or もうこの画面で結果まで表示してしまう． */}
                            <div style={styles.gameContents}>
                                <button onClick={changeScreenShotFlag}>delete</button>
                                <div style={styles.enemyArea}>
                                    <img src={Enemy} alt="enemy" />
                                </div>
                            
                                <Timer />
                                {/* <button onClick={changeScreenShotFlag}>delete</button> */}
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
