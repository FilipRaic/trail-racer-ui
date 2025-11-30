export interface Race {
  id: string;
  name: string;
  // Backend returns ISO string, keep as string for simpler handling with date pipe
  startDateTimeUtc: string;
  distance: RaceDistance;
  version?: number;
}

export enum RaceDistance {
  FIVE_KM,
  TEN_KNOTS,
  HALF_MARATHON,
  MARATHON
}
