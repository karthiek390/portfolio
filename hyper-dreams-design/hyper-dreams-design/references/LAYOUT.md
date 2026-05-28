# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 5px

**Scale:** `5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 75, 100` px

| Spacing | Semantic Use |
|---------|-------------|
| 5px | Tight — within a component |
| 10px | Medium — between sibling items |
| 20px | Wide — between sections |
| 40px | Vast — major section breaks |

## Structural Containers

### `<section>` (`section#main.main`)

```
display:          block
children:         4
```

## Layout Rules

- Every spacing value must be a multiple of **5px**
- Never use arbitrary margin/padding values outside the spacing scale

