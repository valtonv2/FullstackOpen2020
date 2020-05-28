import React from "react";

const Total: React.FC<{total: number}> = ({total}) => {

    return(
        <div>
            <p>Number of exercises:</p>
            {total}
        </div>
        

    )



}

export default Total