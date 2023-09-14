import type { Response } from '@/utils/responses';

export type Option = {
  id: string;
  isSelected: boolean;
  count: number;
};

export type Filter = {
  id: string;
  name: string;
  options: Array<Option>;
};

export const defaultFilters: Array<Filter> = [
  {
    id: 'track',
    name: 'Hackathon Track',
    options: [
      {
        id: 'Physical Infrastructure Networks',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Finance and Payments',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Gaming & Entertainment',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Mobile Consumer dApps',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Crypto Infrastructure',
        isSelected: false,
        count: 0,
      },
      {
        id: 'AI',
        isSelected: false,
        count: 0,
      },
      {
        id: 'DAOs and Network States',
        isSelected: false,
        count: 0,
      },
    ],
  },
  {
    id: 'superteamMember',
    name: 'Superteam Country',
    options: [
      {
        id: 'India',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Turkey',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Vietnam',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Germany',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Mexico',
        isSelected: false,
        count: 0,
      },
      {
        id: 'UAE',
        isSelected: false,
        count: 0,
      },
      {
        id: 'UK',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Nigeria',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Israel',
        isSelected: false,
        count: 0,
      },
      {
        id: 'Brazil',
        isSelected: false,
        count: 0,
      },
    ],
  },
];

export const initFilters = (responses: Array<Response>) => {
  const filters = defaultFilters.map((f) => {
    const optionsWithCount = f.options.map((o) => {
      const list = responses?.filter((r) =>
        f.id === 'track'
          ? r.tracks.indexOf(o.id) >= 0
          : r.superteam.indexOf(o.id) >= 0
      );
      return {
        ...o,
        count: list.length,
      };
    });

    return {
      ...f,
      options: optionsWithCount,
    };
  });
  return filters;
};
