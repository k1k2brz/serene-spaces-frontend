import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'components/common/button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const BaseButton: Story = {
  args: {
    children: 'Button',
    type: 'submit',
    variant: 'primary',
  },
};
