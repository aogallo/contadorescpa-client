# Complete Application Modernization Plan

## Overview
This plan modernizes the contadorescpa-client React application through a phased approach, transforming it from a CRA-based React 16 app with Apollo Client/GraphQL to a modern Vite-powered React 18 TypeScript application with Material UI, React Query, and REST API.

**Key Objectives:**
- Convert entire application to TypeScript
- Migrate from Create React App to Vite
- Replace Apollo Client/GraphQL with React Query + REST API
- Integrate Material UI with UX best practices
- Implement comprehensive unit testing (entire application)
- Setup GitHub workflows for CI/CD
- Configure repository with industry best practices

---

## Phase 1: Repository Configuration & Best Practices

### 1.1 Git Configuration

**Files to create:**
- `.editorconfig` - Consistent coding styles across editors
- `.nvmrc` - Node version specification
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community standards
- `SECURITY.md` - Security policy and vulnerability reporting
- `CHANGELOG.md` - Version history

**Update `.gitignore`:**
```
# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# Testing
/coverage
/.nyc_output

# Build
/build
/dist
/.vite

# Environment
.env
.env.local
.env.*.local
.env.development
.env.production

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS
.DS_Store
Thumbs.db

# Temporary
.cache
.temp
```

### 1.2 Git Hooks with Husky

**Install and configure:**
```bash
npm install -D husky lint-staged
npx husky install
```

**Create hooks:**
- `.husky/pre-commit` - Run linting and formatting
- `.husky/pre-push` - Run tests and type checking
- `.husky/commit-msg` - Validate commit messages (conventional commits)

**Configure `lint-staged` in `package.json`:**
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### 1.3 Commit Convention

**Install commitlint:**
```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

**Create `.commitlintrc.json`:**
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "ci",
        "build"
      ]
    ]
  }
}
```

### 1.4 Code Quality Tools

**ESLint for TypeScript:**
```bash
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-react eslint-plugin-react-hooks
npm install -D eslint-plugin-jsx-a11y eslint-plugin-import
```

**Create `.eslintrc.json`:**
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      "typescript": true,
      "node": true
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/order": ["error", {
      "groups": ["builtin", "external", "internal", ["parent", "sibling"]],
      "pathGroups": [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["react"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }]
  }
}
```

**Prettier:**
```bash
npm install -D prettier eslint-config-prettier
```

**Create `.prettierrc.json`:**
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**Create `.prettierignore`:**
```
build
dist
coverage
node_modules
*.min.js
.vite
```

---

## Phase 2: GitHub Workflows & CI/CD

### 2.1 Create `.github/workflows/` Directory

**2.1.1 `ci.yml` - Continuous Integration**
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  type-check:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check

  test:
    name: Test
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test:ci
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: dist
```

**2.1.2 `code-quality.yml` - Code Quality Checks**
```yaml
name: Code Quality

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  sonarcloud:
    name: SonarCloud Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v3

  security-audit:
    name: Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm audit --audit-level=moderate
```

**2.1.3 `pr-checks.yml` - Pull Request Validation**
```yaml
name: PR Checks

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  pr-title:
    name: Validate PR Title
    runs-on: ubuntu-latest
    steps:
      - uses: amannn/action-semantic-pull-request@v5
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  size-label:
    name: PR Size Labeler
    runs-on: ubuntu-latest
    steps:
      - uses: codelytv/pr-size-labeler@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          xs_label: 'size/xs'
          xs_max_size: '10'
          s_label: 'size/s'
          s_max_size: '100'
          m_label: 'size/m'
          m_max_size: '500'
          l_label: 'size/l'
          l_max_size: '1000'
          xl_label: 'size/xl'
```

**2.1.4 `deploy-staging.yml` - Staging Deployment**
```yaml
name: Deploy to Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.contadorescpa.com
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: ${{ secrets.STAGING_API_URL }}
      # Add your deployment steps here (e.g., AWS S3, Netlify, Vercel)
```

**2.1.5 `deploy-production.yml` - Production Deployment**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
    tags:
      - 'v*'

jobs:
  deploy:
    name: Deploy to Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://contadorescpa.com
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          VITE_API_URL: ${{ secrets.PRODUCTION_API_URL }}
      # Add your deployment steps here
```

**2.1.6 `codeql.yml` - Security Scanning**
```yaml
name: CodeQL

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1'

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    strategy:
      matrix:
        language: ['javascript']
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v2
        with:
          languages: ${{ matrix.language }}
      - uses: github/codeql-action/autobuild@v2
      - uses: github/codeql-action/analyze@v2
