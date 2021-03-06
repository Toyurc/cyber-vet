import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

const ClinicalSignsReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: string;
  added: boolean;
  date?: string;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<{ clinicalSigns: string }>({
    clinicalSigns: props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues(() => {
      return {
        clinicalSigns: event.target.value,
      };
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
        <div className="physical__examination__form--input">
          <textarea
            style={{ height: "10rem" }}
            name={"clinicalSign"}
            onChange={handleInputChange}
            value={formValues.clinicalSigns}
          />
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default ClinicalSignsReport;
