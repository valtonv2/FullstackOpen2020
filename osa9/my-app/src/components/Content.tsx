import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

const Content: React.FC<{parts: CoursePart[]}> = ({parts}) => {

    const partlist = parts


    return(
        <div>
            {partlist.map(p => <Part part={p} key={p.name} />)}
        </div>
    )

}

export default Content