import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AboutStory from '@/components/AboutStory'
import IdentityPillars from '@/components/IdentityPillars'
import ExperienceAIVA from '@/components/ExperienceAIVA'
import Projects from '@/components/Projects'
import MobileDevelopment from '@/components/MobileDevelopment'
import SystemsAndAI from '@/components/SystemsAndAI'
import AthleticDiscipline from '@/components/AthleticDiscipline'
import Timeline from '@/components/Timeline'
import CurrentMission from '@/components/CurrentMission'
import Contact from '@/components/Contact'

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <AboutStory />
        <IdentityPillars />
        <ExperienceAIVA />
        <Projects />
        <MobileDevelopment />
        <SystemsAndAI />
        <AthleticDiscipline />
        <Timeline />
        <CurrentMission />
        <Contact />
      </main>
    </div>
  )
}

export default App
