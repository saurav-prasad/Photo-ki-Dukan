let timer = null
const runDebounce = (callBack, timeOut) => {
    return function () {
        if (timer !== null) clearTimeout(timer)
        timer = setTimeout(() => {
            callBack()
            timer = null
        }, timeOut)
    }
}
export default runDebounce