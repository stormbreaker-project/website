// Featured kernels shown on the home page. Edit this list to change the grid.
export type Kernel = {
  codename: string;
  device: string;
  stars: number | string;
  chip: string;
  href: string;
  view?: string;
};

export const KERNELS: Kernel[] = [
  { codename: 'surya', device: 'Poco X3 & X3 NFC — unified source', stars: 66, chip: 'Flagship', href: 'https://github.com/stormbreaker-project/kernel_xiaomi_surya' },
  { codename: 'lavender', device: 'Redmi Note 7 / 7S', stars: 39, chip: 'Popular', href: 'https://github.com/stormbreaker-project/kernel_xiaomi_lavender' },
  { codename: 'citrus', device: 'Poco M3 / Redmi 9T (Global)', stars: 25, chip: 'Popular', href: 'https://github.com/stormbreaker-project/kernel_poco_citrus' },
  { codename: 'ginkgo', device: 'Redmi Note 8 / 8T', stars: 7, chip: 'Maintained', href: 'https://github.com/stormbreaker-project/kernel_xiaomi_ginkgo' },
  { codename: 'avicii', device: 'OnePlus Nord', stars: 7, chip: 'Maintained', href: 'https://github.com/stormbreaker-project/kernel_oneplus_avicii' },
  { codename: '+ more', device: 'Realme, Asus, Nothing, Pixel & mainline ports', stars: 'explore', chip: 'Org', href: 'https://github.com/stormbreaker-project', view: 'All repos' },
];
