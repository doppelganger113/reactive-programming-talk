package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}


@RestController
class MyController {
    @GetMapping()
    public Mono<String> hello() {
        return Mono.just("Hello world!");
    }

    @GetMapping("stream")
    public Flux<String> slowHello() {
        return Flux.just("One", "Two", "Three", "Four", "Five")
            .delayElements(Duration.ofSeconds(1))
            .map(el -> "<h1>" + el + "</h1>");
    }
}
