'use client';

import { Checkbox, CheckboxGroup } from '../ui/checkbox';
import React from 'react';

export function CheckboxGroupDemo() {
  const fruits = ['fuji-apple', 'gala-apple', 'granny-smith-apple'];
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <CheckboxGroup
      defaultValue={['fuji-apple']}
      className='flex flex-col gap-3'
      allValues={fruits}
      value={value}
      onValueChange={setValue}
    >
      <label
        id='apples-caption'
        className='typography-body-medium flex items-center gap-2'
      >
        <Checkbox parent name='apples' />
        Apples
      </label>
      {fruits.map((fruit) => (
        <label
          htmlFor={fruit}
          key={fruit}
          className='typography-body-medium flex items-center gap-2 pl-4'
        >
          <Checkbox value={fruit} />
          {fruit.replace(/-/g, ' ')}
        </label>
      ))}
    </CheckboxGroup>
  );
}
