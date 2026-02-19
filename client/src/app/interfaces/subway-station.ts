export interface SubwayStation {
  name: string;
  coordinates: [number, number];
  description: string;
  branch: 'red' | 'green' | 'blue';
}
