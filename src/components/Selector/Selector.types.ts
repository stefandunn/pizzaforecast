import { SelectorTypes } from "@/states/selector.states";
import { OptionProps } from "./Option/Option.types";

export type SelectorProps = {
  className?: string;
  selectorId: SelectorTypes;
  options: Omit<OptionProps, "selectorId">[];
};
