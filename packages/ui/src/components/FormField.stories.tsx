import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField } from "./FormField";
import { Input } from "./Input";

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
};

export default meta;

type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <FormField label="Email" htmlFor="email">
      <Input id="email" type="email" placeholder="you@company.com" />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Email" htmlFor="email-error" error="Email is required">
      <Input id="email-error" type="email" defaultValue="" aria-invalid />
    </FormField>
  ),
};
