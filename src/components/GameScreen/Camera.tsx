import React from "react";
import { useState,  useRef, useCallback, } from "react";
import Webcam from "react-webcam";
import CorrectJudge from "./CorrectJudge";
import Calculation from "./JointCal";

const Camera = (props:any)  => {
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const [AnswerLetter, setAnswerLetter] = useState<string>('');
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
          setUrl(imageSrc);
        }
      }, [webcamRef]);
    
    //写真の撮影
    // このタイミングでcanvasの値をtrueにしてcanvasの表示を行う
    const screenShot = async () => {
        props.setIsScreenShot(true);
        console.log('take photo')
            capture();
            var cosinResult=Calculation();
            var AnswerLetter = CorrectJudge(await cosinResult);
            setAnswerLetter(AnswerLetter);
    }
    props.setUrl(url);
    props.setAnswerLetter(AnswerLetter);

    return (
        <>
            <Webcam
                audio={false}
                width={'100%'}
                height={'100%'}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    width: 720,
                    height: 720,
                    facingMode: "user"
                }}
                style={styles.camera}
            />
            <button onClick={screenShot} > take </button>
        </>
    );
};

const styles: {[key: string] : React.CSSProperties} = {
    camera:{
        margin:0,
        paddingLeft:0,
        transform: 'scale(-1,1)',

    },
};

export default Camera;