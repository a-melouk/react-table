import { describe, expect, it } from "vitest";
import { stringIsDate, sortField } from "../utils";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "./Table";
import records from "../data/employees.json";
import moreRecords from "../data/employees-copy.json";

describe("stringIsDate", () => {
  it("valid date string", () => {
    expect(stringIsDate("12/07/1998")).toBe(true);
    expect(stringIsDate("11/25/1985")).toBe(true);
  });

  it("invalid date string", () => {
    expect(stringIsDate("12-12-2022")).toBe(false);
    expect(stringIsDate("12/12/22")).toBe(false);
    expect(stringIsDate("2012/12/22")).toBe(false);
    expect(stringIsDate("Invalid date")).toBe(false);
  });
});

describe("sortDates", () => {
  const data = [
    {
      date: "12/07/1998",
    },
    {
      date: "11/25/1985",
    },
    {
      date: "06/16/1999",
    },
  ];

  it("ascending order", () => {
    const compareFn = sortField(data, "date", "ascending");
    expect(data.sort(compareFn)[0].date).toBe("11/25/1985");
  });

  it("descending order", () => {
    const compareFn = sortField(data, "date", "descending");
    expect(data.sort(compareFn)[0].date).toBe("06/16/1999");
  });
});

describe("sortString", () => {
  const data = [
    {
      Street: "123 Main St",
    },
    {
      Street: "456 Elm St",
    },
    {
      Street: "789 Pine St",
    },
  ];
  it("ascending order", () => {
    const compareFn = sortField(data, "Street", "ascending");
    expect(data.sort(compareFn)[0].Street).toBe("123 Main St");
  });

  it("descending order", () => {
    const compareFn = sortField(data, "Street", "descending");
    expect(data.sort(compareFn)[0].Street).toBe("789 Pine St");
  });
});

describe("Unitary test of sortDates function", () => {
  it("ascending order", () => {
    const records = [
      { date: "12/12/2022" },
      { date: "11/12/2022" },
      { date: "12/12/2021" },
    ];
    const compareFn = sortField(records, "date", "ascending");
    expect(records.sort(compareFn)[0].date).toBe("12/12/2021");
  });

  it("descending order", () => {
    const records = [
      { date: "12/12/2022" },
      { date: "11/12/2022" },
      { date: "12/12/2021" },
    ];
    const compareFn = sortField(records, "date", "descending");
    expect(records.sort(compareFn)[0].date).toBe("12/12/2022");
  });
});

describe("Given I'm on employees page", () => {
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
  it("when I'm in the first page, the Previous button should be disabled", async () => {
    render(<Table dataSource={dataSource} columns={columns} />);
    // Check if the previous button is disabled
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("when I'm in the first page, the Next button should be enabled", async () => {
    render(<Table dataSource={dataSource} columns={columns} />);
    // Check if the next button is enabled
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeEnabled();
  });

  it("when I'm in the last page, the Next button should be disabled", async () => {
    render(<Table dataSource={dataSource} columns={columns} />);
    // Go to the last page
    const lastPageNumber = Math.ceil(dataSource.length / 10);
    for (let i = 1; i < lastPageNumber; i++) {
      fireEvent.click(screen.getByText("Next"));
      await waitFor(() => {
        expect(
          screen.getByText(`${lastPageNumber} of ${lastPageNumber}`)
        ).toBeInTheDocument();
      });
    }
    // Check if the next button is disabled
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});

describe("Given I'm on employees page", () => {
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
  it("when I write a string in search field, ", async () => {
    render(<Table dataSource={dataSource} columns={columns} />);
    // Check if the previous button is disabled
    // const previousButton = screen.getByText("Previous");
    // expect(previousButton).toBeDisabled();
  });
});

const setup = () => {
  const dataSource = Array.from(moreRecords);
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
  const utils = render(<Table dataSource={dataSource} columns={columns} />);
  const input = utils.getByPlaceholderText("Search...") as HTMLInputElement;
  return {
    input,
    ...utils,
  };
};

describe("Given I have an array of data", () => {
  it("When I filter data, it should display only filtered data", async () => {
    // render(<Table dataSource={dataSource} columns={columns} />);
    const { input } = setup();

    expect(
      screen.getByText("Showing 1 to 10 of 111 entries")
    ).toBeInTheDocument();

    await userEvent.type(input, "Allen");
    expect(input.value).toBe("Allen");

    await waitFor(() => {
      expect(
        screen.getByText("Showing 1 to 3 of 3 entries")
      ).toBeInTheDocument();
      expect(screen.getByText("1 of 1")).toBeInTheDocument();
    });
  });
});
