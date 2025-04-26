import { z } from 'zod';

export const informationFormSchema = z.object({
  username: z.string().min(1, {
    message: 'Username cannot be blank!',
  }),
  email: z.string().email({
    message: 'Enter a valid email!',
  }),
});

export const informationFormDefaultValues = {
  username: '',
  email: '',
};

export type AllFormValues = {
  username?: string;
  email?: string;
};
