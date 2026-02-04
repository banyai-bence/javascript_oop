const muvelet = (a, b, callback) => {
    const result = callback(a, b)

    // return{
    //     result:result
    // }

    return { result }

}

const muveletLetrehoz = (jel) => {
    if (jel == "+") {
        return (a, b) => {
            return a + b
        }
    }
    if (jel == "-") {
        return (a, b) => {
            return a - b
        }
    }
    if (jel == "*") {
        return (a, b) => {
            return a * b
        }
    }
}

export { muvelet, muveletLetrehoz }