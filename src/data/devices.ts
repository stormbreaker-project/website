// Every device Team StormBreaker has built kernels for (Oct 2019 → today).
// `end`: a date string, '' when open/unconfirmed, or 'present' when active.
// `featured`: shown in the home-page preview.
export type Device = {
  name: string;
  codename: string;
  start: string;
  end: string;
  featured?: boolean;
  upcoming?: boolean;
  note?: string;
};

export const DEVICES: Device[] = [
  { name: 'Redmi 5', codename: 'rosy', start: 'Oct 2019', end: 'Nov 2019' },
  { name: 'Redmi Note 7', codename: 'lavender', start: 'Oct 2019', end: 'Sep 2021', featured: true },
  { name: 'Redmi Note 5 / 5 Plus', codename: 'vince', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Redmi Note 5 Pro', codename: 'whyred', start: 'Nov 2019', end: 'Dec 2020' },
  { name: 'Realme 2 Pro', codename: 'RMX1801', start: 'Nov 2019', end: '2020' },
  { name: 'Asus Zenfone Max M1', codename: 'X00P / X00PD', start: '2019', end: '2024', featured: true },
  { name: 'Asus Zenfone Max M2', codename: 'X01A / X01AD', start: '2019', end: '2023' },
  { name: 'Poco X2', codename: 'phoenix', start: 'May 2020', end: 'Nov 2020' },
  { name: 'OnePlus Nord', codename: 'avicii', start: 'Aug 2020', end: 'Mar 2021', featured: true },
  { name: 'Redmi S2 / Y2', codename: 'ysl', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Poco X3', codename: 'surya / karna', start: 'Dec 2020', end: 'present', featured: true },
  { name: 'Oppo Realme 1', codename: 'CPH1859', start: '2021', end: '' },
  { name: 'Redmi Note 10 Pro', codename: 'sweet', start: 'May 2021', end: '' },
  { name: 'Realme 5 / 5i / 5s', codename: 'r5x', start: 'Jun 2021', end: 'present' },
  { name: 'Redmi Note 8 / 8T', codename: 'ginkgo / willow', start: '2021', end: '2023', featured: true },
  { name: 'Poco M3', codename: 'citrus', start: 'May 2021', end: 'Sep 2021' },
  { name: 'Redmi 9 / 9T', codename: 'lime', start: 'Nov 2021', end: '' },
  { name: 'OnePlus Nord N10 5G', codename: 'billie', start: '2021', end: 'present', featured: true },
  { name: 'Realme 3 Pro', codename: 'RMX1851', start: '2020', end: '' },
  { name: 'Redmi 4 / 4X', codename: 'santoni', start: '2022', end: '', note: 'Part of the MI8937 common kernel' },
  { name: 'Redmi 9 / Poco M2', codename: 'lancelot', start: '2021', end: '2023' },
  { name: 'Realme U1', codename: 'RMX1831', start: '2021', end: '' },
  { name: 'Redmi K30 5G', codename: 'picasso', start: '2021', end: '' },
  { name: 'Realme 7 / Narzo 20 Pro / Narzo 30 4G', codename: 'salaa', start: '2024', end: '' },
  { name: 'Mi A2 Lite', codename: 'daisy', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Redmi Note 4', codename: 'mido', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Redmi 6 Pro', codename: 'sakura', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Mi A1', codename: 'tissot', start: '2022', end: '', note: 'Part of the msm8953 common kernel' },
  { name: 'Redmi 3S / 3S Prime / 3X', codename: 'land', start: '2022', end: '', note: 'Part of the MI8937 common kernel' },
  { name: 'Redmi Note 5A Prime / Y1', codename: 'ugg', start: '2022', end: '', note: 'Part of the MI8937 common kernel' },
  { name: 'Mi 10T Lite / Redmi Note 9 Pro 5G', codename: 'gauguin', start: 'Aug 2026', end: 'present' },
  { name: 'Asus Zenfone Max Pro M2', codename: 'x01bd', start: 'Aug 2026', end: 'present' },
  { name: 'Redmi Note 9 Pro / 9S / Poco M2 Pro', codename: 'miatoll', start: 'Aug 2026', end: 'present' },
  { name: 'Realme 6 / 6i / 6s / Narzo', codename: 'nemo', start: 'Aug 2026', end: 'present' },
];

// Work-in-progress devices (no release date yet).
export const UPCOMING: Device[] = [
  { name: 'Nothing 3a', codename: 'asteroids', start: '', end: '', upcoming: true },
  { name: 'Pixel 9', codename: 'tokay', start: '', end: '', upcoming: true },
  { name: 'Pixel 10', codename: 'frankel', start: '', end: '', upcoming: true },
  { name: 'Redmi Note 8 Pro', codename: 'begonia', start: '', end: '', upcoming: true },
];

export const isActive = (d: Device) => d.end === 'present';

const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

const dateValue = (s: string): number => {
  const year = Number(s.match(/\d{4}/)?.[0] ?? 0);
  const month = MONTHS[s.match(/[A-Za-z]{3}/)?.[0] ?? ''] ?? 0;
  return year * 12 + month;
};

// When a device was last maintained: its end date, or the start date for a
// one-off release. Used for both grouping and ordering (recency-first).
const lastSeen = (d: Device): string => (d.end && d.end !== 'present' ? d.end : d.start);

// Year a device is filed under on the Devices page (its end / last-maintained year).
export const deviceYear = (d: Device): string => lastSeen(d).match(/\d{4}/)?.[0] ?? 'Other';

// Higher = more recently maintained.
export const recencyValue = (d: Device): number => dateValue(lastSeen(d));

// Active devices first, then most-recently-maintained first.
export const byActiveThenNewest = (a: Device, b: Device): number =>
  (Number(isActive(b)) - Number(isActive(a))) || (recencyValue(b) - recencyValue(a));
