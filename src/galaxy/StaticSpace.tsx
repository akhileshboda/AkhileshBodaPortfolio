/**
 * The static deep-space backdrop.
 *
 * Always rendered beneath the WebGL canvas as the base coat, and it *is* the
 * whole sky for reduced-motion users, save-data connections, and devices
 * without dependable WebGL. Pure CSS/SVG — zero JavaScript cost.
 */

interface StaticSpaceProps {
  /** Render the CSS starfield layers (hidden while the WebGL sky is active) */
  showStars: boolean;
}

export default function StaticSpace({ showStars }: StaticSpaceProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 70% -10%, #0b1530 0%, #050a1c 45%, #020611 100%)',
        }}
      />

      {showStars && (
        <>
          {/* Milky Way band — a soft tilted ribbon of light */}
          <div
            className="absolute left-[-30%] right-[-30%] top-[8%] h-[38%] rotate-[-16deg]"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(150,170,220,0.05) 28%, rgba(210,220,245,0.10) 50%, rgba(255,230,190,0.06) 62%, transparent 100%)',
              filter: 'blur(26px)',
            }}
          />
          {/* Galactic core glow */}
          <div
            className="absolute right-[6%] top-[6%] h-[300px] w-[300px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,217,163,0.14) 0%, rgba(255,217,163,0.05) 45%, transparent 70%)',
              filter: 'blur(8px)',
            }}
          />
          {/* Star layers — fine + medium, tiled radial-gradient dots */}
          <div className="absolute inset-0 static-stars-fine" />
          <div className="absolute inset-0 static-stars-bright" />
        </>
      )}
    </div>
  );
}
