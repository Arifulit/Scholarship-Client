# ScholarHub Design System

## 🎨 Color Palette

### Primary Colors
- **Lime**: `from-lime-500 to-emerald-600` - Main brand gradient
- **Emerald**: Used in gradients and accents
- **White**: Background and text contrast

### Secondary Colors
- **Gray Scale**: 
  - `gray-50` - Light backgrounds
  - `gray-100` - Card backgrounds
  - `gray-300` - Borders
  - `gray-600` - Secondary text
  - `gray-900` - Primary text

### Accent Colors
- **Success**: `green-500`
- **Warning**: `yellow-500`
- **Error**: `red-500`
- **Info**: `blue-500`

## 📱 Typography

### Font Weights
- **Regular**: `font-normal` (400)
- **Medium**: `font-medium` (500)
- **Semibold**: `font-semibold` (600)
- **Bold**: `font-bold` (700)

### Text Sizes
- **xs**: `text-xs` (12px)
- **sm**: `text-sm` (14px)
- **base**: `text-base` (16px)
- **lg**: `text-lg` (18px)
- **xl**: `text-xl` (20px)
- **2xl**: `text-2xl` (24px)
- **3xl**: `text-3xl` (30px)
- **4xl**: `text-4xl` (36px)

## 🔘 Components

### Buttons
```jsx
import Button from './components/Shared/Button/Button'

// Primary Button
<Button label="Submit" variant="primary" />

// Secondary Button
<Button label="Cancel" variant="secondary" />

// Outline Button
<Button label="Learn More" outline />

// With Icon
<Button label="Save" icon={HiSave} />

// Loading State
<Button label="Saving..." loading />
```

### Cards
- **Shadow**: `shadow-lg hover:shadow-2xl`
- **Border Radius**: `rounded-2xl`
- **Hover Effects**: `hover:-translate-y-2`
- **Transitions**: `transition-all duration-300`

### Forms
- **Input Focus**: `focus:ring-2 focus:ring-lime-500`
- **Border Radius**: `rounded-lg`
- **Padding**: `px-4 py-3`

## 🎭 Animations

### Hover Effects
- **Scale**: `hover:scale-105`
- **Translate**: `hover:-translate-y-2`
- **Shadow**: `hover:shadow-2xl`

### Transitions
- **Duration**: `duration-200` or `duration-300`
- **Easing**: `ease-in-out`

## 📐 Spacing

### Padding/Margin Scale
- **1**: 4px
- **2**: 8px
- **3**: 12px
- **4**: 16px
- **6**: 24px
- **8**: 32px
- **12**: 48px
- **16**: 64px

## 🖼️ Layout

### Container
- **Max Width**: `max-w-7xl mx-auto`
- **Padding**: `px-4 sm:px-6 lg:px-8`

### Grid Systems
- **Cards**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`
- **Forms**: `grid grid-cols-1 md:grid-cols-2 gap-6`

## 🎯 Best Practices

### Accessibility
- Always include proper `alt` attributes for images
- Use semantic HTML elements
- Ensure proper color contrast
- Include focus states for interactive elements

### Performance
- Use CSS transforms for animations
- Lazy load images when possible
- Optimize bundle size with tree shaking

### Consistency
- Use the design system components consistently
- Follow the established color palette
- Maintain consistent spacing patterns
- Use standard animation durations

## 🚀 Implementation Examples

### Hero Section
```jsx
<div className="bg-gradient-to-r from-lime-500 to-emerald-600 text-white py-16">
  <div className="container mx-auto px-6">
    <h1 className="text-4xl md:text-6xl font-bold mb-4">
      Your Title Here
    </h1>
    <p className="text-xl text-lime-100 mb-8">
      Your description here
    </p>
    <Button label="Get Started" variant="primary" />
  </div>
</div>
```

### Card Component
```jsx
<div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6">
  {/* Card content */}
</div>
```

### Form Input
```jsx
<input
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
  placeholder="Enter your text"
/>
```

This design system ensures consistency across the entire application and provides a professional, modern look for the scholarship platform.