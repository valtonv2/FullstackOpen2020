import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "./FormField";
import { NewOccupationalEntry, isValidDate } from "../types";
import { useStateValue } from "../state";



interface Props {
  onSubmit: (values: NewOccupationalEntry) => void;
  onCancel: () => void;
}

export const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        description: "",
        specialist: "",
        date: "",
        employerName: "",
        diagnosisCodes: [],
        sickLeave: {startDate: "", endDate: ""}
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const formError = "Wrong format";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if(!isValidDate(values.date)){
          errors.date = formError;
        }
        if (!values.diagnosisCodes){
          errors.specialist = requiredError;
        }
        if (!values.employerName){
          errors.employerName = requiredError;
        }
        if (values.sickLeave?.startDate !== "" && !isValidDate(values.sickLeave?.startDate)){
          errors.sickLeave = formError;
        }
        if (values.sickLeave?.startDate !== "" &&!isValidDate(values.sickLeave?.endDate)){
          errors.sickLeave = formError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
             <Field
              label="Employer name"
              placeholder="employer"
              name="employerName"
              component={TextField}
            />
             <Field
              label="Sickleave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
             <Field
              label="Sickleave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses = {Object.values(diagnoses)}
            />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalEntryForm;
