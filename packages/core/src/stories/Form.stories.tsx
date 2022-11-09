import React, { ReactElement, ReactNode, useRef } from "react";
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

const RenderCount = ({ children }: { children?: ReactNode }) => {
  const count = useRef(0);

  count.current++;

  return (
    <div style={{ display: "flex", columnGap: "10px" }}>
      {children} <div>Render count: {count.current}</div>
    </div>
  );
};

export const Form = () => {
  const {
    FormHandler,
    FormReactInput,
    FormHTMLInput,
    FormHTMLCheckbox,
    FormValues,
    ContextMain,
    FormCallbacks,
  } = form;

  return (
    <FormHandler
      initialValues={{
        foo: "",
        bar: 0,
        yes: false,
        subForm: {
          foo: "",
        },
      }}
      onSubmit={() => new Promise((r) => setTimeout(r, 500))}
      validate={(values) =>
        Promise.resolve({
          bar: values.bar === 5 ? undefined : "Must be 5",
          "subForm.foo": values.subForm.foo === "" ? "Required" : undefined,
        })
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <div>
          <RenderCount />
        </div>
        <label>
          Foo
          <FormHTMLInput name="foo">
            {(props) => (
              <RenderCount>
                <input {...props} />
              </RenderCount>
            )}
          </FormHTMLInput>
        </label>

        <label>
          Bar
          <FormReactInput name="bar">
            {({ onChange, ...props }) => (
              <RenderCount>
                <input
                  type="number"
                  {...props}
                  onChange={(e) => onChange(parseInt(e.target.value))}
                />
              </RenderCount>
            )}
          </FormReactInput>
        </label>

        <label>
          Yes
          <FormHTMLCheckbox name="yes">
            {(props) => (
              <RenderCount>
                <input {...props} />
              </RenderCount>
            )}
          </FormHTMLCheckbox>
        </label>

        <label>
          Sub Form Foo
          <FormHTMLInput name="subForm.foo">
            {(props) => (
              <RenderCount>
                <input {...props} />
              </RenderCount>
            )}
          </FormHTMLInput>
        </label>

        <FormCallbacks>
          {({ submitForm }) => (
            <RenderCount>
              <button onClick={() => submitForm()}>Submit</button>
            </RenderCount>
          )}
        </FormCallbacks>

        <pre>
          <FormValues>{(values) => JSON.stringify(values, null, 2)}</FormValues>
        </pre>

        <pre>
          <ContextMain.Consumer shouldUpdate={() => true}>
            {(context) => (
              <>
                {JSON.stringify(
                  {
                    touched: [...context.touched],
                    errors: context.errors,
                    isSubmitting: context.isSubmitting,
                  },
                  null,
                  2
                )}
              </>
            )}
          </ContextMain.Consumer>
        </pre>
      </div>
    </FormHandler>
  );
};
