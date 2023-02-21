import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../utils/images/common/StartScreenBack.gif';
import image1_1 from '../utils/images/tutorial/screen_motion_1.png';
import image1_2 from '../utils/images/tutorial/player_motion_1.png';
import image2_1 from '../utils/images/tutorial/screen_motion_2.png';
//import image2_2 from '../utils/images/tutorial/player_motion_2.png';
import image3_1 from '../utils/images/tutorial/screen_motion_3.png';
import image3_2 from '../utils/images/tutorial/player_motion_3.png';
import image4_1 from '../utils/images/tutorial/screen_motion_4.png';
import image4_2 from '../utils/images/tutorial/player_motion_4.png';
import image5_1 from '../utils/images/tutorial/screen_motion_5.png';
import image5_2 from '../utils/images/tutorial/player_motion_5.png';
import image6_1 from '../utils/images/tutorial/screen_motion_6_correct.png';
import image6_2 from '../utils/images/tutorial/screen_motion_6_uncorrect.png';
import image7_1 from '../utils/images/tutorial/screen_motion_7_correct.png';
// import Pause from "../utils/sounds/select09.mp3";
import go from "../utils/se/go.mp3"
import useSound from "use-sound";

const ExplainScreen = () => {
    // const [playPAUSE] = useSound(Pause);
    const [playGo] = useSound(go);
    const navigate = useNavigate();
    return(
        <div>
            <div style={styles.screen}>
                <img src={bgImage} alt="" style={styles.back_img}></img>

                <div style={styles.header}>
                    <div style={styles.buttonArea}>
                        <button onClick={() => {
                            playGo();
                            console.log('button is pushed')
                            navigate('/')
                            }} style={styles.backButton}><strong>＜もどる</strong></button>
                    </div>
                    <div style={styles.titleArea}>
                        <h1 style={styles.title}>あそびかた</h1>
                    </div>
                </div>
                <div style={styles.contentsArea}>
                    <h1 style={styles.headerSpace}>ヘッダーの裏に表示</h1>
                    <div style={styles.ruleArea1}>
                        <p style={styles.rule}>① <ruby>下<rt>した</rt></ruby>にある「スタート」ボタンをおしましょう</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image1_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>しせい</figcaption>
                                <img src={image1_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea2}>
                        <p style={styles.rule}>② カメラの<ruby>下<rt>した</rt></ruby>にある「スタート」ボタンをおしましょう</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image2_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>しせい</figcaption>
                                <img src={image1_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea3}>
                        <p style={styles.rule}>③ からだの<ruby>全部<rt>ぜんぶ</rt></ruby>がうつるように、カメラからはなれよう</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image3_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>しせい</figcaption>
                                <img src={image3_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea4}>
                        <p style={styles.rule}>④ ゲームとカウントがスタート！</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image4_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>しせい</figcaption>
                                <img src={image4_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea5}>
                        <p style={styles.rule}>⑤ <ruby>出<rt>で</rt></ruby>てくる<ruby>文字<rt>もじ</rt></ruby>をからだでつくろう</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image5_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>しせい</figcaption>
                                <img src={image5_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea6}>
                        <p style={styles.rule}>⑥ ○か× かのどっちかが<ruby>出<rt>で</rt></ruby>るよ（○の<ruby>場合<rt>ばあい</rt></ruby>は<ruby>文字<rt>もじ</rt></ruby>が<ruby>赤<rt>あか</rt></ruby>くひかるよ！）</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>○ の<ruby>場合<rt>ばあい</rt></ruby></figcaption>
                                <img src={image6_1} alt="" style={styles.image}></img>
                            </figure>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>× の<ruby>場合<rt>ばあい</rt></ruby></figcaption>
                                <img src={image6_2} alt="" style={styles.image}></img>
                            </figure>
                        </div>
                    </div>
                    <div style={styles.ruleArea7}>
                        <p style={styles.rule}>⑦ ○が<ruby>出<rt>で</rt></ruby>たら<ruby>次<rt>つぎ</rt></ruby>の<ruby>文字<rt>もじ</rt></ruby>にチャレンジ！</p>
                        <div style={styles.imageArea}>
                            <figure style={styles.operation}>
                                <figcaption style={styles.caption}>がめん</figcaption>
                                <img src={image7_1} alt="" style={styles.image}></img>
                            </figure>
                            {/* <figure style={styles.operation}>
                                <figcaption style={styles.caption}></rt></ruby></figcaption>
                                <img src={image6_2} alt="" style={styles.image}></img>
                            </figure> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default ExplainScreen;

const styles: {[key: string] : React.CSSProperties} = {
    screen: {
        padding:0,
        paddingBottom:0,
    },
    back_img: {
        position:'fixed',
        top: 0,
        width: '100%',
        minHeight:'100vh',
        maxHeight:'100%',
    },
    header: {
        position:'fixed',
        zIndex: 30,
        backgroundColor: '#BAD3FF',
        top:'0%',
        minWidth:'100%',
    },
    buttonArea: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: '1%'
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
        fontFamily: 'monospace'
    },
    titleArea: {
        textAlign: 'center',
    },
    title: {
        display: 'inline-block',
        color: '#5D99FF',
        fontSize: 50,
        fontFamily: 'monospace'
    },
    contentsArea: {
        position: 'relative',
        zIndex: 20
    },
    headerSpace: {
        fontSize: 50,
    },
    rule: {
        fontSize: 25,
        marginLeft: '3%',
        fontFamily: 'monospace'
    },
    imageArea: {
        textAlign: 'center',
        marginBottom: 40,
    },
    operation: {
        display: 'inline-block',
    },
    caption: {
        fontSize: 25,
        color: '#555555',
        fontFamily: 'monospace'
    },
    image: {
        width: 500,
        height: 300,
        //border: '1px solid',
    },
}
