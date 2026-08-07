// StormBreaker maintainers + the devices in their maintenance charter.
// Add a person here (with their devices) and they appear on /about/maintainers/.
export type ChartedDevice = { codename: string; repo: string };

export type Maintainer = {
  name: string;
  role: string;
  github?: string;
  devices?: ChartedDevice[];
};

export const MAINTAINERS: Maintainer[] = [
  {
    name: 'Saalim Quadri',
    role: 'Founder & Lead',
    github: 'danascape',
    devices: [{ codename: 'billie', repo: 'linux-oneplus-billie' }],
  },
  {
    name: 'kardebayan',
    role: 'Maintainer',
    github: 'kardebayan',
    devices: [
      { codename: 'r5x', repo: 'linux-realme-r5x' },
      { codename: 'surya', repo: 'linux-xiaomi-surya' },
      { codename: 'x01bd', repo: 'linux-asus-x01bd' },
      { codename: 'miatoll', repo: 'linux-xiaomi-miatoll' },
      { codename: 'nemo', repo: 'linux-realme-nemo' },
    ],
  },
  {
    name: 'hridaya2004',
    role: 'Maintainer',
    github: 'hridaya2004',
    devices: [{ codename: 'gauguin', repo: 'linux-xiaomi-gauguin' }],
  },
];
