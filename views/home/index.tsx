import { AboutSection } from "./ui/about-section";
import { EnterSection } from "./ui/enter-section";
import { SkillSection } from "./ui/skill-section";

export const HomePage = () => {
  return (
    <main>
      <EnterSection />
      <AboutSection />
      <SkillSection />
    </main>
  );
};
