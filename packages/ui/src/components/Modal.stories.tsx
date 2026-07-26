import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { Button } from "./Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    children: "Are you sure?",
    trigger: <Button>Open</Button>,
    title: "Modal Title",
    description: "Modal Description"
  }
};
