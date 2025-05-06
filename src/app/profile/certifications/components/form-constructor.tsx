'use client';
import { type ChangeEvent, useCallback, useState } from 'react';
import { Input } from '~/components/ui/input';
import CertificationForm from '../../components/forms/certification-form';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';

export default function FormConstructor() {
  const [newFileUploadNum, setNewFileUploadNum] = useState<number>(1);
  const [currentFileUploadNum, setCurrentFileUploadNum] = useState<number>(1);

  function changeFileUploadNum(e: ChangeEvent<HTMLInputElement>) {
    let newNumber = parseInt(e.target.value);
    if (newNumber <= 0) newNumber = 1;
    if (newNumber > 5) newNumber = 5;
    setNewFileUploadNum(newNumber);
  }

  function updateFileUploadNum() {
    setCurrentFileUploadNum(newFileUploadNum);
  }

  const RenderForm = useCallback(
    () => <CertificationForm fileInputs={currentFileUploadNum} />,
    [currentFileUploadNum],
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Label htmlFor="fileUploadCount" className="h-8 text-lg">
          Input Count:
        </Label>
        <Input
          className="h-8 w-fit"
          id="fileUploadCount"
          type="number"
          value={newFileUploadNum}
          onChange={changeFileUploadNum}
          min={1}
          max={5}
        />
        <Button onClick={updateFileUploadNum} className="h-8">
          Update
        </Button>
      </div>

      <hr className="" />

      <RenderForm />
    </div>
  );
}
