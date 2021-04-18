# Reactive patterns

Instead of building our own observer, lets use an already existing library for reactive programming 
[RxJs](https://rxjs.dev) and see what it offers us.

![RxJS](../assets/rxjs_logo.png)

## Most used operators

- filter
- map
- switchMap
- flatMap
- concatMap
- tap
- retry
- retryWhen
- throwError
- debounce
- throttle
- catchError
- combineLatest
- first
- takeUntil
- interval
- ...and much more

## HTTP request example
To see one of the great use cases where we can utilize such a library is when making HTTP requests. 
Some things that can make our life easier by using these operators is:

- **debounce** to prevent sending too many events in desired time span
- **switchMap** to replace the old event stream with new stream
- **catchError** to catch an error and perform side effects or return default value stream
- **retry** to retry the specific observable stream on error n amount of times
- **retryWhen** to retry with a custom retry strategy
- **timeout** to error in case the given observable does not emit a value in set time span
