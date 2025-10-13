# Contadores CPA - Sistema de Contabilidad

[![CI](https://github.com/aogallo/contadorescpa-client/workflows/CI/badge.svg)](https://github.com/your-org/contadorescpa-client/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646cff.svg)](https://vitejs.dev/)
[![Material UI](https://img.shields.io/badge/Material_UI-5.15-007fff.svg)](https://mui.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

Sistema moderno de gestión contable desarrollado con las últimas tecnologías web. Permite gestionar clientes, proveedores, cuentas por pagar y generar reportes financieros.

## 🚀 Tech Stack

- **[React 18](https://react.dev/)** - UI library with concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Material UI 5](https://mui.com/)** - Comprehensive React component library
- **[React Query](https://tanstack.com/query/latest)** - Powerful data synchronization
- **[React Router 6](https://reactrouter.com/)** - Client-side routing
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client
- **[Formik](https://formik.org/)** - Form management
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - React testing utilities

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/contadorescpa-client.git
cd contadorescpa-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your environment variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Contadores CPA
VITE_APP_VERSION=2.0.0
```

4. **Start the development server**

```bash
npm run dev
```

The application will open at [http://localhost:3001](http://localhost:3001)

## 📜 Available Scripts

### Development

```bash
npm run dev          # Start development server (port 3001)
npm run preview      # Preview production build locally
```

### Building

```bash
npm run build        # Build for production (output: dist/)
npm run type-check   # Run TypeScript type checking without emitting
```

### Testing

```bash
npm test            # Run tests in watch mode
npm run test:ui     # Run tests with Vitest UI
npm run test:ci     # Run tests once with coverage (for CI)
```

### Code Quality

```bash
npm run lint        # Lint code with ESLint
npm run lint:fix    # Fix linting issues automatically
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
```

### Git Hooks

Git hooks are automatically set up via Husky:

- **pre-commit**: Runs linting and formatting on staged files
- **commit-msg**: Validates commit message format
- **pre-push**: Runs type checking and tests

## 🏗️ Project Structure

```
contadorescpa-client/
├── .github/              # GitHub workflows (CI/CD)
├── public/               # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   │   └── queries/    # React Query hooks
│   ├── pages/          # Page components
│   ├── reducer/        # State reducers
│   ├── routes/         # Routing configuration
│   ├── services/       # API service layer
│   ├── theme/          # Material UI theme
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── test/           # Test utilities and setup
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Application entry point
├── .editorconfig        # Editor configuration
├── .eslintrc.json      # ESLint configuration
├── .prettierrc.json    # Prettier configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🧪 Testing

This project has comprehensive test coverage including:

- **Unit Tests**: Testing individual functions and components
- **Integration Tests**: Testing component interactions
- **Test Coverage Goal**: 80%+ for all code

Run tests with coverage report:

```bash
npm run test:ci
```

View coverage report:

```bash
open coverage/index.html
```

## 🎨 Code Style

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** strict mode for type safety
- **Conventional Commits** for commit messages

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`

Examples:
```bash
feat(auth): add JWT token refresh mechanism
fix(table): resolve pagination issue on mobile
docs(readme): update installation instructions
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Environment Variables

Make sure to set the following environment variables for production:

- `VITE_API_URL`: Backend API URL
- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: Application version

### Deployment Platforms

This application can be deployed to:

- **Vercel**: Automatic deployments from Git
- **Netlify**: Simple static hosting
- **AWS S3 + CloudFront**: Scalable static hosting
- **Azure Static Web Apps**: Microsoft cloud hosting

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes following conventional commits
4. Push to your branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📚 Documentation

- [Modernization Plan](MODERNIZATION_PLAN.md) - Complete migration roadmap
- [Implementation Status](IMPLEMENTATION_STATUS.md) - Current progress
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Code of Conduct](CODE_OF_CONDUCT.md) - Community guidelines
- [Security Policy](SECURITY.md) - Security and vulnerability reporting
- [Changelog](CHANGELOG.md) - Version history

## 🔒 Security

If you discover a security vulnerability, please send an email to security@contadorescpa.com. Do not open a public issue.

See [SECURITY.md](SECURITY.md) for more details.

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Development Team** - [Your Organization]
- **Maintainers** - See [CODEOWNERS](.github/CODEOWNERS)

## 🙏 Acknowledgments

- [React Team](https://react.dev/) for the amazing UI library
- [Material UI](https://mui.com/) for the comprehensive component library
- [TanStack](https://tanstack.com/) for React Query
- [Vite Team](https://vitejs.dev/) for the blazing fast build tool

## 📞 Support

For support and questions:

- 📧 Email: support@contadorescpa.com
- 📖 Documentation: [Link to your docs]
- 🐛 Bug Reports: [GitHub Issues](https://github.com/your-org/contadorescpa-client/issues)

---

Made with ❤️ by the Contadores CPA Team
