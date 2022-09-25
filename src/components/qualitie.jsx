import React from "react";

const getBageClasses = (colorName) => {
  let classes = "badge m-1 bg-";
  classes += colorName;
  return classes;
};

const Quality = (props) => {
  return (
    <span className={getBageClasses(props.color)} key={props.key}> {props.name} </span>
  );
};

export default Quality;