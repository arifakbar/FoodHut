import React from "react";

function LocalSearch({ keyword, setKeyword }) {
  return (
    <form>
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
      />
    </form>
  );
}

export default LocalSearch;
