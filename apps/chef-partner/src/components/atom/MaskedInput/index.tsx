'use client';
import React, { useEffect, useRef } from 'react';
import { useIMask } from 'react-imask';
import Input, { InputProps } from '../Input';

type MaskedInputProps = Omit<InputProps, 'onChange'> & {
  maskPattern: string;
  onValueChange?: (unmasked: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MaskedInput: React.FC<MaskedInputProps> = ({
  maskPattern,
  onValueChange,
  value: externalValue,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { maskRef, setUnmaskedValue } = useIMask(
    { mask: maskPattern },
    {
      ref: inputRef,
      onAccept: (masked: string, maskInstance) => {
        onChange?.({
          target: { value: masked },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
        onValueChange?.(
          maskInstance?.unmaskedValue ?? masked.replace(/\D/g, ''),
        );
      },
    },
  );

  useEffect(() => {
    if (externalValue == null) return;
    if (setUnmaskedValue) setUnmaskedValue(String(externalValue));
    else if (maskRef?.current)
      maskRef.current.unmaskedValue = String(externalValue);
  }, [externalValue, setUnmaskedValue, maskRef]);

  return <Input ref={inputRef} {...rest} />;
};

export default MaskedInput;
