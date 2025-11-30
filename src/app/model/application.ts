export interface Application {
  id: string;
  userFirstName: string;
  userLastName: string;
  raceId: string;
  raceName: string;
  raceStartDateTimeUtc: Date;
  club?: string;
  version?: number;
}