```

### 2.2 Branch Protection Rules

Configure in GitHub repository settings:
- Require pull request reviews (minimum 1)
- Require status checks to pass before merging
- Require branches to be up to date
- Include administrators
- Require linear history
- Required checks:
  - Lint
  - Type Check
  - Test
  - Build
  - Security Audit

---

## Phase 3: Foundation & Deprecated API Fixes

### 3.1 Identify and Document Deprecated APIs

**React 16.14 → 18 Breaking Changes:**
- `ReactDOM.render` → `ReactDOM.createRoot`
- Remove `UNSAFE_` lifecycle methods if any
- Update event handler types
- Children type handling

**Dependencies to update:**
- React: 16.14.0 → 18.3.1
- React-DOM: 16.14.0 → 18.3.1
- jwt-decode: 3.1.2 → 4.x (API changed)
- react-router-dom: 6.2.1 → 6.x (latest)
- formik: Update to latest

### 3.2 Update Dependencies

**Remove:**
- `@apollo/client`
- `graphql`
- `react-scripts`
- `standard` (replace with ESLint + Prettier)

**Add:**
- `vite` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- TypeScript and types
- `@tanstack/react-query` - Data fetching/caching
- `axios` - HTTP client
- Material UI suite
- Testing tools
- Code quality tools

**Full package.json dependencies update:**
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0",
    "@tanstack/react-query": "^5.22.0",
    "@tanstack/react-query-devtools": "^5.22.0",
    "axios": "^1.6.7",
    "@mui/material": "^5.15.10",
    "@mui/icons-material": "^5.15.10",
    "@mui/x-date-pickers": "^6.19.5",
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "formik": "^2.4.5",
    "jwt-decode": "^4.0.0",
    "react-icons": "^5.0.1",
    "date-fns": "^3.3.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/node": "^20.11.19",
    "vite": "^5.1.3",
    "@vitejs/plugin-react": "^4.2.1",
    "vitest": "^1.3.1",
    "@vitest/ui": "^1.3.1",
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/user-event": "^14.5.2",
    "jsdom": "^24.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.1",
    "@typescript-eslint/parser": "^7.0.1",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-config-prettier": "^9.1.0",
    "prettier": "^3.2.5",
    "husky": "^9.0.10",
    "lint-staged": "^15.2.2",
    "@commitlint/cli": "^18.6.1",
    "@commitlint/config-conventional": "^18.6.2"
  }
}
```

---

## Phase 4: Vite Migration (Before TypeScript)

### 4.1 Configure Vite

**Create `vite.config.ts`:**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      components: resolve(__dirname, './src/components'),
      pages: resolve(__dirname, './src/pages'),
      hooks: resolve(__dirname, './src/hooks'),
      utils: resolve(__dirname, './src/utils'),
      services: resolve(__dirname, './src/services'),
      types: resolve(__dirname, './src/types'),
      context: resolve(__dirname, './src/context'),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],
    },
  },
});
```

### 4.2 Environment Variables

**Create `.env.example`:**
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Contadores CPA
VITE_APP_VERSION=2.0.0
```

**Create `.env.development`:**
```
VITE_API_URL=http://localhost:3000/api
```

**Create `.env.production`:**
```
VITE_API_URL=https://api.contadorescpa.com
```

### 4.3 Update HTML Entry Point

**Move and update `public/index.html` → `index.html`:**
```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#246dec" />
    <meta name="description" content="Sistema de Contabilidad - Contadores Públicos y Auditores" />
    <title>Contabilidad - Contadores CPA</title>
  </head>
  <body>
    <noscript>Necesitas habilitar JavaScript para ejecutar esta aplicación.</noscript>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

### 4.4 Update Scripts

**Update `package.json` scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:ci": "vitest run --coverage",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,css,md}\"",
    "prepare": "husky install"
  }
}
```

---

## Phase 5: TypeScript Conversion

### 5.1 TypeScript Configuration

**Create `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    /* Path aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "components/*": ["./src/components/*"],
      "pages/*": ["./src/pages/*"],
      "hooks/*": ["./src/hooks/*"],
      "utils/*": ["./src/utils/*"],
      "services/*": ["./src/services/*"],
      "types/*": ["./src/types/*"],
      "context/*": ["./src/context/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**Create `tsconfig.node.json`:**
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

### 5.2 Convert Files (Priority Order)

**5.2.1 Types & Interfaces**

Create comprehensive TypeScript interfaces in `src/types/`:

**`src/types/common.ts`:**
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
```

**`src/types/user.ts`:**
```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
```

**`src/types/client.ts`:**
```typescript
export interface Client {
  id: number;
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormValues {
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
}
```

