import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState, } from "react";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Result from "../utils/sounds/resultSound.mp3";
import GoHome from "../utils/se/GoHome.mp3";
//import ButtonSE1 from "../utils/sounds/select09.mp3";
import useSound from "use-sound";

const ResultScreen = () => {
    const [playResult] = useSound(Result);
    // const [playButton1] = useSound(ButtonSE1);
    const [playGoHome] = useSound(GoHome);
    const { width, height } = useWindowSize()
    const navigate = useNavigate();
    const location = useLocation();
    const [selectId, ] = useState<{ min: number, sec: number }>(location.state as { min: number, sec: number })

    useEffect(()=>{
        playResult();
    });

    return(
        <div>
            <div style={styles.piece}>
                <Confetti
                    width={width}
                    height={height}
                    wind={0.01}
                    gravity={0.07}
                    />
            </div>
            <div style={styles.screen}>
                <img src={bgImage} alt="" style={styles.back_img}></img>
                <h1 style={styles.greeting}>おつかれさま！</h1>
                <div style={styles.rusultArea}>
                    <h2 style={styles.explain}>今回のきろく</h2>
                    <h2 style={styles.result}>{selectId.min}:{selectId.sec}</h2>
                </div>
                <div style={styles.buttonArea}>
                    <button onClick={() => {
                            console.log('button is pushed')
                            navigate('/')
                            playGoHome();
                            }} style={styles.backButton}><strong>トップへ</strong></button>
                </div>
            </div>
        </div>
    )
};
export default ResultScreen;

const styles: {[key: string] : React.CSSProperties} = {
    screen: {
        padding:0,
        paddingBottom:0,
    },
    piece:{
        position: "fixed",
        top: 0,
        width: '100%',
    },
    back_img: {
        position:'fixed',
        top: 0,
        width: '100%',
        minHeight:'100vh',
        maxHeight:'100%',
    },
    greeting: {
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 80,
        color: '#5D99FF',
        fontFamily: 'monospace',
    },
    rusultArea: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    explain: {
        marginBottom: 0,
        fontSize: 70,
        color: '#555555',
        fontFamily: 'monospace',
    },
    result: {
        textAlign: 'center',
        marginTop: 0,
        fontSize: 60,
        fontFamily: 'monospace',
        backgroundColor: 'white',
        color: 'green',
        padding: 30
    },
    buttonArea: {
        position: 'fixed',
        left: '50%',
        bottom: '10%',
        transform: 'translateX(-50%)',
    },
    backButton: {
        backgroundColor: '#BBBBBB',
        borderRadius: 10,
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
        fontFamily: 'monospace',
    },
}