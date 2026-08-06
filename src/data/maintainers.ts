// StormBreaker maintainers. Add a person here and they appear on /about/maintainers/.
export type Maintainer = {
  name: string;
  role: string;
  github?: string;
};

export const MAINTAINERS: Maintainer[] = [
  { name: 'Saalim Quadri', role: 'Founder & Lead', github: 'danascape' },
];
