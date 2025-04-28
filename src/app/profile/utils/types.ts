export type FormControlObj = {
  controlName: string;
  controlPlaceHolder: string;
  controlDescription: string;
  controlType: 'text' | 'email' | 'tel' | 'file';
  possibleFiles?: 'application/pdf';
};
