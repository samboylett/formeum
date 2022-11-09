# @formeum/core

The core Formeum core package. This package handles the context, error state, touched state and validation. All other packages are optional.

## Installation

```sh
npm i --save @formeum/formeum
```

## Usage

Each form must be generated using the `createForm` function. This generates the typed context, hooks and components.

```ts
import { createForm } from '@formeum/core';

interface MyFormValues {
    firstName: string;
    lastName: string;
    agree: boolean;
}

export const myForm = createForm<MyFormValues>();
```

The return value now contains all the typed form hooks and components. These can be used to render and handle the form:

```tsx
import { myForm } from './myForm.ts';

export const MyComponent = () => (
    <myForm.FormHandler initialValues={{ firstName: "", lastName: "", agree: false }}>
        <label>
            First name

            <myForm.FormHTMLInput name="firstName">
                {props => <input {...props} />}
            </myForm.FormHTMLInput>
        </label>
        
        <label>
            Last name

            <myForm.FormHTMLInput name="lastName">
                {props => <input {...props} />}
            </myForm.FormHTMLInput>
        </label>
        
        <label>
            Agree to terms and conditions

            <myForm.FormHTMLCheckbox name="agree">
                {props => <input {...props} />}
            </myForm.FormHTMLCheckbox>
        </label>
    </myForm.FormHandler>
);
```

This is a basic example, but Formeum exports many different hooks and components which use each other internally, meaning you can extract different bits of logic you need and use the library in a way which suits you. It is recommended to look at the [full JSDocs](https://formeum.netlify.app/) to see these.