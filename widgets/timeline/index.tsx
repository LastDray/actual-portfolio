import clsx from "clsx";
import css from "./index.module.css";

export type TimeLineProps = {
  timelineData: Array<{
    title: string;
    description: string;
  }>;
  className?: string;
};

export const TimeLine = ({ timelineData, className }: TimeLineProps) => {
  return (
    <ul className={clsx(css.root, className)}>
      {timelineData.map((item) => (
        <li key={item.title} className={css.item}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.subtitle}>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};
