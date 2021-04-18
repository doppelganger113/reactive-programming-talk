const {fromEvent, from, EMPTY, interval, throwError, timer, of} = rxjs;
const {
    switchMap, catchError, flatMap, mergeMap, takeUntil, retry, concatMap, shareReplay, retryWhen,
    tap, delayWhen
} = rxjs.operators;

const getItem = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`Fetching item ${id}`)
        setTimeout(() => {
            if (id === 3) {
                reject(new Error("Invalid id of: " + id))
                return
            }
            resolve("Retrieved: " + id)
        }, 2_000)
    })
}

(() => {
    const observable = rxjs.Observable.create(observer => {
        observer.next("Hello")
    })

    observable.subscribe(val => {
        console.info(val)
    })
})();

const fetchItem$ = (id) => of(id).pipe(
    switchMap(v =>
        from(getItem(v))
    ),
    retryWhen(errors =>
        errors.pipe(
            tap(val => console.log('[Retrying] ' + val)),
            mergeMap((err, i) => {
                console.log({i})

                if (i >= 2) {
                    return throwError(err)
                }

                return timer(1_000);
            }),
        )
    )
);

(() => {
    const observable = interval(1_000)

    observable.pipe(
        takeUntil(timer(15_000)),
        flatMap((value) =>
            fetchItem$(value).pipe(
                catchError(err => {
                    console.error('Failed retry on ' + value, err)
                    return EMPTY;
                })
            )
        ),
    )
        .subscribe(value => {
            console.log('Value', value)
        }, err => {
            console.error('Caught one!', err)
        }, () => {
            console.log('Done.')
        })
})();
