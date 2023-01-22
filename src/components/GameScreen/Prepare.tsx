// import React, { useState } from "react";

const Prepare = (props:any) => {

    //ぺージ遷移時には画面の右側には案内と開始ボタンが存在．開始ボタンを押すと問題などの画面が見えるようになる．
    // const [isChecked, setIsChecked] = useState<boolean>(true);

    const startGame = () => {
        props.setIsCheckedPosition(false);
    };
    return(

        // ここのタグとか文字をいじって見やすく分かりやすくする
        <div style={styles.screen}>
            <p style={styles.string}>左の画面のカメラに全身が映る位置を確認してね</p>
            <button onClick={startGame}>start</button>
        </div>
    );
};

const styles: {[key: string] : React.CSSProperties} = {
    screen:{
        margin:0,
        paddingLeft:0,
        backgroundColor: "black",
        width: '100%',
        minHeight: "100%",
        position:'absolute',
        top:0,
        left:0,
        opacity: '50%',
    },
    string:{
        color: 'white',
    },
};

export default Prepare;