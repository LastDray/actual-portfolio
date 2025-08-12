"use client";

import { useStarfield } from "./hooks/use-star-background";
import css from "./star-background.module.css";

export const StarBackground = () => {
  const canvasRef = useStarfield();

  return <canvas ref={canvasRef} className={css.root}></canvas>;
};
