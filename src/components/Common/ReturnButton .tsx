import React from "react";
import { useNavigate } from "react-router-dom";

interface Button {
    render: string,
    screen :string,
}

const ReturnButton = (props:Button) => {
    const navigate = useNavigate();
    return(
            <div style={styles.buttonArea}>
                {props.screen}画面
                <button onClick={() => {
                        console.log('button is pushed')
                        navigate(`${props.render}`)
                        }} style={styles.backButton}>
                    ←戻る
                </button>
            </div>
    );
};

const styles: {[key: string] : React.CSSProperties} = {
    buttonArea :{
        border:'solid',
        position:"absolute",
    },
    backButton:{
        borderRadius: 20,
        backgroundColor: "gray",
    }
}

export default ReturnButton;