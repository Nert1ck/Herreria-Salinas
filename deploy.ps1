# deploy.ps1 — Script para inicializar un repo Git y subir a GitHub (Windows PowerShell)
# Uso: .\deploy.ps1
# Te pedirá la URL remota si no la pasas como argumento.

param([string]$remoteUrl)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git no parece estar instalado. Instala Git y vuelve a intentar: https://git-scm.com/downloads"
  exit 1
}

if (-not $remoteUrl) {
  $remoteUrl = Read-Host "Introduce la URL remota (HTTPS), por ejemplo https://github.com/usuario/repo.git"
}

if (-not $remoteUrl) { Write-Error "No se proporcionó URL remota. Abortando."; exit 1 }

Write-Host "Inicializando repositorio local y subiendo a $remoteUrl" -ForegroundColor Cyan

git init
git add .
try { git commit -m "Sitio catálogo herrería" } catch { Write-Host "No hay cambios para commitear o commit ya realizado." }

git branch -M main
# remover origen existente si existe
git remote remove origin 2>$null
git remote add origin $remoteUrl

git push -u origin main

Write-Host "Hecho. Ahora ve a GitHub → Settings → Pages y activa GitHub Pages para la rama 'main' y carpeta '/' si quieres publicar." -ForegroundColor Green
