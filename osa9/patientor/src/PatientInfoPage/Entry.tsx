import React from "react";
import { Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry, Codemap } from "../types";
import {Icon, Segment} from 'semantic-ui-react';

const assertNever = (val: never): never => {

    throw new Error('Unhandled union member: ' + JSON.stringify(val));

};


const EntryComponent: React.FC<{entry: Entry; explanations: Codemap }> = ({entry, explanations}) => {

      switch(entry.type) {

        case "Hospital":
            return <HospitalEntryComponent entry={entry} explanations={explanations}/>;
        case "OccupationalHealthcare":
            return <OccupationalEntryComponent entry={entry} explanations={explanations}/>;
        case "HealthCheck": 
            return <HealthCheckEntryComponent entry={entry} explanations={explanations}/>;
        default: 
            return assertNever(entry); 

      }
       

};

const HospitalEntryComponent: React.FC<{entry: HospitalEntry; explanations: Codemap}> = ({entry, explanations}) => {

      
    return(
    <Segment key={entry.id}>
        <h3>{entry.date}</h3>
        <Icon name='first aid'/>
        <p>{entry.description}</p>
        <p>Discharge: {entry.discharge ? `${entry.discharge.date} ${entry.discharge.criteria}`: 'pending' }</p>
        <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(c => <li key={c}>{c}  {explanations[c]}</li>): null}
        </ul>
    </Segment>
    );

};

const OccupationalEntryComponent: React.FC<{entry: OccupationalHealthCareEntry; explanations: Codemap}> = ({entry, explanations}) => {

      
    return(
    <Segment key={entry.id}>
        <h3>{entry.date}</h3>
        <Icon name='briefcase'/>
        <p>Employer: {entry.employerName}</p>
        <p>{entry.description}</p>
        <p>Sick leave: {entry.sickLeave ? `${entry.sickLeave.startDate} - ${entry.sickLeave.endDate}`: 'not necessary' }</p>
        
        <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(c => <li key={c}>{c}  {explanations[c]}</li>): null}
        </ul>
    </Segment>
    );

};

const HealthCheckEntryComponent: React.FC<{entry: HealthCheckEntry; explanations: Codemap}> = ({entry, explanations}) => {

      
    return(
    <Segment key={entry.id}>
        <h3>{entry.date}</h3>
        <Icon name='doctor'/>
        <p>{entry.description}</p>
        <p>Health rating: {entry.healthCheckRating}</p>
        <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(c => <li key={c}>{c}  {explanations[c]}</li>): null}
        </ul>
    </Segment>
    );

};


   




export default EntryComponent;