# Política de Seguridad

## Versiones Soportadas

Actualmente se proporciona soporte de seguridad para las siguientes versiones:

| Versión | Soportada          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reportar una Vulnerabilidad

Si descubres una vulnerabilidad de seguridad, por favor **NO** abras un issue público.

En su lugar, envía un correo electrónico a: [security@contadorescpa.com](mailto:security@contadorescpa.com)

Incluye en tu reporte:

- Descripción de la vulnerabilidad
- Pasos para reproducirla
- Versiones afectadas
- Posibles soluciones (si las tienes)

### Qué Esperar

- Confirmación de recepción dentro de 48 horas
- Evaluación inicial dentro de 1 semana
- Actualizaciones regulares sobre el progreso
- Notificación cuando se publique una corrección

### Divulgación Responsable

Te pedimos que:

- Nos des tiempo razonable para corregir el problema antes de divulgarlo públicamente
- No explotes la vulnerabilidad más allá de lo necesario para demostrarla
- No accedas a datos de otros usuarios sin su consentimiento

## Mejores Prácticas de Seguridad

### Para Desarrolladores

- Nunca hagas commit de credenciales, tokens o secretos
- Usa variables de entorno para información sensible
- Mantén las dependencias actualizadas
- Ejecuta auditorías de seguridad regularmente: `npm audit`
- Revisa el código para detectar vulnerabilidades comunes (XSS, CSRF, injection)

### Para Usuarios

- Usa contraseñas fuertes y únicas
- Habilita autenticación de dos factores cuando esté disponible
- Mantén tu navegador actualizado
- Reporta cualquier actividad sospechosa

## Proceso de Parches de Seguridad

1. Se valida el reporte de vulnerabilidad
2. Se desarrolla un parche
3. Se prueba exhaustivamente
4. Se publica una nueva versión
5. Se notifica a los usuarios afectados
6. Se documenta en el CHANGELOG

## Contacto

Para preguntas sobre seguridad: security@contadorescpa.com

