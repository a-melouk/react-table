import styled from "styled-components";
import arrowUp from "../assets/arrow-up.svg";
import arrowDown from "../assets/arrow-down.svg";
import noSort from "../assets/no-sorting.svg";
import { paginate, sortField, verifyRecord } from "../utils";
import { Fragment, useEffect, useMemo, useState } from "react";
import ShowNRecords from "./ShowNRecords";
import TableSearch from "./TableSearch";
import { Column, Record } from "../types";

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;

  thead {
    border: 1px solid black;
  }

  th,
  td {
    padding: 8px 10px;
    white-space: nowrap;
  }

  th:hover {
    cursor: pointer;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  .selected {
    background-color: #eee;
  }
`;

const StyledArrows = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: fit-content;
  justify-content: flex-start;
  text-align: left;

  img {
    width: 12px;
    height: 22px;
  }
`;

const StyledGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledPaginationDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    padding: 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    border: 2px solid #838383;
    background-color: transparent;
    &:hover {
      cursor: pointer;
      background-color: #f1f1f1;
    }

    &:disabled {
      background-color: #f1f1f1;
      cursor: not-allowed;
      color: #838383;
    }
  }
`;

const StyledSpannedTd = styled.td`
  text-align: center;
`;

interface TableProps {
  dataSource: Record[];
  columns: Column[];
}

function Table({ dataSource, columns }: TableProps) {
  const headers = columns.map((column: Column) => column.dataIndex);
  //Needed for search in array
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (search === "") return dataSource;
    return dataSource.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [dataSource, search]);

  //Total number of records
  const dataLength = filteredData.length;

  //Number of records to display per page
  const [numberOfRecords, setNumberOfRecords] = useState(10);

  //Number of pages
  const [totalPages, setTotalPages] = useState(
    Math.ceil(dataLength / parseInt(numberOfRecords.toString()))
  );

  //Final Data to display, initially set to first 10 records
  const [data, setData] = useState(() =>
    filteredData.slice(0, parseInt(numberOfRecords.toString()))
  );

  //Current page, initially set to 1
  const [currentPage, setCurrentPage] = useState(0);

  //Array of page numbers (1, 2, 3, ...)
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const [sorting, setSorting] = useState({
    sortOrder: "no-sort" as "ascending" | "descending" | "no-sort",
    sortField: "" as string,
  });

  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * parseInt(numberOfRecords.toString());
    const endIndex = startIndex + parseInt(numberOfRecords.toString());
    const newRecordsToDisplay = dataSource.slice(startIndex, endIndex);
    setData(newRecordsToDisplay);
    // Update page numbers array
    const newPageNumbers = [];
    for (let i = 1; i <= totalPages; i++) newPageNumbers.push(i);
    //Just to remove unused variable warning
    pageNumbers.length == 0;

    setPageNumbers(newPageNumbers);
  }

  function handlePreviousClick() {
    const newPageNumber = currentPage - 1;
    if (newPageNumber >= 1) handlePageClick(newPageNumber);
  }

  function handleNextClick() {
    const newPageNumber = currentPage + 1;
    if (newPageNumber <= totalPages) handlePageClick(newPageNumber);
  }

  // fucntion handleclickedrow(row: Record) {
  //   onclickedrow(row);
  // }

  function handleHeaderClick(event: React.MouseEvent<HTMLTableCellElement>) {
    const thElement = event.currentTarget as HTMLTableCellElement;
    const clickedHeader = thElement.dataset.header as string;
    const imgElement = thElement.querySelector("img") as HTMLImageElement;

    // Reset all arrows to no-sort
    const allArrows = document.querySelectorAll("img");
    allArrows.forEach((arrow) => (arrow.src = noSort));

    //If no sort is applied, sort clicked header in ascending order
    if (sorting.sortOrder === "no-sort") {
      setSorting({ sortOrder: "ascending", sortField: clickedHeader });
      imgElement.src = arrowUp;
    }
    //If header is sorted ascending, sort in descending order
    else if (
      sorting.sortOrder === "ascending" &&
      sorting.sortField === clickedHeader
    ) {
      setSorting({ sortOrder: "descending", sortField: clickedHeader });
      imgElement.src = arrowDown;
    }
    //If header is sorted descending, or if a different header is clicked, sort in ascending order
    else {
      setSorting({ sortOrder: "ascending", sortField: clickedHeader });
      imgElement.src = arrowUp;
    }
    if (currentPage !== 1) setCurrentPage(1);
  }

  useEffect(() => {
    if (filteredData.length === 0) return;
    if (sorting.sortOrder === "no-sort") {
      setData(filteredData.slice(0, parseInt(numberOfRecords.toString())));
    } else {
      const sortedData = filteredData.sort(
        sortField(filteredData, sorting.sortField, sorting.sortOrder)
      );
      setData(sortedData.slice(0, parseInt(numberOfRecords.toString())));
    }
  }, [
    filteredData,
    numberOfRecords,
    sorting.sortField,
    sorting.sortOrder,
    dataLength,
  ]);

  return (
    <>
      <StyledGroup>
        <ShowNRecords
          numberOfRecords={numberOfRecords}
          setNumberOfRecords={setNumberOfRecords}
          setTotalPages={setTotalPages}
          maxRecords={filteredData.length}
          setCurrentPage={setCurrentPage}
        />
        <TableSearch
          search={search}
          setSearch={setSearch}
          numberOfRecords={numberOfRecords}
          setTotalPages={setTotalPages}
          maxRecords={filteredData.length}
          setCurrentPage={setCurrentPage}
        />
      </StyledGroup>
      <StyledTable>
        <thead>
          <tr>
            {headers.map((header: string) => (
              <th
                key={header}
                data-header={header}
                onClick={(event) => handleHeaderClick(event)}
              >
                <StyledArrows>
                  {header}
                  {sorting.sortField === header ? (
                    <img
                      src={
                        sorting.sortOrder === "ascending" ? arrowUp : arrowDown
                      }
                    />
                  ) : (
                    <img src={noSort} alt="" />
                  )}
                </StyledArrows>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataLength === 0 ? (
            <tr>
              <StyledSpannedTd colSpan={headers.length}>
                No records found
              </StyledSpannedTd>
            </tr>
          ) : (
            data.map((record: Record, index: number) => {
              const isValidRecord = verifyRecord(record, headers);
              return (
                <Fragment key={index}>
                  {isValidRecord ? (
                    // <tr onClick={handleclickedrow}>
                    <tr>
                      {headers.map((header: string) => {
                        const attributes = { className: "" };
                        if (header === sorting.sortField)
                          attributes["className"] = "selected";

                        return (
                          <td key={`${header}-${index}`} {...attributes}>
                            {record[header]}
                          </td>
                        );
                      })}
                    </tr>
                  ) : (
                    <>
                      {console.error(`Record ${index + 1} is missing fields`)}
                      {null}
                    </>
                  )}
                </Fragment>
              );
            })
          )}
        </tbody>
      </StyledTable>
      <StyledGroup>
        {dataLength === 0 ? (
          <StyledGroup>
            <span>{paginate(0, 0, 0)}</span>
            <StyledPaginationDiv>
              <button disabled>Previous</button>
              <button disabled>Next</button>
            </StyledPaginationDiv>
          </StyledGroup>
        ) : (
          <StyledGroup>
            <span>
              {paginate(currentPage, numberOfRecords, filteredData.length)}
            </span>
            <StyledPaginationDiv>
              <button
                onClick={handlePreviousClick}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{`${currentPage} of ${totalPages}`}</span>
              <button
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </StyledPaginationDiv>
          </StyledGroup>
        )}
      </StyledGroup>
    </>
  );
}

export default Table;
