## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you'll be able to run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:5173/](http://localhost:5173/)


If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

## Project Structure

The project follows a well-organized directory structure with clear naming conventions to improve maintainability and readability:

```
src/
├── apiServices/         # API client and service modules for data fetching
├── app/                 # Next.js app router components and layouts
├── components/          # Reusable UI components
│   ├── dealComponents/  # Deal-specific components
│   ├── layout/          # Layout components (header, sidebar, etc.)
│   └── uiElements/      # Basic UI elements (buttons, inputs, etc.)
├── contextProviders/    # React context providers
├── features/            # Feature-specific components
│   ├── layoutTemplates/ # Layout templates for different features
│   └── pageComponents/  # Page components for different features
├── pages/               # Next.js pages router components
├── store/               # Global state management
├── typeDefinitions/     # TypeScript type definitions
└── utilities/           # Utility functions and helpers
```
