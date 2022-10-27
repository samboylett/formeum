import React from 'react';
import { createForm } from "../createForm";

export default {
  title: "Form",
};

interface FormDataType {
  foo: string;
  bar: number;

  subForm: {
    yup: string;
  };
}

const form = createForm<FormDataType>({});

export const Form = () => {
  const { FormHandler, FormField } = form;

  return (
    <FormHandler initialValues={{
      foo: '',
      bar: 0,
      subForm: {
        yup: '',
      }
    }}>
      <FormField name="foo">
        {({ name, value, changeValue }) => (
          <label>
            Foo

            <input name={name} value={value} onChange={e => changeValue(e.target.value)} />
          </label>
        )}
      </FormField>
    </FormHandler>
  );
};
