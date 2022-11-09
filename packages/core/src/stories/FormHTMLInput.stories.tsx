import { Meta } from "@storybook/react";
import { L, O, S } from "ts-toolbelt";
import { createForm, FormHTMLInputProps, ValuesFields } from "../lib";
import "./NativeInputs.css";

interface StoryValues {
  stringField: string;
  erroredField: string;

  subForm: {
    stringField: string,
  },
}

const storyForm = createForm<StoryValues>();

export default {
  title: "FormHTMLInput",
  parameters: {
    viewMode: 'docs',
  },
  component: storyForm.FormHTMLInput,
  decorators: [
    Story => (   
      <storyForm.FormHandler
        initialValues={{
          stringField: "",
          erroredField: "",

          subForm: {
            stringField: "",
          },
        }}
        validateOnMount
        onSubmit={() => Promise.resolve()}
        validate={() => Promise.resolve({
          erroredField: "Error",
        })}
      >
        <Story />
      </storyForm.FormHandler>
    )
  ]
} as Meta<FormHTMLInputProps<StoryValues, ValuesFields<StoryValues>>>;

export const Default = () => (
  <storyForm.FormHTMLInput name="stringField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLInput>
);

export const SubForm = () => (
  <storyForm.FormHTMLInput name="subForm.stringField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLInput>
);

export const Errored = () => (
  <storyForm.FormHTMLInput name="erroredField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLInput>
);