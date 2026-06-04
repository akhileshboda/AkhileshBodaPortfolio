import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout components
import BackgroundField from '@/components/BackgroundField';
import TopUtilityBar from '@/components/TopUtilityBar';
import ChapterNav from '@/components/ChapterNav';
import Footer from '@/components/Footer';

// Portfolio sections
import Hero from '@/components/Hero';
import AboutStory from '@/components/AboutStory';
import IdentityPillars from '@/components/IdentityPillars';
import ExperienceAIVA from '@/components/ExperienceAIVA';
import PurdueExchange from '@/components/PurdueExchange';
import Projects from '@/components/Projects';
import MobileDevelopment from '@/components/MobileDevelopment';
import SystemsAndAI from '@/components/SystemsAndAI';
import AthleticDiscipline from '@/components/AthleticDiscipline';
import Timeline from '@/components/Timeline';
import CurrentMission from '@/components/CurrentMission';
import Contact from '@/components/Contact';

// Footer pages
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfUse from '@/pages/TermsOfUse';
import Accessibility from '@/pages/Accessibility';
import Credits from '@/pages/Credits';

function PortfolioPage() {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary">
      {/* Fixed cinematic backdrop — starfield + ambient glow */}
      <BackgroundField />

      {/* Fixed utility bar — full width, z-50 */}
      <TopUtilityBar />

      {/* Fixed left chapter nav (desktop) + floating mobile button */}
      <ChapterNav />

      {/* Main content — offset right of chapter nav on desktop, below utility bar */}
      <main className="lg:pl-60 pt-[60px]">
        <Hero />
        <AboutStory />
        <IdentityPillars />
        <ExperienceAIVA />
        <PurdueExchange />
        <Projects />
        <MobileDevelopment />
        <SystemsAndAI />
        <AthleticDiscipline />
        <Timeline />
        <CurrentMission />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
