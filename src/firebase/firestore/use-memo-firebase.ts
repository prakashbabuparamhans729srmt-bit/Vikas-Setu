
'use client';

import { useMemo, useRef } from 'react';

/**
 * Custom hook to stabilize a Firebase reference or query.
 * It uses a deep comparison or identity-based memoization to prevent 
 * unnecessary re-renders in hooks like useCollection or useDoc.
 */
export function useMemoFirebase<T>(factory: () => T, dependencies: any[]): T {
  const ref = useRef<T>(null);
  const depsRef = useRef<any[]>([]);

  const hasChanged = dependencies.length !== depsRef.current.length || 
    dependencies.some((dep, i) => dep !== depsRef.current[i]);

  if (hasChanged) {
    (ref as any).current = factory();
    depsRef.current = dependencies;
  }

  return ref.current!;
}
