# React Table Component

A versatile React table component with features like pagination, sorting, and instant filtering.

## Features

- **Pagination**: Display a specified number of records per page with "Next" and "Previous" buttons. Options for records per page include 10, 25, 50, and 100.
- **Sorting**: Sort records by any header in ascending or descending order by clicking on the header.
- **Instant Filter and Search**: Filter records by any keyword in the provided data.

## Installation

To install the package, run the following command:

```bash
npm install react-table-search-sort-paginate
```

## Usage

### Props

- **dataSource**: The data to be displayed in the table.
- **columns**: An array of objects defining the columns of the table. Each object should have the following properties:
  - **title**: The header title to be displayed.
  - **dataIndex**: The key in the `dataSource` to be displayed in this column.
  - **key**: A unique identifier for the column.

## Example

```tsx
import React from "react";
import Table from "react-table-search-sort-paginate";

const records = [
  {
    "First name": "John",
    "Last name": "Doe",
    "Birth date": "01/01/1990",
    Street: "123 Main St",
    City: "Boston",
    State: "MA",
    ZIP: "02108",
    Department: "Sales",
    "Start date": "03/15/2023",
  },
];

const dataSource = Array.from(records);

const columns = [
  {
    title: "First Name",
    dataIndex: "First name",
    key: "First name",
  },
  {
    title: "Last Name",
    dataIndex: "Last name",
    key: "Last name",
  },
  {
    title: "Birth Date",
    dataIndex: "Birth date",
    key: "Birth date",
  },
  {
    title: "Street",
    dataIndex: "Street",
    key: "Street",
  },
  {
    title: "City",
    dataIndex: "City",
    key: "City",
  },
  {
    title: "State",
    dataIndex: "State",
    key: "State",
  },
  {
    title: "ZIP",
    dataIndex: "ZIP",
    key: "ZIP",
  },
  {
    title: "Department",
    dataIndex: "Department",
    key: "Department",
  },
  {
    title: "Start Date",
    dataIndex: "Start date",
    key: "Start date",
  },
];

const App = () => {
  return <Table dataSource={dataSource} columns={columns} />;
};
```
