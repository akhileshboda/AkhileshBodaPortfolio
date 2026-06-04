/**
 * BackgroundField — fixed, full-viewport cinematic backdrop.
 * Pure CSS layers (no motion): deep navy base + subtle starfield + faint ambient glow.
 * Rendered once in the App shell, sits behind all content (-z-10).
 */
function BackgroundField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg-primary"
    >
      {/* Subtle starfield texture across the whole viewport */}
      <div className="absolute inset-0 starfield opacity-70" />

      {/* Faint wide ambient glow toward upper area for depth */}
      <div
        className="absolute -top-1/4 left-1/4 h-[80vh] w-[80vh] rounded-full blur-[160px] opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(47,128,255,0.18) 0%, rgba(47,128,255,0.04) 45%, transparent 70%)',
        }}
      />

      {/* Edge vignette to protect text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(2,6,17,0.55) 100%)',
        }}
      />
    </div>
  );
}

export default BackgroundField;
