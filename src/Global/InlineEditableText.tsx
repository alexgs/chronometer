import { CSSObject } from '@emotion/core';
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

// Adapted from https://joelmturner.com/blog/inline-text-edit-react-hooks
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
      props.onSetText(value);
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
        props.onSetText(value);
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
        textAlign: 'left',
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
    setValue(event.currentTarget.value);
  }

  function handleTextClick(): void {
    setIsEditable(true);
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
