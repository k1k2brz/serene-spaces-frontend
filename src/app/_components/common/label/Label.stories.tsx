import { Label } from './Label';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Label> = {
  title: 'components/common/label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Label>;

export const BaseButton: Story = {
  args: {
    children: 'Label',
  },
};