**`src/types/provider.ts`:**
```typescript
export interface Provider {
  id: number;
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  creditDay: number;
  companies: Company[];
}

export interface ProviderFormValues {
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  creditDay: number;
}
```

**`src/types/accountPayable.ts`:**
```typescript
export interface AccountPayable {
  id: number;
  providerId: number;
  companyId: number;
  documentTypeId: number;
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  exento: number;
  importation: number;
  service: number;
  asset: number;
  total: number;
  description: string;
}

export interface AccountPayableFormValues {
  providerId: number;
  companyId: number;
  documentTypeId: number;
  accountId: number;
  invoiceNumber: string;
  invoiceDate: Date | null;
  dueDate: Date | null;
  exento: string;
  importation: string;
  service: string;
  asset: string;
  description: string;
}
```

**`src/types/company.ts`:**
```typescript
export interface Company {
  id: number;
  name: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
}

export interface CompanyState {
  selectedCompany: Company | null;
  companies: Company[];
}
```

**`src/types/document.ts`:**
```typescript
export interface DocumentType {
  id: number;
  name: string;
  code: string;
}

export interface Account {
  id: number;
  name: string;
  code: string;
}
```

**5.2.2 Convert Utils (Modernize + TypeScript)**

**`src/utils/token.ts`:**
```typescript
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now();
    const expirationTime = decoded.exp * 1000;

    return currentTime >= expirationTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const getTokenPayload = <T = JwtPayload>(token: string): T | null => {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
```

**`src/utils/calculateValues.ts`:**
```typescript
interface CalculateValuesParams {
  exento: number | string;
  importation: number | string;
  service: number | string;
  asset: number | string;
}

export const calculateTotal = ({
  exento,
  importation,
  service,
  asset,
}: CalculateValuesParams): number => {
  const exentoNum = Number(exento) || 0;
  const importationNum = Number(importation) || 0;
  const serviceNum = Number(service) || 0;
  const assetNum = Number(asset) || 0;

  return assetNum + importationNum + serviceNum - exentoNum;
};

export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals);
};
```

**`src/utils/currencyFormatter.ts`:**
```typescript
interface CurrencyFormatterOptions {
  region?: string;
  currency?: string;
}

export const currencyFormatter = (
  value: number | string,
  { region = 'es-GT', currency = 'GTQ' }: CurrencyFormatterOptions = {}
): string => {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return '0.00';
  }

  return new Intl.NumberFormat(region, {
    style: 'currency',
    currency,
  }).format(numericValue);
};
```

**`src/utils/fieldValidation.ts`:**
```typescript
interface ValidationErrors {
  [key: string]: string;
}

interface FormValues {
  [key: string]: any;
  name?: string;
  email?: string;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

export const validatedFormFields = (
  values: FormValues,
  fields: string[]
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate name if included
  if (fields.includes('name')) {
    if (!values.name) {
      errors.name = 'Por favor ingresa tu nombre';
    } else if (!NAME_REGEX.test(values.name)) {
      errors.name = 'El nombre solo puede contener letras y espacios';
    }
  }

  // Validate each field
  fields.forEach((field) => {
    // Email validation
    if (field === 'email') {
      if (!values.email) {
        errors.email = 'Por favor ingresa una dirección de correo electrónico';
      } else if (!EMAIL_REGEX.test(values.email)) {
        errors.email = 'El correo ingresado es inválido';
      }
    }

    // Required field validation
    if (!values[field]) {
      errors[field] = `El campo ${field} es requerido.`;
    }
  });

  return errors;
};

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateName = (name: string): boolean => {
  return NAME_REGEX.test(name);
};
```

**5.2.3 Context & Reducers**

Convert context and reducers with proper TypeScript types.

**5.2.4 Components**

Convert all components following the order in the plan (bottom-up approach).

---

## Phase 6: Material UI Integration & UX Improvements

### 6.1 Setup Material UI Theme

**Create `src/theme/theme.ts`:**
```typescript
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      sidebar: {
        background: string;
        color: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      sidebar?: {
        background?: string;
        color?: string;
      };
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#246dec',
    },
    secondary: {
      main: '#dbae58',
    },
    error: {
      main: '#cc4c43',
    },
    success: {
      main: '#42b883',
    },
    background: {
      default: '#e6e8ed',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
  custom: {
    sidebar: {
      background: '#21232d',
      color: '#9799ab',
    },
  },
});
```

### 6.2 Replace Custom Components with MUI

Component replacement strategy documented in Phase 4 of original plan.

### 6.3 UX Best Practices

Implement all UX improvements from Phase 4.3 of original plan.

