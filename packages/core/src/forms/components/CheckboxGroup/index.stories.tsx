import { Meta, StoryObj } from '@storybook/react-vite';
import { useForm } from '@forms/hooks/useForm';
import { schema } from '@forms/utils/schema';
import { Schema } from '@forms/interfaces/Schema';
import { CheckboxGroup } from '@forms/components/CheckboxGroup';
import { sleep } from '@main/utils/sleep';
import { fireEvent, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Stack } from '@main/components/Stack';
import { Button } from '@main/components/Button';

const meta: Meta = {
  title: 'Forms/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

const options = [
  { value: 1, label: 'Pizza' },
  { value: 2, label: 'Ice Cream' },
  { value: 3, label: 'Hamburger' },
];

export const Overview: Story = {
  args: {
    label: 'Favorite foods',
    error: false,
    disabled: false,
    helperText: 'You can select multiple options.',
    options,
  },
};

type Schema1 = { favoriteFoods: number[] };

const schema1: Schema<Schema1> = schema.object({
  favoriteFoods: schema
    .array(schema.number().required())
    .min(2, 'You must select at least 2 items')
    .required(),
});

export const ChangeValidation: Story = {
  name: 'Validated on change',
  render: () => {
    const form = useForm(schema1);

    return (
      <CheckboxGroup
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

    const option1 = document.querySelector('[value="1"]')!;
    fireEvent.focusIn(option1);
    fireEvent.focusOut(option1);

    await sleep(200);

    let errorMessage: HTMLElement | null = await canvas.findByText(
      'favoriteFoods is a required field'
    );
    expect(errorMessage).toBeDefined();
    fireEvent.mouseDown(option1);

    await sleep(400);

    const option2 = document.querySelector('[value="2"]')!;
    fireEvent.click(option1);

    await sleep(300);

    errorMessage = await canvas.findByText('You must select at least 2 items');
    expect(errorMessage).toBeDefined();

    await sleep(300);

    fireEvent.click(option2);

    await sleep(300);

    errorMessage = canvas.queryByText('You must select at least 2 items');
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
          <CheckboxGroup
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
    const option1 = document.querySelector<HTMLInputElement>('[value="1"]')!;
    const option2 = document.querySelector<HTMLInputElement>('[value="2"]')!;
    userEvent.click(fillBtn);

    await sleep(200);

    expect(JSON.parse(fieldValue.innerText)).toMatchObject([1, 2]);
    expect(option1.checked).toBe(true);
    expect(option2.checked).toBe(true);
    expect(submitBtn.disabled).toBe(false);
    userEvent.click(submitBtn);

    await sleep(200);

    expect(fieldValue.innerText).toBe('');
    expect(option1.checked).toBe(false);
    expect(option2.checked).toBe(false);
    expect(submitBtn.disabled).toBe(true);
  },
};
