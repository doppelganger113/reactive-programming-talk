package com.example.demo;

import lombok.SneakyThrows;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import reactor.blockhound.BlockHound;
import reactor.blockhound.integration.BlockHoundIntegration;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import reactor.test.StepVerifier;

import java.util.ArrayList;
import java.util.ServiceLoader;
import java.util.concurrent.atomic.AtomicBoolean;

@Log4j2
public class BlockHoundTest {

    private static class BlockingCallError extends Error {
        BlockingCallError(String msg) {
            super(msg);
        }
    }

    private final static AtomicBoolean BLOCK_HOUND = new AtomicBoolean();

    @BeforeEach
    public void before() {
        BLOCK_HOUND.set(true);
        var integrations = new ArrayList<BlockHoundIntegration>();
        var services = ServiceLoader.load(BlockHoundIntegration.class);
        services.forEach(integrations::add);

        integrations.add(builder -> builder.blockingMethodCallback(blockingMethod -> {
            if (BLOCK_HOUND.get()) {
                throw new BlockingCallError(blockingMethod.toString());
            }
        }));

        BlockHound.install(integrations.toArray(new BlockHoundIntegration[0]));
    }

    @AfterEach
    public void after() {
        BLOCK_HOUND.set(false);
    }

    @Test
    public void notOk() {
        StepVerifier
            .create(
                this.buildBlockingMono()
                    .subscribeOn(Schedulers.parallel()))
            .expectErrorMatches(e -> e instanceof BlockingCallError)
            .verify();
    }

    @Test
    public void ok() {
        StepVerifier
            .create(
                this.buildBlockingMono()
                    .subscribeOn(Schedulers.boundedElastic())
            )
            .expectNext(1L)
            .verifyComplete();
    }

    public Mono<Long> buildBlockingMono() {
        return Mono.just(1L).doOnNext(it -> block());
    }

    @SneakyThrows
    private void block() {
        Thread.sleep(1000);
    }
}
