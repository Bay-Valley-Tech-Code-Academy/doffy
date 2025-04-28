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
      controlPlaceHolder: 'Resume',
      controlDescription: 'Upload Your Resume',
      controlType: 'file',
      possibleFiles: 'application/pdf',
    },
  ];

  async function handleSubmit(values: AllFormValues) {
    if (values.resume) {
      const file = await values.resume.arrayBuffer();
      console.log(file);
    }
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
