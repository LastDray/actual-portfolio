import SlideSection from "@/shared/ui/slide-section";
import { AboutSection } from "./ui/about-section";
import { EnterSection } from "./ui/enter-section";
import { SkillSection } from "./ui/skill-section";

export const HomePage = () => {
  return (
    <main>
      <EnterSection />
      <AboutSection />
      <SkillSection />
      <SlideSection
        title="Первая секция"
        content="Это пример секции, которая выезжает из-под предыдущей при скролле."
      />
    </main>
  );
};
