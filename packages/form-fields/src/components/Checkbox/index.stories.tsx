import { Meta, StoryObj } from '@storybook/react';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { Button, Stack } from '@reactjs-ui/core';
import { Checkbox, schema, Schema, useForm } from '@reactjs-ui/form-fields';
import { sleep } from '@utils';
import { expect } from '@storybook/jest';

const meta: Meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Overview: Story = {
  args: {
    label: 'Subscribed',
    disabled: false,
    helperText: 'Enable email notifications on subscribe.',
  },
};

type Schema1 = { active: boolean };

const schema1: Schema<Schema1> = schema.object({
  active: schema.boolean().required().oneOf([true]),
});

export const InputValidation: Story = {
  name: 'Validated on input',
  render: () => {
    const form = useForm(schema1);

    return (
      <Checkbox
        control={form.control}
        label={form.watch('active') ? 'Active' : 'Inactive'}
        name="active"
      />
    );
  },
  play: async ({ canvasElement }) => {
    let canvas = within(canvasElement);

    await sleep(200);

    const field = canvasElement.querySelector('[name="active"]')!;
    fireEvent.focusOut(field);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'active is a required field'
    );
    expect(errorMessage).toBeDefined();
    userEvent.click(field);
    userEvent.click(field);

    await sleep(200);

    errorMessage = canvas.queryByText(
      'active must be one of the following values: true'
    );
    expect(errorMessage).toBeDefined();

    await sleep(400);

    userEvent.click(field);

    await sleep(400);

    errorMessage = canvas.queryByText(
      'active must be one of the following values: true'
    );
    expect(errorMessage).toBe(null);
  },
};

type Schema2 = { active: boolean; status: 'subscribed' | 'unsubscribed' };

const schema2: Schema<Schema2> = schema.object({
  active: schema.boolean().required().oneOf([true]),
  status: schema
    .mixed<Schema2['status']>()
    .required()
    .oneOf(['subscribed', 'unsubscribed'])
    .default('unsubscribed'),
});

export const Fill: Story = {
  name: 'Fill and reset form',
  render: () => {
    const form = useForm(schema2);

    const submit = () => {
      form.reset();
    };

    return (
      <>
        <form onSubmit={form.handleSubmit(submit)}>
          <Stack spacing={2}>
            <Checkbox
              control={form.control}
              label={form.watch('active') ? 'Active' : 'Inactive'}
              name="active"
            />
            <Checkbox
              control={form.control}
              label={form.watch('status')}
              name="status"
              value="subscribed" /*Default value needs to be set in the schema for reset*/
              uncheckedValue="unsubscribed"
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button type="submit" disabled={form.isInvalid}>
              Submit
            </Button>
            <Button
              onClick={() => {
                form.fill({ active: true, status: 'subscribed' });
              }}
            >
              Fill
            </Button>
          </Stack>
        </form>
        <pre>
          <code id="active-field-value">
            {JSON.stringify(form.watch('active'))}
          </code>
          <code id="status-field-value">{form.watch('status')}</code>
        </pre>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await sleep(200);

    const submitBtn = await canvas.findByText<HTMLButtonElement>('Submit');
    const fillBtn = await canvas.findByText('Fill');
    const activeField =
      canvasElement.querySelector<HTMLInputElement>('[name="active"]')!;
    const subscribedField =
      canvasElement.querySelector<HTMLInputElement>('[name="status"]')!;
    const activeFieldValue = canvasElement.querySelector<HTMLDivElement>(
      '#active-field-value'
    )!;
    const statusFieldValue = canvasElement.querySelector<HTMLDivElement>(
      '#status-field-value'
    )!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(activeFieldValue.innerText).toBe('true');
    expect(statusFieldValue.innerText).toBe('subscribed');
    expect(activeField.checked).toBe(true);
    expect(subscribedField.checked).toBe(true);
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(activeFieldValue.innerText).toBe('');
    expect(statusFieldValue.innerText).toBe('unsubscribed');
    expect(activeField.checked).toBe(false);
    expect(subscribedField.checked).toBe(false);
    expect(submitBtn.disabled).toBe(true);
  },
};
