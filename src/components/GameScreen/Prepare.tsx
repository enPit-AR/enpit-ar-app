import useSound from "use-sound";
// import ButtonSE1 from "../../utils/sounds/select09.mp3";
import ready from "../../utils/se/ready.mp3";

const Prepare = (props:any) => {

    //ぺージ遷移時には画面の右側には案内と開始ボタンが存在．開始ボタンを押すと問題などの画面が見えるようになる．
    // const [isChecked, setIsChecked] = useState<boolean>(true);

    // const [playButton1] = useSound(ButtonSE1);
    const [playReady] = useSound(ready);
    const startGame = () => {
        playReady();
        props.setIsCheckedPosition(false);
    };

    const textExplain2 = `こたえる えいたんご がでるばしょ`;
    const textExplain3 = `でてくるキャラクターをたおそう！`;
    const textExplain4 = `てをあげて、からだぜんたいが\nうつるようにしよう\n(ここでポーズをとるよ！)`;
    const textExplain5 = `ここのボタンをおすと\nゲームスタート！`;
    const textCheck = 'かくにんができたら\nここの「OK！」ボタンをおしてね！';
    return(

        // ここのタグとか文字をいじって見やすく分かりやすくする
        <div style={styles.screen}>
            <div style={styles.leftArea}>
                <>
                    <div style={styles.contentsArea}>
                        <div style={styles.content}>
                            <p style={styles.explain1}>ポーズをとる もじ のばしょ</p>
                        </div>
                        <div style={styles.content}>
                            <p style={styles.explain4}>{textExplain4}</p>
                        </div>
                        <div style={styles.button}>
                            <p style={styles.check}>{textCheck}</p>
                            <button onClick={startGame} style={styles.okButton}>OK！</button>
                        </div>
                    </div>
                </>
            </div>
            <div style={styles.rightArea}>
                <>
                    <div style={styles.contentsArea}>
                        <div style={styles.content}>
                            <p style={styles.explain2}>{textExplain2}</p>
                        </div>
                        <div style={styles.content}>
                            <p style={styles.explain3}>{textExplain3}</p>
                        </div>
                        <div style={styles.content}>
                            <p style={styles.explain5}>{textExplain5}</p>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

const styles: {[key: string] : React.CSSProperties} = {
    screen:{
        display: 'flex',
        margin:0,
        paddingLeft:0,
        backgroundColor: "black",
        width: '100%',
        minHeight: "100%",
        position:'fixed',
        top:0,
        left:0,
        // opacity: '50%',
        background: 'rgba(0,0,0,0.5)'
    },
    leftArea: {
        position:"relative",
        flex: 1,
        margin:0,
        padding:0,
        display: 'flex',
        minHeight:'100%',
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        border: 'double white',
        // position: 'fixed',
        // left: '2%',
        // bottom: '2%',
        padding: 5,
        textAlign: 'center'
    },
    check: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
    },
    okButton: {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 10,
        fontSize: 30,
        paddingRight: 10,
        paddingLeft: 10,
        cursor: 'pointer',
        width: 'fit-content',
        height: "fit-content",
    },
    rightArea: {
        position:"relative",
        flex: 1,
        margin:0,
        padding:0, 
        display:"flex",
        minHeight:'100%',
        alignItems: "center",
        justifyContent: "center",
    },
    contentsArea: {
        alignContent: "center",
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-between',
        height: '90%', 
    },
    content: {
        textAlign: 'center'
    },
    explain1:{
        display: 'inline-block',
        fontSize: 25,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        // position: 'fixed',
        // left: '25%',
        // transform: 'translateX(-50%)',
    },
    explain2: {
        display: 'inline-block',
        fontSize: 30,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap',
        opacity: '150%',
    },
    explain3:{
        display: 'inline-block',
        fontSize: 30,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap'
    },
    explain4: {
        display: 'inline-block',
        fontSize: 30,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap',
        // position: 'fixed',
        // top: '50%',
        // left: '25%',
        // transform: 'translate(-50%, -50%)',
    },
    explain5:{
        display: 'inline-block',
        fontSize: 30,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap',
        // position: 'fixed',
        // left: '75%',
        // transform: 'translateX(-50%)',
        // bottom: '5%'
    },
};

export default Prepare;