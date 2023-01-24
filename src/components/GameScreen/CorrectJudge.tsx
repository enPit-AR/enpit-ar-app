import CorrectData from "../../json/CorrectData.json";


function CorrectJudge(cosinScore:number[]){
    const correctData = CorrectData.CorrectDataList;

    var Answer = 0;
    // (cosinScore[0]-A[0])**2 + (cosinScore[1]-A[1])**2 .......
    //初回のAの文字はとりあえず保存
    for(var j=0;j<cosinScore.length-1;j++){
        Answer += (cosinScore[j]-correctData[0].Data[j])**2;
    };

    Answer = Answer**0.5;

    var AnswerLetter = correctData[0].Alphabet;
    
    //A以降の文字は答えたポーズとAの文字のユークリッド距離より値がよければAnswerを更新
    for (var i=1;i<correctData.length-1;i++){
        var NowAnswer = 0;
        for(var k=0;k<cosinScore.length-1;k++){
            NowAnswer += (cosinScore[k]-correctData[i].Data[k])**2;
        };

        NowAnswer = NowAnswer**0.5;
        
        if(NowAnswer<Answer){
            Answer=NowAnswer;
            AnswerLetter=correctData[i].Alphabet
        };

    };
    // console.log(Answer);
    console.log(AnswerLetter)
    return AnswerLetter;
          
};

export default CorrectJudge;