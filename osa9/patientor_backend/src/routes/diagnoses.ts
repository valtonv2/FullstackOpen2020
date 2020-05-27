import {Router} from 'express'
import { getAllDiagnoses } from '../services/diagnosisService'


const router = Router()

router.get('/diagnoses', (_req, res) => {

    const diagnoses = getAllDiagnoses()
    res.status(200).json(diagnoses)

})

export default router