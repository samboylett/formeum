import React from 'react';
import { createForm } from "../createForm";

export default {
  title: "Form",
};

interface FormDataType {
  foo: string;
  bar: number;
  yes: boolean;

  subForm: {
    foo: string;
  };
}

const form = createForm<FormDataType>();

export const Form = () => {
  const { FormHandler, FormField, FormHTMLInput, FormHTMLCheckbox, FormValues, ContextMain, FormCallbacks } = form;

  return (
    <FormHandler initialValues={{
      foo: '',
      bar: 0,
      yes: false,
      subForm: {
        foo: '',
      }
    }} onSubmit={() => new Promise(r => setTimeout(r, 500))}>
      <label>
        Foo
        <FormHTMLInput name="foo">
          {props => <input {...props} />}
        </FormHTMLInput>
      </label>

      <label>
        Bar
        <FormField name="bar">
          {({ name, value, changeValue }) => (
            <input type="number" name={name} value={value} onChange={e => changeValue(parseInt(e.target.value))} />
          )}
        </FormField>
      </label>

      <label>
        Yes
        <FormHTMLCheckbox name="yes">
          {props => <input {...props} />}
        </FormHTMLCheckbox>
      </label>

      <label>
        Sub Form Foo
        <FormHTMLInput name="subForm.foo">
          {props => <input {...props} />}
        </FormHTMLInput>
      </label>

      <FormCallbacks>
        {({ current }) => (
          <button onClick={() => current.submitForm()}>
            Submit
          </button>
        )}
      </FormCallbacks>

      <pre>
        <FormValues>
          {values => JSON.stringify(values, null, 2)}
        </FormValues>
      </pre>

      <pre>
        <ContextMain.Consumer shouldUpdate={() => true}>
            {context => (
              <>
                {JSON.stringify({
                  touched: [...context.touched],
                  errors: context.errors,
                  isSubmitting: context.isSubmitting,
                }, null, 2)}
              </>
            )}
        </ContextMain.Consumer>
      </pre>
    </FormHandler>
  );
};
