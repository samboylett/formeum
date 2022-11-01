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

      <FormField name="bar">
        {({ name, value, changeValue }) => (
          <label>
            Bar

            <input type="number" name={name} value={value} onChange={e => changeValue(parseInt(e.target.value))} />
          </label>
        )}
      </FormField>

      <FormField name="subForm.yup">
        {({ name, value, changeValue }) => (
          <label>
            Sub Form Yup

            <input name={name} value={value} onChange={e => changeValue(e.target.value)} />
          </label>
        )}
      </FormField>
    </FormHandler>
  );
};
