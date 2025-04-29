'use client';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Input } from '~/components/ui/input';
import CertificationForm from '../../components/forms/certification-form';
import { Button } from '~/components/ui/button';

export default function FormConstructor() {
  const [newFileUploadNum, setNewFileUploadNum] = useState<number>(1);
  const [currentFileUploadNum, setCurrentFileUploadNum] = useState<number>(1);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let newNumber = parseInt(e.target.value);
    if (newNumber <= 0) newNumber = 1;
    if (newNumber > 5) newNumber = 5;
    setNewFileUploadNum(newNumber);
  }

  function handleClick() {
    setCurrentFileUploadNum(newFileUploadNum);
  }

  const RenderForm = useCallback(
    () => <CertificationForm fileInputs={currentFileUploadNum} />,
    [currentFileUploadNum],
  );

  return (
    <div>
      <Input
        type="number"
        value={newFileUploadNum}
        onChange={handleChange}
        min={1}
        max={5}
      />
      <Button onClick={handleClick}>Update</Button>

      <RenderForm />
    </div>
  );
}
