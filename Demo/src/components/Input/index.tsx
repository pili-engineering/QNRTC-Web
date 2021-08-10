import * as React from "react";
import classes from "./style.module.css";

interface Props {
  placeholder: string;
  onChange: (e: any) => any;
  value: string;
  id?: string;
}

export default function Input(props: Props) {
  return (
    <div className={`${classes.input} input`}>
      <input
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        id={props.id || ""}
      />
    </div>
  );
}