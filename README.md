# 🌍 CountryApp

## Información del Proyecto

| Campo | Detalle |
|---|---|
| **Nombre del estudiante** | David Cajamarca |
| **Nombre del proyecto** | CountryApp |
| **Tema seleccionado** | Consulta y exploración de países del mundo |
| **API utilizada** | [REST Countries API v3.1](https://restcountries.com/v3.1) |

---

## 🛠️ Tecnologías

- **Framework UI:** Ionic Framework v7+
- **Framework Core:** Angular v17+ (Standalone Components)
- **Backend as a Service:** Supabase (Autenticación)
- **Hardware/Nativo:** Capacitor (Camera, Filesystem, Preferences, Share)
- **Peticiones HTTP:** `@angular/common/http` con `HttpClient`
- **Estilos:** Ionic UI Components + Ionicons + Tipografía Inter

---

## ⚙️ Instrucciones de Instalación

### Prerrequisitos

- Node.js v18+
- npm v9+
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`

### Pasos

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd countryapp

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno de Supabase
# Editar src/environments/environment.ts con tus credenciales:
# supabaseUrl: 'https://<TU_PROYECTO>.supabase.co'
# supabaseKey: '<TU_ANON_KEY>'
```

---

## ▶️ Instrucciones de Ejecución

### Web (desarrollo)

```bash
ionic serve
```

### Android

```bash
ionic build
npx cap sync android
npx cap open android
```

### iOS

```bash
ionic build
npx cap sync ios
npx cap open ios
```

---

## 📱 Módulos de la Aplicación

### 🔐 Autenticación
- Login con correo y contraseña vía Supabase
- Registro en página separada con validación por Reactive Forms
- Guard funcional (`AuthGuard`) protegiendo rutas privadas

### 🌎 Consulta de Países (API)
- Búsqueda dinámica de países con debounce de 800ms
- Listado de resultados con bandera, región y capital
- Página de detalle con: capital, población, área, moneda e idiomas
- Loading spinner, manejo de errores 404 y Toast de feedback

### 📷 Galería
- Captura de fotos con cámara (móvil) o cámara web/selector de archivos (desktop)
- Almacenamiento persistente con Capacitor Filesystem + Preferences
- Grid de fotos con selección, compartir y eliminar
- Toggle de Modo Nocturno persistente

---
## 📸 Capturas de Pantalla

<table>
  <tr>
    <td align="center"><b>Login</b></td>
    <td align="center"><b>Búsqueda de País</b></td>
    <td align="center"><b>Detalle de País</b></td>
    <td align="center"><b>Galería</b></td>
  </tr>
  <tr>
    <td><img width="200" src="https://github.com/user-attachments/assets/dc7eb365-9ed8-4739-8164-4cb646d2a4f1" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/14cf4ef2-e3e9-41c7-9107-faaf8d14300a" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/786a2d5c-099d-4e8f-ab5d-bc83561caa05" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/e644663d-0972-4f16-81a8-45f2e005e619" /></td>
  </tr>
  <tr>
    <td><img width="200" src="https://github.com/user-attachments/assets/a8010a58-686d-41f0-8ba2-1288bc4e3136" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/ab718624-fd33-46d1-ab9b-d68fa35c7294" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/aa595266-298f-43a7-80e4-c0de597a7b3d" /></td>
    <td><img width="200" src="https://github.com/user-attachments/assets/7b398d32-1400-4241-9ac0-c0ffeb55f47e" /></td>
  </tr>
</table>
---

## 🤖 Uso de IA

Este proyecto fue desarrollado con asistencia de **Claude (Anthropic)** como herramienta de apoyo técnico. A continuación los prompts principales utilizados:

---

### Prompt 1 — Contexto arquitectónico inicial
Te voy a compartir el contexto técnico y la arquitectura del proyecto en el que estoy
trabajando. Por favor, lee este Markdown y confírmame que lo has entendido.
Luego te haré mi pregunta.
Actúa como un Desarrollador Senior Angular/Ionic. Toma en cuenta este contexto
arquitectónico estricto (Standalone, Clean Code, inyección moderna). Cualquier código,
refactorización o nueva característica que propongas debe alinearse 100% con las
tecnologías, patrones de diseño y estándares descritos aquí.
[Se adjuntó documento de contexto del proyecto]
**Resultado:** La IA confirmó comprensión del stack (Angular v17+ Standalone, Ionic 7+, 
Supabase, Capacitor) y los estándares: inject(), addIcons(), servicios sin lógica UI, 
imports standalone verificados en .ts y template.

---

### Prompt 2 — Consumo de API, refactorización de servicio y listado con detalle
Para el apartado de la API necesito implementar lo siguiente:
consumir una API pública, incluir listado dinámico, página de detalle,
loading, búsqueda con debounce y manejo básico de errores.
Adjunto el código actual de CountrySearchPage y CountryService para que los refactorices
siguiendo los estándares del proyecto.
[Se adjuntó código existente de CountrySearchPage y CountryService]
**Resultado:** Refactorización de `country: any = null` a `countries: any[]` con `*ngFor`, 
creación de `CountryDetailPage` con ruta `/api/country/:cca3`, método `getCountryByCode()` 
en el servicio, y navegación con `Router.navigate()`.

---

### Prompt 3 — Splash Screen en HTML
Crea un splash screen en HTML/CSS para una app Ionic/Angular llamada CountryApp.
Debe tener animación de entrada, ícono o logo centrado, nombre de la app
y desaparecer automáticamente al cargar.
**Resultado:** Archivo HTML standalone con animación CSS (fade-in + scale), 
integrable como componente de carga inicial antes de montar la app Angular.

---

### Prompt 4 — Rutas protegidas con AuthGuard
Implementa un AuthGuard funcional (CanActivateFn) para proteger las rutas privadas
de la app. Debe verificar la sesión activa con supabaseService.getSession()
y redirigir al login si no hay sesión. Seguir el patrón Standalone y inject().
**Resultado:** Creación de `auth.guard.ts` con `CanActivateFn`, inyección de 
`SupabaseService` con `inject()`, y configuración en `app.routes.ts` con `canActivate`.

---

### Prompt 5 — Interfaz Login, Menú y Registro minimalista
Implementa las páginas de Login, Registro y Menú principal con un diseño
minimalista moderno. Usar ion-input con fill="outline", labelPlacement="floating",
botones con shape="round", contenedores centrados y LoadingController para estados
de carga. Todo en componentes Standalone con ReactiveFormsModule donde aplique.
**Resultado:** LoginPage con RouterLink declarativo, RegisterPage con Reactive Forms 
y validaciones, MenuPage con IonCard de navegación y botón de cierre de sesión 
en el header. Diseño unificado con variables CSS globales e Inter como tipografía.Sonnet 4.6


---



---

*README generado como parte del proyecto académico — CountryApp © 2025 David Cajamarca*
