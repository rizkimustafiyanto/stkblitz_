export const themeComponents = {
  button: {
    base:
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
    sizes: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
    },
    variants: {
      default: 'bg-primary text-primary-foreground hover:opacity-90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
  },
  input: {
    base:
      'flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  },
  card: {
    base: 'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
  },
} as const
