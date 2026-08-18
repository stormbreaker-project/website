// Every project we work on, grouped by the layer it lives on, framed as a
// contribution entry point. The point of this list isn't to brag about range —
// it's so a newcomer can scan by the skill they have and find where to jump in.
// Repos we can't name exactly link to the org page (never a 404).

export type Project = {
  name: string;
  desc: string;
  stack: string[];
  href: string;
  star?: string; // social proof, e.g. "126★"
  wip?: boolean; // early / in development
};

export type ContribArea = {
  id: string;
  label: string; // the layer
  skill: string; // "you know X" — how a contributor self-selects
  org: string; // shown as a mono tag on the right
  projects: Project[];
};

const SB = 'https://github.com/stormbreaker-project';
const PVOT = 'https://github.com/PVOT-OSS';

export const AREAS: ContribArea[] = [
  {
    id: 'kernel',
    label: 'Kernels & toolchain',
    skill: 'you know C, the Linux kernel, LLVM or shell',
    org: 'stormbreaker-project',
    projects: [
      {
        name: 'StormBreaker kernels',
        desc: 'Per-device Linux kernel trees. LTS bumps, CLO merges, and real backports — the core of what we do.',
        stack: ['C', 'Linux', 'device'],
        href: SB,
      },
      {
        name: 'StormBreaker Clang',
        desc: 'Our in-house LLVM/Clang toolchain, tuned for compiling kernels fast. PGO, LTO, kernel-profiled builds.',
        stack: ['LLVM', 'Python', 'build'],
        href: SB,
      },
      {
        name: 'sworkflow',
        desc: 'The tool that configures, compiles and packages our kernels — device configs, Clang builds, AnyKernel3.',
        stack: ['Shell', 'tooling'],
        href: `${SB}/sworkflow`,
      },
    ],
  },
  {
    id: 'os',
    label: 'OS & framework',
    skill: 'you know AOSP, Java or C++',
    org: 'PVOT-OSS',
    projects: [
      {
        name: 'PVOT OS',
        desc: 'Our AOSP/LineageOS fork with custom framework work and theming. A de-Googled Android, in development.',
        stack: ['AOSP', 'Java'],
        href: PVOT,
        wip: true,
      },
      {
        name: 'frameworks_base',
        desc: 'Framework-level customizations — the guts of the platform, where the OS behaviour actually lives.',
        stack: ['Java'],
        href: `${PVOT}/platform_frameworks_base`,
      },
      {
        name: 'system_core',
        desc: 'Low-level system components forked from AOSP. Init, logging, the plumbing under everything.',
        stack: ['C++'],
        href: `${PVOT}/platform_system_core`,
      },
    ],
  },
  {
    id: 'apps',
    label: 'Apps',
    skill: 'you know Kotlin & Jetpack Compose',
    org: 'PVOT-OSS · stormbreaker-project',
    projects: [
      {
        name: 'Messages',
        desc: 'A de-Googled SMS app — minimal, maintainable, no bloat. Our most-used app.',
        stack: ['Kotlin'],
        href: `${PVOT}/Messages`,
        star: '126★',
      },
      {
        name: 'Aperture',
        desc: 'Our camera app. Clean, private, no cloud strings attached.',
        stack: ['Kotlin'],
        href: `${PVOT}/Aperture`,
      },
      {
        name: 'PvotGallery',
        desc: 'A private, offline photo gallery — your pictures stay yours.',
        stack: ['Kotlin'],
        href: `${PVOT}/PvotGallery`,
      },
      {
        name: 'SB Kernel Manager',
        desc: 'Update and tune StormBreaker kernels from your phone. Early days — plenty to build.',
        stack: ['Kotlin', 'Compose'],
        href: `${SB}/SB-kernel-Manager`,
        wip: true,
      },
      {
        name: 'PvotContacts',
        desc: 'A de-Googled contacts app for the suite.',
        stack: ['Java'],
        href: `${PVOT}/PvotContacts`,
      },
      {
        name: 'PvotRecorder',
        desc: 'A simple, private audio recorder.',
        stack: ['Kotlin'],
        href: `${PVOT}/PvotRecorder`,
      },
      {
        name: 'PvotClock',
        desc: 'Clock, alarms and timers — clean and dependency-light.',
        stack: ['Java'],
        href: `${PVOT}/PvotClock`,
      },
      {
        name: 'PvotCalculator',
        desc: 'A no-nonsense calculator for the app suite.',
        stack: ['Kotlin'],
        href: `${PVOT}/PvotCalculator`,
      },
    ],
  },
  {
    id: 'design',
    label: 'Design system',
    skill: 'you know Compose & care about UI/UX',
    org: 'PVOT-OSS',
    projects: [
      {
        name: 'PvotLib',
        desc: 'The shared Compose component library every app is built from — nav bars, pickers, and a long list of pieces still to build.',
        stack: ['Compose', 'design'],
        href: `${PVOT}/PvotLib`,
      },
    ],
  },
  {
    id: 'web',
    label: 'Web & docs',
    skill: 'you know web, or just want to write',
    org: 'stormbreaker-project',
    projects: [
      {
        name: 'This website',
        desc: 'The site you are on — Astro, static, open. Copy fixes and design tweaks welcome.',
        stack: ['Astro', 'web'],
        href: SB,
      },
      {
        name: 'Docs & guides',
        desc: 'Improve READMEs, setup guides and maintainer docs across every repo. The least glamorous, most useful work.',
        stack: ['writing'],
        href: 'https://github.com/stormbreaker-project/maintainer-guidelines',
      },
    ],
  },
];
