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

const writeToParagraph = (id) => {
    const el = window.document.getElementById(id)
    if (!el) {
        throw new Error("Element not found: " + el)
    }

    return value => {
        el.innerHTML = value
    }
}

(() => {
    let unsub2;

    const nameObserver = new Observable();

    listenForInput("name", (e) => {
        nameObserver.emit(e.target.value)
        if (e.target.value === "unsub") {
            unsub2()
        }
    })

    nameObserver.subscribe(writeToParagraph("paragraph_1"))
    unsub2 = nameObserver.subscribe(writeToParagraph("paragraph_2"))
    nameObserver.subscribe(writeToParagraph("paragraph_3"))
})();
