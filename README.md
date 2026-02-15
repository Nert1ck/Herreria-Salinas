[README.md](https://github.com/user-attachments/files/25327441/README.md)
# Herrería Salinas — Sitio catálogo

Pequeño sitio estático para mostrar un catálogo de piezas y servicios de herrería.

## Contenido del repositorio
- `2026.html` — Página principal del catálogo.
- `styles.css` — Estilos del sitio.
- `script.js` — Lógica del catálogo (localStorage, añadir/editar/eliminar, export/import).
- `favicon.svg` — Icono del sitio.
- `deploy.ps1` — Script opcional para inicializar y subir el repo desde PowerShell.

## Ver el sitio localmente
- Opción rápida: abre `2026.html` en tu navegador.
- Servidor local (recomendado para rutas relativas):
```bash
# Python 3
python -m http.server 8000
# Luego abre http://localhost:8000/2026.html
```

## Publicar en GitHub Pages (forma sencilla)
1. Crea un repositorio en GitHub (p.ej. `Herreria-Salinas`).
2. En la página del repo: `Add file` → `Upload files` y sube los archivos del sitio (p. ej. `2026.html`, `styles.css`, `script.js`, `favicon.svg`, `README.md`).
3. Commit y luego en Settings → Pages selecciona la rama `main` (o `master`) y carpeta `/` como fuente.
4. Espera unos minutos y visita la URL que GitHub Pages te muestre.

## Publicar con Git (CLI)
```bash
# configurar identidad (una sola vez)
git config --global user.email "tu-email@ejemplo.com"
git config --global user.name "Tu Nombre"

git init
git add 2026.html styles.css script.js favicon.svg README.md
git commit -m "Initial clean commit — Herreria Salinas"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

Si el remoto ya tiene contenido y el push falla, mejor usa la subida web o pídeme que te guíe para resolver conflictos.

## Acceso admin
Las herramientas de subida/edición están protegidas por una contraseña en cliente:
- Abre `script.js` y busca la constante `ADMIN_PASSWORD` para cambiarla.
- Nota: esta protección es solo del lado del cliente y NO es segura para escenarios públicos con varios usuarios; para eso necesitas un backend.

## Exportar / Importar catálogo
Usa los botones `Export` y `Import` en la interfaz para guardar o restaurar el catálogo en formato JSON.

## Seguridad y privacidad
- No subas archivos personales o binarios grandes (documentos, bases de datos, ejecutables) al repo público.
- Si ya subiste archivos sensibles, dímelo y te doy pasos para eliminarlos del historial remoto y rotar credenciales.

## Licencia
Este proyecto puede publicarse bajo la licencia MIT. Cámbiala si prefieres otra.

---
Si quieres, actualizo este README con tu logo, descripción comercial o datos de contacto. Dime qué texto exacto quieres mostrar y lo incorporo.
# Sitio "Herrería Artesanal" — Despliegue en GitHub Pages

Este repositorio contiene los archivos del sitio estático:
- `2026.html`
- `styles.css`
- `script.js`
- `favicon.svg`

Sigue los pasos abajo para publicar el sitio en GitHub Pages (opción recomendada para sitios estáticos, gratuito).

## Opción A — Subir con Git (PowerShell en Windows)
1. Abre PowerShell en la carpeta donde están los archivos (por ejemplo `C:\Users\jesus\OneDrive\Documentos`).
2. Crea el repositorio local y haz el primer commit:

```powershell
git init
git add .
git commit -m "Sitio catálogo herrería"
```

3. Crea un repositorio en GitHub (puedes usar la web: https://github.com/new). Copia la URL remota (HTTPS) que GitHub te da, por ejemplo `https://github.com/tu-usuario/herreria-catalogo.git`.
4. Añade la remote y sube:

```powershell
git remote add origin https://github.com/tu-usuario/herreria-catalogo.git
git branch -M main
git push -u origin main
```

5. En GitHub, abre el repositorio → Settings → Pages. En "Source" selecciona la rama `main` y carpeta `/ (root)` y pulsa guardar. En unos minutos tu sitio estará en `https://<tu-usuario>.github.io/<repo>`.

## Atajos con GitHub CLI (opcional)
Si tienes instalado `gh` (GitHub CLI) puedes crear el repo y empujar en un solo paso:

```powershell
# Autenticar (solo si no lo has hecho)
gh auth login
# Crear repo público y empujar el contenido actual
gh repo create my-herrería-catalogo --public --source=. --remote=origin --push
```

## Notas sobre imágenes y cambios
- Las imágenes que subas desde el modal se guardan en `localStorage` como dataURL y solo estarán en el navegador donde las subiste. Para que las imágenes formen parte del sitio público y estén disponibles para todos visitantes, copia esas imágenes (o nuevas) a una carpeta `images/` y actualiza las entradas del catálogo acorde (o incluye imágenes en `defaultItems` dentro de `script.js`).
- Si quieres que todos vean los cambios que hagas desde la interfaz admin, necesitas un backend o almacenar los datos en un servicio central (por ejemplo Firebase o una API). Lo que hicimos ahora protege la UI de admin, pero los cambios solo quedan en tu navegador.

## Script de ayuda (Windows PowerShell)
Puedes usar el script `deploy.ps1` incluido para ejecutar los comandos git básicos y subir al remoto (te pedirá la URL remota si no la pasas).

## Qué hago por ti si quieres continuar
- Puedo crear el repositorio en GitHub por ti (necesitaría acceso token o que lo hagas por web; te guío paso a paso).  
- Puedo mostrar cómo integrar Firebase Hosting para almacenamiento compartido de imágenes/datos.  

---
Si quieres, ahora genero el `deploy.ps1` para que solo ejecutes un archivo y subas todo automáticamente (te pedirá la URL remota).