---

## Phase 7: REST API Migration (React Query + Axios)

### 7.1 Setup Axios Instance

**Create `src/services/api.ts`:**
```typescript
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from 'types/common';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear storage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  }
);

export default api;
```

### 7.2 Setup React Query

**Create `src/services/queryClient.ts`:**
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### 7.3 Create Service Layer

**Create `src/services/auth.service.ts`:**
```typescript
import api from './api';
import { User, LoginCredentials } from 'types/user';
import { ApiResponse } from 'types/common';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/auth/login', credentials);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },
};
```

**Create `src/services/client.service.ts`:**
```typescript
import api from './api';
import { Client, ClientFormValues } from 'types/client';
import { ApiResponse, PaginatedResponse } from 'types/common';

export const clientService = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<ApiResponse<Client[]>>('/clients');
    return response.data.data;
  },

  getById: async (id: number): Promise<Client> => {
    const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
    return response.data.data;
  },

  create: async (data: ClientFormValues): Promise<Client> => {
    const response = await api.post<ApiResponse<Client>>('/clients', data);
    return response.data.data;
  },

  update: async (id: number, data: ClientFormValues): Promise<Client> => {
    const response = await api.put<ApiResponse<Client>>(`/clients/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};
```

**Create similar services for:**
- `provider.service.ts`
- `accountPayable.service.ts`
- `company.service.ts`
- `document.service.ts`
- `report.service.ts`

### 7.4 Create Custom Hooks with React Query

**Create `src/hooks/queries/useClients.ts`:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientService } from 'services/client.service';
import { Client, ClientFormValues } from 'types/client';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: clientService.getAll,
  });
};

export const useClient = (id: number) => {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: () => clientService.getById(id),
    enabled: !!id,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClientFormValues }) =>
      clientService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients', variables.id] });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
```

**Create similar hooks for:**
- `useProviders.ts`
- `useAccountsPayable.ts`
- `useCompanies.ts`
- `useDocuments.ts`
- `useReports.ts`

### 7.5 Update Components to Use React Query

**Example: Convert `ProviderList.js` to use React Query:**
```typescript
import { useProviders, useDeleteProvider } from 'hooks/queries/useProviders';
import { useSnackbar } from 'context/SnackbarContext';

const ProviderList = () => {
  const { data: providers, isLoading, error } = useProviders();
  const deleteProvider = useDeleteProvider();
  const { showSnackbar } = useSnackbar();

  const handleDelete = async (id: number) => {
    try {
      await deleteProvider.mutateAsync(id);
      showSnackbar('Proveedor eliminado correctamente', 'success');
    } catch (error) {
      showSnackbar('Error al eliminar proveedor', 'error');
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading providers</Alert>;

  return (
    <Table 
      columns={columns}
      data={providers || []}
      onDelete={handleDelete}
    />
  );
};
```

---

## Phase 8: Comprehensive Unit Testing

### 8.1 Testing Setup

**Create `src/test/setup.ts`:**
```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables
vi.mock('import.meta', () => ({
  env: {
    VITE_API_URL: 'http://localhost:3000/api',
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;
```

**Create `src/test/utils.tsx`:**
```typescript
import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'theme/theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  const testQueryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

**Create `src/test/mocks/handlers.ts`:**
```typescript
import { rest } from 'msw';

const API_URL = 'http://localhost:3000/api';

export const handlers = [
  // Auth
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          token: 'mock-token',
        },
      })
    );
  }),

  // Clients
  rest.get(`${API_URL}/clients`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            name: 'Test Client',
            nit: '123456-7',
            address: 'Test Address',
            email: 'client@test.com',
            phone: '12345678',
          },
        ],
      })
    );
  }),

  // Add more handlers for all endpoints
];
```

**Create `src/test/mocks/server.ts`:**
```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

### 8.2 Utility Function Tests

**`src/utils/__tests__/token.test.ts`:**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { isTokenExpired, getTokenPayload } from '../token';

