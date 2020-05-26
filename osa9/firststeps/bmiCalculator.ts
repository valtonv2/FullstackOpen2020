export const calculateBmi = (height: number, weight: number): string => {

    if(isNaN(height) || isNaN(weight)) return('Error: False paremeters');

    const meters = height / 100;

    const value = (weight/(meters*meters));

    if(value < 18.5) return('Underweight');
    else if(18.5 <= value && value < 25) return('Normal weight');
    else if(25 <= value && value < 30) return('Overweight');
    else return ('Obese');

};

//Code for running calculator from command line.
//Causes problems in later exercises

//const h:number = Number(process.argv[2]);
//const w:number = Number(process.argv[3]);


//console.log(calculateBmi(h, w));
