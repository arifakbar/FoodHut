import React from "react";

function CatForm({ handleSubmit, Title, name, setName, placeholder }) {
  return (
    <form
      className="border p-5 "
      style={{ width: "80%" }}
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label className="form-label">{Title}</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={placeholder}
        />
      </div>
      <button
        className="btn btn-raised text-white btn-block"
        style={{ background: "#f16121" }}
      >
        Add
      </button>
    </form>
  );
}

export default CatForm;
