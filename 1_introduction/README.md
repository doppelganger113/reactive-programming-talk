# Introduction

_"Reactive programming is declarative programming paradigm concerned with data streams and the propagation of change."_

- Wikipedia

---

Reactive programming as in it's named is focused on reactivity, on events and reacting for them, be it a button click,
an interval clock ticking, multiple event source stream merge or backpressure to slow down the stream.

Example of stream operators

Filter operator

![Filter operator](assets/filter.png)

Merge all operator

![Merge all operator](assets/mergeAll.png)

## Under the hood

To better understand and get started with reactive programming, it's important to know what's the underlying
implementation.

Reactive programming in its core is the observer pattern.

![Under the hood](./assets/observer_pattern.jpg)

### Getting our hands dirty

The best way to learn is getting our hands dirty, so for that lets try the following exercises:

1. Create observer for propagating events
2. Create an input field in HTML that will write to 3 paragraphs as the user types and stop writing to the second
   paragraph if the user inputs "stop".
3. Create operators for filtering and mapping of our custom observable stream data
