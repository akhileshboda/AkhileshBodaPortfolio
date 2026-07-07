import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// The sky
import GalaxyBackground from '@/galaxy/GalaxyBackground';

// Journey systems
import { useJourneyDriver } from '@/journey/useJourneyDriver';
import { useKeyboardVoyage } from '@/journey/navigation';

// Layout
import TopBar from '@/components/layout/TopBar';
import VoyageRail from '@/components/layout/VoyageRail';
import WaypointHUD from '@/components/layout/WaypointHUD';
import MobileVoyage from '@/components/layout/MobileVoyage';
import Footer from '@/components/layout/Footer';

// Waypoint chapters, in flight order
import LaunchHero from '@/components/chapters/LaunchHero';
import Origin from '@/components/chapters/Origin';
import Transition from '@/components/chapters/Transition';
import MonashStudies from '@/components/chapters/MonashStudies';
import ProjectConstellations from '@/components/chapters/ProjectConstellations';
import Hackathons from '@/components/chapters/Hackathons';
import PurdueExchange from '@/components/chapters/PurdueExchange';
import AIFirst from '@/components/chapters/AIFirst';
import Athletics from '@/components/chapters/Athletics';
import FlightLog from '@/components/chapters/FlightLog';
import CurrentMission from '@/components/chapters/CurrentMission';

// Footer pages
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfUse from '@/pages/TermsOfUse';
import Accessibility from '@/pages/Accessibility';
import Credits from '@/pages/Credits';

function VoyagePage() {
  useJourneyDriver();
  useKeyboardVoyage();

  return (
    <div className="relative min-h-screen text-text-primary">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* The Milky Way — fixed behind everything, tiered per device */}
      <GalaxyBackground />

      <TopBar />
      <VoyageRail />
      <WaypointHUD />
      <MobileVoyage />

      <main id="main" className="relative pt-14">
        <LaunchHero />
        <Origin />
        <Transition />
        <MonashStudies />
        <ProjectConstellations />
        <Hackathons />
        <PurdueExchange />
        <AIFirst />
        <Athletics />
        <FlightLog />
        <CurrentMission />
      </main>

      <Footer />
    </div>
  );
}

/** Reset scroll when navigating between the voyage and the legal pages. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<VoyagePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
