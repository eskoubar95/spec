---
name: sdd-design-system-bootstrap
description: Bootstrap a usable design system early (Tailwind + shadcn/ui) to avoid design babysitting later. Produces spec/07-design-system.md and a UI Definition of Done checklist.
metadata:
  sdd_category: design
---

# SDD: Design System Bootstrap (Tailwind + shadcn/ui)

## When to use

- During `/spec/init` or `/spec/refine` when design direction is unclear or repeatedly causes rework.
- Before `/spec/plan` so design work can be turned into concrete, non-babysat tasks.

## Goal

Produce a *project-agnostic but concrete* `spec/07-design-system.md` that includes:
- style direction + references
- tokens (color, typography, spacing)
- shadcn/ui component scope for phase 1
- accessibility level and verification checklist
- UI Definition of Done (DoD) checklist

## Inputs

- Optional: links to 2–3 UI references (products, dribbble, figma frames, etc.)
- Optional: brand constraints (logo, colors, typography)
- Optional: target user + context (B2B dashboard vs consumer, etc.)

## Workflow

1. **Ask only the minimum clarifying questions**
   - Product type: `dashboard` | `marketing site` | `editor` | `e-commerce` | `other`
   - Style direction: 2–3 adjectives (e.g., “minimal, calm, professional”)
   - Primary interaction surfaces: navigation, tables, forms, editor, etc.
   - Accessibility target: default `WCAG AA`

2. **Pick sane defaults (unless constrained)**
   - Typography: Inter (system fallback)
   - Spacing: 4px scale
   - Radius: `md` default
   - Shadows: subtle, consistent

3. **Define tokens (as spec, not implementation)**
   - Neutral scale (background/surface/border/text)
   - Primary accent + semantic colors (success/warn/error/info)
   - Include contrast guidance (AA)

4. **Define shadcn/ui scope**
   - Phase 1 must-have components (typical):
     - Button, Input, Textarea, Select, Checkbox, RadioGroup
     - Dialog, Drawer/Sheet, DropdownMenu, Tooltip
     - Table, Tabs, Toast/Sonner
     - Card, Badge, Skeleton
   - Note any exclusions explicitly.

5. **Write `spec/07-design-system.md`**
   - Start from the repo’s design-system template at `spec/templates/07-design-system.md` when available.
   - Output must be actionable (no placeholders left unless explicitly “TBD”).

6. **Output UI DoD**
   - Include a checklist that can be copied into tasks:
     - responsive breakpoints checked
     - keyboard navigation
     - focus states visible
     - contrast passes AA
     - empty/error/loading states
     - no layout shift in common flows

## Output contract

Return:
- A ready-to-paste `spec/07-design-system.md` body
- A short list of phase-1 UI tasks suggested for `/spec/plan`
