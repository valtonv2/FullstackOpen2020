import React from "react";
import { Entry, Diagnosis, Codemap } from "../types";
import EntryComponent from "./Entry";


const EntryList: React.FC<{entries: Entry[]; diagnoses: Diagnosis[]}> = ({entries, diagnoses}) => {


        //Map diagnosis codes to explanations
        const expDiagnoses = (): Codemap => {

            const codes = [...new Set(entries.flatMap(e => e.diagnosisCodes))];

            let exp: Codemap = {};

            if(!diagnoses) return exp;
            
            codes.forEach(c => {
                if(!c) return;
                const found = diagnoses.find(d => d.code === c);
                const name = found ? found.name : undefined;
                exp = {...exp, [c]:name};
            });

            return exp;
        }; 

        const explanations = expDiagnoses();

    
    return(
        <div>
            <h3>Entries</h3>
            {entries.map(e => <EntryComponent entry={e} explanations={explanations} key={e.id}/>)}
        </div>
    );

};

export default EntryList;