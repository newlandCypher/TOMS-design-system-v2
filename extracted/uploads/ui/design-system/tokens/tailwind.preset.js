/**
 * TOMS Design System — Tailwind v3+ preset
 *
 * Usage in tailwind.config.js:
 *   const tomsPreset = require('@toms/design-system/tokens/tailwind.preset');
 *   module.exports = { presets: [tomsPreset], content: [...] };
 *
 * All colors map to CSS variables so dark mode is automatic via [data-theme].
 */
const v = (name) => `var(--${name})`;

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          mono:       v('color-brand-mono'),
          monoStrong: v('color-brand-mono-strong'),
          monoSoft:   v('color-brand-mono-soft'),
        },
        primary: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
            .map((k) => [k, v(`color-primary-${k}`)])
        ),
        secondary: {
          50: v('color-secondary-50'), 100: v('color-secondary-100'),
          500: v('color-secondary-500'), 700: v('color-secondary-700'),
          900: v('color-secondary-900'),
        },
        success: { DEFAULT: v('color-success-500'), bg: v('color-success-50'), strong: v('color-success-700') },
        warning: { DEFAULT: v('color-warning-500'), bg: v('color-warning-50'), strong: v('color-warning-700') },
        error:   { DEFAULT: v('color-error-500'),   bg: v('color-error-50'),   strong: v('color-error-700')   },
        info:    { DEFAULT: v('color-info-500'),    bg: v('color-info-50'),    strong: v('color-info-700')    },
        bg: { 1: v('color-bg-1'), 2: v('color-bg-2'), 3: v('color-bg-3'),
              hover: v('color-bg-hover'), active: v('color-bg-active'),
              overlay: v('color-bg-overlay') },
        text: {
          primary:   v('color-text-primary'),
          secondary: v('color-text-secondary'),
          tertiary:  v('color-text-tertiary'),
          disabled:  v('color-text-disabled'),
          inverse:   v('color-text-inverse'),
          onPrimary: v('color-text-on-primary'),
        },
        border: {
          subtle:  v('color-border-subtle'),
          DEFAULT: v('color-border-default'),
          strong:  v('color-border-strong'),
          focus:   v('color-border-focus'),
        },
      },
      fontFamily: {
        sans: v('font-family-sans').split(','),
        mono: v('font-family-mono').split(','),
      },
      fontSize: {
        xs: v('font-size-xs'),  sm: v('font-size-sm'), md: v('font-size-md'),
        lg: v('font-size-lg'),  xl: v('font-size-xl'), '2xl': v('font-size-2xl'),
        '3xl': v('font-size-3xl'), '4xl': v('font-size-4xl'), '5xl': v('font-size-5xl'),
      },
      spacing: {
        0: v('space-0'),   1: v('space-1'),   2: v('space-2'),   3: v('space-3'),
        4: v('space-4'),   5: v('space-5'),   6: v('space-6'),   8: v('space-8'),
        10: v('space-10'), 12: v('space-12'), 16: v('space-16'), 20: v('space-20'),
      },
      borderRadius: {
        none: v('radius-none'), sm: v('radius-sm'), md: v('radius-md'),
        lg: v('radius-lg'),     xl: v('radius-xl'), '2xl': v('radius-2xl'),
        full: v('radius-full'),
      },
      boxShadow: {
        1: v('shadow-1'), 2: v('shadow-2'), 3: v('shadow-3'),
        4: v('shadow-4'), 5: v('shadow-5'),
        cta:   v('shadow-cta'),
        focus: v('shadow-focus'),
      },
      zIndex: {
        dropdown: v('z-dropdown'), sticky: v('z-sticky'), overlay: v('z-overlay'),
        modal: v('z-modal'), popover: v('z-popover'), tooltip: v('z-tooltip'),
        toast: v('z-toast'),
      },
      screens: {
        xs: '480px', sm: '640px', md: '768px',
        lg: '1024px', xl: '1280px', '2xl': '1536px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
      },
      transitionDuration: {
        instant: '80ms', fast: '120ms', normal: '200ms', slow: '320ms',
      },
    },
  },
};
