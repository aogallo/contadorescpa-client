# Guía de Contribución

¡Gracias por tu interés en contribuir a Contadores CPA! Este documento proporciona pautas y mejores prácticas para contribuir al proyecto.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Empezar](#cómo-empezar)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Mejoras](#sugerir-mejoras)

## Código de Conducta

Este proyecto y todos los que participan en él se rigen por el [Código de Conducta](CODE_OF_CONDUCT.md). Al participar, se espera que sigas este código.

## Cómo Empezar

1. **Fork el repositorio**
   ```bash
   # Clona tu fork
   git clone https://github.com/tu-usuario/contadorescpa-client.git
   cd contadorescpa-client
   ```

2. **Configura el upstream**
   ```bash
   git remote add upstream https://github.com/organizacion/contadorescpa-client.git
   ```

3. **Instala dependencias**
   ```bash
   npm install
   ```

4. **Configura variables de entorno**
   ```bash
   cp .env.example .env.local
   # Edita .env.local con tus configuraciones
   ```

5. **Ejecuta el proyecto**
   ```bash
   npm run dev
   ```

## Proceso de Desarrollo

### 1. Crea una rama

Siempre trabaja en una rama separada, nunca en `main` o `develop`:

```bash
git checkout develop
git pull upstream develop
git checkout -b tipo/descripcion-corta
```

Tipos de rama:
- `feat/` - Nueva funcionalidad
- `fix/` - Corrección de bugs
- `docs/` - Cambios en documentación
- `style/` - Cambios de formato (no afectan el código)
- `refactor/` - Refactorización de código
- `test/` - Agregar o modificar tests
- `chore/` - Tareas de mantenimiento

Ejemplo: `feat/material-ui-integration`

### 2. Desarrolla

- Escribe código limpio y mantenible
- Sigue los estándares de código del proyecto
- Escribe tests para tu código
- Actualiza la documentación si es necesario

### 3. Prueba tu código

```bash
# Ejecuta los tests
npm test

# Verifica la cobertura
npm run test:coverage

# Ejecuta el linter
npm run lint

# Verifica el formateo
npm run format:check

# Ejecuta type checking
npm run type-check
```

### 4. Commit

Seguimos la convención de [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "tipo(alcance): descripción corta

Descripción más detallada si es necesario.

Fixes #123"
```

Tipos de commit:
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, punto y coma faltantes, etc.
- `refactor`: Refactorización de código
- `test`: Agregar tests
- `chore`: Mantenimiento
- `perf`: Mejora de rendimiento
- `ci`: Cambios en CI/CD
- `build`: Cambios en sistema de build

Ejemplos:
```bash
feat(auth): add JWT token refresh mechanism
fix(table): resolve pagination issue on mobile
docs(readme): update installation instructions
test(utils): add tests for currency formatter
```

### 5. Push

```bash
git push origin tu-rama
```

## Estándares de Código

### TypeScript

- Usa TypeScript estricto (`strict: true`)
- Evita `any`, usa tipos específicos
- Define interfaces para todos los objetos
- Usa tipos de retorno explícitos en funciones

```typescript
// ✅ Bien
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  // ...
}

// ❌ Mal
function getUser(id: any): any {
  // ...
}
```

### React

- Usa componentes funcionales con hooks
- Usa TypeScript para props
- Implementa memoización cuando sea necesario
- Sigue el principio de responsabilidad única

```typescript
// ✅ Bien
interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  // ...
};

// ❌ Mal
export const UserCard = (props: any) => {
  // ...
};
```

### Nombres

- Variables y funciones: `camelCase`
- Componentes y clases: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos de componentes: `PascalCase.tsx`
- Archivos de utilidades: `camelCase.ts`

### Imports

Organiza los imports en este orden:

```typescript
// 1. Librerías externas
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Imports absolutos internos
import { Button } from 'components/Button';
import { userService } from 'services/user.service';

// 3. Imports relativos
import { formatDate } from './utils';
import styles from './Component.module.css';

// 4. Tipos
import type { User } from 'types/user';
```

### Comentarios

- Escribe código auto-explicativo
- Usa comentarios para explicar el "por qué", no el "qué"
- Documenta funciones complejas con JSDoc

```typescript
/**
 * Calcula el total de una cuenta por pagar
 * @param values - Valores de los diferentes conceptos
 * @returns El total calculado
 */
export const calculateTotal = (values: CalculateValuesParams): number => {
  // Restamos exento porque representa un descuento
  return assetNum + importationNum + serviceNum - exentoNum;
};
```

## Testing

### Cobertura Requerida

- Mínimo 80% de cobertura
- Todos los utils deben tener 100% de cobertura
- Componentes críticos deben tener tests completos

### Escribir Buenos Tests

```typescript
describe('Component', () => {
  it('should do something specific', () => {
    // Arrange
    const props = { ... };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
```

## Pull Requests

### Antes de Crear un PR

- [ ] El código compila sin errores
- [ ] Todos los tests pasan
- [ ] El linter no reporta errores
- [ ] La cobertura de tests cumple los requisitos
- [ ] La documentación está actualizada
- [ ] Los commits siguen la convención

### Título del PR

Usa el mismo formato que los commits:

```
feat(auth): add OAuth2 authentication support
fix(table): resolve mobile pagination issue
docs(api): update REST API documentation
```

### Descripción del PR

Incluye:

1. **Descripción**: ¿Qué cambia este PR?
2. **Motivación**: ¿Por qué se necesita este cambio?
3. **Cómo probarlo**: Pasos para verificar los cambios
4. **Screenshots**: Si aplica (cambios visuales)
5. **Checklist**: Tareas completadas
6. **Issues relacionados**: `Closes #123`, `Related to #456`

### Template de PR

```markdown
## Descripción
Breve descripción de los cambios.

## Motivación y Contexto
¿Por qué es necesario este cambio?

## Cómo se ha probado
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Pruebas manuales

## Tipos de cambios
- [ ] Bug fix (cambio que corrige un issue)
- [ ] Nueva funcionalidad (cambio que agrega funcionalidad)
- [ ] Breaking change (cambio que rompe compatibilidad)
- [ ] Documentación

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He realizado una auto-revisión de mi código
- [ ] He comentado el código, particularmente en áreas complejas
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevas advertencias
- [ ] He agregado tests que prueban mi cambio
- [ ] Los tests nuevos y existentes pasan localmente
- [ ] He actualizado el CHANGELOG.md

## Screenshots (si aplica)
```

### Proceso de Revisión

1. El PR será revisado por al menos un mantenedor
2. Responde a los comentarios de manera constructiva
3. Realiza los cambios solicitados
4. Una vez aprobado, será merged

## Reportar Bugs

Usa el template de issue para bugs:

1. **Descripción clara** del problema
2. **Pasos para reproducir** el bug
3. **Comportamiento esperado** vs **comportamiento actual**
4. **Screenshots** si es visual
5. **Información del ambiente** (SO, navegador, versión)
6. **Logs** o mensajes de error relevantes

## Sugerir Mejoras

Para nuevas funcionalidades o mejoras:

1. **Describe la funcionalidad** claramente
2. **Explica por qué** es necesaria
3. **Proporciona ejemplos** de uso
4. **Considera alternativas** que hayas evaluado

## Recursos

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Material-UI Documentation](https://mui.com)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Testing Library Documentation](https://testing-library.com)

## Preguntas

Si tienes preguntas, puedes:
- Abrir un issue con la etiqueta `question`
- Contactar al equipo de desarrollo

¡Gracias por contribuir! 🎉

