'use client';

import {
  informationFormSchema,
  informationFormDefaultValues,
  type AllFormValues,
} from '../../utils/form-schemas';
import BaseForm from '../base-form';
import type { FormControlObj } from '../../utils/types';
export default function InformationForm() {
  const formControls: FormControlObj[] = [
    {
      controlName: 'Username',
      controlPlaceHolder: 'Enter username...',
      controlDescription: 'Publicly Displayed Name',
    },
    {
      controlName: 'Email',
      controlPlaceHolder: 'Enter email...',
      controlDescription: 'Personal Email',
    },
  ];

  function handleSubmit(values: AllFormValues) {
    console.log(values);
  }

  return (
    <BaseForm
      submitFunction={handleSubmit}
      formSchema={informationFormSchema}
      defaultFormValues={informationFormDefaultValues}
      formControls={formControls}
    />
  );
}
