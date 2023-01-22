import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { Link } from "react-router-dom";

const Timer = () => {
    const { seconds, minutes, isRunning, start, pause, reset } =useStopwatch({ autoStart: false });

    //ゲーム任意のタイミングでカウントを開始するストップウォッチ機能
    //返り値で止まった時刻の値を取りたい
    const stopWatch = () => {
        start();
        return 'ここに値が欲しい'
    }
    return(
        <>
            <div style={styles.timerArea}>
            <span>{minutes}</span>:<span>{seconds}</span>
                <button onClick={stopWatch}> start</button>
                <button onClick={pause}> pause</button>
            </div>

            {/* タイマーが止まると画面に結果を渡す */}
            {/* 条件分岐で現れる画面を出す */}
            <Link to={"/ResultScreen"} state={{ test: 'timerの値を取り出したい！' }}>
                結果を見る
            </Link>
        </>
    );
};

const styles: {[key: string] : React.CSSProperties} = {
    timerArea :{
        border: "solid",
        backgroundColor: 'gray',
        width: 'fit-content',
        height: 'fit-content',
        padding:10,
        margin:5,
    },
    demo:{
        display: "none",
    }
}


export default Timer;