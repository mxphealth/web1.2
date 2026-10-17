MaxProHealth website source

This ZIP contains the existing static website plus the Health Tools and Medical Services page update.

New pages:
- health-tools.html — BMI, daily calorie, adult weight range, fluid estimate, blood glucose unit converter, and macronutrient calculator. BMI handling is age-aware: adult categories are shown only from age 20; ages 2–19 receive the BMI number without adult classification.
- medical-services.html — overview of healthcare inquiry categories for South Korea and Thailand.

Updated shared files:
- header.html — adds Health Tools and Medical Services navigation tabs; the responsive navigation breakpoint is adjusted for the longer menu.
- footer.html — adds both navigation links and updates the site description.
- sitemap.xml — includes both new pages.
- Existing index, health, and products fallback navigation links include the new pages.

Both new pages use the repository's existing shared component IDs and loader pattern: mxp-header, mxp-footer, and mxp-scroll-top. They load header.html, footer.html, and scroll-top.html and reuse the global theme/language/menu behavior in header.html.

Deployment: keep the repository files at the project root so index.html, header.html, footer.html, and the other page files sit alongside each other.

