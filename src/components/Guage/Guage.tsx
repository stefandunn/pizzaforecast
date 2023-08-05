import { FC } from "react";
import { GuageProps } from "./Guage.types";

export const Guage: FC<GuageProps> = ({ confidence }) => {
  const percentage = confidence * 100;

  return (
    <div id="guage">
      <div id="guage-bg" />
      <div id="guage-dial" style={{ transform: `rotate(${percentage}deg)` }} />
      <span id="confidence-0">0%</span>
      <span id="confidence-100">100%</span>
    </div>
  );
};
