import { styled } from "../style";

export const IconButton = styled("button", {
  all: "unset",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 16,
  borderRadius: 24,
  height: 36,
  width: 36,
  opacity: 1,
  outlineOffset: 4,
  outline: "3px solid transparent",
  background: "var(--plt-prmy)",
  transition: "all var(--animate-time) ease",
  "> *": {
    transition: "transform var(--animate-time) ease",
  },
  "&:focus-visible": {
    outline: "3px solid var(--plt-prmy)",
  },
  "&:focus-visible, &:active": {
    "> *": {
      transform: "scale(1.5)",
    },
  },
  "&:active": {
    "> *": {
      transform: "scale(.7)",
    },
  },
  "&[disabled]": {
    background: "var(--plt-dsbld)",
    opacity: 0.5,
  },
  variants: {
    size: {
      big: {
        height: 48,
        width: 48,
      },
    },
  },
});
