import { Meta, StoryObj } from '@storybook/react';
import { Box, Image, Stack } from '@components';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Image',
  component: Image,
};

export default meta;

type Story = StoryObj<typeof Image>;

export const Overview: Story = {
  render: () => {
    const [imageError, setImageError] = useState('');

    return (
      <Stack spacing={2}>
        <Image
          src="https://petapixel.com/assets/uploads/2022/08/fdfs19.jpg"
          width={200}
        />
        <Box>
          {imageError}
          <Image
            onImageError={(message) => setImageError(message)}
            src="https://brokenImageUrl"
            width={200}
          />
        </Box>
        <Box
          width={300}
          height={300}
          border={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image showError src="https://brokenImageUrl" width={200} />
        </Box>
        <Box
          width={300}
          height={300}
          border={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            showLoading
            src="https://vastphotos.com/files/uploads/photos/11809/spring-green-hills-vast-xl.jpg?v=20240503092916"
            width="100%"
          />
        </Box>
      </Stack>
    );
  },
};
