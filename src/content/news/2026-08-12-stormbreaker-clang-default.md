---
title: StormBreaker Clang is now our default toolchain
date: 2026-08-12
tag: Toolchain
author: Saalim Quadri
cover: /news/clang.svg
summary: Our in-house LLVM/Clang build is back, and from here on it compiles every StormBreaker kernel by default. Here is exactly how it is built.
---

StormBreaker Clang, our in-house LLVM/Clang toolchain, is back in active development, and from here on it is the **default compiler for every StormBreaker kernel.**

It is not a stock Clang with our name on it. It is built to do one job well: compile kernels, fast. Three build choices do most of that work, so here goes.

## Profile-guided optimization, trained on a kernel

```
--pgo kernel-defconfig
```

PGO builds Clang in stages. First a normal bootstrap compiler, then an **instrumented** one that is pointed at a real Linux kernel source and make it compile multiple architecture full builds. While it works, it records how its own code actually runs: which branches get taken, which functions are hot, how memory gets touched. That profile is fed into a final build, so the optimizer stops guessing and tunes Clang around the exact workload it will spend its life doing, which is compiling kernels.

The `kernel-defconfig` profile is the important part. The compiler is trained on this workload, not a generic benchmark. PGO on its own typically **cuts compile time by 15 to 20%**, with zero change to the kernels it produces.

## Full LTO

```
--lto full
```

Link-time optimization lets the optimizer see across the whole program at link time instead of one file at a time, so it can inline and prune much harder. We build with **full LTO** rather than the lighter ThinLTO. Full LTO needs a lot of memory to link (64 GB and up) and it is slow, but `ld.lld` covers for it, but it squeezes out another **3 to 5%** of compiler speed. We build the toolchain once and everyone uses it for years, so we take that cost on our side and it is free on yours.

## A kernel-only distribution

```
--distribution-profile kernel
```

A full LLVM install ships a lot of components we never touch. The `kernel` profile trims the build down to only what is needed to compile the Linux kernel, so what we ship is **smaller and leaner**, not a general-purpose LLVM with the kernel bits buried inside.

## Why in-house at all

Shipping our own compiler makes it a known quantity: the same version, the same flags, the same optimizations across every device and every maintainer. That means reproducible builds, one place to fix a miscompile, and a toolchain tuned for our work instead of the average case.

Put together, the build looks like this:

```
--pgo kernel-defconfig --lto full --distribution-profile kernel
```

A compiler trained on kernels, optimized to the limit, trimmed to exactly what we need.

## Where to get it

Like everything we build, the toolchain is open.

- **GitHub** [`stormbreaker-project/stormbreaker-clang`](https://github.com/stormbreaker-project/stormbreaker-clang), the `master` branch, built on **LLVM 20.x**. This is the build we ship and compile with by default.
- **GitLab** [`stormbreaker-project/stormbreaker-clang`](https://gitlab.com/stormbreaker-project/stormbreaker-clang) carries `master` alongside a **23.x** branch, for anyone tracking the next LLVM base.

> Same source, same compiler, same result. Every device, every time.
