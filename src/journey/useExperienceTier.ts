import { useEffect, useState } from 'react';

/**
 * Experience tiers for the galaxy backdrop:
 *
 * - `full`   — desktop-class device: dense starfield, pointer parallax, DPR up to 2
 * - `lite`   — touch / smaller / mid-power device: lighter scene, capped DPR
 * - `static` — reduced motion, no WebGL, save-data, or very low memory:
 *              a hand-crafted static deep-space backdrop, no render loop at all
 */
export type ExperienceTier = 'full' | 'lite' | 'static';

interface NavigatorCapabilities extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

export function detectTier(): ExperienceTier {
  if (typeof window === 'undefined') return 'static';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'static';
  }

  const nav = navigator as NavigatorCapabilities;
  if (nav.connection?.saveData) return 'static';
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return 'static';
  if (!supportsWebGL()) return 'static';

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const smallViewport = window.matchMedia('(max-width: 820px)').matches;
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  const fewCores =
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency <= 4;

  if (coarsePointer || smallViewport || lowMemory || fewCores) return 'lite';

  return 'full';
}

/** Detect once on mount and re-evaluate if the reduced-motion preference flips. */
export function useExperienceTier(): ExperienceTier {
  const [tier, setTier] = useState<ExperienceTier>(() => detectTier());

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setTier(detectTier());
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return tier;
}