describe('token utilities', () => {
  describe('isTokenExpired', () => {
    it('should return true for undefined token', () => {
      expect(isTokenExpired()).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isTokenExpired('')).toBe(true);
    });

    it('should return true for expired token', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTYyMzkwMjJ9.xxx';
      expect(isTokenExpired(expiredToken)).toBe(true);
    });

    it('should return false for valid token', () => {
      // Create a token that expires in 1 hour
      const futureExp = Math.floor(Date.now() / 1000) + 3600;
      const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ exp: futureExp }))}.xxx`;
      expect(isTokenExpired(validToken)).toBe(false);
    });

    it('should return true for malformed token', () => {
      expect(isTokenExpired('invalid-token')).toBe(true);
    });
  });

  describe('getTokenPayload', () => {
    it('should decode valid token', () => {
      const payload = { userId: 1, exp: 1234567890 };
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.xxx`;
      
      const result = getTokenPayload(token);
      expect(result).toEqual(payload);
    });

    it('should return null for invalid token', () => {
      expect(getTokenPayload('invalid')).toBeNull();
    });
  });
});
```

**`src/utils/__tests__/calculateValues.test.ts`:**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateTotal, formatNumber } from '../calculateValues';

describe('calculateValues', () => {
  describe('calculateTotal', () => {
    it('should calculate total correctly with numbers', () => {
      const result = calculateTotal({
        exento: 100,
        importation: 200,
        service: 300,
        asset: 400,
      });
      expect(result).toBe(800); // 400 + 200 + 300 - 100
    });

    it('should calculate total correctly with strings', () => {
      const result = calculateTotal({
        exento: '100',
        importation: '200',
        service: '300',
        asset: '400',
      });
      expect(result).toBe(800);
    });

    it('should handle empty strings as 0', () => {
      const result = calculateTotal({
        exento: '',
        importation: '',
        service: '',
        asset: '100',
      });
      expect(result).toBe(100);
    });

    it('should handle negative values', () => {
      const result = calculateTotal({
        exento: -50,
        importation: 100,
        service: 100,
        asset: 100,
      });
      expect(result).toBe(350); // 100 + 100 + 100 - (-50)
    });
  });

  describe('formatNumber', () => {
    it('should format number with 2 decimals by default', () => {
      expect(formatNumber(123.456)).toBe('123.46');
    });

    it('should format number with specified decimals', () => {
      expect(formatNumber(123.456, 1)).toBe('123.5');
    });
  });
});
```

**`src/utils/__tests__/currencyFormatter.test.ts`:**
```typescript
import { describe, it, expect } from 'vitest';
import { currencyFormatter } from '../currencyFormatter';

describe('currencyFormatter', () => {
  it('should format number as GTQ currency by default', () => {
    const result = currencyFormatter(1000);
    expect(result).toContain('1,000');
    expect(result).toContain('Q'); // GTQ symbol
  });

  it('should format string numbers', () => {
    const result = currencyFormatter('1500.50');
    expect(result).toContain('1,500.50');
  });

  it('should handle different regions and currencies', () => {
    const result = currencyFormatter(1000, { region: 'en-US', currency: 'USD' });
    expect(result).toContain('$');
    expect(result).toContain('1,000');
  });

  it('should handle invalid numbers', () => {
    const result = currencyFormatter('invalid');
    expect(result).toBe('0.00');
  });

  it('should handle zero', () => {
    const result = currencyFormatter(0);
    expect(result).toContain('0');
  });
});
```

**`src/utils/__tests__/fieldValidation.test.ts`:**
```typescript
import { describe, it, expect } from 'vitest';
import { validatedFormFields, validateEmail, validateName } from '../fieldValidation';

describe('fieldValidation', () => {
  describe('validatedFormFields', () => {
    it('should return no errors for valid data', () => {
      const values = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '12345678',
      };
      const errors = validatedFormFields(values, ['name', 'email', 'phone']);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return error for empty required field', () => {
      const values = { name: '' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toBeTruthy();
    });

    it('should validate email format', () => {
      const values = { email: 'invalid-email' };
      const errors = validatedFormFields(values, ['email']);
      expect(errors.email).toContain('inválido');
    });

    it('should validate name format', () => {
      const values = { name: '123 Invalid' };
      const errors = validatedFormFields(values, ['name']);
      expect(errors.name).toContain('letras y espacios');
    });

    it('should handle multiple validation errors', () => {
      const values = { name: '', email: 'invalid' };
      const errors = validatedFormFields(values, ['name', 'email']);
      expect(Object.keys(errors).length).toBeGreaterThan(0);
    });
  });

  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@invalid.com')).toBe(false);
    });
  });

  describe('validateName', () => {
    it('should return true for valid name', () => {
      expect(validateName('Juan Pérez')).toBe(true);
    });

    it('should return false for name with numbers', () => {
      expect(validateName('Juan123')).toBe(false);
    });
  });
});
```

### 8.3 Component Tests

**`src/components/Message/__tests__/Message.test.tsx`:**
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from 'test/utils';
import { Message } from '../Message';

