"use client";

import { TimeLine } from "@/widgets/timeline";
import css from "./about-section.module.css";
import { RippleAnimation } from "@/shared/ui/ripple-animation";
import {
  RANGE_CONTENT_HEADER,
  RANGE_CONTENT_VALUE,
  TIMELINE_DATA,
} from "../../models/about-section.constants";
import clsx from "clsx";
import { useScroll } from "@/shared/hooks/use-scroll";
import { useRef } from "react";
import { getRangeContent } from "../../lib/get-range-content";
import parser from "html-react-parser";

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useScroll(containerRef);

  return (
    <section className={css.root}>
      <RippleAnimation />
      <div className={clsx(css.wrapper, "container")} ref={containerRef}>
        <TimeLine timelineData={TIMELINE_DATA} />
        <h2 className={css.title}>
          <span className={css.subtitle}>
            {parser(getRangeContent(RANGE_CONTENT_HEADER, scrollPercentage))}
          </span>
          <span className={css.subtitle}>
            {parser(getRangeContent(RANGE_CONTENT_VALUE, scrollPercentage))}
          </span>
        </h2>
      </div>
    </section>
  );
};
