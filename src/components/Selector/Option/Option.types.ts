import { SelectorTypes } from "@/states/selector.states";

export type OptionProps = {
  name: string;
  imageSrc: string;
  isMobile?: boolean;
  selectorId: SelectorTypes;
};
