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
import type { AllFormValues, FormControlObj } from '../utils/types';
import { useMemo } from 'react';

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

  const RenderFormControls = useMemo(() =>
    formControls.map((formControl) => (
      <FormField
        control={form.control}
        key={formControl.controlName}
        name={formControl.controlName.toLowerCase()}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{formControl.controlName}</FormLabel>
            <FormControl>
              {formControl.controlType === 'file' ? (
                <Input
                  placeholder={formControl.controlPlaceHolder}
                  type="file"
                  accept={formControl.possibleFiles}
                  onChange={(event) => {
                    field.onChange(event.target.files?.[0]);
                  }}
                />
              ) : (
                <Input
                  placeholder={formControl.controlPlaceHolder}
                  type={formControl.controlType}
                  {...field}
                />
              )}
            </FormControl>
            <FormDescription>{formControl.controlDescription}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )), [formControls, form.control]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitFunction)} className="flex flex-col gap-5">
        {RenderFormControls}

        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
