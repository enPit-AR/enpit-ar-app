const shuffleArray = (n: number) => {
    //[0, 1, 2, 3, 4......] => [3, 2, 4, 0, 1......]
    const array = Array.from(Array(n).keys())

    for (let i=n-1; i>=0; i--) {
        let rand = Math.floor(Math.random() * (i+1))
        let tmpStrage = array[i]
        array[i] = array[rand]
        array[rand] = tmpStrage
    }
    return array
};

export default shuffleArray;