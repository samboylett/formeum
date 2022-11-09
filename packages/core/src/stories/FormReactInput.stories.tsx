import { Meta } from "@storybook/react";
import { forwardRef } from "react";
import { createForm, FormReactInputProps, ValuesFields } from "../lib";
import "./NativeInputs.css";

interface StoryValues {
  stringField: string;
  erroredField: string;
  filledField: string;

  subForm: {
    stringField: string,
  },
}

const storyForm = createForm<StoryValues>();

interface UpperCaseInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

const UpperCaseInput = forwardRef<HTMLInputElement, UpperCaseInputProps>(({ onChange, ...props }, ref) => (
    <input
        onChange={e => onChange(e.target.value.toUpperCase())}
        {...props}
        ref={ref}
    />
));

export default {
  title: "FormReactInput",
  parameters: {
    viewMode: 'docs',
  },
  component: storyForm.FormReactInput,
  decorators: [
    Story => (   
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
        validate={() => Promise.resolve({
          erroredField: "Error",
        })}
      >
        <Story />
      </storyForm.FormHandler>
    )
  ]
} as Meta<FormReactInputProps<StoryValues, ValuesFields<StoryValues>>>;

export const Default = () => (
  <storyForm.FormReactInput name="stringField">
    {(props) => <UpperCaseInput {...props} />}
  </storyForm.FormReactInput>
);

export const SubForm = () => (
  <storyForm.FormReactInput name="subForm.stringField">
    {(props) => <UpperCaseInput {...props} />}
  </storyForm.FormReactInput>
);

export const Errored = () => (
  <storyForm.FormReactInput name="erroredField">
    {(props) => <UpperCaseInput {...props} />}
  </storyForm.FormReactInput>
);

export const Filled = () => (
  <storyForm.FormReactInput name="filledField">
    {(props) => <UpperCaseInput {...props} />}
  </storyForm.FormReactInput>
);