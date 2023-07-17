import { Meta, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Button, Stack, TextField } from '@components';
import { sleep, useForm } from '@utils';
import { Schema } from 'yup';
import * as yup from 'yup';

const meta: Meta = {
  title: 'Forms/TextField',
  component: TextField,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Overview: Story = {
  args: {
    label: 'Address',
    variant: 'outlined',
    error: false,
    disabled: false,
    helperText: 'E.g. Marilyn Avenue',
  },
};

type Schema1 = { email: string };

const schema1: Schema<Schema1> = yup.object({
  email: yup.string().email().required(),
});

export const InputValidation: Story = {
  name: 'Validated on input',
  render: () => {
    const form = useForm(schema1);
    return (
      <TextField
        control={form.control}
        label="Email"
        name="email"
        helperText="F.e. foo@mail.com"
      />
    );
  },
  play: async ({ canvasElement }) => {
    let canvas = within(canvasElement);

    await sleep(200);

    const field = canvasElement.querySelector('[name="email"]')!;
    userEvent.type(field, 'foo');

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'email must be a valid email'
    );
    expect(errorMessage).toBeDefined();
    userEvent.type(field, '@mail.com');

    await sleep(400);

    errorMessage = canvas.queryByText('email must be a valid email');
    expect(errorMessage).toBe(null);
  },
};

export const BlurValidation: Story = {
  name: 'Validated on blur',
  render: () => {
    const form = useForm(schema1);
    return (
      <TextField
        fieldOptions={{ debounce: 200 }}
        control={form.control}
        label="Email"
        name="email"
        helperText="F.e. foo@mail.com"
      />
    );
  },
  play: async ({ canvasElement }) => {
    let canvas = within(canvasElement);

    await sleep(200);

    const field = canvasElement.querySelector('[name="email"]')!;
    fireEvent.focusIn(field);
    fireEvent.focusOut(field);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'email is a required field'
    );
    expect(errorMessage).toBeDefined();
    userEvent.type(field, 'foo@mail.com');

    await sleep(300);

    errorMessage = canvas.queryByText('email is a required field');
    expect(errorMessage).toBe(null);
  },
};

export const Fill: Story = {
  name: 'Fill and reset form',
  render: () => {
    const form = useForm(schema1);

    const submit = () => {
      form.reset();
    };

    return (
      <>
        <form onSubmit={form.handleSubmit(submit)}>
          <TextField
            fieldOptions={{ debounce: 200 }}
            control={form.control}
            label="Email"
            name="email"
            helperText="F.e. foo@mail.com"
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" disabled={form.isInvalid}>
              Submit
            </Button>
            <Button
              onClick={() => {
                form.fill({ email: 'foo@mail.com' });
              }}
            >
              Fill
            </Button>
          </Stack>
        </form>
        <pre>
          <code id="field-value">{form.watch('email')}</code>
        </pre>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fieldValue =
      canvasElement.querySelector<HTMLDivElement>('#field-value')!;

    await sleep(200);

    const submitBtn = await canvas.findByText<HTMLButtonElement>('Submit');
    const fillBtn = await canvas.findByText('Fill');
    const field =
      canvasElement.querySelector<HTMLInputElement>('[name="email"]')!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('foo@mail.com');
    expect(field.value).toBe('foo@mail.com');
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('');
    expect(field.value).toBe('');
    expect(submitBtn.disabled).toBe(true);
  },
};
