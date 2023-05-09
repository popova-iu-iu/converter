import React from "react";

const Dropdown = ({ values, label, onChange}) => {
  return (
    <div className="select-box">
      <label>{label}</label>
      <select
        name={label}
        id="currency"
        onChange={onChange}    
      >
        {values.map((value) => (
          <option 
          name={value} 
          key={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
