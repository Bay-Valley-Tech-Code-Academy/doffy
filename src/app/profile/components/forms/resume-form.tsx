'use client';

import {
  type AllFormValues,
  resumeFormDefaultValues,
  resumeFormSchema,
} from '../../utils/form-schemas';
import type { FormControlObj } from '../../utils/types';
import BaseForm from '../base-form';

export default function ResumeForm() {
  const formControls: FormControlObj[] = [
    {
      controlName: 'Resume',
      controlPlaceHolder: '',
      controlDescription: 'Upload Your Resume',
      controlType: 'file',
      possibleFiles: 'application/pdf',
    },
  ];

  function handleSubmit(values: AllFormValues) {
    console.log(values);
  }

  return (
    <BaseForm
      submitFunction={handleSubmit}
      formSchema={resumeFormSchema}
      defaultFormValues={resumeFormDefaultValues}
      formControls={formControls}
    />
  );
}
