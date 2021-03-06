import { RefObject, useEffect } from 'react';

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (e: MouseEvent | TouchEvent) => void,
): void {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent): void => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return (): void => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handler],

    // It's worth noting that because the passed-in handler is a new function
    // on every render, that will cause this effect callback/cleanup to run
    // every render. It's not a big deal, but to optimize you can wrap the
    // handler in useCallback before passing it into this hook.
  );
}
