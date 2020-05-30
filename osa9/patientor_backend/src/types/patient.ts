import { Diagnosis } from "./diagnosis";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">; 
export type NewOccupationalHealthEntry = Omit<OccupationalHealthCareEntry, "id">; 
export type NewHospitalEntry = Omit<HospitalEntry, "id">; 

export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthEntry | NewHospitalEntry;

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface Patient {

    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];

}

export type PublicPatient = Omit< Patient, "ssn"|"entries">;

export type NewPatient = Omit<Patient, "id">;

export enum Gender{
    Male = "male",
    Female = "female",
    Other = "other"
}