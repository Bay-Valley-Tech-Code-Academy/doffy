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
    .instanceof(File)
    .refine((file) => file, 'Select A File!')
    .refine((file) => file.size < 1024 * 1024 * 5, `Max file size is 5MB!`)
    .refine((file) => file.type === 'application/pdf', 'Only pdf files are accepted!'),
});

export const resumeFormDefaultValues = {
  resume: new File([], ''),
};

export type AllFormValues = {
  username?: string;
  email?: string;
  'phone number'?: string;
  address?: string;
  resume?: File;
};
