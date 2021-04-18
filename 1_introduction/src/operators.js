const isOdd = x => x % 2 === 0;

const listenForInput = (id, callback) => {
    const el = window.document.getElementById(id)
    el.addEventListener('input', (e) => {
        callback(e)
    })
}


class Observable {
    constructor() {
        this.callbacks = []
    }

    subscribe(callable) {
        const index = this.callbacks.push(callable) - 1
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


class FilterObservable {
    constructor(predicate) {
        this.predicate = predicate
        this.observable = new Observable();
    }

    subscribe(callback) {
        this.observable.subscribe(callback)
    }

    emit(value) {
        if (this.predicate(value)) {
            this.observable.emit(value)
        }
    }
}

class MapObservable {
    constructor(fn) {
        this.fn = fn;
        this.observable = new Observable();
    }

    subscribe(cb) {
        this.observable.subscribe(cb);
    }

    emit(value) {
        this.observable.emit(this.fn(value))
    }
}

const filter = (predicate) => new FilterObservable(predicate);
const map = (fn) => new MapObservable(fn);

(() => {
    let counter = 0
    const observer = new Observable()

    window.document.addEventListener('click', () => {
        observer.emit(counter)
        counter++
    })

    observer.pipe(
        filter(isOdd),
        map(x => x * 10),
        map(x => `You clicked ${x} times`)
    )
        .subscribe(value => {
            console.info(value)
        })
})();
