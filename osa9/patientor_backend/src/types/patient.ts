export interface Patient {

    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string

}

export type PublicPatient = Omit< Patient, "ssn">

export type NewPatient = Omit<Patient, "id">

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}