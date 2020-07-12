import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, Error } from './styles';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}
const DatePicker: React.FC<Props> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
    });
  }, [fieldName, registerField]);
  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      {Icon && <Icon size={20} />}
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        dateFormat="d, MMMM yyyy"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
      {error && <Error title={error} />}
    </Container>
  );
};
export default DatePicker;
