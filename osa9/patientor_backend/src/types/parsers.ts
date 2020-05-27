import { NewPatient, Gender } from "./patient"

export const toNewPatient = (p:any): NewPatient => {

    return({
        name: parseString(p.name),
        dateOfBirth: parseString(p.dateOfBirth),
        ssn: parseString(p.ssn),
        gender: parseGender(p.gender),
        occupation: parseString(p.occupation)
    })

}




const parseGender = (g:any):Gender => {

    if(!g || !isGender(g)) throw new Error('Not valid gender ' + g)

    return g

}

const parseString = (s:any):string => {

    if(!s || !isString(s)) throw new Error('Not valid string ' + s)

    return s

}


const isString = (s:any):s is string => {

    return typeof s === 'string'

}

const isGender = (g:any): g is Gender => {

    return Object.values(Gender).includes(g)

}

