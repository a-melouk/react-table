import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Table from "./Table";
// import records from "../data/employees.json";
import moreRecords from "../data/employees-copy.json";
import { sortField, stringIsDate } from "../utils";

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

beforeEach(() => {
  render(<Table dataSource={dataSource} columns={columns} />);
});

describe("Given I'm on employees page", () => {
  /*
  it("when I'm in the first page, the Previous button should be disabled", async () => {
    // Check if the previous button is disabled
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("when I'm in the first page, the Next button should be enabled", async () => {
    // Check if the next button is enabled
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeEnabled();
  });

  it("when I'm in the last page, the Next button should be disabled", async () => {
    // Go to the last page
    const lastPageNumber = Math.ceil(dataSource.length / 10);

    for (let i = 1; i < lastPageNumber; i++) {
      fireEvent.click(screen.getByText("Next"));
      await waitFor(() => {
        expect(
          screen.getByText(`${i + 1} of ${lastPageNumber}`)
        ).toBeInTheDocument();
      });
    }

    //Check if last page is reached
    expect(screen.getByText(`12 of 12`)).toBeInTheDocument();

    // Check if the next button is disabled
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("When I filter data, it should display only filtered data", async () => {
    const input = screen.getByPlaceholderText("Search...") as HTMLInputElement;

    expect(
      screen.getByText("Showing 1 to 10 of 111 entries")
    ).toBeInTheDocument();

    await userEvent.type(input, "Allen");
    expect(input.value).toBe("Allen");

    await waitFor(() => {
      //Tests if the pagination is updated
      expect(
        screen.getByText("Showing 1 to 3 of 3 entries")
      ).toBeInTheDocument();

      expect(screen.getByText("1 of 1")).toBeInTheDocument();
      //New test to check if the data is displayed
      expect(screen.getAllByText("Allen")).toHaveLength(3);
    });
  });

  it("When I change the number of records to display per page to 25, it should display 25 records", async () => {
    //Per default, the table displays 10 records
    expect(screen.getAllByRole("row")).toHaveLength(11);

    // Change the number of rows per page to 25
    const select = screen.getByRole("combobox");
    userEvent.selectOptions(select, "25");

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(26);
    });
  });

  */

  it("When I click on the First Name header, it should sort the data in ascending order", async () => {
    const firstNameHeader = screen.getByText("First name");
    fireEvent.click(firstNameHeader);

    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1); // Skip the header row
      const firstNames = rows.map(
        (row) => row.querySelector("td")?.textContent
      );
      const sortedFirstNames = moreRecords
        .sort(sortField(moreRecords, "First name", "ascending"))
        .slice(0, 10)
        .map((record) => record["First name"]);

      expect(firstNames).toStrictEqual(sortedFirstNames);
    });
  });

  it("When I click on the First Name header twice, it should sort the data in descending order", async () => {
    const firstNameHeader = screen.getByText("First name");
    fireEvent.click(firstNameHeader);
    fireEvent.click(firstNameHeader);

    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1); // Skip the header row
      const firstNames = rows.map(
        (row) => row.querySelector("td")?.textContent
      );
      const sortedFirstNames = moreRecords
        .sort(sortField(moreRecords, "First name", "descending"))
        .slice(0, 10)
        .map((record) => record["First name"]);

      expect(firstNames).toStrictEqual(sortedFirstNames);
    });
  });

  //When I sort birth dates
  it("When I click on the Birth Date header, it should sort the data in ascending order", async () => {
    const birthDateHeader = screen.getByText("Birth date");
    fireEvent.click(birthDateHeader);

    await waitFor(() => {
      const rows = screen.getAllByRole("row").slice(1); // Skip the header row

      const birthDates = rows.map(
        (row) => row.querySelectorAll("td")[2]?.textContent
      );
      const sortedBirthDates = moreRecords
        .sort(sortField(moreRecords, "Birth date", "ascending"))
        .slice(0, 10)
        .map((record) => record["Birth date"]);

      expect(birthDates).toStrictEqual(sortedBirthDates);

      const sortedByBirthDateFirstNames = rows.map(
        (row) => row.querySelector("td")?.textContent
      );

      const sortedByBirthDateFirstNamesSource = moreRecords
        .sort(sortField(moreRecords, "Birth date", "ascending"))
        .slice(0, 10)
        .map((record) => record["First name"]);

      expect(sortedByBirthDateFirstNames).toStrictEqual(
        sortedByBirthDateFirstNamesSource
      );
    });
  });
});
