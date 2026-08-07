// ROMs that ship StormBreaker as their kernel.
// Logos are each ROM's official GitHub org avatar (served from GitHub).
export type Rom = { name: string; url?: string; logo?: string };

export const ROMS: Rom[] = [
  { name: 'LineageOS', url: 'https://lineageos.org', logo: 'https://github.com/LineageOS.png?size=120' },
  { name: 'crDroid', url: 'https://crdroid.net', logo: 'https://github.com/crdroidandroid.png?size=120' },
  { name: 'Evolution X', url: 'https://evolution-x.org', logo: 'https://github.com/Evolution-X.png?size=120' },
  { name: 'PixelOS', url: 'https://pixelos.net', logo: 'https://github.com/PixelOS-AOSP.png?size=120' },
  { name: 'Axion', url: 'https://axionos.org', logo: 'https://github.com/AxionAOSP.png?size=120' },
];
