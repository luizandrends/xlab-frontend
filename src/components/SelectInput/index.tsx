import React, { useRef, useEffect, useState } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}
const Select: React.FC<Props> = ({ name, containerStyle = {}, ...rest }) => {
  const selectRef = useRef(null);

  const [isFocused] = useState(false);
  const [isFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};
export default Select;
