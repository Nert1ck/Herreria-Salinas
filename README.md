[README.md](https://github.com/user-attachments/files/25327093/README.md)
# Sitio "Herrería Salinas" — Despliegue en GitHub Pages

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
