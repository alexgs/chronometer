import { CSSObject } from '@emotion/core';
import DomPurify from 'dompurify';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useKeyPress, useOnClickOutside } from 'src/hooks';

const baseCss: CSSObject = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  font: 'inherit',
  padding: 0,
  textAlign: 'inherit',
};

interface Props {
  className?: string;
  isEditable: boolean;
  onCancel: () => void;
  onSetText: (text: string) => void;
  text: string;
}

// A text element that can be edited inline, but editing state is controlled
// externally. Adapted from `./InlineEditableText.tsx`
export const EditableText: React.FC<Props> = (props: Props) => {
  const containerRef: React.MutableRefObject<HTMLSpanElement | null> = useRef(
    null,
  );
  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(
    null,
  );

  const [value, setValue] = useState(props.text);

  const enter = useKeyPress('Enter');
  const esc = useKeyPress('Escape');

  useOnClickOutside(containerRef, (): void => {
    if (props.isEditable) {
      save();
    }
  });

  // Focus on the input field when editing starts
  useEffect((): void => {
    if (props.isEditable && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [props.isEditable]);

  // Handle <Enter> and <Esc> key-presses when input is active
  useEffect((): void => {
    if (props.isEditable) {
      if (enter) {
        save();
      }
      if (esc) {
        setValue(props.text);
        props.onCancel();
      }
    }
  }, [enter, esc]);

  const inputCss: CSSObject = props.isEditable
    ? {
        borderBottom: '1px solid #666',
        minWidth: Math.ceil(value.length) + 'ch',
        textAlign: 'left',
        width: '100%',
      }
    : {
        display: 'none',
      };

  const textCss: CSSObject = props.isEditable
    ? {
        display: 'none',
      }
    : {};

  function handleInputChange(
    event: React.SyntheticEvent<HTMLInputElement>,
  ): void {
    const newValue = DomPurify.sanitize(event.currentTarget.value);
    setValue(newValue);
  }

  function save(): void {
    if (value !== props.text) {
      props.onSetText(value);
      setValue(value);
    } else {
      props.onCancel();
    }
  }

  return (
    <span className={props.className} ref={containerRef}>
      <span css={[baseCss, textCss]}>{props.text}</span>
      <input
        css={[baseCss, inputCss]}
        onChange={handleInputChange}
        ref={inputRef}
        value={value}
      />
    </span>
  );
};
EditableText.displayName = 'EditableText';
