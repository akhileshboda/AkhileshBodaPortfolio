import { useEffect, useRef, useState } from 'react';
import { useExperienceTier } from '@/journey/useExperienceTier';
import StaticSpace from './StaticSpace';
import Atmosphere from './Atmosphere';
import type { EngineHandle } from './engine';

/**
 * The fixed sky behind the whole voyage.
 *
 * Tier decides the experience:
 * - full/lite → lazy-load three.js and fly the WebGL galaxy
 * - static    → hand-crafted CSS deep space, no runtime cost
 *
 * If WebGL fails to initialise or the context is lost mid-flight, we land
 * softly on the static backdrop.
 */
export default function GalaxyBackground() {
  const tier = useExperienceTier();
  const [webglFailed, setWebglFailed] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const wantsWebGL = tier !== 'static' && !webglFailed;

  useEffect(() => {
    if (!wantsWebGL) return;

    let cancelled = false;
    let handle: EngineHandle | null = null;

    import('./engine')
      .then(({ createGalaxy }) => {
        if (cancelled || !canvasRef.current) return;
        handle = createGalaxy(
          canvasRef.current,
          tier === 'full' ? 'full' : 'lite',
          () => setWebglFailed(true),
        );
        setWebglReady(true);
      })
      .catch(() => {
        if (!cancelled) setWebglFailed(true);
      });

    return () => {
      cancelled = true;
      handle?.destroy();
      setWebglReady(false);
    };
  }, [wantsWebGL, tier]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0">
      <StaticSpace showStars={!(wantsWebGL && webglReady)} />
      {wantsWebGL && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-1000"
          style={{ opacity: webglReady ? 1 : 0 }}
        />
      )}
      <Atmosphere />
    </div>
  );
}
