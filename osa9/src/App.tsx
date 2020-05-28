import React from "react";

const App: React.FC = ({courseParts}) => {
    const courseName = "Half Stack application development";
    
  
    return (
      <div>
        <h1>{courseName}</h1>
        <p>
          {courseParts[0].name} {courseParts[0].exerciseCount}
        </p>
        <p>
          {courseParts[1].name} {courseParts[1].exerciseCount}
        </p>
        <p>
          {courseParts[2].name} {courseParts[2].exerciseCount}
        </p>
        <p>
          Number of exercises{" "}
          {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    );
  };