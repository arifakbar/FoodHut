import React from "react";

function Search({ query, setQuery, handleSearchSubmit }) {
  const handleClick = () => {
    const search = document.querySelector(".search-input");
    search.classList.toggle("search-input-active");
  };

  return (
    <form className="search-form" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="search-input search-input-active"
        placeholder="Press enter to search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <i className="fas fa-search" onClick={handleClick}></i>
    </form>
  );
}

export default Search;