describe('Message Component', () => {
  it('should render message text', () => {
    render(<Message message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should apply error styles for error messages', () => {
    render(<Message message="Error message" severity="error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardError');
  });

  it('should apply success styles for success messages', () => {
    render(<Message message="Success message" severity="success" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });
});
```

**`src/components/Table/__tests__/Table.test.tsx`:**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from 'test/utils';
import userEvent from '@testing-library/user-event';
import { Table } from '../Table';

describe('Table Component', () => {
  const mockData = [
    { id: 1, name: 'Item 1', value: 100 },
    { id: 2, name: 'Item 2', value: 200 },
  ];

  const mockColumns = [
    { column: 'ID', key: 'id' },
    { column: 'Name', key: 'name' },
    { column: 'Value', key: 'value' },
  ];

  it('should render table with data', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should render empty state when no data', () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText(/no hay datos/i)).toBeInTheDocument();
  });

  it('should call onEdit when edit button clicked', async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();

    render(
      <Table 
        data={mockData} 
        columns={mockColumns}
        onEdit={onEdit}
      />
    );

    const editButtons = screen.getAllByLabelText(/edit/i);
    await user.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('should call onDelete when delete button clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <Table 
        data={mockData} 
        columns={mockColumns}
        onDelete={onDelete}
      />
    );

    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(mockData[0].id);
  });
});
```

**`src/components/ClientForm/__tests__/ClientForm.test.tsx`:**
```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from 'test/utils';
import userEvent from '@testing-library/user-event';
import { ClientForm } from '../ClientForm';

describe('ClientForm Component', () => {
  it('should render all form fields', () => {
    render(<ClientForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
  });

  it('should submit form with valid data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();

    render(<ClientForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/nombre/i), 'Juan Pérez');
    await user.type(screen.getByLabelText(/nit/i), '123456-7');
    await user.type(screen.getByLabelText(/dirección/i), 'Test Address');
    await user.type(screen.getByLabelText(/correo/i), 'juan@test.com');
    await user.type(screen.getByLabelText(/teléfono/i), '12345678');

    await user.click(screen.getByRole('button', { name: /guardar/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Juan Pérez',
          nit: '123456-7',
          email: 'juan@test.com',
        })
      );
    });
  });

  it('should show validation errors for empty required fields', async () => {
    const user = userEvent.setup();

    render(<ClientForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /guardar/i }));

    await waitFor(() => {
      expect(screen.getAllByText(/requerido/i)).toHaveLength(5);
    });
  });

  it('should show error for invalid email', async () => {
    const user = userEvent.setup();

    render(<ClientForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/correo/i), 'invalid-email');
    await user.click(screen.getByRole('button', { name: /guardar/i }));

    await waitFor(() => {
      expect(screen.getByText(/inválido/i)).toBeInTheDocument();
    });
  });

  it('should populate form with initial values in edit mode', () => {
    const initialValues = {
      name: 'Existing Client',
      nit: '987654-3',
      address: 'Existing Address',
      email: 'existing@test.com',
      phone: '87654321',
    };

    render(<ClientForm onSubmit={vi.fn()} initialValues={initialValues} />);

    expect(screen.getByDisplayValue('Existing Client')).toBeInTheDocument();
    expect(screen.getByDisplayValue('987654-3')).toBeInTheDocument();
  });
});
```

### 8.4 Service Tests

**`src/services/__tests__/client.service.test.ts`:**
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { server } from 'test/mocks/server';
import { clientService } from '../client.service';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('clientService', () => {
  describe('getAll', () => {
    it('should fetch all clients', async () => {
      const clients = await clientService.getAll();
      
      expect(clients).toBeInstanceOf(Array);
      expect(clients[0]).toHaveProperty('id');
      expect(clients[0]).toHaveProperty('name');
    });
  });

  describe('getById', () => {
    it('should fetch client by id', async () => {
      const client = await clientService.getById(1);
      
      expect(client).toHaveProperty('id', 1);
      expect(client).toHaveProperty('name');
    });
  });

  describe('create', () => {
    it('should create new client', async () => {
      const newClient = {
        name: 'New Client',
        nit: '123456-7',
        address: 'Test Address',
        email: 'new@test.com',
        phone: '12345678',
      };

      const client = await clientService.create(newClient);
      
      expect(client).toHaveProperty('id');
      expect(client.name).toBe(newClient.name);
    });
  });

  describe('update', () => {
    it('should update existing client', async () => {
      const updateData = {
        name: 'Updated Client',
        nit: '123456-7',
        address: 'Updated Address',
        email: 'updated@test.com',
        phone: '12345678',
      };

      const client = await clientService.update(1, updateData);
      
      expect(client.name).toBe(updateData.name);
    });
  });

  describe('delete', () => {
    it('should delete client', async () => {
      await expect(clientService.delete(1)).resolves.not.toThrow();
    });
  });
});
```

### 8.5 Hook Tests

**`src/hooks/queries/__tests__/useClients.test.ts`:**
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from 'test/mocks/server';
import { useClients, useCreateClient } from '../useClients';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useClients', () => {
  it('should fetch clients successfully', async () => {
    const { result } = renderHook(() => useClients(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeInstanceOf(Array);
    expect(result.current.data?.length).toBeGreaterThan(0);
  });

  it('should handle loading state', () => {
    const { result } = renderHook(() => useClients(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});

describe('useCreateClient', () => {
  it('should create client successfully', async () => {
    const { result } = renderHook(() => useCreateClient(), {
      wrapper: createWrapper(),
    });

    const newClient = {
      name: 'Test Client',
      nit: '123456-7',
      address: 'Test Address',
      email: 'test@test.com',
      phone: '12345678',
    };

    result.current.mutate(newClient);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty('id');
  });
});
```

### 8.6 Integration Tests

**`src/pages/Client/__tests__/Client.integration.test.tsx`:**
```typescript
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { render, screen, waitFor } from 'test/utils';
import userEvent from '@testing-library/user-event';
import { server } from 'test/mocks/server';
import { ClientPage } from '../Client';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Client Page Integration', () => {
  it('should load and display clients', async () => {
    render(<ClientPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });
  });

  it('should create new client', async () => {
    const user = userEvent.setup();
    render(<ClientPage />);

    // Click add button
    await user.click(screen.getByRole('button', { name: /nuevo/i }));

    // Fill form
    await user.type(screen.getByLabelText(/nombre/i), 'New Client');
    await user.type(screen.getByLabelText(/nit/i), '123456-7');
    await user.type(screen.getByLabelText(/dirección/i), 'Address');
    await user.type(screen.getByLabelText(/correo/i), 'new@test.com');
    await user.type(screen.getByLabelText(/teléfono/i), '12345678');

    // Submit
    await user.click(screen.getByRole('button', { name: /guardar/i }));

    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/creado correctamente/i)).toBeInTheDocument();
    });
  });

  it('should edit existing client', async () => {
    const user = userEvent.setup();
    render(<ClientPage />);

    // Wait for clients to load
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    // Click edit button
    const editButtons = screen.getAllByLabelText(/edit/i);
    await user.click(editButtons[0]);

    // Modify form
    const nameInput = screen.getByLabelText(/nombre/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Updated Client');

    // Submit
    await user.click(screen.getByRole('button', { name: /guardar/i }));

    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/actualizado correctamente/i)).toBeInTheDocument();
    });
  });

  it('should delete client', async () => {
    const user = userEvent.setup();
    render(<ClientPage />);

    // Wait for clients to load
    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
    });

    // Click delete button
    const deleteButtons = screen.getAllByLabelText(/delete/i);
    await user.click(deleteButtons[0]);

    // Confirm deletion
    await user.click(screen.getByRole('button', { name: /confirmar/i }));

    // Verify success message
    await waitFor(() => {
      expect(screen.getByText(/eliminado/i)).toBeInTheDocument();
    });
  });
});
```

### 8.7 E2E Tests (Optional - Playwright)

**Create `e2e/login.spec.ts`:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login successfully', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/');
    await expect(page.locator('text=Bienvenido')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('[name="username"]', 'invalid');
    await page.fill('[name="password"]', 'wrong');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=credenciales inválidas')).toBeVisible();
  });
});
```

### 8.8 Test Coverage Goals

**Target coverage:**
- Statements: 80%+
- Branches: 75%+
- Functions: 80%+
- Lines: 80%+

**Coverage report scripts:**
```json
{
  "scripts": {
    "test:coverage": "vitest run --coverage",
    "test:coverage:ui": "vitest --ui --coverage"
  }
}
```

---

## Phase 9: Documentation & Code Patterns

### 9.1 Recommended Patterns

As documented in Phase 7 of original plan.

### 9.2 Documentation Structure

**Create comprehensive documentation:**
- `docs/ARCHITECTURE.md` - System architecture, folder structure, design decisions
- `docs/API.md` - REST API endpoints, request/response formats, error handling
- `docs/COMPONENTS.md` - Component library with props, examples, and usage guidelines
- `docs/DEVELOPMENT.md` - Local setup, development workflow, debugging tips
- `docs/TESTING.md` - Testing strategy, writing tests, running tests
- `docs/DEPLOYMENT.md` - Build process, environment configuration, deployment steps
- `docs/MIGRATION.md` - Migration notes from GraphQL to REST, breaking changes
- `docs/CONTRIBUTING.md` - Contribution guidelines, code style, PR process
- `docs/TROUBLESHOOTING.md` - Common issues and solutions

### 9.3 Update README.md

**Comprehensive README structure:**
```markdown
# Contadores CPA - Sistema de Contabilidad

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material UI** - Component library
- **React Query** - Data fetching and caching
- **React Router** - Navigation
- **Formik** - Form management
- **Axios** - HTTP client
- **Vitest** - Testing framework

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Git

