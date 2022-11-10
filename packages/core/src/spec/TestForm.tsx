import { ReactNode } from "react";
import { ContextMainInterface, createForm } from "../lib";

export interface TestFormValues {
    stringField: string;
    numberField: number;
    booleanField: boolean;

    childForm: {
        stringField: string;
        numberField: number;
        booleanField: boolean;
    }
}
  
export const TestForm = createForm<TestFormValues>();

export const TestProvider = ({ children, overrides = {} }: {
    children: ReactNode;
    overrides?: Partial<ContextMainInterface<TestFormValues>>;
}) => (
    <TestForm.ContextMain.Provider
        value={{
            initialValues: {
                stringField: "",
                numberField: 0,
                booleanField: false,

                childForm: {
                    stringField: "",
                    numberField: 0,
                    booleanField: false,
                },
            },
            values: {
                stringField: "",
                numberField: 0,
                booleanField: false,

                childForm: {
                    stringField: "",
                    numberField: 0,
                    booleanField: false,
                },
            },
            errors: {},
            touched: new Set(),
            touchOnChange: false,
            touchOnBlur: false,
            touchOnFocus: false,
            validateOnBlur: false,
            validateOnChange: false,
            validateOnFocus: false,
            validateOnSubmit: false,
            validateOnMount: false,
            isSubmitting: false,
            disabledWhileSubmitting: false,
            setValues: jest.fn(),
            setErrors: jest.fn(),
            setTouched: jest.fn(),
            setFieldError: jest.fn(),
            setFieldValue: jest.fn(),
            setFieldTouched: jest.fn(),
            runValidation: jest.fn(),
            submitForm: jest.fn(),
            onSubmit: jest.fn(),
            ...overrides
        }}
    >
        {children}
    </TestForm.ContextMain.Provider>
)