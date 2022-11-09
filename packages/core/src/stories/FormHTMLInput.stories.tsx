import { Meta } from "@storybook/react";
import { createForm, FormHTMLInputProps, ValuesFields } from "../lib";
import "./NativeInputs.css";

interface StoryValues {
  stringField: string;
  erroredField: string;
  filledField: string;

  subForm: {
    stringField: string;
  };
}

const storyForm = createForm<StoryValues>();

export default {
  title: "FormHTMLInput",
  component: storyForm.FormHTMLInput,
  decorators: [
    (story) => (
      <storyForm.FormHandler
        initialValues={{
          stringField: "",
          erroredField: "",
          filledField: "Value",

          subForm: {
            stringField: "",
          },
        }}
        validateOnMount
        onSubmit={() => Promise.resolve()}
        validate={() =>
          Promise.resolve({
            erroredField: "Error",
          })
        }
      >
        {story()}
      </storyForm.FormHandler>
    ),
  ],
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

export const Filled = () => (
  <storyForm.FormHTMLInput name="filledField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLInput>
);
