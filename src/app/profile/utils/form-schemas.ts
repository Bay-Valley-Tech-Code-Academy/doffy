import { z } from 'zod';

// Temporary phone number validation, checks for 10 digits.
const phoneNumberPattern = /\d{10}/g;

export const informationFormSchema = z.object({
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

export const informationFormDefaultValues = {
  username: '',
  email: '',
};

export const resumeFormSchema = z.object({
  resume: z
    .custom<File>()
    .refine((file) => file.type !== 'application/pdf', {
      message: 'Invalid document type.',
    })
    // Checks that the file is less than 10 MB
    // .refine((file) => file.size > 0, {
    //   message: 'File Too Large',
    // })
});

export const resumeFormDefaultValues: { resume: '' } = {
  resume: '',
};

export type AllFormValues = {
  username?: string;
  email?: string;
  'phone number'?: string;
  address?: string;
  resume?: File | '';
};
