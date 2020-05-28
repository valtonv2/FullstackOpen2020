import React from "react";

const Content: React.FC<{parts: CoursePart}> = ({parts}) => {

    return(
        <div>
            parts.map(p => <p>{p.name} {p.exerciseCount}</p>)
        </div>
    )

}