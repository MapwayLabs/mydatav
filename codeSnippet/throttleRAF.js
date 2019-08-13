function throttleRAF () {
    let queuedCallback
    return callback => {
        if (!queuedCallback) {
            requestAnimationFrame(() => {
                const cb = queuedCallback
                queuedCallback = null
                cb()
            })
        }
        queuedCallback = callback
    }
}