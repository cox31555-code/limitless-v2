# Button Consolidation - Phase 3 Migration Guide

## Overview
This document outlines the post-MVP button migrations that can be done to further consolidate button components and reduce CSS duplication across the codebase.

## Phase 3: Post-MVP Ad-Hoc Button Migrations

### Priority 1: getQuote Component
**Location:** `code/ui/getQuote/getQuote.js`  
**Current:** Uses `.primaryButton` CSS class with custom styling  
**Migration:** Replace with `<Button variant="primary">` component

**Files to Update:**
- `code/ui/getQuote/getQuote.js` - Replace button element with Button component
- `code/ui/getQuote/getQuote.module.css` - Remove `.primaryButton` class once migrated

**Example:**
```javascript
// Before
<button className={styles.primaryButton} onClick={handleContinue}>
  Continue
</button>

// After
<Button variant="primary" onClick={handleContinue}>
  Continue
</Button>
```

### Priority 2: Temporary Get Quote Forms
**Location:** `code/app/temporary/get-quote/_components/VehicleDetailsForm.js`  
**Current:** Multiple inline button styles with custom classes  
**Examples:**
- `.changeVehicleBtn`
- `.editModificationsBtn`
- `.findVehicleBtn`

**Migration:** Replace with Button component variants

### Priority 3: Annual Get Quote Components
**Location:** Multiple files under `code/app/annual/get-quote/_components/`  
**Current:** Custom button styling in various forms  
**Files to Review:**
- `Step3CarOwner.js`
- `Step3AdditionalDrivers.js`
- `Step2AddClaim.js`
- `AnnualPersonalDetailsForm.js`
- `QuoteNavButtons.js`

**Migration:** Consolidate button patterns to use Button component

### Priority 4: Contact and Support Forms
**Location:** Various files under `code/app/contact/` and dashboard pages  
**Current:** Form submission buttons with custom styling  
**Migration:** Use Button component with `type="submit"` and loading states

## Implementation Guidelines

### Using Button Component for Form Submission
```javascript
<Button
  variant="primary"
  type="submit"
  disabled={isSubmitting}
  isLoading={isSubmitting}
  loadingText="Sending..."
>
  Send Message
</Button>
```

### Using Button Component for Navigation
```javascript
<Button
  variant="secondary"
  onClick={() => router.push('/destination')}
>
  Continue
</Button>
```

### Using Button Component with Icons
```javascript
import Image from "next/image";

const myIcon = (
  <Image
    src="/svg/my-icon.svg"
    alt="icon"
    width={28}
    height={14}
  />
);

<Button
  variant="primary"
  icon={myIcon}
  iconPosition="right"
>
  Next
</Button>
```

## CSS Cleanup

Once buttons are migrated, the following CSS files can be simplified or removed:

1. `code/ui/getQuote/getQuote.module.css` - Remove button-related classes
2. `code/app/temporary/get-quote/_components/` - Remove button-specific CSS modules
3. `code/app/annual/get-quote/_components/` - Remove duplicate button styling
4. Individual form component CSS - Remove custom button classes

## Testing Checklist for Each Migration

- [ ] Button renders with correct styling
- [ ] Button responds to hover states
- [ ] Button correctly shows disabled state
- [ ] Button shows loading state when applicable
- [ ] Icon (if present) displays correctly
- [ ] Responsive behavior maintained on mobile/tablet
- [ ] Click handlers work as expected
- [ ] Accessibility features (focus-visible, aria-label) work

## Notes

- Phase 3 migrations should be done iteratively, file by file
- Each migration should be tested before moving to the next file
- CSS files should be cleaned up after all references are removed
- This reduces technical debt and improves maintainability
- Estimated CSS reduction: ~30-40% of button-related CSS can be removed
