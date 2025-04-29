'use client';

import { z } from 'zod';
import type { AllFormValues, FormControlObj } from '../../utils/types';
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

  const resumeFormSchema = z.object({
    resume: z
      .instanceof(File)
      .refine((file) => file, 'Select A File!')
      .refine((file) => file.size < 1024 * 1024 * 5, `Max file size is 5MB!`)
      .refine((file) => file.type === 'application/pdf', 'Only pdf files are accepted!'),
  });

  const resumeFormDefaultValues: AllFormValues = {
    resume: new File([], ''),
  };

  async function handleSubmit(values: AllFormValues) {
    if (values.resume && values.resume instanceof File) {
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
