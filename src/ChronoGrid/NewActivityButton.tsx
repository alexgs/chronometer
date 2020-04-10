import { CSSObject } from '@emotion/core';
import { Field, Formik, Form, FormikValues } from 'formik';
import * as React from 'react';

import { platinum, earthYellow } from 'src/colors';

const button: CSSObject = {
  cursor: 'pointer',
};

const buttonCell: CSSObject = {
  gridColumn: 1,
  paddingRight: '1rem',
};

const input: CSSObject = {
  backgroundColor: 'black',
  border: `1px solid ${earthYellow}`,
  color: platinum,
  lineHeight: '1.2rem',
  padding: 4,

  ':focus': {
    outline: 'none',
  },
};

interface FormValues extends FormikValues {
  activityName: string;
}

interface Props {
  onAddActivity: (activityName: string) => void;
}

// TODO Add "save" icon
export const NewActivityButton: React.FC<Props> = (props: Props) => {
  const [showInput, setShowInput] = React.useState(false);

  function handleButtonClick(): void {
    setShowInput(!showInput);
  }

  function handleFormikSubmit(values: FormValues, { setSubmitting }: any): void {
    setSubmitting(false);
    // TODO Reset initial value
    // TODO Prevent submitting an empty string
    setShowInput(!showInput);
    props.onAddActivity(values.activityName);
  }

  return (
    <div className={'row-5'} css={buttonCell}>
      <div
        css={[button, { display: showInput ? 'none' : 'block' }]}
        onClick={handleButtonClick}
        role={'button'}
      >
        Add New Activity
      </div>
      <Formik initialValues={{activityName: ''}} onSubmit={handleFormikSubmit}>
        <Form>
          <Field
            type={'text'}
            css={[input, { display: showInput ? 'block' : 'none' }]}
            name={'activityName'}
            placeholder={'Activity Name'}
          />
        </Form>
      </Formik>
    </div>
  );
};
NewActivityButton.displayName = 'NewActivityButton';
