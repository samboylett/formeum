import { Meta } from "@storybook/react";
import { createForm, FormHTMLCheckboxProps, ValuesFields } from "../lib";
import "./NativeInputs.css";

interface StoryValues {
  booleanField: boolean;
  erroredField: boolean;
  trueField: boolean;

  subForm: {
    booleanField: boolean,
  },
}

const storyForm = createForm<StoryValues>();

export default {
  title: "FormHTMLCheckbox",
  parameters: {
    viewMode: 'docs',
  },
  component: storyForm.FormHTMLCheckbox,
  decorators: [
    Story => (   
      <storyForm.FormHandler
        initialValues={{
          booleanField: false,
          erroredField: false,
          trueField: true,

          subForm: {
            booleanField: false,
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
} as Meta<FormHTMLCheckboxProps<StoryValues, ValuesFields<StoryValues>>>;

export const Default = () => (
  <storyForm.FormHTMLCheckbox name="booleanField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLCheckbox>
);

export const SubForm = () => (
  <storyForm.FormHTMLCheckbox name="subForm.booleanField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLCheckbox>
);

export const Errored = () => (
  <storyForm.FormHTMLCheckbox name="erroredField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLCheckbox>
);

export const True = () => (
  <storyForm.FormHTMLCheckbox name="trueField">
    {(props) => <input {...props} />}
  </storyForm.FormHTMLCheckbox>
);