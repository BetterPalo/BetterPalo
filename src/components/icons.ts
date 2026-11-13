/**
 * Stroke icons on a 24px grid, 2px stroke, square caps (DESIGN.md "Icons").
 * Path data comes from the White Portal draft.
 */
export const iconPaths = {
  users:
    'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.4c2.1.7 3.5 2.8 3.5 5.6',
  pulse: 'M3 12h4l2.5-6 4 12 2.5-6H21',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  building:
    'M4 21V7l8-4 8 4v14M4 21h16M8 10h1M8 14h1M8 18h1M15 10h1M15 14h1M15 18h1M11.5 21v-4h1v4',
  store:
    'M4 9.5 5.5 4h13L20 9.5M4 9.5h16M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5 12v8h14v-8M10 20v-5h4v5',
  home: 'M3 11 12 4l9 7M5.5 9.5V20h13V9.5M10 20v-6h4v6',
  check: 'M4.5 12.5 9.5 17.5 19.5 6.5',
  flag: 'M5 21V4M5 4h12l-2.5 4L17 12H5',
  print: 'M7 9V3h10v6M7 17H4v-8h16v8h-3M7 14h10v7H7z',
  globe:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9s1.2-6.4 3.7-9Z',
  book: 'M12 6.5C10 5 7 4.5 3.5 5v13.5c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5ZM12 6.5V20',
  code: 'M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15',
  map: 'M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4ZM9 4v14M15 6v14',
  ne: 'M7 17 17 7M8.5 7H17v8.5',
  right: 'M4 12h15M13 6l6 6-6 6',
  down: 'M12 4v15M6 13l6 6 6-6',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM15.5 15.5 20 20',
  pin: 'M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21ZM12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  doc: 'M8 4h8l3 3v13H5V4h3M9 3h6v3H9zM8.5 11.5h7M8.5 15h7M8.5 18h4',
  peso: 'M8 20V4h5a4 4 0 0 1 0 8H8M5 7.5h14M5 10.5h14',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  moon: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z',
  sunny:
    'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
} as const;

export type IconName = keyof typeof iconPaths;