## 🛠️ Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-org/contadorescpa-client.git

# Navigate to project
cd contadorescpa-client

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui
\`\`\`

## 📦 Build

\`\`\`bash
# Production build
npm run build

# Preview production build
npm run preview
\`\`\`

## 🏗️ Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API services
├── hooks/          # Custom hooks
├── context/        # React context
├── types/          # TypeScript types
├── utils/          # Utility functions
├── theme/          # Material UI theme
└── test/           # Test utilities and mocks
\`\`\`

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

Proprietary - All rights reserved
```

---

## Migration Checklist

### Repository Configuration
- [ ] Create .editorconfig
- [ ] Configure .gitignore
- [ ] Setup Husky git hooks
- [ ] Configure ESLint + Prettier
- [ ] Setup commitlint
- [ ] Create CONTRIBUTING.md
- [ ] Create CODE_OF_CONDUCT.md
- [ ] Create SECURITY.md

### GitHub Workflows
- [ ] Create CI workflow (ci.yml)
- [ ] Create code quality workflow
- [ ] Create PR checks workflow
- [ ] Create staging deployment workflow
- [ ] Create production deployment workflow
- [ ] Create CodeQL security scanning
- [ ] Configure branch protection rules

### Dependencies
- [ ] Update React to 18
- [ ] Migrate to Vite
- [ ] Install TypeScript
- [ ] Install Material UI
- [ ] Install React Query + Axios
- [ ] Install Vitest + Testing Library
- [ ] Remove Apollo Client & CRA

