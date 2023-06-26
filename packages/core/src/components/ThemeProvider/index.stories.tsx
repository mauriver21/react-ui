import { Meta, StoryObj } from '@storybook/react';
import { Box, Button, Stack, ThemeProvider, Typography } from '@components';
import { BoxProps } from '@mui/material';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Theming/ThemeProvider',
  component: ThemeProvider,
};

type Story = StoryObj<typeof ThemeProvider>;
export default meta;

const PaletteItem = (props: {
  bgcolor: BoxProps['bgcolor'];
  color?: string;
  borderColor?: BoxProps['borderColor'];
  border?: BoxProps['border'];
  width?: BoxProps['width'];
  height?: BoxProps['height'];
}) => (
  <Box
    bgcolor={props.bgcolor}
    width={props.width || 200}
    height={props.height || 100}
    display="flex"
    alignItems="center"
    justifyContent="center"
    sx={{
      borderColor: props.borderColor,
      borderWidth: props.border,
      borderStyle: props.border ? 'solid' : undefined,
    }}
  >
    <Typography color={props.color}>{String(props.bgcolor)}</Typography>
  </Box>
);

const Palette = (props: { name: string }) => {
  const palettes = [100, 200, 300, 400, 500, 600, 700];

  return (
    <Stack spacing={2} direction="row">
      {palettes.map((item) => (
        <PaletteItem
          borderColor="primary.light"
          width={140}
          height={100}
          border={1}
          bgcolor={`${props.name}.${item}`}
        />
      ))}
    </Stack>
  );
};

export const Overview: Story = {
  render: () => {
    return (
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h4">Buttons</Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h4">Palette</Typography>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="primary.light" />
            <PaletteItem bgcolor="primary.main" />
            <PaletteItem bgcolor="primary.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="secondary.light" />
            <PaletteItem bgcolor="secondary.main" />
            <PaletteItem bgcolor="secondary.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="success.light" />
            <PaletteItem bgcolor="success.main" />
            <PaletteItem bgcolor="success.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="error.light" />
            <PaletteItem bgcolor="error.main" />
            <PaletteItem bgcolor="error.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="danger.light" />
            <PaletteItem bgcolor="danger.main" />
            <PaletteItem bgcolor="danger.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="info.light" />
            <PaletteItem bgcolor="info.main" />
            <PaletteItem bgcolor="info.dark" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem bgcolor="text.primary" color="secondary.dark" />
            <PaletteItem bgcolor="text.secondary" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <PaletteItem
              bgcolor="background.default"
              border={1}
              borderColor={'primary.light'}
            />
            <PaletteItem
              bgcolor="background.paper"
              border={1}
              borderColor={'primary.light'}
            />
          </Stack>
          <Palette name="primary" />
        </Stack>
      </Stack>
    );
  },
};
