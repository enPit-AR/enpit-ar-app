import React from "react";
import { useState,  useRef, useCallback, } from "react";
import Webcam from "react-webcam";

const Camera = (props:any)  => {
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | undefined>(undefined);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
          setUrl(imageSrc);
        }
      }, [webcamRef]);
    
    //写真の撮影
    // このタイミングでcanvasの値をtrueにしてcanvasの表示を行う
    const screenShot = () => {
        props.setIsScreenShot(true);
        console.log('push')
        capture();
    }
    props.setUrl(url);

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