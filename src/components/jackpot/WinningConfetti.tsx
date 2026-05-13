import useCustomWindowSize from "@/hooks/useCustomWindowSize";
import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function WinningConfetti() {
  const { width: initW, height: initH } = useWindowSize();
  const { width: windowWidth, height: windowHeight } = useCustomWindowSize(
    initW,
    initH
  );
  return <Confetti width={windowWidth} height={windowHeight} />;
}
