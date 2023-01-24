import Vocabulary from "../../../json/Vocabulary.json"; // 単語帳
import shuffleArray from "./ShuffleArray";

const MakeQ = () => {
    // 単語帳の読み込み
    const vocabulary = Vocabulary.wards_list;
    // ランダムな出題順番の生成
    const questionOrder = shuffleArray(vocabulary.length);


    return{ vocabulary: vocabulary, questionOrder: questionOrder };
}

export default MakeQ;