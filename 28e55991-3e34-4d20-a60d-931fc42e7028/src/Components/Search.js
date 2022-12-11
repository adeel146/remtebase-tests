import React, { useState } from "react";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split("-");
  const [yyyy, mm, dd] = validityDate.split("-");
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

function Search({ setresidentialList, seterrorMessage }) {
  const [date, setdate] = useState();
  const [inputSearch, setinputSearch] = useState("");

  const handleSubmit = () => {
    let obj = STUDENTS.find(
      (obj) => obj.name.toLocaleLowerCase() === inputSearch.toLocaleLowerCase()
    );
    if (!obj) {
      seterrorMessage(`Sorry, ${inputSearch} is not a verified student!`);
      return;
    }
    if (!checkValidity(date, obj.validityDate)) {
      seterrorMessage(`Sorry, ${inputSearch}'s validity has Expired!`);
      return;
    }
    setresidentialList((prev) => [...prev, inputSearch]);
    seterrorMessage("");
    setdate("");
    setinputSearch("");
  };
  return (
    <div className="my-50 layout-row align-items-end justify-content-end">
      <label htmlFor="studentName">
        Student Name:
        <div>
          <input
            id="studentName"
            data-testid="studentName"
            type="text"
            className="mr-30 mt-10"
            value={inputSearch}
            onChange={(e) => setinputSearch(e.target.value)}
          />
        </div>
      </label>
      <label htmlFor="joiningDate">
        Joining Date:
        <div>
          <input
            id="joiningDate"
            data-testid="joiningDate"
            type="date"
            className="mr-30 mt-10"
            value={date}
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
      </label>
      <button
        disabled={!inputSearch || !date}
        onClick={handleSubmit}
        type="button"
        data-testid="addBtn"
        className="small mb-0"
      >
        Add
      </button>
    </div>
  );
}

export default Search;
