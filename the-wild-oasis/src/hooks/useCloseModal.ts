import { useEffect, useRef, type RefObject } from "react";

function isNode(element: unknown): element is Node {
  return element instanceof Node;
}

export function useCloseModal<Type>(
  close: () => void,
  listenCapture = true,
): RefObject<Type | null> {
  const ref = useRef<Type | null>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target;

      if (!ref || !ref.current) return;

      if (isNode(target) && isNode(ref.current)) {
        if (!ref.current.contains(target)) close();
      }
    }

    document.addEventListener("click", handleClick, listenCapture);
    return () =>
      document.removeEventListener("click", handleClick, listenCapture);
  }, [close, listenCapture]);

  return ref;
}
