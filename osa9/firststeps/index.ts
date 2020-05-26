import express = require('express');
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    const height = Number(req.query.height)
    const weight = Number(req.query.weight)

    if(!height || !weight || height === NaN || weight === NaN || height <= 0 || weight <= 0){
        res.json({error: "Malformatted parameters"}).status(400)
    }else{

        const bmi = calculateBmi(height, weight)

        res.json({
            weight,
            height,
            bmi
        })
    }
});

app.post('/exercises', (req, res) => {

    try{

    const body = req.body

    const exercises = body.daily_exercises
    const target = Number(body.target)

    if(!exercises || !target){

        res.json({error: "Missing parameters"}).status(400)

    }else if(!(exercises instanceof Array ) || exercises.map(n => Number(n)).includes(NaN) || target === NaN){

        res.json({error: "Malformatted parameters"}).status(400)

    }else{

        const result = calculateExercises(exercises, target)

        res.json(result)
    }
}catch(error){

    res.status(400).json({error: error.message})

}
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});