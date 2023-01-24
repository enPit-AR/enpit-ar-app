const Prepare = (props:any) => {

    //ぺージ遷移時には画面の右側には案内と開始ボタンが存在．開始ボタンを押すと問題などの画面が見えるようになる．
    // const [isChecked, setIsChecked] = useState<boolean>(true);

    const startGame = () => {
        props.setIsCheckedPosition(false);
    };

    const textExplain2 = `答えるえいたんごが出るばしょ\n(楽しくえいたんごをまなぼう！)`;
    const textExplain3 = `キャラクターが出現するばしょ\n(キャラクターをたおそう！)`;
    const textExplain4 = `手をあげて、体のすべてがうつるようにしよう\n(ここでポーズをとるよ！)`;
    const textExplain5 = `ここの「スタート」ボタンをおすとゲームスタート！\n(すぐにカウントが始まるよ！)`;
    return(

        // ここのタグとか文字をいじって見やすく分かりやすくする
        <div style={styles.screen}>
            <div style={styles.leftArea}>
                <p style={styles.explain1}>ポーズをとる<ruby>文字<rt>もじ</rt></ruby>のばしょ</p>
                <p style={styles.explain4}>{textExplain4}</p>
                <div style={styles.button}>
                    <p style={styles.check}>かくにんができたら、ここの「OK！」ボタンをおしてね！</p>
                    <button onClick={startGame} style={styles.okButton}>OK！</button>
                </div>
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
        opacity: '50%',
    },
    leftArea: {
        flex: 1,
        margin:0,
        padding:0, 
    },
    button: {
        border: 'double white',
        position: 'fixed',
        left: '2%',
        bottom: '2%',
        padding: 10
    },
    check: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'monospace',
    },
    okButton: {
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: 10,
        fontSize: 20,
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
    },
    content: {
        textAlign: 'center'
    },
    explain1:{
        fontSize: 20,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        position: 'fixed',
        left: '25%',
        transform: 'translateX(-50%)',
    },
    explain2: {
        display: 'inline-block',
        fontSize: 20,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap'
    },
    explain3:{
        display: 'inline-block',
        fontSize: 20,
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
        fontSize: 20,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap',
        position: 'fixed',
        top: '50%',
        left: '25%',
        transform: 'translate(-50%, -50%)',
    },
    explain5:{
        display: 'inline-block',
        fontSize: 20,
        fontFamily: 'monospace',
        background: 'white',
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        whiteSpace: 'pre-wrap',
        position: 'fixed',
        left: '75%',
        transform: 'translateX(-50%)',
        bottom: '5%'
    },
};

export default Prepare;