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

> _Agregar capturas de pantalla aquí_

| Login | Búsqueda de País | Detalle de País | Galería |
<img width="1080" height="2340" alt="WhatsApp Image 2026-05-08 at 4 39 18 PM" src="https://github.com/user-attachments/assets/dc7eb365-9ed8-4739-8164-4cb646d2a4f1" />



---

## 🤖 Uso de IA

Este proyecto fue desarrollado con asistencia de **Claude (Anthropic)** como herramienta de apoyo técnico. A continuación los prompts principales utilizados:

---

### Prompt 1 — Contexto arquitectónico inicial
```
Actúa como un Desarrollador Senior Angular/Ionic. Toma en cuenta este contexto 
arquitectónico estricto (Standalone, Clean Code, inyección moderna). Cualquier código, 
refactorización o nueva característica que propongas debe alinearse 100% con las 
tecnologías, patrones de diseño y estándares descritos aquí.
[Se adjuntó documento de contexto del proyecto]
```

---

### Prompt 2 — Implementación de listado dinámico y página de detalle
```
Para el apartado de la API, ¿se realizó esto?
Debe consumir una API pública relacionada con el tema seleccionado e incluir 
listado dinámico, página de detalle, loading, búsqueda y manejo básico de errores.
[Se adjuntó código existente de CountrySearchPage y CountryService]
```
**Resultado:** Refactorización de `country: any = null` a `countries: any[]`, 
creación de `CountryDetailPage` con ruta `/api/country/:cca3`, y método 
`getCountryByCode()` en el servicio.

---

### Prompt 3 — Cámara en desktop
```
Tengo una duda: ¿cómo implemento para que en desktop se pueda tomar fotos? 
Solo puedo cargar. ¿Algún cambio en el main.ts?
[Se adjuntó código de PhotoService]
```
**Resultado:** Cambio de `CameraSource.Camera` a `CameraSource.Prompt` 
condicionado por `platform.is('hybrid')`, permitiendo usar la cámara web en desktop.

---

### Prompt 4 — Corrección de icono no registrado
```
Se mostró este error:
[Ionicons Warning]: Could not load icon with name "chevron-forward-outline". 
Ensure that the icon is registered using addIcons...
La página de detalle aparece vacía.
```
**Resultado:** Verificación de `addIcons({ chevronForwardOutline })` en el constructor 
y reemplazo del template generado por el CLI con el contenido correcto.

---

*README generado como parte del proyecto académico — CountryApp © 2025 David Cajamarca*
