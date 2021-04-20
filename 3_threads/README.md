# What about threads?

Most server applications are in threaded model, but recently due to increase in scalability demand
they are not enough for high concurrency.

---

## Blocking and Non-Blocking I/O

Traditional threaded model serves each request with its own thread. Threads are costly in memory and have a 
hard limit on the number of threads based on the machine memory. Usually when a request has finished, the thread is
redirected to a new request to be re-used from a thread pool.

However, they are not utilized efficiently as most of the time they are waiting for requests, either to a database or
from another service, they spend that time waiting for the response, not doing anything and wasting the memory as seen
in the image bellow.

![Threaded model](./assets/Threaded%20model.png)

Reactive approach comes into play as a solution that's based on events. Whenever an IO action occurs, like a database
request or HTTP request to another service, an event is pushed with corresponding handler and the control is returned 
back to the thread. Because of this, there is no wasted CPU or memory while waiting for an event to happen and it's 
possible to have a much higher number of requests handled in a single thread instead of many.

The Non-Blocking example from above is from Node.js event loop, it's not much different from Reactive Java approach as
Java's version has more threads to spread out the work, it's just that the concept is easier to understand on a single 
thread.

---

## Event loop model

Here you can see more in detail how events are triggered and how handlers are executed in the Node.js event loop.

![Event loop model](./assets/Node.js%20event%20loop.png)

## Lightweight threads

Since we are here, we might as well mention it. There is a third hybrid approach!

We said in the first case that threads have a hard limit due to their size and inefficiency when handling high 
concurrency, but there are also light threads. These threads are extremely lightweight meaning that for a 
machine that can start ~1_000 threads you can start ~1_000_000 light threads! How does this work, well we mentioned 
that this is a hybrid approach, but when working with it you won't notice the difference from the threaded model, how is 
this? It all boils down to the runtime, in the background, the language runtime handles scheduling of blocked light 
threads, allowing high concurrency without losing the programming model we are so used to.

Languages with light threads:
 - Go
 - Erlang
 - Elixir
 - Haskel
 - Crystal
 - (and planned in the future Java with fibers)
