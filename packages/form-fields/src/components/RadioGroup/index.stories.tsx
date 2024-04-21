import { Meta, StoryObj } from '@storybook/react';
import { Button, Stack } from 'reactjs-ui-core';
import { schema, Schema, RadioGroup, useForm } from '@reactjs-ui/form-fields';
import { sleep } from '@utils';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
  },
};

export default meta;

const options = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
];

type Story = StoryObj<typeof RadioGroup>;

export const Overview: Story = {
  args: {
    label: 'Gender',
    name: 'gender',
    error: false,
    disabled: false,
    helperText: 'You can select one gender.',
    options,
  },
};

type Schema1 = { gender: 'male' | 'female' | 'other' };

const schema1: Schema<Schema1> = schema.object({
  gender: schema
    .mixed<Schema1['gender']>()
    .oneOf(['male', 'female', 'other'])
    .required(),
});

export const ChangeValidation: Story = {
  name: 'Validated on change',
  render: () => {
    const form = useForm(schema1);
    return (
      <RadioGroup
        control={form.control}
        label="Gender"
        name="gender"
        options={options}
      />
    );
  },
  play: async ({ canvasElement }) => {
    await sleep(200);

    let canvas = within(canvasElement);
    const [option1] =
      canvasElement.querySelectorAll<HTMLInputElement>('[name="gender"]')!;

    await sleep(200);

    fireEvent.focusIn(option1);
    fireEvent.focusOut(option1);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'gender is a required field'
    );
    expect(errorMessage).toBeDefined();

    await sleep(200);

    userEvent.click(option1);

    await sleep(400);

    errorMessage = canvas.queryByText('gender is a required field');
    expect(errorMessage).toBe(null);
  },
};

export const RadioGroupFill: Story = {
  name: 'Fill and reset form',
  render: () => {
    const form = useForm(schema1);

    const submit = () => {
      form.reset();
    };

    return (
      <>
        <form onSubmit={form.handleSubmit(submit)}>
          <RadioGroup
            control={form.control}
            label="Gender"
            name="gender"
            options={options}
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" disabled={form.isInvalid}>
              Submit
            </Button>
            <Button
              onClick={() => {
                form.fill({ gender: 'male' });
              }}
            >
              Fill
            </Button>
          </Stack>
        </form>
        <pre>
          <code id="form-values">{JSON.stringify(form.getValues())}</code>
        </pre>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formValues =
      canvasElement.querySelector<HTMLDivElement>('#form-values')!;

    await sleep(200);

    const submitBtn = await canvas.findByText<HTMLButtonElement>('Submit');
    const fillBtn = await canvas.findByText('Fill');
    const [_, option2] =
      canvasElement.querySelectorAll<HTMLInputElement>('[name="gender"]')!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(JSON.parse(formValues.innerText)).toMatchObject({ gender: 'male' });
    expect(option2.checked).toBe(true);
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(JSON.parse(formValues.innerText)).toMatchObject({});
    expect(option2.checked).toBe(false);
    expect(submitBtn.disabled).toBe(true);
  },
};
