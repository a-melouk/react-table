import { ChangeEvent, useEffect } from "react";
import styled from "styled-components";

const StyledShowNRecords = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  align-self: flex-start;

  span {
    color: #27374d;
    font-size: 20px;
    font-weight: 600;
  }

  select {
    border-radius: 4px;
    border: 2px solid #878787;
    height: 32px;
    text-align: center;

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

interface ShowNRecordsProps {
  numberOfRecords: number;
  setNumberOfRecords: (value: number) => void;
  setTotalPages: (value: number) => void;
  setCurrentPage: (value: number) => void;
  maxRecords: number;
}

function ShowNRecords({
  numberOfRecords,
  setNumberOfRecords,
  setTotalPages,
  setCurrentPage,
  maxRecords,
}: ShowNRecordsProps) {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setNumberOfRecords(parseInt(event.target.value));
  }
  useEffect(() => {
    setTotalPages(Math.ceil(maxRecords / numberOfRecords));
    setCurrentPage(1);
  }, [numberOfRecords, maxRecords, setTotalPages, setCurrentPage]);

  return (
    <StyledShowNRecords>
      <span>Show: </span>
      <select value={numberOfRecords} onChange={handleChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>records</span>
    </StyledShowNRecords>
  );
}

export default ShowNRecords;
