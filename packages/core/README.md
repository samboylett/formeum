[![npm version](https://badge.fury.io/js/@formeum%2Fcore.svg)](https://badge.fury.io/js/@formeum%2Fcore)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d70dc86c641140eda5ea1a04963bfe6c)](https://www.codacy.com/gh/samboylett/formeum/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=samboylett/formeum&amp;utm_campaign=Badge_Grade)
[![Node.js CI](https://github.com/samboylett/formeum/actions/workflows/node.js.yml/badge.svg)](https://github.com/samboylett/formeum/actions/workflows/node.js.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a5ddb138-1a5d-452d-aa94-a9e016849269/deploy-status)](https://app.netlify.com/sites/formeum/deploys)
[![Netlify Status](https://api.netlify.com/api/v1/badges/536a67ac-2e5e-444c-8e2b-ca19197d8e4f/deploy-status)](https://app.netlify.com/sites/formeum-storybook/deploys)

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

        <myForm.FormCallback>
            {({ submitForm }) => (
                <button onClick={() => submitForm()}>Submit</button>
            )}
        </myForm.FormCallback>
    </myForm.FormHandler>
);
```

This is a basic example, but Formeum exports many different hooks and components which use each other internally, meaning you can extract different bits of logic you need and use the library in a way which suits you. It is recommended to look at the [full JSDocs](https://formeum.netlify.app/) to see these.