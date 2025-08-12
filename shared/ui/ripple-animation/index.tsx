"use client";

import css from "./ripple-animation.module.css";
import { useRippleAnimation } from "./hooks/use-ripple-animation";

export const RippleAnimation = () => {
  const canvasRef = useRippleAnimation();

  return <canvas className={css.root} ref={canvasRef} />;
};
