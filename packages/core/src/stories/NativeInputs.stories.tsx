import { Meta } from "@storybook/react";
import { L, O, S } from "ts-toolbelt";
import { createForm, ValuesFields } from "../lib";
import "./NativeInputs.css";

interface NativeInputsValues {
  stringField: string;
  booleanField: boolean;

  subForm: {
    stringField: string,
  },
}

const nativeInputsForm = createForm<NativeInputsValues>();

export default {
  title: "NativeInputs",
  parameters: {
    viewMode: 'docs',
  },
  decorators: [
    Story => (   
      <nativeInputsForm.FormHandler
        initialValues={{
          stringField: "",
          booleanField: false,

          subForm: {
            stringField: "",
          },
        }}
        onSubmit={() => Promise.resolve()}
      >
        <Story />
      </nativeInputsForm.FormHandler>
    )
  ]
} as Meta;

export const TextBox = () => (
  <nativeInputsForm.FormHTMLInput name="stringField">
    {(props) => <input {...props} />}
  </nativeInputsForm.FormHTMLInput>
);

export const Checkbox = () => (
  <nativeInputsForm.FormHTMLCheckbox name="booleanField">
    {(props) => <input {...props} />}
  </nativeInputsForm.FormHTMLCheckbox>
);

export const SubFormTextBox = () => (
  <nativeInputsForm.FormHTMLInput name="subForm.stringField">
    {(props) => <input {...props} />}
  </nativeInputsForm.FormHTMLInput>
);