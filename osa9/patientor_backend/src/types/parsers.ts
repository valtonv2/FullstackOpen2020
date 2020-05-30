import { NewPatient, Gender, Entry, NewEntry, NewHealthCheckEntry, NewOccupationalHealthEntry, NewHospitalEntry } from "./patient";
/* eslint-disable @typescript-eslint/no-explicit-any*/


const isString = (s: any): s is string => {

    return typeof s === 'string';

};

export const isValidDate = (s: any): boolean => {

    return isString(s) && (/\d\d\d\d-\d\d-\d\d/).test(s) && s.length === 10;

};

const isGender = (g: any): g is Gender => {

    return Object.values(Gender).includes(g);

};


const matchesBaseEntry = (e: any): boolean => {

    return (e.date && e.specialist && e.description && e.type );

};

const isNewHealthCheckEntry = (e: any): e is NewHealthCheckEntry => {

    return matchesBaseEntry(e) && e.healthCheckRating && e.type === "HealthCheck";

};

const isNewOccupationalEntry = (e: any): e is NewOccupationalHealthEntry => {

    return matchesBaseEntry(e) && e.employerName && e.type === "OccupationalHealthcare";

};

const isNewHospitalEntry = (e: any): e is NewHospitalEntry => {

    return matchesBaseEntry(e) && e.type === "Hospital";

};


const isNewEntry = (e: any): e is NewEntry => {

    return (isNewHealthCheckEntry(e)||isNewHospitalEntry(e)||isNewOccupationalEntry(e));

};

const isEntry = (e: any): e is Entry => {

    return isNewEntry && e.id;

};

const parseEntry = (e: any): Entry => {

    if(!isEntry(e)) throw new Error('Not valid entry ' + e);

    return e;

};

export const parseNewEntry = (e: any): NewEntry => {

    if(!isNewEntry(e) && !isValidDate(e.date)) throw new Error('Not valid entry ' + e);

    return e;

};


const parseGender = (g: any): Gender => {

    if(!g || !isGender(g)) throw new Error('Not valid gender ' + g);

    return g;

};

const parseString = (s: any): string => {

    if(!s || !isString(s)) throw new Error('Not valid string ' + s);

    return s;

};

const parseEntries = (e: any): Entry[] => {

    if(!e || !Array.isArray(e)) throw new Error('Entry list missing or of wrong type.');

    const res: Entry[] = e.map(e => parseEntry(e));
    return res; 
};







export const toNewPatient = (p: any): NewPatient => {

    return({
        name: parseString(p.name),
        dateOfBirth: parseString(p.dateOfBirth),
        ssn: parseString(p.ssn),
        gender: parseGender(p.gender),
        occupation: parseString(p.occupation),
        entries: parseEntries(p.entries)
    });

};