[![npm version](https://badge.fury.io/js/@formeum%2Fcore.svg)](https://badge.fury.io/js/@formeum%2Fcore)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![codecov](https://codecov.io/gh/samboylett/formeum/branch/master/graph/badge.svg?token=MWFC08G9UW)](https://codecov.io/gh/samboylett/formeum)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d70dc86c641140eda5ea1a04963bfe6c)](https://www.codacy.com/gh/samboylett/formeum/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=samboylett/formeum&amp;utm_campaign=Badge_Grade)
[![Node.js CI](https://github.com/samboylett/formeum/actions/workflows/node.js.yml/badge.svg)](https://github.com/samboylett/formeum/actions/workflows/node.js.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a5ddb138-1a5d-452d-aa94-a9e016849269/deploy-status)](https://app.netlify.com/sites/formeum/deploys)
[![Netlify Status](https://api.netlify.com/api/v1/badges/536a67ac-2e5e-444c-8e2b-ca19197d8e4f/deploy-status)](https://app.netlify.com/sites/formeum-storybook/deploys)

[![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://formeum-storybook.netlify.app/)
[![TypeDoc](https://img.shields.io/badge/-Typedoc-111111?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA21BMVEUAAAD///+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP+ZzP8MNk+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP8MNk+ZzP+WAP+ZzP8MNk+WAP8MNk+ZzP8MNk+ZzP+WAP8VM1q1TP+ubP+FB+mNA/SaCv+zR/+zVP9IHpygrP+iHf+ipP+eE/+gGP9AIpGYBf8vKXsdL2WbxP+cr/+dvP+knP+mJv+nK/+njP+pMP+phP+rfP+tOf90DtOxQ/+yXP9RG6diFL1rEcjgV5TeAAAAI3RSTlMAABAQECAgIEBAQGBgYICAgI+Pj5+fn7+/v8/Pz9/f3+/v765wmakAAADxSURBVHhehdPXUsMwEIZR4yTgFJwEAoE0nOzKTu/03nn/J4o0Yw07Yr18d5o9l/q9vX8ywCP5Pn39BWEUhQIod5WuW84AQUultQIGBE1FagYOKDSUU6NAgF9XTHXfgjBSbFGYgsdLHoznKUimDwwZf8VgQZJMly74jgF+ge5jQ8HPNegIML2tLXi/AmCAJhMDRvZMge15MtoCCOD1NgYBDO8QIRsMF4gC+FwhCmB2jyiA2dMNSuBFn0VQHfCgX0uBlz/mwFGOfLmDUxec7Du7KJ1TcFZkdlHqWNAuZgznsGfARUWYXnXQr4nb9PI5ZrxiO45CUxeYFr2zAAAAAElFTkSuQmCC&logoColor=white)](https://formeum.netlify.app)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RollupJS](https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

# @formeum/core

The core Formeum core package. This package handles the context, error state, touched state and validation. All other packages are optional.

## Installation

```sh
npm i --save @formeum/core
```

## Usage

Each form must be generated using the `createForm` function. This generates the typed context, hooks and components.

```ts
// myForm.ts

import { createForm } from '@formeum/core';

interface MyFormValues {
    myField: string;
    // more fields here
}

export const myForm = createForm<MyFormValues>();
```

The return value now contains all the typed form hooks and components. These can be used to render and handle the form:

```tsx
import { myForm } from './myForm.ts';

export const MyComponent = () => (
    <myForm.FormHandler initialValues={{ myField: "" }} onSubmit={() => Promise.resolve()}>
        <label>
            First name

            <myForm.FormHTMLInput name="myField">
                {props => <input {...props} />}
            </myForm.FormHTMLInput>
        </label>

        <myForm.FormCallback>
            {({ submitForm }) => (
                <button onClick={() => submitForm()}>Submit</button>
            )}
        </myForm.FormCallback>
    </myForm.FormHandler>
);
```

This is a basic example, but Formeum exports many different hooks and components which use each other internally, meaning you can extract different bits of logic you need and use the library in a way which suits you. It is recommended to look at the [full JSDocs](https://formeum.netlify.app/) to see these. You can also see and play with many examples in the [storybook documentation](https://formeum-storybook.netlify.app/).
