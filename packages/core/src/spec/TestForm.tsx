import { merge } from "lodash";
import { ReactNode, useState } from "react";
import { act } from "react-dom/test-utils";
import useEventCallback from "use-event-callback";
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

export const createTestProvider = () => {
    const mocks = {
        setValues: jest.fn(),
        setErrors: jest.fn(),
        setTouched: jest.fn(),
        setFieldError: jest.fn(),
        setFieldValue: jest.fn(),
        setFieldTouched: jest.fn(),
        runValidation: jest.fn(),
        submitForm: jest.fn(),
        onSubmit: jest.fn(),
    } as const;

    let innerMergeValue: (value: Partial<ContextMainInterface<TestFormValues>>) => void;
    const mergeValue = (value: Partial<ContextMainInterface<TestFormValues>>) => {
        act(() => {
            innerMergeValue(value)
        });
    };

    const TestProvider = ({ children }: {
        children: ReactNode;
    }) => {
        const [value, setValue] = useState<ContextMainInterface<TestFormValues>>({
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
            ...mocks,
        });

        innerMergeValue = useEventCallback(newValue => {
            setValue(merge({}, value, newValue));
        });
        
        return (
            <TestForm.ContextMain.Provider value={value}>
                {children}
            </TestForm.ContextMain.Provider>
        );
    };

    return { TestProvider, mocks, mergeValue } as const;
}

export type TestProviderHandler = ReturnType<typeof createTestProvider>;