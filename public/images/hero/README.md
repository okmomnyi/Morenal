# Hero Images Folder

This folder contains hero section images used throughout the website.

## Image Guidelines

### Recommended Specifications:
- **Format:** PNG, JPG, or WebP
- **Size:** 1920x1080px (Full HD) or higher
- **Aspect Ratio:** 16:9 for best display
- **File Size:** Optimize to < 500KB for fast loading

### Current Images Needed:

1. **`hero-image.png`** - Main homepage hero image
   - Used in: Customer homepage hero section
   - Displays: Product showcase, lifestyle image, or brand visual
   - Dimensions: 1200x800px minimum

2. **`hero-bg.jpg`** (Optional) - Background hero image
   - Used for: Alternative hero layouts
   - Type: Can be subtle pattern or gradient overlay

### File Naming Convention:
- Use lowercase with hyphens: `hero-main.png`
- Be descriptive: `hero-electronics.jpg`, `hero-sale-banner.png`
- Version if needed: `hero-winter-2024.jpg`

### Usage in Code:

```tsx
import Image from "next/image";

<Image
  src="/images/hero/hero-image.png"
  alt="Featured Products"
  fill
  className="object-contain"
/>
```

### Tips:
- Use high-quality images that represent your brand
- Ensure images work well with text overlays
- Consider mobile display (test responsiveness)
- Compress images before uploading (use TinyPNG or ImageOptim)
