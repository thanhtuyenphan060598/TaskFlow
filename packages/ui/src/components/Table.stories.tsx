import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table";

type TaskRow = {
  id: string;
  title: string;
  status: string;
};

const sampleData: TaskRow[] = [
  { id: "1", title: "Design review", status: "Open" },
  { id: "2", title: "API contract", status: "Done" },
];

const meta: Meta<typeof Table<TaskRow>> = {
  title: "Components/Table",
  component: Table,
};

export default meta;

type Story = StoryObj<typeof Table<TaskRow>>;

export const Default: Story = {
  render: () => (
    <Table
      columns={[
        { key: "title", header: "Title" },
        { key: "status", header: "Status" },
      ]}
      data={sampleData}
      getRowKey={(row) => row.id}
    />
  ),
};
