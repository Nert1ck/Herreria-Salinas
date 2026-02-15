// script.js: gestión simple del catálogo usando localStorage

const STORAGE_KEY = 'catalogo_herrería_v1';
// Cambia esta contraseña por una propia. NOTA: esto es solo protección básica del lado cliente.
const ADMIN_PASSWORD = '5651138Y@y';

const defaultItems = [
  { title: 'Estructuras Metálicas', desc: 'Diseño y montaje de tinglados y estructuras de alta resistencia.', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', category: 'Estructuras' },
  { title: 'Motores Automáticos', desc: 'Instalación y mantenimiento de portones automáticos residenciales e industriales.', img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80', category: 'Automatización' },
  { title: 'Cámaras de Seguridad', desc: 'Sistemas de vigilancia CCTV integrados a tus estructuras.', img: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80', category: 'Seguridad' },
  { title: 'Herrería en General', desc: 'Rejas, muebles rústicos, barandillas y acabados artesanales.', img: 'https://images.unsplash.com/photo-1543168256-4188115768d6?auto=format&fit=crop&w=1200&q=80', category: 'General' },
  { title: 'Portones Corredizos', desc: 'Construcción y automatización de portones corredizos a medida.', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', category: 'Portones' },
  { title: 'Barandillas y Escaleras', desc: 'Barandillas metálicas y estructuras para escaleras con acabado rústico.', img: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80', category: 'Hogar' }
];

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultItems.slice();
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error leyendo storage, cargando por defecto', e);
    return defaultItems.slice();
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderCatalog() {
  const container = document.getElementById('catalogo');
  container.innerHTML = '';
  const items = loadItems();
  const admin = isAdmin();
  const filter = (document.getElementById('filterSelect') && document.getElementById('filterSelect').value) || 'all';
  items.forEach((it, idx) => {
    if (filter !== 'all' && (it.category || '').toLowerCase() !== filter.toLowerCase()) return;
    const card = document.createElement('article');
    card.className = 'trabajo-card';
    card.innerHTML = `
      <img src="${it.img}" alt="${escapeHtml(it.title)}" loading="lazy">
      <div class="info">
        <h3>${escapeHtml(it.title)}</h3>
        <p>${escapeHtml(it.desc)}</p>
        <div class="card-meta">
          <div><span class="tag">${escapeHtml(it.category || 'Sin categoría')}</span><small style="color:var(--muted);">ID: ${idx+1}</small></div>
          <div>${ admin ? `<button class="btn secondary" data-edit="${idx}">Editar</button><button class="btn secondary" data-remove="${idx}">Eliminar</button>` : '' }</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
  populateFilterOptions(items);
}

function isAdmin(){
  return sessionStorage.getItem('catalog_admin') === '1';
}

function setAdminUI(enabled){
  if (enabled) {
    document.body.classList.add('admin');
    sessionStorage.setItem('catalog_admin','1');
    const btn = document.getElementById('adminBtn'); if (btn) btn.textContent = 'Salir admin';
  } else {
    document.body.classList.remove('admin');
    sessionStorage.removeItem('catalog_admin');
    const btn = document.getElementById('adminBtn'); if (btn) btn.textContent = 'Admin';
  }
}

function openAdminPrompt(){
  const p = prompt('Introduce contraseña de administrador:');
  if (!p) return;
  if (p === ADMIN_PASSWORD) {
    setAdminUI(true);
    renderCatalog();
    alert('Sesión de administrador iniciada');
  } else {
    alert('Contraseña incorrecta');
  }
}

function populateFilterOptions(items){
  const select = document.getElementById('filterSelect');
  if (!select) return;
  const prev = select.value || 'all';
  const cats = Array.from(new Set(items.map(i => (i.category||'General').trim()).filter(Boolean)));
  select.innerHTML = '<option value="all">Todos</option>' + cats.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  // restore previous if still present
  if (Array.from(select.options).some(o=>o.value.toLowerCase()===prev.toLowerCase())) select.value = prev;
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[c]); }

function openAddModal(){
  // crear modal dinámico
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.style.display = 'flex';
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <h3>Añadir trabajo</h3>
      <div class="form-row">
        <label>Título</label>
        <input id="m_title" type="text" placeholder="Ej: Portón corredizo">
      </div>
      <div class="form-row">
        <label>Descripción</label>
        <textarea id="m_desc" rows="3" placeholder="Breve descripción"></textarea>
      </div>
      <div class="form-row">
        <label>Categoría</label>
        <input id="m_category" type="text" placeholder="Ej: Portones, Estructuras">
      </div>
      <div class="form-row">
        <label>Imagen (puedes subir un archivo desde tu equipo)</label>
        <input id="m_img" type="file" accept="image/*">
        <img id="m_preview" class="img-preview" alt="Vista previa" style="display:none;">
      </div>
      <div class="form-actions">
        <button id="m_cancel" class="btn secondary">Cancelar</button>
        <button id="m_save" class="btn">Guardar</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  const fileInput = backdrop.querySelector('#m_img');
  const preview = backdrop.querySelector('#m_preview');
  const categoryInput = backdrop.querySelector('#m_category');
  const title = backdrop.querySelector('#m_title');
  const desc = backdrop.querySelector('#m_desc');
  const cancel = backdrop.querySelector('#m_cancel');
  const save = backdrop.querySelector('#m_save');

  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (!f) { preview.style.display='none'; preview.src=''; return; }
    const reader = new FileReader();
    reader.onload = e => { preview.src = e.target.result; preview.style.display='block'; };
    reader.readAsDataURL(f);
  });

  cancel.addEventListener('click', ()=>{ document.body.removeChild(backdrop); });

  save.addEventListener('click', ()=>{
    const items = loadItems();
    const newItem = { title: title.value || 'Sin título', desc: desc.value || '', img: '', category: categoryInput.value || 'General' };
    const f = fileInput.files[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = e => {
        newItem.img = e.target.result;
        items.unshift(newItem);
        saveItems(items);
        renderCatalog();
        document.body.removeChild(backdrop);
      };
      reader.readAsDataURL(f);
    } else {
      // si no hay archivo, usar un placeholder industrial
      newItem.img = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80';
      items.unshift(newItem);
      saveItems(items);
      renderCatalog();
      document.body.removeChild(backdrop);
    }
  });
}

function openEditModal(index){
  const items = loadItems();
  const existing = items[index];
  if (!existing) return alert('Ítem no encontrado');

  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.style.display = 'flex';
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <h3>Editar trabajo</h3>
      <div class="form-row">
        <label>Título</label>
        <input id="m_title" type="text" value="${escapeHtml(existing.title)}">
      </div>
      <div class="form-row">
        <label>Descripción</label>
        <textarea id="m_desc" rows="3">${escapeHtml(existing.desc)}</textarea>
      </div>
      <div class="form-row">
        <label>Categoría</label>
        <input id="m_category" type="text" value="${escapeHtml(existing.category||'')}">
      </div>
      <div class="form-row">
        <label>Imagen (sube una nueva para reemplazar)</label>
        <input id="m_img" type="file" accept="image/*">
        <img id="m_preview" class="img-preview" alt="Vista previa" src="${existing.img}" style="display:block;">
      </div>
      <div class="form-actions">
        <button id="m_cancel" class="btn secondary">Cancelar</button>
        <button id="m_save" class="btn">Guardar</button>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  const fileInput = backdrop.querySelector('#m_img');
  const preview = backdrop.querySelector('#m_preview');
  const categoryInput = backdrop.querySelector('#m_category');
  const title = backdrop.querySelector('#m_title');
  const desc = backdrop.querySelector('#m_desc');
  const cancel = backdrop.querySelector('#m_cancel');
  const save = backdrop.querySelector('#m_save');

  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if (!f) { preview.style.display='none'; preview.src=''; return; }
    const reader = new FileReader();
    reader.onload = e => { preview.src = e.target.result; preview.style.display='block'; };
    reader.readAsDataURL(f);
  });

  cancel.addEventListener('click', ()=>{ document.body.removeChild(backdrop); });

  save.addEventListener('click', ()=>{
    const items = loadItems();
    items[index].title = title.value || 'Sin título';
    items[index].desc = desc.value || '';
    items[index].category = categoryInput.value || 'General';
    const f = fileInput.files[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = e => {
        items[index].img = e.target.result;
        saveItems(items);
        renderCatalog();
        document.body.removeChild(backdrop);
      };
      reader.readAsDataURL(f);
    } else {
      saveItems(items);
      renderCatalog();
      document.body.removeChild(backdrop);
    }
  });
}

function setupControls(){
  document.getElementById('addBtn').addEventListener('click', ()=>{
    if (!isAdmin()) return openAdminPrompt();
    openAddModal();
  });

  document.getElementById('exportBtn').addEventListener('click', ()=>{
    const items = loadItems();
    const area = document.getElementById('exportArea');
    area.value = JSON.stringify(items, null, 2);
    document.getElementById('exportAreaContainer').style.display = 'block';
  });

  document.getElementById('importBtn').addEventListener('click', ()=>{
    if (!isAdmin()) return openAdminPrompt();
    const txt = prompt('Pega aquí el JSON del catálogo para importar:');
    if (!txt) return;
    try{
      const items = JSON.parse(txt);
      if (!Array.isArray(items)) throw new Error('Formato inválido');
      saveItems(items);
      renderCatalog();
      alert('Importado con éxito');
    }catch(e){ alert('JSON inválido: '+e.message); }
  });

  document.getElementById('clearBtn').addEventListener('click', ()=>{
    if (!isAdmin()) return openAdminPrompt();
    if (!confirm('Eliminar datos guardados en este navegador?')) return;
    localStorage.removeItem(STORAGE_KEY);
    renderCatalog();
  });

  // Delegate remove buttons
  document.getElementById('catalogo').addEventListener('click', (ev)=>{
    const editBtn = ev.target.closest('button[data-edit]');
    if (editBtn) {
      if (!isAdmin()) return openAdminPrompt();
      const idx = Number(editBtn.getAttribute('data-edit'));
      openEditModal(idx);
      return;
    }
    const btn = ev.target.closest('button[data-remove]');
    if (!btn) return;
    if (!isAdmin()) return openAdminPrompt();
    const idx = Number(btn.getAttribute('data-remove'));
    const items = loadItems();
    items.splice(idx,1);
    saveItems(items);
    renderCatalog();
  });

  // filter select listener
  const fs = document.getElementById('filterSelect');
  if (fs) fs.addEventListener('change', ()=> renderCatalog());

  const adminBtn = document.getElementById('adminBtn');
  if (adminBtn) adminBtn.addEventListener('click', ()=>{
    if (isAdmin()) { setAdminUI(false); renderCatalog(); return; }
    openAdminPrompt();
  });
}

// Small helper to ensure things are ready
window.addEventListener('DOMContentLoaded', ()=>{
  renderCatalog();
  setupControls();
});
