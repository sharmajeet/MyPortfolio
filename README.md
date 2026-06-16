# Jeet Sharma — Portfolio

A modern, animated developer portfolio built with React, TypeScript, Tailwind CSS, and GSAP.

## Features

- Cinematic GSAP animations — staggered hero reveal, scroll-driven timeline, pinned horizontal project showcase, magnetic buttons
- Lenis smooth scrolling synced with GSAP ScrollTrigger
- Light and dark theme with persistence and system-preference detection
- Fully responsive, accessible, and respects `prefers-reduced-motion`

## Stack

| Concern    | Choice                          |
| ---------- | ------------------------------- |
| Build      | Vite                            |
| UI         | React 19 + TypeScript           |
| Styling    | Tailwind CSS v4                 |
| Animation  | GSAP + ScrollTrigger + Lenis    |

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Customizing content

All content lives in `src/data/portfolio.ts` — edit profile, skills, experience,
projects, education, and achievements there. Replace `public/Jeet_Sharma_Resume.pdf`
to update the downloadable résumé, and set your real LinkedIn URL in `profile.linkedin`.

## Deploy to Azure Storage (static website)

This is a static SPA, so it deploys to Azure Storage static website hosting.

**One-time setup**

1. Install the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) and run `az login`.
2. Create a general-purpose v2 storage account (once):

   ```powershell
   az group create --name portfolio-rg --location centralindia
   az storage account create --name <youraccount> --resource-group portfolio-rg `
     --location centralindia --sku Standard_LRS --kind StorageV2
   ```

**Deploy (every time)**

```powershell
./deploy-azure.ps1 -StorageAccount <youraccount> -ResourceGroup portfolio-rg
```

The script builds `dist/`, enables static website hosting, uploads the build to the
`$web` container, and prints the live URL.

**SPA routing:** the script sets both the index and the **404 document to `index.html`**
so client-side routes (e.g. `/projects/boardroom`) work on direct load / refresh. Azure
Storage serves the fallback with a 404 status; for a clean 200 + HTTPS on a custom domain,
front the account with Azure CDN / Front Door (optional).

## Deploy to Azure Static Web Apps (recommended for SPAs)

Static Web Apps handles SPA routing properly (clean 200s), free SSL, and custom domains.
Routing rules live in `staticwebapp.config.json`; CI/CD lives in
`.github/workflows/azure-static-web-apps.yml`.

1. Push this project to a GitHub repo (`main` branch).
2. Create the Static Web App and link the repo:

   ```powershell
   az staticwebapp create --name jeet-portfolio --resource-group portfolio-rg `
     --source https://github.com/<you>/<repo> --branch main `
     --app-location "/" --output-location "dist" --login-with-github
   ```

   (Or create it in the Azure Portal → Static Web Apps → connect GitHub.)
3. Add the deployment token as a repo secret named **`AZURE_STATIC_WEB_APPS_API_TOKEN`**
   (Portal → your Static Web App → *Manage deployment token*; GitHub → repo *Settings →
   Secrets and variables → Actions*). The portal flow adds this automatically.

Every push to `main` then builds and deploys automatically, and PRs get preview URLs.
