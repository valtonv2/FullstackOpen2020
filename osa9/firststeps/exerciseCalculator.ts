interface ExerciseResult {

    days: number;
    trainingDays: number;
    target: number;
    average: number;
    targetReached: boolean;
    rating: number;
    explanation: string;

}

export const calculateExercises = (measurements: Array<number>, target: number): ExerciseResult => {

    const days = measurements.length;
    const trainingDays = measurements.filter(m => m !== 0).length;
    const average = measurements.reduce((a,b) => a+b, 0) / days;

    const targetReached = target <= average;

    const diff = Math.abs(target-average);

    let rating = 0;
    let explanation = '';

    if(diff < 0.5) rating = 3;
    else if(diff < 1) rating = 2;
    else rating = 1;
   
    switch(rating){
        case 1: {explanation = 'Keep training!'; break;}
        case 2: {explanation = 'Good, but you can still do better!'; break;}
        case 3: {explanation = 'Excellent work!'; break;}
    }
    
    return({
        days,
        trainingDays,
        target,
        average,
        targetReached,
        rating,
        explanation
    });
};

//const target: number = Number(process.argv[2])

//const measurements: Array<number> = process.argv.slice(3).map(m => Number(m)).filter(m => m !== NaN)

//if(measurements.length === 0 || target === NaN) console.log('Invalid input')
//else console.log(calculateExercises(measurements, target))