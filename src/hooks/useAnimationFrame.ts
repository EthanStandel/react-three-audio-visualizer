import { useEffect } from "react";

type EffectCallback = Parameters<typeof useEffect>[0];
type Deps = Parameters<typeof useEffect>[1];

export const useAnimationFrame = (callback: EffectCallback, deps: Deps) => {
  useEffect(() => {
    let keepGoing = true;
    let cleanup: () => void = () => null;
    const onAnimationFrame = () => {
      cleanup();
      cleanup = callback() ?? (() => null);
      if (keepGoing) {
        requestAnimationFrame(onAnimationFrame);
      } else {
        cleanup();
      }
    };

    requestAnimationFrame(onAnimationFrame);

    return () => {
      keepGoing = false;
    };
  }, deps);
};
