import React, { useState } from "react";

interface Props {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const Search = ({ setSearchKeyword, placeholder }: Props) => {
  const [text, setText] = useState("");

  const onSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    setSearchKeyword(text);
    setText("");
  };

  const onChange = (ev: { target: { value: React.SetStateAction<string> } }) =>
    setText(ev.target.value);

  return (
    <form onSubmit={onSubmit} className="form">
      <input
        type="text"
        name="text"
        placeholder={placeholder || "Search for institutions..."}
        value={text}
        onChange={onChange}
        style={{ width: 500 }}
      />
      <input
        type="submit"
        value={"Search"}
        className="btn btn-dark btn-block"
      />
    </form>
  );
};

export default Search;
