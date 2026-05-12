import * as React from 'react';

/**
 * Tiny class-name joiner. Avoids pulling clsx/classnames as a dep.
 */
export function cx(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}

/**
 * Polymorphic `as` prop helper — used by Box / Stack / Text.
 */
export type AsProp<T extends React.ElementType> = { as?: T };
export type PolymorphicProps<
  T extends React.ElementType,
  P = {}
> = P & AsProp<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof P | 'as'>;
