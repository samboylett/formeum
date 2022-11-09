import { Meta, Story } from "@storybook/react";
import { createForm, FormHandlerProps } from "../lib";
import "./NativeInputs.css";

interface StoryValues {
  stringField: string;
  requiredField: string;
  booleanField: boolean;

  subForm: {
    stringField: string;
  };
}

const storyForm = createForm<StoryValues>();

export default {
  title: "Examples",
  args: {
    initialValues: {
      stringField: "",
      requiredField: "",
      booleanField: false,

      subForm: {
        stringField: "",
      },
    },
    onSubmit: () => Promise.resolve(),
    validate: (values) =>
      Promise.resolve({
        requiredField:
          values.requiredField.length === 0 ? "Required" : undefined,
      }),
  },
  component: storyForm.FormHandler,
} as Meta<FormHandlerProps<StoryValues>>;

const Template: Story<FormHandlerProps<StoryValues>> = (args) => (
  <storyForm.FormHandler {...args}>
    <storyForm.FormCallbacks>
      {({ onSubmit }) => (
        <form onSubmit={onSubmit}>
          <label>
            String field
            <storyForm.FormHTMLInput name="stringField">
              {(props) => <input {...props} />}
            </storyForm.FormHTMLInput>
          </label>

          <label>
            Required field
            <storyForm.FormHTMLInput name="requiredField">
              {(props) => <input {...props} />}
            </storyForm.FormHTMLInput>
          </label>

          <label>
            Boolean field
            <storyForm.FormHTMLCheckbox name="booleanField">
              {(props) => <input {...props} />}
            </storyForm.FormHTMLCheckbox>
          </label>

          <fieldset>
            Sub Form
            <label>
              String field
              <storyForm.FormHTMLInput name="subForm.stringField">
                {(props) => <input {...props} />}
              </storyForm.FormHTMLInput>
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      )}
    </storyForm.FormCallbacks>

    <pre>
      <storyForm.FormValues>
        {(values) => JSON.stringify(values, null, 2)}
      </storyForm.FormValues>
    </pre>
  </storyForm.FormHandler>
);

export const Default = Template.bind({});

export const ValidateOnMount = Template.bind({});
ValidateOnMount.args = {
  validateOnMount: true,
};

export const PreFilled = Template.bind({});
PreFilled.args = {
  initialValues: {
    stringField: "Foo",
    requiredField: "Bar",
    booleanField: true,

    subForm: {
      stringField: "Beep",
    },
  },
};
