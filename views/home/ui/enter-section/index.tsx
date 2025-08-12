import { StarBackground } from "@/shared/ui/star-background";
import css from "./enter-section.module.css";
import dynamic from "next/dynamic";
import clsx from "clsx";

const GirlModel = dynamic(() => import("@/shared/ui/girl-model"), {
  ssr: false,
});

export const EnterSection = () => {
  return (
    <section className={clsx(css.root, "container")}>
      <h1 className={css.title}>Привет! Я Андрей Middle Frontend Developer</h1>
      <h2 className={css.subtitle}>
        Разрабатываю быстрые и красивые сайты на React, Next.js и TypeScript
      </h2>
      <GirlModel />
      <StarBackground />
    </section>
  );
};
