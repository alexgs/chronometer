import { CSSObject } from '@emotion/core';
import DomPurify from 'dompurify';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { useKeyPress, useOnClickOutside } from 'src/hooks';

const baseCss: CSSObject = {
  background: 'none',
  border: 'none',
  borderBottom: '1px dashed #666',
  color: 'inherit',
  font: 'inherit',
  padding: 0,
  textAlign: 'inherit',
};

interface Props {
  className?: string;
  onSetText: (text: string) => void;
  text: string;
}

// A text element that can be clicked on and edited. Adapted from
// https://joelmturner.com/blog/inline-text-edit-react-hooks
export const InlineEditableText: React.FC<Props> = (props: Props) => {
  const containerRef: React.MutableRefObject<HTMLSpanElement | null> = useRef(
    null,
  );
  const inputRef: React.MutableRefObject<HTMLInputElement | null> = useRef(
    null,
  );

  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(props.text);

  const enter = useKeyPress('Enter');
  const esc = useKeyPress('Escape');

  useOnClickOutside(containerRef, (): void => {
    if (isEditable) {
      save();
      setIsEditable(false);
    }
  });

  // Focus on the input field when editing starts
  useEffect((): void => {
    if (isEditable && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  // Handle <Enter> and <Esc> key-presses when input is active
  useEffect((): void => {
    if (isEditable) {
      if (enter) {
        save();
      }
      if (esc) {
        setValue(props.text);
      }
      setIsEditable(false);
    }
  }, [enter, esc]);

  const inputCss: CSSObject = isEditable
    ? {
        borderBottom: '1px solid #666',
        minWidth: Math.ceil(value.length) + 'ch',
        textAlign: 'left',
        width: '100%',
      }
    : {
        display: 'none',
      };

  const textCss: CSSObject = isEditable
    ? {
        display: 'none',
      }
    : {
        cursor: 'pointer',
      };

  function handleInputChange(
    event: React.SyntheticEvent<HTMLInputElement>,
  ): void {
    const newValue = DomPurify.sanitize(event.currentTarget.value);
    setValue(newValue);
  }

  function handleTextClick(): void {
    setIsEditable(true);
  }

  function save(): void {
    if (value !== props.text) {
      props.onSetText(value);
      setValue(props.text);
    }
  }

  return (
    <span className={props.className} ref={containerRef}>
      <span css={[baseCss, textCss]} onClick={handleTextClick}>
        {props.text}
      </span>
      <input
        css={[baseCss, inputCss]}
        onChange={handleInputChange}
        ref={inputRef}
        value={value}
      />
    </span>
  );
};
InlineEditableText.displayName = 'InlineEditableText';
