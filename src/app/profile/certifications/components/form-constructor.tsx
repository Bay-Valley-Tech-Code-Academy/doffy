'use client';
import { type ChangeEvent, useState } from 'react';
import { Input } from '~/components/ui/input';
import CertificationForm from '../../components/forms/certification-form';

export default function FormConstructor() {
  const [fileUploadNum, setFileUploadNum] = useState<number>(1);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let newNumber = parseInt(e.target.value)
        if (newNumber <= 0) newNumber = 1;
        if (newNumber > 5) newNumber = 5;
        setFileUploadNum(newNumber)
    }

  return (
    <div>
      <Input type="number" value={fileUploadNum} onChange={handleChange} min={1} max={5}/>
        
      <CertificationForm fileInputs={fileUploadNum} />
    </div>
  );
}
