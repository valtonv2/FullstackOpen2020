import {Router} from 'express';
import { getAllPatientsPublic, addPatient, getFullPatientById, addEntry } from '../services/patientService';
import { NewPatient, NewEntry } from '../types/patient';
import { toNewPatient, parseNewEntry } from '../types/parsers';


const router = Router();

router.get('/patients', (_req, res) => {

    const patients = getAllPatientsPublic();
    res.status(200).json(patients);

});

router.get('/patients/:id', (req, res) => {

    const id = req.params.id;

    const possiblePatient = getFullPatientById(id);

    if(possiblePatient) res.status(200).json(possiblePatient);
    else res.status(400).json({error: 'No such patient'});

});

router.post('/patients', (req, res) => {

    try{

    const possiblePatient = req.body;
        console.log(possiblePatient);
    const newPatient: NewPatient = toNewPatient(possiblePatient);

    const result = addPatient(newPatient);

    res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }

});

router.post('/patients/:id/entries', (req, res) => {

    try{

    const id = req.params.id;
    const possibleEntry = req.body;
    console.log(possibleEntry);
    const newEntry: NewEntry = parseNewEntry(possibleEntry);

    const result = addEntry(id, newEntry);

    res.status(200).json(result);
    }catch(error){
        res.status(400).send(error.message);
    }

});

export default router;