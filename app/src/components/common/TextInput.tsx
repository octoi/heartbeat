import React from 'react';
import { Input, Textarea } from '@chakra-ui/react';
import { SetState } from '../../utils/types';

interface Props {
  title: string;
  value: string;
  setValue: SetState<string>;
  className?: string;
  disabled?: boolean;
  textArea?: boolean;
}

export const TextInput: React.FC<Props> = ({
  title,
  value,
  setValue,
  className,
  disabled,
  textArea,
}) => {
  return (
    <div className={className}>
      <h2 className='mb-2 text-md'>{title}</h2>
      {textArea ? (
        <Textarea
          variant='filled'
          placeholder={title}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <Input
          placeholder={title}
          variant='filled'
          size='md'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  );
};
