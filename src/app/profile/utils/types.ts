export type FormControlObj = {
  controlName: string;
  controlPlaceHolder: string;
  controlDescription: string;
  controlType: 'text' | 'email' | 'tel' | 'file';
  possibleFiles?: 'application/pdf';
};

export type AllFormValues = Record<string, File | string | number>;