### Code Conversion
- [ ] Convert all JS to TS (60+ files)
- [ ] Create comprehensive TypeScript types
- [ ] Modernize all utility functions
- [ ] Replace GraphQL with REST (24 files)
- [ ] Integrate Material UI components
- [ ] Update entry point and HTML

### Comprehensive Testing
- [ ] Setup Vitest + MSW
- [ ] Write utility function tests (4 files)
- [ ] Write component tests (20+ components)
- [ ] Write service tests (7 services)
- [ ] Write hook tests (6 hooks)
- [ ] Write integration tests (5+ pages)
- [ ] Setup E2E tests (optional)
- [ ] Achieve 80%+ code coverage

### Documentation
- [ ] Create ARCHITECTURE.md
- [ ] Create API.md
- [ ] Create COMPONENTS.md
- [ ] Create DEVELOPMENT.md
- [ ] Create TESTING.md
- [ ] Create DEPLOYMENT.md
- [ ] Create MIGRATION.md
- [ ] Update README.md
- [ ] Add inline code documentation

### Quality Assurance
- [ ] All linting passes
- [ ] All type checking passes
- [ ] All tests pass (unit + integration)
- [ ] Code coverage meets goals (80%+)
- [ ] Build succeeds
- [ ] Manual testing completed
- [ ] Performance audit completed
- [ ] Accessibility audit completed
- [ ] Security audit completed

---

## Estimated Timeline

- Phase 1 (Repository): 1-2 days
- Phase 2 (GitHub Workflows): 1-2 days
- Phase 3 (Deprecation fixes): 2-3 days
- Phase 4 (Vite): 2-3 days
- Phase 5 (TypeScript): 5-7 days
- Phase 6 (Material UI + UX): 4-5 days
- Phase 7 (REST API + React Query): 5-7 days
- Phase 8 (Comprehensive Testing): 7-10 days
- Phase 9 (Documentation): 3-4 days

**Total: 30-43 days** for complete modernization with comprehensive testing and best practices.

---

## Success Criteria

1. ✅ All code converted to TypeScript with strict mode
2. ✅ Vite build working in dev and production
3. ✅ All components using Material UI
4. ✅ REST API replacing GraphQL completely
5. ✅ React Query managing all server state
6. ✅ Test coverage ≥ 80%
7. ✅ All GitHub workflows passing
8. ✅ Documentation complete and up-to-date
9. ✅ Zero linting/type errors
10. ✅ Accessibility score > 90
11. ✅ Performance Lighthouse score > 90
12. ✅ All manual testing scenarios passing

