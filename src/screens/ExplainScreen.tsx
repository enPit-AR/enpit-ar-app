import React from "react";
import ReturnButton from "../components/Common/ReturnButton ";

const ExplainScreen = () => {
    return(
        <>
            <ReturnButton screen={'説明'} render={'/'}/>
            <div style={styles.screen}>
                ここは説明画面
            </div>
        </>
    )
};

const styles: {[key: string] : React.CSSProperties} = {
    screen: {
        position:'relative',
        padding:0,
        paddingBottom:0,
    },
}

export default ExplainScreen;
