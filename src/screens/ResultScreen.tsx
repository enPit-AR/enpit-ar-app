import React from "react";
import bgImage from '../utils/images/StartScreenBack.gif';
import ReturnButton from "../components/Common/ReturnButton ";
import { useLocation } from "react-router-dom";

interface resultTime {
    test: string,
}

const ResultScreen = () => {
    const location = useLocation();
    const {test} =  location.state as resultTime;
    return(
        <div style={styles.screen}>
            <img src={bgImage} alt="" style={styles.back_img}></img>
            <ReturnButton screen={'結果'} render={'/'} />
            <div style={styles.resultArea}>
                {test}
            </div>
        </div>
    )
};

const styles: {[key: string] : React.CSSProperties} = {
    screen: {
        position:'relative',
        padding:0,
        paddingBottom:0,
        width: '100%',
        height: '100vh',
        minHeight: '100%'
    },
    back_img: {
        position: "absolute",
        width: '100%',
        minHeight:'100vh',
        maxHeight:'100%',
    },
    resultArea:{
        position: "absolute",
        top: '50%',
        left: '50%',
        border: 'solid',
        backgroundColor: "white",
        // textAlign: "center",
        // alignContent: "center",
    }
}

export default ResultScreen;
