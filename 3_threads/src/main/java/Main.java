import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Reactive streams
 * 1. Asynchronous
 * 2. Non-blocking
 * 3. Back-pressure
 * <p>
 * Publisher / Subscriber
 */
@Slf4j
public class Main {

    private static <T> void printThread(T val) {
        System.out.println("[Thread " + Thread.currentThread().getName() + "] " + val);
    }

    /**
     * Scheduler types (Schedulers)
     * Immediate - current thread
     * Single - a single reusable thread
     * Parallel - it creates as many threads as you have CPU cores
     * Elastic - An unbounded thread pool which dynamically creates threads when needed (Blocking I/O tasks)
     * Bounded Elastic - same as above, but bounded
     * <p>
     * <p>
     * Switching execution context with
     * publishOn
     * subscribeOn
     * runOn
     */
    @SneakyThrows
    public static void main(String[] args) {
        printThread("Started");
    }

    // Not encouraged
    private static ExecutorService getThreadPool() {
        return Executors.newWorkStealingPool();
    }
}

















//        Flux.just(1, 2, 3, 4, 5)
////            .subscribeOn(Schedulers.parallel())
//            .subscribeOn(Schedulers.fromExecutorService(getThreadPool()))
//            .delayElements(Duration.ofSeconds(1))
//            .map(x -> {
//            printThread(x);
//            return x;
//            })
//            .filter(num -> num % 2 == 0)
//            .subscribe(System.out::println);
//
//            printThread("Waiting...");
//            Thread.sleep(6_000);
//            printThread("Completed");
