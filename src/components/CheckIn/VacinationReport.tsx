import { Input, InputValidationTypes } from "components/Input/input";
import { formatDateForCalendar } from "lib/utils";
import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

interface IData {
  vaccination: {
    type: string;
    name: string;
    dosage: string;
    nextDate: string;
    smsReminder: boolean;
    emailReminder: boolean;
  };
}

const VacinationReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: IData;
  date?: string;
  added: boolean;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<IData>({
    ...props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: IData) => {
      if (["smsReminder", "emailReminder"].includes(event.target.name)) {        
        formValues.vaccination = {
          ...formValues.vaccination,
          // @ts-ignore
          [event.target.name]: event.target.checked,
        };        
      } else {
        formValues.vaccination = {
          ...formValues.vaccination,
          [event.target.name]: event.target.value,
        };
      }
      return formValues;
    });
  };

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      date={props.date}
      canEdit={props.added}
    >
      <form className="medical__report__form">
        <div className="medical__report__form--input">
          <div className="physical__examination__form--input">
            <label>Vaccination Type</label>
            <Input
              type="text"
              name={"type"}
              onChange={handleInputChange}
              validation={InputValidationTypes.text}
              defaultValue={formValues.vaccination.type}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Vaccine Name</label>
            <Input
              type="text"
              validation={InputValidationTypes.text}
              name={"name"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.name}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Vaccination Dosage</label>
            <Input
              type="text"
              validation={InputValidationTypes.text}
              name={"dosage"}
              onChange={handleInputChange}
              defaultValue={formValues.vaccination.dosage}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Date of next shot</label>
            <Input
              type="date"
              min={formatDateForCalendar(new Date().toISOString())}
              name={"nextDate"}
              onChange={handleInputChange}
              defaultValue={formatDateForCalendar(formValues.vaccination.nextDate)}
            />
          </div>

          <div className="checkboxes">
            <div className="physical__examination__form--input ">
              <label>Email Reminder</label>
              <Input
                type="checkbox"
                name="emailReminder"
                onChange={handleInputChange}
                defaultChecked={formValues.vaccination.emailReminder}
              />
            </div>

            <div className="physical__examination__form--input ">
              <label>SMS</label>
              <Input
                type="checkbox"
                name="smsReminder"
                onChange={handleInputChange}
                defaultChecked={formValues.vaccination.smsReminder}
              />
            </div>
          </div>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default VacinationReport;
