---
title: "sworkflow: one command to build a kernel"
date: 2026-08-12
tag: Toolchain
author: Saalim Quadri
cover: /news/sworkflow.svg
summary: sworkflow is the build tool that compiles and packages every StormBreaker kernel. If Clang is the compiler, this is what drives it.
---

If [StormBreaker Clang](/news/2026-08-12-stormbreaker-clang-default/) is the compiler, **sworkflow** is what drives it. It is the tool we use to compile and package every StormBreaker kernel, and it turns a pile of setup into a single command.

## One command

```
sw build <device>
```

That configures the build, compiles with Clang/LLVM, generates the DTBO image, and packages the result with AnyKernel3 into a flashable zip. No copy-pasting the same `make` line across devices. (`sw b` is the short form of `sw build`.)

## What a real build looks like

Here is how we actually build `billie`, our OnePlus Nord N10:

```
# grab the kernel source and our compiler
git clone https://github.com/stormbreaker-project/linux-oneplus-billie
git clone https://github.com/stormbreaker-project/stormbreaker-clang

# put StormBreaker Clang on your PATH
export PATH="$PWD/stormbreaker-clang/bin:$PATH"

# with a sworkflow.billie.config in place, build it
sw b billie
```

The device lives in one file, `sworkflow.billie.config`, which holds its build settings. From there sworkflow configures the kernel, cross-compiles it with the Clang on your PATH, builds the DTBO, and wraps everything into a flashable zip.

## What it handles

- **Device configs.** Each device is a small `sworkflow.<device>.config` file, so build settings live in one place instead of scattered across scripts.
- **Clang/LLVM builds.** It uses whatever Clang is on your PATH, so pointing it at StormBreaker Clang is one `export` away.
- **DTBO and packaging.** DTBO image generation and AnyKernel3 packaging, so what comes out is ready to flash.

## Starting a new device

```
sw init          # generate a config for a new device
sw doctor        # check your setup and available configs
```

Install it from source with `make install` (no root needed for a user install), or grab the Debian package. The full manual is a `man sw` away.

## Why a build tool at all

The same reason we ship our own compiler: consistency. `sw build` runs the same steps, the same way, on every device and for every maintainer. That means reproducible builds and one place to fix the pipeline, instead of each person's slightly different local setup. It is also exactly what runs the release trains in our [Maintenance Charter](/devices/charter/).

## Where to get it

[github.com/stormbreaker-project/sworkflow](https://github.com/stormbreaker-project/sworkflow)

> One config, one command, a flashable kernel.
