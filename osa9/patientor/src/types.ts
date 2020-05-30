export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface BaseEntry {

  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
 
}

export interface HealthCheckEntry extends BaseEntry{

  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;

}

export interface OccupationalHealthCareEntry extends BaseEntry{

  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {startDate: string; endDate: string};

}

export interface HospitalEntry extends BaseEntry{

  type: "Hospital";
  discharge?: {date: string; criteria: string};
  
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type Codemap = {[key: string]: string|undefined};

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, "id" >;

export type NewOccupationalEntry = Omit<OccupationalHealthCareEntry, "id" >;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;

export type NewEntry = NewHealthCheckEntry|NewHospitalEntry|NewOccupationalEntry;

export const isValidDate = (s: string|undefined): boolean => {

  return typeof s !== 'undefined' && (/\d\d\d\d-\d\d-\d\d/).test(s) && s.length === 10;

};
