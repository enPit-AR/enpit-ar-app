import { useNavigate } from "react-router-dom";
import '../styles/BackgroundColor.css';
import useSound from "use-sound";
import bgImage from '../utils/images/common/StartScreenBack.gif';
// import ButtonSE1 from "../utils/sounds/button1.mp3";
// import ButtonSE2 from "../utils/sounds/button2.mp3";
import start1 from "../utils/se/start.mp3" ;
import opening from "../utils/se/opening.mp3" ;

const StartScreen = () => {
    // const [playButton1] = useSound(ButtonSE1);
    // const [playButton2] = useSound(ButtonSE2);
    const [playStart1] = useSound(start1);
    const [playOpening] = useSound(opening);
    const navigate = useNavigate();
    return (
        <>
            <div style={styles.screen}>
                <img src={bgImage} alt="" style={styles.back_img}></img>
                <div style={styles.titleArea}>
                    <h2 style={styles.sub_title}>たのしく　えいごを　まなぼう！</h2>
                    <div style={styles.title_back}>
                        <h1 style={styles.title}>ENjoいずむ</h1> 
                    </div>   
                </div>
                <div style={styles.startArea}>
                    <button onClick={() => {
                        playStart1();
                        //playButton1();
                        console.log('button is pushed')
                        navigate('/GameScreen')
                        }} style={styles.start_button}><strong>スタート</strong></button>
                </div>
                <div style={styles.explainArea}>
                    <button onClick={() => {
                        playOpening();
                        console.log('button is pushed')
                        navigate('/ExplainScreen')
                        // 遊び方説明
                        }} style={styles.explainButton}>あそびかた</button>
                </div>
                {/* あとで消すからこいつは適当に．結果画面を見るためだけのデモ用*/}
                {/* <ReturnButton render={'/ResultScreen'} screen={'結果'}/> */}
            </div>
        </>
    );
  };

export default StartScreen;

const styles: {[key: string] : React.CSSProperties} = {
    screen: {
        position:'relative',
        padding:0,
        paddingBottom:0,
    },
    back_img: {
        width: '100%',
        minHeight:'100vh',
        maxHeight:'100%',
    },
    titleArea: {
        position:'absolute',
        top:'15%',
        minWidth:'100%',
        // border:'solid'
    },
    sub_title: {
        position:'relative',
        color: '#5D99FF',
        fontFamily: 'monospace',
        fontSize: 50,
        textAlign:'center',
        padding:0,
        margin:0,
        // border:'solid',
        // borderColor:'red',
    },
    title_back: {
        position:'relative',
        backgroundColor: '#5D99FF',
        width: '100%',
        //height: "fit-content",
    },
    title: {
        backgroundColor: '#5D99FF',
        color: 'white',
        fontFamily: 'monospace',
        textAlign:"center",
        fontSize: 100,

    },
    startArea: {
        // border:'solid',
        position: 'fixed',
        left: '50%',
        bottom:'25%',
        transform: 'translateX(-50%)',
        minWidth:300,
        textAlign:"center",
    },
    start_button: {
        backgroundColor: '#BBBBBB',
        borderRadius: 10,
        textAlign:"center",
        fontSize: 70,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
    },
    explainArea: {
        position: 'fixed',
        left: '50%',
        bottom:'10%',
        transform: 'translateX(-50%)',
        minWidth:300,
        textAlign:"center",
    },
    explainButton: {
        backgroundColor: '#DDDDDD',
        color: '#333333',
        borderRadius: 10,
        textAlign:"center",
        fontSize: 30,
        paddingRight: 30,
        paddingLeft: 30,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
        fontFamily: 'monospace'
    }
};