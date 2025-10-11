"use client";

import { FC, useEffect, useRef } from "react";
import styles from "./slide-section.module.css";

interface SlideSectionProps {
  title: string;
  content: string;
}

const SlideSection: FC<SlideSectionProps> = ({ title, content }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.3 } // Запускаем анимацию, когда 30% секции видно
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={sectionRef} className={styles.section}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default SlideSection;
