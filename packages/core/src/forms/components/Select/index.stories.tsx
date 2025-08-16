import { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from '@forms/hooks/useForm';
import { schema } from '@forms/utils/schema';
import { Schema } from '@forms/interfaces/Schema';
import { Select } from '@forms/components/Select';
import { sleep } from '@main/utils/sleep';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Stack } from '@main/components/Stack';
import { Button } from '@main/components/Button';

const meta: Meta = {
  title: 'Forms/Select',
  component: Select,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const options = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Hamburger' },
  { value: 3, label: 'Ice Cream' },
];

export const SingleSelectOverview: Story = {
  name: 'Single select overview',
  args: {
    label: 'Favorite foods',
    variant: 'outlined',
    options,
    helperText: 'E.g pizza, ice cream.',
  },
};

type Schema1 = { favoriteFood: number };

const schema1: Schema<Schema1> = schema.object({
  favoriteFood: schema
    .number()
    .required()
    .min(1, 'favoriteFood is a required field'),
});

export const SingleSelectChangeValidation: Story = {
  name: 'Single select validated on change',
  render: () => {
    const form = useForm(schema1);
    return (
      <Select
        control={form.control}
        label="Favorite food"
        name="favoriteFood"
        options={options}
        helperText="E.g Pizza, hamburger"
      />
    );
  },
  play: async ({ canvasElement }) => {
    let canvas = within(canvasElement);

    await sleep(200);

    const field = canvasElement.querySelector(
      '[aria-labelledby="mui-component-select-favoriteFood"]'
    )!;
    fireEvent.focusIn(field);
    fireEvent.focusOut(field);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'favoriteFood is a required field'
    );
    expect(errorMessage).toBeDefined();
    fireEvent.mouseDown(field);

    await sleep(400);

    const option1 = document.querySelector('[data-value="1"]')!;
    fireEvent.click(option1);

    await sleep(400);

    errorMessage = canvas.queryByText('favoriteFood is a required field');
    expect(errorMessage).toBe(null);
  },
};

export const SingleSelectFill: Story = {
  name: 'Single select fill and reset form',
  render: () => {
    const form = useForm(schema1);

    const submit = () => {
      form.reset();
    };

    return (
      <>
        <form onSubmit={form.handleSubmit(submit)}>
          <Select
            control={form.control}
            label="Favorite food"
            name="favoriteFood"
            options={options}
            helperText="E.g Pizza, hamburger"
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" disabled={form.isInvalid()}>
              Submit
            </Button>
            <Button
              onClick={() => {
                form.fill({ favoriteFood: 1 });
              }}
            >
              Fill
            </Button>
          </Stack>
        </form>
        <pre>
          <code id="field-value">{form.watch('favoriteFood')}</code>
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
    const field = canvasElement.querySelector<HTMLDivElement>(
      '[aria-labelledby="mui-component-select-favoriteFood"]'
    )!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('1');
    expect(field.children.length).toBe(0);
    expect(field.innerText).toBe('Pizza');
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('');
    expect(field.children.length).toBe(1);
    expect(submitBtn.disabled).toBe(true);
  },
};

type Schema2 = { favoriteFoods: number[] };

const schema2: Schema<Schema2> = schema.object({
  favoriteFoods: schema
    .array(schema.number().required())
    .min(2, 'You must select at least 2 items')
    .required(),
});

export const MultiSelectOverview: Story = {
  name: 'Multiple select overview',
  args: {
    label: 'Favorite foods',
    variant: 'outlined',
    options,
    helperText: 'E.g pizza, ice cream.',
  },
  render: (args) => <Select multiple {...args} />,
};

export const MultipleSelectChangeValidation: Story = {
  name: 'Multiple select validated on change',
  render: () => {
    const form = useForm(schema2);
    return (
      <Select
        multiple
        control={form.control}
        label="Favorite foods"
        name="favoriteFoods"
        options={options}
        helperText="E.g Pizza, hamburger"
      />
    );
  },
  play: async ({ canvasElement }) => {
    let canvas = within(canvasElement);

    await sleep(200);

    const field = canvasElement.querySelector(
      '[aria-labelledby="mui-component-select-favoriteFoods"]'
    )!;
    fireEvent.focusIn(field);
    fireEvent.focusOut(field);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'favoriteFoods is a required field'
    );
    expect(errorMessage).toBeDefined();
    fireEvent.mouseDown(field);

    await sleep(400);

    const option1 = document.querySelector('[data-value="1"]')!;
    const option2 = document.querySelector('[data-value="2"]')!;
    fireEvent.click(option1);

    await sleep(300);

    errorMessage = await canvas.findByText('You must select at least 2 items');
    expect(errorMessage).toBeDefined();

    await sleep(300);

    fireEvent.click(option2);

    await sleep(300);

    errorMessage = canvas.queryByText('favoriteFood is a required field');
    expect(errorMessage).toBe(null);
  },
};

export const MultipleSelectFill: Story = {
  name: 'Multiple select fill and reset form',
  render: () => {
    const form = useForm(schema2);

    const submit = (data: Schema2) => {
      console.log(data);
      form.reset();
    };

    return (
      <>
        <form onSubmit={form.handleSubmit(submit)}>
          <Select
            multiple
            control={form.control}
            label="Favorite foods"
            name="favoriteFoods"
            options={options}
            helperText="E.g Pizza, hamburger"
          />
          <Stack direction="row" spacing={1}>
            <Button type="submit" disabled={form.isInvalid()}>
              Submit
            </Button>
            <Button
              onClick={() => {
                form.fill({ favoriteFoods: [1, 2] });
              }}
            >
              Fill
            </Button>
          </Stack>
        </form>
        <pre>
          <code id="field-value">
            {JSON.stringify(form.watch('favoriteFoods'))}
          </code>
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
    const field = canvasElement.querySelector<HTMLDivElement>(
      '[aria-labelledby="mui-component-select-favoriteFoods"]'
    )!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(JSON.parse(fieldValue.innerText)).toMatchObject([1, 2]);
    expect(field.children.length).toBe(0);
    expect(field.innerText).toBe('Pizza, Hamburger');
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('');
    expect(field.children.length).toBe(1);
    expect(submitBtn.disabled).toBe(true);
  },
};
