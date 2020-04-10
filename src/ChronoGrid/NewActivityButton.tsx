import { CSSObject } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Formik, Form, FormikValues } from 'formik';
import * as React from 'react';

import { earthYellow, gunmetal, platinum } from 'src/colors';

const addButton: CSSObject = {
  cursor: 'pointer',
};

const buttonCell: CSSObject = {
  position: 'relative',
  gridColumn: 1,
  minWidth: '11rem',
};

const input: CSSObject = {
  backgroundColor: 'black',
  border: `1px solid ${earthYellow}`,
  color: platinum,
  lineHeight: '1.2rem',
  padding: 4,
  width: 'calc(100% - 40px)',

  ':focus': {
    outline: 'none',
  },
};

const saveButton: CSSObject = {
  border: 'none',
  backgroundColor: gunmetal,
  color: platinum,
  cursor: 'pointer',
  margin: '1px 0px 1px 6px',
  padding: 0,
}

interface FormValues extends FormikValues {
  activityName: string;
}

interface Props {
  onAddActivity: (activityName: string) => void;
}

export const NewActivityButton: React.FC<Props> = (props: Props) => {
  const [showInput, setShowInput] = React.useState(false);

  function handleButtonClick(): void {
    setShowInput(!showInput);
  }

  function handleFormikSubmit(values: FormValues, { setSubmitting }: any): void {
    setSubmitting(false);
    // TODO Is this the best approach to building this UI component?
    //   Is there an existing component library that provides something close enough?
    //   Is there a simpler thing to build from primitives?
    //   Is there a different approach that doesn't use forms (like "inline editable" or something)?
    // TODO Reset initial value
    // TODO Prevent submitting an empty string
    // TODO How to cancel?
    setShowInput(!showInput);
    props.onAddActivity(values.activityName);
  }

  return (
    <div className={'row-5'} css={buttonCell}>
      <div
        css={[addButton, { display: showInput ? 'none' : 'block' }]}
        onClick={handleButtonClick}
        role={'button'}
      >
        Add New Activity
      </div>
      <Formik initialValues={{activityName: ''}} onSubmit={handleFormikSubmit}>
        <Form css={{ display: showInput ? 'block' : 'none' }}>
          <Field
            type={'text'}
            css={input}
            name={'activityName'}
            placeholder={'Activity Name'}
          />
          <button type={'submit'} css={saveButton}>
            <FontAwesomeIcon icon={['fal', 'save']} size={'lg'} />
          </button>
        </Form>
      </Formik>
    </div>
  );
};
NewActivityButton.displayName = 'NewActivityButton';
