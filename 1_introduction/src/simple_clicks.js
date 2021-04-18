class Observable {
    constructor() {
        this.callbacks = []
    }

    subscribe(callable) {
        this.callbacks.push(callable)
    }

    emit(value) {
        this.callbacks.forEach(cb => cb(value))
    }
}

(() => {
    const clickObservable = new Observable();

    window.document.addEventListener('click', clickObservable.emit.bind(clickObservable))

    clickObservable.subscribe(console.log)
})()
