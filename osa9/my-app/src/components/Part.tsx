import React from "react";
import { CoursePart } from "../types";

const assertNever = (val: never): never => {

    throw new Error('Unhandled union member: ' + JSON.stringify(val));

};

const Part: React.FC<{part: CoursePart}> = ({part}) => {

    switch (part.name){

        case "Fundamentals":
            return(<div>{part.name} {part.description} {part.exerciseCount}</div>)
            

        case "Using props to pass data":
            return(<div>{part.name} {part.exerciseCount} {part.groupProjectCount}</div>)
        

        case "Deeper type usage":
            return(<div>{part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}</div>)

        case "Course part with kittens":
            return(<div>{part.name} {part.description} {part.exerciseCount} {part.amountOfKittens}</div>)

        default:
            return assertNever(part)

    }


    

}

export default Part