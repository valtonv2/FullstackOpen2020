import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from "../types/patient";
import patients from "../../data/patients";
import { v4 as uuidv4 } from 'uuid';



export const getAllPatientsFull = (): Patient[] => {

    const people = patients;
    return people;
};

export const getAllPatientsPublic = (): PublicPatient[] => {

    const people = patients;
    const publicPeople =  people.map( ({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation})); 
    return publicPeople;
};

export const getFullPatientById = (id: string) => {

    const possiblePatient = patients.find(p => p.id === id);

    return possiblePatient;

};

export const addPatient = (p: NewPatient): PublicPatient => {

    const completePatient: Patient = {
        id: uuidv4(),
        ...p
    };

    patients.push(completePatient);

    const copy = {...completePatient};
    delete copy.ssn;

    return copy;

};

export const addEntry = (id: string, entry: NewEntry): Patient => {

    const target = patients.find(p => p.id === id);

    if(!target) throw new Error('No such patient');

    const completeEntry: Entry = {...entry, id: uuidv4()};

    target.entries.push(completeEntry);

    return target;

};