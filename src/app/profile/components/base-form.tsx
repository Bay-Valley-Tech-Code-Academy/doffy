'use client';

import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import type { AllFormValues } from '../utils/form-schemas';
import type { FormControlObj } from '../utils/types';

interface BaseFormProps {
  submitFunction: (values: AllFormValues) => void;
  formSchema: z.AnyZodObject;
  defaultFormValues: AllFormValues;
  formControls: FormControlObj[];
}

export default function BaseForm({
  submitFunction,
  formSchema,
  defaultFormValues,
  formControls,
}: BaseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunction)}>
        {formControls.map(({ controlName, controlPlaceHolder, controlDescription }) => (
          <FormField
            control={form.control}
            key={controlName}
            name={controlName.toLowerCase()}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{controlName}</FormLabel>
                <FormControl>
                  <Input placeholder={controlPlaceHolder} {...field} />
                </FormControl>
                <FormDescription>{controlDescription}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
