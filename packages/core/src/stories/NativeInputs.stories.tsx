import { Meta } from "@storybook/react";
import { createForm } from "../lib";
import "./NativeInputs.css";

interface NativeInputsValues {
  stringField: string;
  booleanField: boolean;
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
