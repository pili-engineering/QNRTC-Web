import * as React from "react";
import classes from "./style.module.css";

interface Props {
  onChange: (e: any) => any;
  value: string;
  id?: string;
  children?: JSX.Element[];
}

export default function Select(props: Props) {
  return (
    <div className={`${classes.input} input`}>
      <select
        value={props.value}
        onChange={props.onChange}
        id={props.id || ""}
      >
        {props.children}
      </select>
    </div>
  );
}
