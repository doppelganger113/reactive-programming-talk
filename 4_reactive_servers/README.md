# Reactive servers

Luckily, Spring boot has great support for reactive programming with Project Reactor. Spring has great documentation and
support for creating either an HTTP API or Websocket server with reactive streams.

![Reactive Spring boot](assets/reactive%20spring%20boot.png)

---

## Reactive databases

Working with databases is a bit different, we were used soo much working with standard blocking calls, that most of the
libraries are blocking like SQL databases, while some are not like MongoDB. But, there is a solution that's nearing
stable release that aims to redo the database driver and bring them into the reactive world, that project is called
[R2DBC](https://r2dbc.io/).

## Preventing reactor meltdown

_Having the fastest racer doesn't help if you shoot it in the legs._ When working with reactive streams you need to 
be aware that you **SHOULD NOT BLOCK THREADS**! As seen previously, in the event loop there is no waiting, because
when a process is dispatched it's completion is marked as an event callback, that way the control is returned. 

Lets say for example that we have a single thread serving hundreds of request, if one request handler would block, it
would block all the other 99 requests as well, so if you're not careful you can cause more disaster.

**Solution**
 - In Java there is a great tool for helping to detect thread blocking, it's called Blockhound and you should always 
   use it!
 - If you have a blocking call you should offload it into a separate thread pool to keep it of the main event loop threads
with `.subscribeOn(Schedulers.boundedElastic())` 
   
## RSocket protocol

RSocket protocol was initially developed at Netflix as a replacement for HTTP protocol that supports reactive streams
and fits great with microservices with its support for backpressure and less overhead.

RSocket is a binary protocol that can be used atop of byte streams transports TCP, Websocket or Areon. It allows async
message communication over a single connection with communication types:

- request/response (stream of 1)
- request/stream (finite stream of many)
- fire-and-forget (no response)
- channel (bi-direction stream)

This protocol is perfectly suited for mobile-server communication as it supports session resumption when network
connections drop.

## Reactive paradigm might not be always simple

Sometimes we can have certain cases that can be quite complex to manage...

![Complex case](./assets/complex_reactive_pipe.png)

## Summary

Reactive programming as any tool has its pros and cons, and it's up to you to decide when and how to use it.

Pros

- Simplicity
- Robust toolset
- High concurrency and resilience with backpressure
- Event driven plays nicely

Cons

- Unclear streams when things get complex
- Complete programming mind-shift
- Complexity when trying to do blocking tasks and synchronization
- Steep learning curve
