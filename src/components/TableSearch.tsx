import { ChangeEvent, useEffect } from "react";
import styled from "styled-components";

const StyledSearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-end;

  label {
    color: #27374d;
    font-size: 20px;
    font-weight: 600;
  }

  input {
    align-items: center;
    border-radius: 4px;
    border: 2px solid #878787;
    box-sizing: border-box;
    display: flex;
    height: 32px;
    justify-content: flex-start;
    margin: 0;
    min-width: 0;
    padding: 16.5px 14px;
    padding-right: 0;

    &:hover {
      border-color: #252525;
    }

    &:active,
    &:focus,
    &:focus-within,
    &:focus-visible {
      border-color: #000;
    }
  }
`;

interface TableSearchProps {
  search: string;
  setSearch: (value: string) => void;
  numberOfRecords: number;
  setTotalPages: (value: number) => void;
  setCurrentPage: (value: number) => void;
  maxRecords: number;
}

const TableSearch = ({
  search,
  setSearch,
  numberOfRecords,
  setTotalPages,
  setCurrentPage,
  maxRecords,
}: TableSearchProps) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    setTotalPages(Math.ceil(maxRecords / numberOfRecords));
    setCurrentPage(1);
  }, [search, maxRecords, numberOfRecords, setCurrentPage, setTotalPages]);

  return (
    <StyledSearchGroup>
      <label htmlFor="arraySearch">Search: </label>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
      />
    </StyledSearchGroup>
  );
};

export default TableSearch;
