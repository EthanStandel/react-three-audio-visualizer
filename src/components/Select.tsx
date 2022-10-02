import React, { FC } from "react";

import { styled } from "../style";

type NativeProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: FC<NativeProps & { label: string }> = ({
  label,
  ...props
}) => (
  <SelectLabel>
    <span>{label}</span>
    <select {...props} />
  </SelectLabel>
);
const SelectLabel = styled("label", {
  "> span": {
    pointerEvents: "none",
    position: "absolute",
    top: "-.5em",
    left: ".5em",
    paddingLeft: "1em",
    paddingRight: "1em",
    background:
      "linear-gradient(to right, transparent, var(--plt-bg) 10%, var(--plt-bg) 90%, transparent)",
  },

  "> select": {
    all: "unset",
    height: "3em",
    borderRadius: "calc(1.5em + 3px)",
    minWidth: 200,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1.5em",
    paddingRight: "1.5em",
    "> *": {
      flexGrow: 1,
    },
    border: "3px solid var(--plt-prmy)",
  },
});
