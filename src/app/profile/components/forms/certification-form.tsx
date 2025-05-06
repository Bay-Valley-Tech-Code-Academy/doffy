'use client';

import { z } from 'zod';
import type { AllFormValues, FormControlObj } from '../../utils/types';
import BaseForm from '../base-form';

// Goal:
// Display a default form, this form will have 1 potential file input and a text input to define the name of the certification,
// Additionally, there will be a number input that will allow the user to add multiple file inputs and an associated text input to the form to allow for multiple file uploads.

// Pseudocode:
//  Determine the amount of files the user wishes to upload, by default 1 will be assumed.
// Depending on this number, the schema for the form will be populated with a file property and file name property, likely 'Certification #{num}' and 'Certification #{num} Title',
// The file property and file name properties will be generic and all form fields will need to be populated for the form to submit.
// After all the inputs are added to the schema, the default values object will be created with the appropriate number of certification-# and certification-name-# properties, and the default will be a new File object and a empty string respectively.
// The form control object will then be appended to the formControls array, and based on the number determined by the user, two inputs will be added for each desired file to upload, one for text and a file.
// Once the user submits the form and has successfully populated all inputs, the formSubmission function will pull the user's inputs, the text input will be used to designate the certification's name and the file object will be turned into an arrayBuffer before being stored.

interface CertificationFormProps {
  fileInputs: number;
}

export default function CertificationForm({ fileInputs }: CertificationFormProps) {
  const formControls = [];

  for (let num = 1; num <= fileInputs; num++) {
    const newTextInput: FormControlObj = {
      controlName: `Certification #${num} Title`,
      controlPlaceHolder: 'Enter Certification Name',
      controlDescription: `Name of Certification #${num}`,
      controlType: 'text',
    };
    const newFileInput: FormControlObj = {
      controlName: `Certification #${num}`,
      controlPlaceHolder: 'Select Certification',
      controlDescription: `Upload Certification #${num}`,
      controlType: 'file',
      possibleFiles: 'application/pdf',
    };
    formControls.push(newTextInput, newFileInput);
  }

  const formSchemaObj: Record<
    string,
    | z.ZodString
    | z.ZodEffects<
        z.ZodEffects<
          z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>,
          File,
          File
        >,
        File,
        File
      >
  > = {};

  for (let num = 1; num <= fileInputs; num++) {
    formSchemaObj[`Certification #${num} Title`.toLocaleLowerCase()] = z
      .string()
      .min(1, { message: 'Title cannot be blank!' });
    formSchemaObj[`Certification #${num}`.toLocaleLowerCase()] = z
      .instanceof(File)
      .refine((file) => file, 'Select A File!')
      .refine((file) => file.size < 1024 * 1024 * 5, `Max file size is 5MB!`)
      .refine((file) => file.type === 'application/pdf', 'Only pdf files are accepted!');
  }

  const certificationFormSchema = z.object(formSchemaObj);

  const certificationFormDefaultValues: AllFormValues = {};

  for (let num = 1; num <= fileInputs; num++) {
    certificationFormDefaultValues[`Certification #${num} Title`.toLocaleLowerCase()] =
      '';
    certificationFormDefaultValues[`Certification #${num}`.toLocaleLowerCase()] =
      new File([], '');
  }

  async function handleCertificationFormSubmission(values: AllFormValues) {
    const fileArray: Record<string, ArrayBuffer> = {};
    for (let num = 1; num <= fileInputs; num++) {
      const currentFileName = values[`Certification #${num} Title`.toLocaleLowerCase()];
      const currentFile = values[`Certification #${num}`.toLocaleLowerCase()];
      if (
        currentFile &&
        currentFile instanceof File &&
        currentFileName &&
        typeof currentFileName === 'string'
      ) {
        const arrayBuffer = await currentFile.arrayBuffer();
        fileArray[currentFileName] = arrayBuffer;
      }
    }
    console.log(fileArray);
  }

  return (
    <BaseForm
      submitFunction={handleCertificationFormSubmission}
      formSchema={certificationFormSchema}
      defaultFormValues={certificationFormDefaultValues}
      formControls={formControls}
    />
  );
}
