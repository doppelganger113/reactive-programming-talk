class Observable {
    constructor() {
        this.callbacks = []
    }

    subscribe(callable) {
        const index = this.callbacks.push(callable)

        return () => {
            console.log('Unsubscribed ' + index)
            this.callbacks.splice(index, 1)
        }
    }

    emit(value) {
        this.callbacks.forEach(cb => cb(value))
    }

    pipe(...obs) {
        return obs.reduce((acc, o) => {
            acc.subscribe(o.emit.bind(o))
            return o
        }, this)
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

    const el = window.document.querySelector('input')
    el.addEventListener('input', (e) => {
        nameObserver.emit(e.target.value)
        if (e.target.value === "unsub") {
            unsub2 && unsub2()
        }
    })

    nameObserver.subscribe(writeToParagraph("paragraph_1"))
    unsub2 = nameObserver.subscribe(writeToParagraph("paragraph_2"))
    nameObserver.subscribe(writeToParagraph("paragraph_3"))
})();
