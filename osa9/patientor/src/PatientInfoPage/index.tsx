import React, { useEffect } from "react";
import { Patient, NewEntry } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue, selectPatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryList from "./EntryList";
import { AddHealthCheckModal, AddOccupationalCheckModal, AddHospitalCheckModal } from "../AddEntryModal";
import { Grid, Button } from "semantic-ui-react";

const PatientInfoPage: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [{ selectedPatient }, dispatchSelected] = useStateValue();
    const [{ patients }, dispatchAll] = useStateValue();
    const [{ diagnoses }] = useStateValue();

    const [healthCheckModalOpen, setHealthCheckModalOpen] = React.useState<boolean>(false);
    const [occupationalCheckModalOpen, setOccupationalCheckModalOpen] = React.useState<boolean>(false);
    const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);

    const [error, setError] = React.useState<string | undefined>();

    const closeModal = (): void => {
        if(healthCheckModalOpen) setHealthCheckModalOpen(false);
        if(occupationalCheckModalOpen) setOccupationalCheckModalOpen(false);
        if(hospitalModalOpen) setHospitalModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
    
        const fetch = async () => {
            
            if(!selectedPatient || selectedPatient.id !== id){
                console.log('Get data');
                try{
                    const patientRes = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                    dispatchSelected(selectPatient(patientRes.data));
                }catch(error){
                    console.log("Error fetching selected patient data");
                }
            }
            
        };

        fetch();
    }, [dispatchAll, dispatchSelected, id, patients, selectedPatient]);

    const handleSubmit = async (e: NewEntry) => {

        try {
            const addRes = await axios.post<Patient>(
              `${apiBaseUrl}/patients/${id}/entries`,
              e
            );
            dispatchSelected(selectPatient(addRes.data));
            closeModal()
          } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
          }


    };


    if(!selectedPatient) return(<div>Loading</div>);

    return(
    <div>
        <h1>{selectedPatient.name}</h1>
        <p>gender: {selectedPatient.gender}</p>
        <p>ssn: {selectedPatient.ssn}</p>
        <p>occupation: {selectedPatient.occupation}</p>

        <EntryList entries={selectedPatient.entries} diagnoses={diagnoses}/>

        <AddHealthCheckModal
        modalOpen={healthCheckModalOpen}
        onSubmit={handleSubmit}
        error={error}
        onClose={closeModal}
        />

        <AddOccupationalCheckModal
        modalOpen={occupationalCheckModalOpen}
        onSubmit={handleSubmit}
        error={error}
        onClose={closeModal}
        />

        <AddHospitalCheckModal
        modalOpen={hospitalModalOpen}
        onSubmit={handleSubmit}
        error={error}
        onClose={closeModal}
        />

        <Grid>
            <Grid.Column width = "3">
                <Button onClick={() => setHealthCheckModalOpen(true)}>New Health Check</Button>
            </Grid.Column>
            <Grid.Column width = "3">
                <Button onClick={() => setOccupationalCheckModalOpen(true)}>New Occupational Check</Button>
            </Grid.Column>
            <Grid.Column width = "3">
                <Button onClick={() => setHospitalModalOpen(true)}>New Hospital Check</Button>
            </Grid.Column>
        </Grid>

    </div>
        );



};

export default PatientInfoPage;