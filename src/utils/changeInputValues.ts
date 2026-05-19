import React from 'react';
import type { ChangeEvent } from 'react';

const changeInputValues = <T extends object>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setInputValues: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { name, value } = e.target;

  setInputValues((prev) => ({
    ...prev,
    [name]: value,
  }) as T);
};

export default changeInputValues;
