# Design System Tokens

Centralized design system tokens for the Limitless Cover application. These CSS custom properties (variables) ensure consistency across the app and make theming/maintenance easier.

## Importing

Design tokens are automatically imported in `code/app/globals.css`, so they're available throughout the application.

## Token Categories

### Colors

#### Primary Colors
- `--color-primary` (#0388ff) - Main brand color
- `--color-primary-dark` (#0052a3) - Darker shade for hover/active states
- `--color-primary-darker` (#003d7a) - Darkest shade
- `--color-primary-light` (#05afff) - Light accent color
- `--color-primary-lighter` (#e8f5ff) - Very light background
- `--color-primary-lightest` (#f0f6ff) - Almost white background

#### Semantic Colors
- `--color-success` (#10b981) - Success/positive actions
- `--color-warning` (#f59e0b) - Warnings/caution
- `--color-error` (#dc2626) - Errors/critical
- `--color-error-dark` (#b91c1c) - Darker error shade
- `--color-error-light` (#fee2e2) - Light error background
- `--color-info` (#3b82f6) - Information

#### Text Colors
- `--color-text-primary` (#0a0913) - Main text
- `--color-text-secondary` (#5a6b7d) - Secondary text
- `--color-text-tertiary` (#7f8a96) - Tertiary text
- `--color-text-disabled` (#9ca3af) - Disabled text
- `--color-text-inverse` (#ffffff) - Inverse text (on dark backgrounds)

#### Background Colors
- `--color-bg-primary` (#ffffff) - Main background
- `--color-bg-secondary` (#f9fafb) - Secondary background
- `--color-bg-tertiary` (#f3f4f6) - Tertiary background
- `--color-bg-overlay` (rgba(0, 0, 0, 0.5)) - Overlay/modal background

#### Border Colors
- `--color-border-primary` (#e5e7eb) - Primary borders
- `--color-border-secondary` (#d1d5db) - Secondary borders
- `--color-border-focus` (rgba(3, 136, 255, 0.25)) - Focus state borders

#### Status Colors
- `--color-status-active` (#10b981) - Active/online status
- `--color-status-inactive` (#9ca3af) - Inactive/offline status
- `--color-status-pending` (#f59e0b) - Pending status

### Spacing

Base unit is 0.4rem (4px). All spacing values are multiples of this unit.

```
xs:   0.4rem (4px)
sm:   0.6rem (6px)
md:   0.8rem (8px)
lg:   1.2rem (12px)
xl:   1.6rem (16px)
2xl:  2rem (20px)
3xl:  2.4rem (24px)
4xl:  3.2rem (32px)
5xl:  4rem (40px)
```

Available variables:
- `--spacing-xs` through `--spacing-5xl`
- `--gap-xs` through `--gap-2xl` (for flex gaps)
- `--padding-xs` through `--padding-2xl`
- `--margin-xs` through `--margin-2xl`

### Typography

#### Font Families
- `--font-primary` - Poppins (default body font)
- `--font-secondary` - Plus Jakarta Sans (alternative font)

#### Font Sizes
```
xs:   1rem (10px)
sm:   1.1rem (11px)
base: 1.2rem (12px)
md:   1.3rem (13px)
lg:   1.4rem (14px)
xl:   1.6rem (16px)
2xl:  1.8rem (18px)
3xl:  2rem (20px)
4xl:  2.4rem (24px)
5xl:  3.2rem (32px)
```

Available variables: `--font-size-xs` through `--font-size-5xl`

#### Font Weights
- `--font-weight-light` (300)
- `--font-weight-normal` (400)
- `--font-weight-medium` (500)
- `--font-weight-semibold` (600)
- `--font-weight-bold` (700)
- `--font-weight-extrabold` (800)

#### Line Heights
- `--line-height-tight` (1.2)
- `--line-height-normal` (1.4)
- `--line-height-relaxed` (1.6)
- `--line-height-loose` (1.8)

#### Letter Spacing
- `--letter-spacing-tight` (-0.02em)
- `--letter-spacing-normal` (0)
- `--letter-spacing-wide` (0.02em)

### Border Radius

- `--radius-sm` (2px) - Small radius
- `--radius-md` (4px) - Medium radius
- `--radius-lg` (8px) - Large radius
- `--radius-xl` (12px) - Extra large radius
- `--radius-2xl` (16px) - 2x extra large radius
- `--radius-full` (9999px) - Fully rounded (pills)

### Shadows

- `--shadow-sm` - Small shadow
- `--shadow-md` - Medium shadow
- `--shadow-lg` - Large shadow
- `--shadow-xl` - Extra large shadow
- `--shadow-2xl` - 2x extra large shadow

### Transitions

- `--transition-fast` (150ms ease-in-out)
- `--transition-base` (200ms ease-in-out)
- `--transition-slow` (300ms ease-in-out)

### Z-Index

- `--z-dropdown` (100) - Dropdowns
- `--z-sticky` (200) - Sticky elements
- `--z-fixed` (500) - Fixed positioning
- `--z-modal-overlay` (9000) - Modal overlay
- `--z-modal` (9001) - Modal content
- `--z-popover` (9100) - Popovers
- `--z-tooltip` (9200) - Tooltips
- `--z-notification` (9999) - Notifications/alerts

## Usage Examples

### Colors
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border-color: var(--color-border-primary);
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.error-state {
  color: var(--color-error);
  background-color: var(--color-error-light);
  border-color: var(--color-error);
}
```

### Spacing
```css
.card {
  padding: var(--padding-lg);
  margin-bottom: var(--margin-xl);
  gap: var(--gap-md);
}
```

### Typography
```css
.heading {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-tight);
}

.body-text {
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
}
```

### Border Radius
```css
.button {
  border-radius: var(--radius-md);
}

.pill-button {
  border-radius: var(--radius-full);
  padding: var(--padding-md) var(--padding-xl);
}
```

### Shadows
```css
.card {
  box-shadow: var(--shadow-md);
}

.elevated-card {
  box-shadow: var(--shadow-xl);
}
```

### Transitions
```css
.button {
  transition: background-color var(--transition-base);
}

.quick-transition {
  transition: all var(--transition-fast);
}
```

## Responsive Design with Tokens

Since tokens are CSS variables, they work seamlessly with media queries:

```css
.container {
  padding: var(--padding-lg);
}

@media (max-width: 640px) {
  .container {
    padding: var(--padding-md);
  }
}
```

## Best Practices

1. **Always use tokens** - Avoid hardcoding colors, spacing, or other design values
2. **Semantic naming** - Use meaningful variable names that describe purpose
3. **Consistency** - Use the same token across similar elements
4. **Maintainability** - Updating a token updates all usages
5. **Theming ready** - Tokens can be easily modified for dark mode or different themes

## Updating Tokens

To update design tokens:

1. Edit `code/styles/designTokens.css`
2. Changes automatically apply throughout the app
3. Consider backward compatibility with existing uses

## Future Enhancements

- [ ] Dark mode token variants
- [ ] Animation/motion tokens
- [ ] Gradient tokens
- [ ] CSS-in-JS integration
- [ ] Design token documentation generator
