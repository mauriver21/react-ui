import { Meta, StoryObj } from '@storybook/react';
import { Image } from '@components';

const meta: Meta = {
  title: 'Components/Image',
  component: Image,
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Overview: Story = {
  args: {
    src: 'https://petapixel.com/assets/uploads/2022/08/fdfs19.jpg',
    width: 200,
  },
};
