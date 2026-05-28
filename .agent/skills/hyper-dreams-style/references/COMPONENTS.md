# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **W Dyn Item** | card | 29× | `.w-dyn-item` |
| **Animate In Artists** | unknown | 29× | `.animate-in-artists`, `.heading` |

## Cards

### W Dyn Item

**Instances found:** 29

**CSS classes:** `.w-dyn-item`

**HTML structure:**

```html
<div role="listitem" class="w-dyn-item"><h1 class="heading animate-in-artists" data-item-id="1" style="opacity: 0.99927;">ANTONYM</h1><div class="modal-content" data-item-id="1"><div class="artist-bio-control-bar"><div class="artist-bio-control-bar-headin">ARTIST PROFILE</div><div class="artist-bio-control-bar-close">CLOSE</div></div><div class="artist-bio-wrapper"><div class="artist-bio"><div class="w-row"><div class="column-2 w-col w-col-6 w-col-medium-6"><div class="artist-bio-summary-wrapper"><div class="alias-tag">ARTIST / ALIAS</div><h1 class="heading-2 artist-bio-alias">ANTONYM</h1></di
```

**Base styles (from design tokens):**

```css
.w-dyn-item {
  background: #0a0a0a;
  border: 1px solid #333333;
  border-radius: 5px;
  padding: 10px;
}```

## Other Components

### Animate In Artists

**Instances found:** 29

**CSS classes:** `.animate-in-artists` `.heading`

**HTML structure:**

```html
<h1 class="heading animate-in-artists" data-item-id="1" style="opacity: 0.99927;">ANTONYM</h1>
```

**Base styles (from design tokens):**

```css
.animate-in-artists {
  background: #0a0a0a;
  padding: 5px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#333333` for all dividers within components
- Use `#0050bd` for all interactive/active states

