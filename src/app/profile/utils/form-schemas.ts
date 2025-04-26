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

export type AllFormValues = {
  username?: string;
  email?: string;
  'phone number'?: string;
  address?: string;
};
