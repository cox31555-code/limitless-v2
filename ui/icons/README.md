# Icon Components

Shared icon components for the Limitless Cover application. All icons are SVG-based components with customizable size and color props.

## Usage

### Basic Import
```javascript
import { DocumentsIcon, PaymentsIcon, ClaimsIcon } from "@/ui/icons";
```

### Basic Usage
```javascript
<DocumentsIcon width={24} height={24} color="#0388ff" />
```

## Available Icons

### Dashboard Icons
- **DocumentsIcon** - Documents/files icon
- **PaymentsIcon** - Payments/wallet icon
- **ClaimsIcon** - Claims/alert icon
- **QuotesIcon** - Quotes/document icon
- **SupportIcon** - Support/help icon

### Common Icons
- **ChevronIcon** - Chevron/dropdown arrow (supports direction: "down", "up", "left", "right")
- **ArrowIcon** - Navigation arrow (supports direction: "right", "left", "up", "down")
- **CheckIcon** - Checkmark icon (supports style: "outline", "filled")
- **AlertIcon** - Alert/info icon
- **PlusIcon** - Add/create icon
- **MinusIcon** - Remove/delete icon

### Form Icons
- **UserIcon** - User/profile icon
- **CalendarIcon** - Calendar/date icon
- **CarIcon** - Car/vehicle icon
- **InfoIcon** - Information icon

## Props

All icons accept the following props:

### Standard Props
- `width` (number, default: 24) - Icon width in pixels
- `height` (number, default: 24) - Icon height in pixels
- `color` (string, default: "currentColor") - Icon color (hex, rgb, or color name)

### Variant Props
Some icons accept additional props:

- **ChevronIcon**: `direction` - "down" | "up" | "left" | "right"
- **ArrowIcon**: `direction` - "right" | "left" | "up" | "down"
- **CheckIcon**: `style` - "outline" | "filled"

## Examples

### Dashboard Icons
```javascript
import { DocumentsIcon, PaymentsIcon } from "@/ui/icons";

<DocumentsIcon width={32} height={32} color="#0388ff" />
<PaymentsIcon width={32} height={32} color="#10b981" />
```

### Chevron Icon
```javascript
import { ChevronIcon } from "@/ui/icons";

// Down chevron (default)
<ChevronIcon width={20} height={20} color="#5a6b7d" />

// Right chevron
<ChevronIcon width={20} height={20} color="#5a6b7d" direction="right" />
```

### Check Icon
```javascript
import { CheckIcon } from "@/ui/icons";

// Outline check (default)
<CheckIcon width={24} height={24} color="#10b981" />

// Filled check
<CheckIcon width={24} height={24} color="#10b981" style="filled" />
```

### In Dynamic Icon Rendering
```javascript
import { DocumentsIcon, PaymentsIcon, ClaimsIcon, QuotesIcon, SupportIcon } from "@/ui/icons";

const iconMap = {
  documents: DocumentsIcon,
  payments: PaymentsIcon,
  claims: ClaimsIcon,
  quotes: QuotesIcon,
  support: SupportIcon,
};

// Render dynamically
{React.createElement(iconMap[type] || DocumentsIcon, { width: 32, height: 32, color: "currentColor" })}
```

## Styling

Icons inherit the `color` property from their parent element unless explicitly set. Use CSS to style:

```css
.icon-button {
  color: var(--color-primary);
}

.icon-button:hover {
  color: var(--color-primary-dark);
}
```

## Benefits

- **Single Source of Truth** - Centralized icon management
- **Consistency** - Uniform icon styling across the app
- **Maintainability** - Easy to update icons globally
- **Performance** - SVG components are lightweight
- **Accessibility** - Semantic SVG markup with proper ARIA attributes when needed

## Adding New Icons

To add a new icon:

1. Create a new file in `code/ui/icons/` (e.g., `StarIcon.js`)
2. Export a component function that accepts `width`, `height`, and `color` props
3. Add the export to `code/ui/icons/index.js`
4. Update this README with the new icon

Example:
```javascript
// StarIcon.js
export const StarIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
  <svg viewBox="0 0 24 24" width={width} height={height} fill={color}>
    {/* SVG paths */}
  </svg>
);

export default StarIcon;
```
