// Single source of truth for site metadata, social links and the nav.
// Add/rename a nav item here and every page updates. The header is one component.

export const SITE = {
  name: 'Team StormBreaker',
  url: 'https://stormbreaker.squadri.me',
  description:
    'Custom Android kernels by Team StormBreaker with over a million downloads across dozens of devices since October 2019, built in the open.',
  download: 'https://sourceforge.net/projects/stormbreakerdevices/files/',
};

export const SOCIAL = {
  github: 'https://github.com/stormbreaker-project',
  twitter: 'https://twitter.com/StormBreakerOSS',
  telegram: 'https://t.me/stormbreakerkernelupdatescl',
  discord: 'https://discord.gg/cZZeSq8Dj',
  email: 'team.stormbreakerproject@gmail.com',
  paypal: 'https://paypal.me/saalimquadri',
  guidelines: 'https://github.com/stormbreaker-project/maintainer-guidelines',
  issues: 'https://github.com/stormbreaker-project/issues/issues',
};

export type NavDropdownItem = {
  label: string;
  href?: string;
  icon: string;
  external?: boolean;
  soon?: boolean;
};

export type NavItem =
  | { label: string; href: string }
  | { label: string; items: NavDropdownItem[] };

export const NAV: NavItem[] = [
  { label: 'News', href: '/news/' },
  {
    label: 'Devices',
    items: [
      { label: 'All devices', href: '/devices/', icon: 'devices' },
      { label: 'Maintenance Charter', href: '/devices/charter/', icon: 'charter' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'About Team StormBreaker', href: '/about/', icon: 'about' },
      { label: 'Maintainers', href: '/about/maintainers/', icon: 'maintainers' },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Code of Conduct', href: '/about/coc/', icon: 'coc' },
      { label: 'Telegram', href: SOCIAL.telegram, icon: 'telegram', external: true },
      { label: 'Discord', href: SOCIAL.discord, icon: 'discord', external: true },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Documentation', icon: 'docs', soon: true },
      { label: 'Submit a bug', href: SOCIAL.issues, icon: 'bug', external: true },
    ],
  },
  {
    label: 'Contribute',
    items: [
      { label: 'Contributing guide', href: '/contribute/guide/', icon: 'guide' },
      { label: 'Donate', href: '/contribute/donate/', icon: 'donate' },
    ],
  },
];
