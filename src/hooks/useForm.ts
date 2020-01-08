import * as React from 'react';

export const useForm = (callback: any, state: any) => {
  const [values, setValues] = React.useState<any>(state);

  const handleSubmit = (event: React.FormEvent<{}>) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.currentTarget;
    const value = target.value;
    const name = target.name;

    setValues((valu: any) => ({ ...values, [name]: value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
