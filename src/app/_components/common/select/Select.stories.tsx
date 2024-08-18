import { roleOptions } from '@/app/_configs';

import { Select } from './Select';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Select> = {
  title: 'components/common/select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const BaseSelect: Story = {
  args: {
    id: roleOptions[0].value,
    label: 'SELECT LABEL',
    options: roleOptions,
    value: roleOptions[0].value,
    onChange: (e) => console.log(e.target.value),
  },
};
