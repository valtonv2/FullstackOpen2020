import {Router} from 'express'
import { getAllPatientsPublic, addPatient } from '../services/patientService'
import { NewPatient } from '../types/patient'
import { toNewPatient } from '../types/parsers'


const router = Router()

router.get('/patients', (_req, res) => {

    const patients = getAllPatientsPublic()
    res.status(200).json(patients)

})

router.post('/patients', (req, res) => {

    try{

    const possiblePatient = req.body

    const newPatient: NewPatient = toNewPatient(possiblePatient)

    const result = addPatient(newPatient)

    res.status(200).json(result)
    }catch(error){
        res.status(400).send(error.message)
    }



})

export default router