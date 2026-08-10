// Maintenance charter — devices grouped by kernel line, not as a flat list.
//
// The unit of maintenance is a kernel LINE: an upstream LTS base (4.14, 4.19,
// 5.15, ...) combined with a SoC-common tree. Every device on a line rides the
// same StormBreaker patchset, tagged `sb-<version>-rN`, and the whole line ships
// together (a "release train").
//
// NOTE: version/SoC/lead/rev below are a starting scaffold. Confirm and complete
// them; this file is the single source the Charter page renders from.

export type Era = 'pre-gki' | 'gki';
export type LineStatus = 'active' | 'wip' | 'planned';

export type KernelLine = {
  version: string;        // upstream LTS base, e.g. '4.19'
  era: Era;               // pre-gki: we own the base · gki: we track Google's ACK
  soc?: string;           // SoC-common family, e.g. 'msm8953', 'sm6350'
  lead?: string;          // lead / reference device codename
  rev?: string;           // current patchset revision, e.g. 'r1'
  status: LineStatus;
  devices: string[];      // member device codenames
  note?: string;
};

export const KERNEL_LINES: KernelLine[] = [
  {
    version: '4.14',
    era: 'pre-gki',
    lead: 'r5x',
    rev: 'r1',
    status: 'active',
    devices: ['r5x', 'nemo', 'x01bd'],
    note: 'Mixed SoCs on the same LTS: generic patches are shared, vendor patches stay per chipset.',
  },
  {
    version: '4.19',
    era: 'pre-gki',
    lead: 'billie',
    rev: 'r1',
    status: 'active',
    devices: ['billie', 'surya', 'miatoll', 'gauguin'],
  },
  {
    version: '5.15',
    era: 'gki',
    status: 'wip',
    rev: 'r0',
    devices: [],
    note: 'GKI: we track Google\'s android13-5.15 ACK and keep a thin vendor delta.',
  },
  {
    version: '6.1',
    era: 'gki',
    status: 'wip',
    rev: 'r0',
    devices: [],
    note: 'GKI: tracked against android14-6.1 ACK.',
  },
  {
    version: '6.6',
    era: 'gki',
    status: 'planned',
    devices: [],
    note: 'GKI: tracked against android15-6.6 ACK.',
  },
];

// Legacy SoC-common trees kept for reference (older LTS, maintenance paused).
export const LEGACY_COMMON: KernelLine[] = [
  { version: 'msm8953', era: 'pre-gki', soc: 'msm8953', status: 'planned', devices: ['vince', 'ysl', 'daisy', 'mido', 'sakura', 'tissot'], note: 'Qualcomm msm8953 common kernel.' },
  { version: 'MI8937', era: 'pre-gki', soc: 'msm8937', status: 'planned', devices: ['land', 'ugg', 'santoni'], note: 'Qualcomm MI8937 common kernel.' },
];

export const preGki = KERNEL_LINES.filter((l) => l.era === 'pre-gki');
export const gki = KERNEL_LINES.filter((l) => l.era === 'gki');
