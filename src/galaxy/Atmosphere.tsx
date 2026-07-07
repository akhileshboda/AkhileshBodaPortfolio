import { chapters } from '@/data/chapters';
import { useJourneyState } from '@/journey/journeyStore';

/**
 * Chapter atmosphere — each waypoint tints deep space with its own light.
 *
 * One pre-built gradient layer per chapter; only opacity animates (gradients
 * themselves can't cross-fade), which is cheap, reliable, and works
 * identically above the WebGL sky and the static fallback.
 */
export default function Atmosphere() {
  const { chapterIndex } = useJourneyState();

  return (
    <div className="absolute inset-0">
      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
          style={{
            opacity: index === chapterIndex ? 1 : 0,
            background: `
              radial-gradient(ellipse 75% 55% at 78% 18%, ${chapter.atmosphere}, transparent 68%),
              radial-gradient(ellipse 65% 50% at 15% 85%, ${chapter.atmosphere}, transparent 70%)
            `,
          }}
        />
      ))}
      {/* Legibility vignette — keeps text readable over the brightest sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(2,6,17,0.34) 0%, rgba(2,6,17,0.10) 55%, transparent 100%)',
        }}
      />
    </div>
  );
}
