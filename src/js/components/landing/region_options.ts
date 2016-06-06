export interface RegionOptions {
  [key: string]: string;
  name: string;
  value: string;
}

export const REGION_VALUES: RegionOptions[] = [
  {
    name: 'International',
    value: ''
  },
  {
    name: 'Austria',
    value: 'at'
  },
  {
    name: 'Canada',
    value: 'ca'
  },
  {
    name: 'Germany',
    value: 'de'
  },
  {
    name: 'Switzerland',
    value: 'ch'
  },
  {
    name: 'USA',
    value: 'us'
  },
  {
    name: 'Simulate Unhandled Exception',
    value: {
      that: 'object',
      will: 'cause',
      an: 'error'
    }
  }
];
