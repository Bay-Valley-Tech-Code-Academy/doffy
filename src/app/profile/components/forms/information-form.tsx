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
      controlType: 'text'
    },
    {
      controlName: 'Email',
      controlPlaceHolder: 'Enter email...',
      controlDescription: 'Personal Email',
      controlType: 'email'
    },
    {
      controlName: 'Phone Number',
      controlPlaceHolder: 'Enter phone number...',
      controlDescription: 'Personal Phone Number',
      controlType: 'tel'
    },
    {
      controlName: 'Address',
      controlPlaceHolder: 'Enter your residential address...',
      controlDescription: 'Residential Address',
      controlType: 'text'
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
