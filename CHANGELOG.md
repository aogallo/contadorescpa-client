# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive modernization plan (MODERNIZATION_PLAN.md)
- Repository best practices configuration (.editorconfig, .nvmrc, etc.)
- GitHub workflows for CI/CD (6 workflows)
- Code quality tools (ESLint, Prettier, Husky, Commitlint)
- TypeScript configuration with strict mode
- Complete type definitions for all data models
- Material UI theme with custom styling
- React Query setup with service layer
- Comprehensive testing infrastructure (Vitest + Testing Library)
- Complete utility functions with 100% test coverage
- REST API service layer (7 services)
- Professional documentation (README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT)

### Changed
- Migration from Create React App to Vite (complete)
- Updated package.json to v2.0.0 with modern dependencies
- React 16 → React 18 setup complete
- Removed Apollo Client/GraphQL dependencies
- Optimized GitHub workflows with npm caching
- Improved README.md with comprehensive documentation

### Fixed
- Dependency conflicts with TypeScript ESLint
- Removed legacy Create React App dependencies
- Added npm install optimization flags (--prefer-offline --no-audit)
- Fixed Codecov upload to run only once per test matrix
- Updated all GitHub Actions to latest versions:
  - actions/upload-artifact: v3 → v4 (v3 deprecated)
  - codecov/codecov-action: v3 → v4 (with token support)
  - github/codeql-action: v2 → v3 (improved security scanning)
  - actions/dependency-review-action: v3 → v4 (better analysis)
- Added --legacy-peer-deps flag for npm install to handle transition dependencies
- Created .npmrc to standardize npm configuration across environments
- Fixed all linting errors (import ordering, unused imports, type issues)
- Fixed all TypeScript type errors (Vite env, React Query v5 API, Theme types)
- Created vite-env.d.ts for Vite environment type definitions
- Updated React Query from cacheTime to gcTime (v5 API)

### Removed
- Create React App (react-scripts)
- Apollo Client and GraphQL
- Standard linter (replaced with ESLint + Prettier)
- Legacy browser list configuration
- Conflicting ESLint configurations

### Deprecated
- Apollo Client GraphQL queries (replaced with REST API + React Query)
- Custom CSS components (being replaced with Material UI)

## [1.0.0] - 2024-01-01

### Added
- Initial version with React 16
- Apollo Client integration
- Basic authentication
- Client management
- Provider management
- Accounts payable management
- Company selection
- Reports generation

### Security
- JWT token-based authentication
- Secure API communication

