function* createId(start){
    let index = start ===0 ? 1: start;

    while (true) {
        yield index++;
    }
}

export {createId};