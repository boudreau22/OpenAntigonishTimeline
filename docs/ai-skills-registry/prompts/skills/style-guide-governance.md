---
name: Style Guide Governance
description: Cross-repo rules for enforcing a consistent, accessible, interactive style guide with dark mode and pill navigation.
---

# Style Guide Governance

**Description:**  
This skill defines the governed requirements for style guides across all repositories.  
It ensures consistent UI documentation, navigation, theming, and component previews.

======================================================================
1. PURPOSE
======================================================================
Every governed repository MUST include a style guide that:
- Is accessible from the site  
- Uses consistent navigation  
- Uses consistent theming  
- Demonstrates components, styles, and typography  
- Supports dark mode  
- Uses pill-style navigation tabs  

======================================================================
2. TRIGGERS
======================================================================
- Request to "create style guide"
- Request to "audit style guide"
- Adding new UI components
- Refactoring design tokens or themes

======================================================================
3. INPUTS
======================================================================
- Current design system implementation (Tailwind config, CSS variables).
- Registry governance on style guides (`style-guide-governance.md`).
- Existing UI component library.

======================================================================
4. REQUIRED STRUCTURE
======================================================================
The style guide MUST include:

### Required Sections
- **Components**  
- **Styles**  
- **Typography**  
- **Layout**  
- **Forms**  
- **States (Loading, Empty, Error)**  

### Required Features
- Pill-style navigation  
- Dark mode toggle  
- Live component previews  
- Responsive examples  
- Code snippets (optional)  

======================================================================
5. REQUIRED ROUTE
======================================================================
Each repo MUST expose the style guide at:

```
/style-guide
```

or:

```
/guide/style
```

The route MUST be consistent within the repo.

======================================================================
6. THEMING REQUIREMENTS
======================================================================
The style guide MUST:
- Support light and dark mode  
- Use the repo’s design tokens  
- Demonstrate color palette  
- Demonstrate spacing scale  
- Demonstrate typography scale  

======================================================================
7. COMPONENT REQUIREMENTS
======================================================================
Each component preview MUST:
- Use the repo’s design system  
- Be contained within a high-contrast card or container (e.g., surface background) to ensure visibility against the page background.
- Include a descriptive header for each section.
- Demonstrate default, hover, focus, and active states.
- Demonstrate disabled states.
- Demonstrate responsive behavior.

======================================================================
8. SAFETY & CONSTRAINTS
======================================================================
You MUST:
- Follow deterministic formatting  
- Preserve design system rules  
- Ensure accessibility basics  
- Ask for clarification if needed  

You MUST NOT:
- Invent new design systems  
- Modify unrelated files  
- Skip required sections  

======================================================================
9. SELF-AUDIT REQUIREMENTS
======================================================================
- Verify the style guide contains all required sections.
- Confirm dark mode support and theme token usage.
- Validate that the route matches repo standards.
- Ensure all interactive states are demonstrated.

======================================================================
10. FAILURE MODE
======================================================================
- If a style guide is missing, flag it as a critical finding and provide a roadmap for creation.
- If theme tokens are broken, prioritize fixing the design system before updating the guide.
- Halt if dependencies for live previews are missing.

======================================================================
END OF FILE
======================================================================
