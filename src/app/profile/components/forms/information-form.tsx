'use client';

import BaseForm from '../base-form';
import type { AllFormValues, FormControlObj } from '../../utils/types';
import { z } from 'zod';
export default function InformationForm() {
  const formControls: FormControlObj[] = [
    {
      controlName: 'Username',
      controlPlaceHolder: 'Enter username...',
      controlDescription: 'Publicly Displayed Name',
      controlType: 'text',
    },
    {
      controlName: 'Email',
      controlPlaceHolder: 'Enter email...',
      controlDescription: 'Personal Email',
      controlType: 'email',
    },
    {
      controlName: 'Phone Number',
      controlPlaceHolder: 'Enter phone number...',
      controlDescription: 'Personal Phone Number',
      controlType: 'tel',
    },
    {
      controlName: 'Address',
      controlPlaceHolder: 'Enter your residential address...',
      controlDescription: 'Residential Address',
      controlType: 'text',
    },
  ];

  // Temporary phone number validation, checks for 10 digits.
  const phoneNumberPattern = /\d{10}/g;

  const informationFormSchema = z.object({
    username: z.string().min(1, {
      message: 'Username cannot be blank!',
    }),
    email: z.string().email({
      message: 'Enter a valid email!',
    }),
    'phone number': z.string().regex(phoneNumberPattern, 'Invalid Phone Number!'),
    address: z.string().min(1, {
      message: 'Address cannot be blank!',
    }),
  });

  const informationFormDefaultValues = {
    username: '',
    email: '',
  };

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
