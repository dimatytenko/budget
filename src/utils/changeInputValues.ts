import React from 'react';
import type { ChangeEvent } from 'react';

const changeInputValues = <T extends Record<string, unknown>>(
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setInputValues: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { name, value } = e.target;

  setInputValues((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export default changeInputValues;
