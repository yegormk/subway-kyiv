import { SubwayStation } from './subway-station';

export interface MetroLine {
  name: string;
  color: string;
  coordinates: [number, number][];
  subwayStations: SubwayStation[];
}
