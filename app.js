// Datos globales
    let oldTestamentBooks = [];
    let newTestamentBooks = [];
    let famousVerses = [];
    let readingPlan = [];
    let currentVerseIndex = 0;
    let favorites = JSON.parse(localStorage.getItem('bibleFavorites')) || [];
    let isReadingMode = false;

    // Cargar datos desde JSON
    async function loadData() {
      try {
        const [booksResponse, versesResponse, planResponse] = await Promise.all([
          fetch('./data/books.json'),
          fetch('./data/verses.json'),
          fetch('./data/reading-plan.json')
        ]);

        const books = await booksResponse.json();
        const verses = await versesResponse.json();
        const plan = await planResponse.json();

        oldTestamentBooks = books.antiguo;
        newTestamentBooks = books.nuevo;
        famousVerses = verses;
        readingPlan = plan;

        return true;
      } catch (error) {
        console.error('Error cargando datos:', error);
        // Datos de respaldo
        oldTestamentBooks = ["Génesis","Éxodo","Levítico","Números","Deuteronomio","Josué","Jueces","Rut","1 Samuel","2 Samuel","1 Reyes","2 Reyes","1 Crónicas","2 Crónicas","Esdras","Nehemías","Ester","Job","Salmos","Proverbios","Eclesiastés","Cantares","Isaías","Jeremías","Lamentaciones","Ezequiel","Daniel","Oseas","Joel","Amós","Abdías","Jonás","Miqueas","Nahúm","Habacuc","Sofonías","Hageo","Zacarías","Malaquías"];
        newTestamentBooks = ["Mateo","Marcos","Lucas","Juan","Hechos","Romanos","1 Corintios","2 Corintios","Gálatas","Efesios","Filipenses","Colosenses","1 Tesalonicenses","2 Tesalonicenses","1 Timoteo","2 Timoteo","Tito","Filemón","Hebreos","Santiago","1 Pedro","2 Pedro","1 Juan","2 Juan","3 Juan","Judas","Apocalipsis"];
        famousVerses = [
          { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", reference: "Juan 3:16" },
          { text: "Todo lo puedo en Cristo que me fortalece.", reference: "Filipenses 4:13" }
        ];
        return false;
      }
    }

    const genesisChapters = {
      1:{title:"La Creación del Universo",subtitle:"En el principio creó Dios los cielos y la tierra",info:{"Versículos":"31","Palabras":"797","Días de creación":"6 + 1 de descanso","Primer mandamiento":"Fructificad y multiplicaos","Repeticiones de 'bueno'":"7 veces"},curiosities:[{icon:"🌟",text:"La palabra 'Elohim' (Dios) aparece 35 veces en este capítulo y está en plural, sugiriendo la Trinidad."},{icon:"💡",text:"La luz fue creada el día 1, pero el sol y la luna hasta el día 4, mostrando que Dios es la fuente de toda luz."},{icon:"🔢",text:"El número 7 aparece constantemente: 7 días, Dios dice 'bueno' 7 veces, el verso 1:1 tiene 7 palabras en hebreo."},{icon:"🌱",text:"Las plantas fueron creadas antes que el sol, demostrando que pueden existir por el poder de Dios."}],events:[{day:"Día 1",description:"Creación de la luz y separación de las tinieblas"},{day:"Día 2",description:"Separación de las aguas: cielos y mares"},{day:"Día 3",description:"Tierra seca, mares y vegetación"},{day:"Día 4",description:"Sol, luna y estrellas"},{day:"Día 5",description:"Peces y aves"},{day:"Día 6",description:"Animales terrestres y el ser humano"},{day:"Día 7",description:"Dios descansó y santificó el día"}]},
      2:{title:"El Jardín del Edén",subtitle:"Y plantó Jehová Dios un huerto en Edén",info:{"Versículos":"25","Palabras":"623","Ríos del Edén":"4 (Pisón, Gihón, Hidekel, Éufrates)","Nombre del primer hombre":"Adán (del hebreo 'adamah' = tierra)","Árboles especiales":"2 (Vida y Conocimiento del bien y mal)"},curiosities:[{icon:"🏞️",text:"Edén significa 'delicia' o 'placer' en hebreo. Era un lugar de perfección absoluta."},{icon:"💨",text:"Dios 'sopló' en las narices de Adán. Es la única vez que se describe a Dios dando vida de esta manera tan íntima."},{icon:"🌳",text:"El árbol de la vida podía dar inmortalidad, pero el del conocimiento traía muerte moral y física."},{icon:"🦴",text:"Eva fue formada de una costilla de Adán, mostrando que son iguales en dignidad pero complementarios."}],events:[{day:"Detalle",description:"Descripción más detallada de la creación del hombre"},{day:"Plantación",description:"Dios planta el jardín del Edén hacia el oriente"},{day:"Colocación",description:"Adán es puesto en el jardín para labrarlo y guardarlo"},{day:"Mandamiento",description:"Primera ley: no comer del árbol del conocimiento"},{day:"Observación",description:"No es bueno que el hombre esté solo"},{day:"Creación",description:"Formación de Eva como ayuda idónea"},{day:"Unión",description:"Institución del matrimonio"}]},
      3:{title:"La Caída del Hombre",subtitle:"Pero la serpiente era astuta más que todos los animales",info:{"Versículos":"24","Palabras":"659","Primera mentira":"'No moriréis' - la serpiente","Primera promesa":"La simiente de la mujer (v.15)","Primeras emociones":"Temor, vergüenza, culpa"},curiosities:[{icon:"🐍",text:"La serpiente era el más astuto de los animales. Antes de la caída, probablemente podía hablar y caminar erguida."},{icon:"👁️",text:"'Se abrieron los ojos de ambos' - obtuvieron conocimiento, pero perdieron la inocencia y la paz."},{icon:"🍃",text:"Las primeras ropas fueron hechas por Dios mismo con pieles de animales, implicando el primer sacrificio."},{icon:"⚔️",text:"Génesis 3:15 es llamado el 'protoevangelio' - la primera promesa del Mesías que vencería a Satanás."}],events:[{day:"Tentación",description:"La serpiente tienta a Eva con el fruto prohibido"},{day:"Desobediencia",description:"Eva come y da a Adán, quien también come"},{day:"Conciencia",description:"Se dan cuenta de su desnudez y sienten vergüenza"},{day:"Ocultamiento",description:"Se esconden de la presencia de Dios"},{day:"Confrontación",description:"Dios los llama y los confronta"},{day:"Consecuencias",description:"Maldiciones sobre la serpiente, la mujer y el hombre"},{day:"Expulsión",description:"Son expulsados del Edén"}]},
      4:{title:"Caín y Abel",subtitle:"Y Abel fue pastor de ovejas, y Caín fue labrador de la tierra",info:{"Versículos":"26","Palabras":"641","Primer nacimiento":"Caín ('posesión')","Primer asesinato":"Caín mata a Abel","Primera ciudad":"Construida por Caín"},curiosities:[{icon:"🔥",text:"Dios miró con agrado la ofrenda de Abel (probablemente porque incluía sangre) pero no la de Caín."},{icon:"❓",text:"'¿Soy yo acaso guarda de mi hermano?' - La primera pregunta sarcástica registrada en la historia."},{icon:"🩸",text:"La sangre de Abel 'clama desde la tierra' - primera mención de que la sangre inocente tiene voz."},{icon:"🏰",text:"Caín construyó la primera ciudad, mostrando el intento humano de crear seguridad sin Dios."}],events:[{day:"Nacimiento",description:"Nacen Caín y Abel, los primeros hijos de Adán y Eva"},{day:"Ocupaciones",description:"Abel se dedica al pastoreo, Caín a la agricultura"},{day:"Ofrendas",description:"Ambos traen ofrendas a Dios con resultados diferentes"},{day:"Advertencia",description:"Dios advierte a Caín sobre el pecado que lo acecha"},{day:"Asesinato",description:"Caín mata a Abel en el campo"},{day:"Castigo",description:"Caín es maldecido y se vuelve errante"},{day:"Descendencia",description:"Genealogía de Caín y el nacimiento de Set"}]},
      5:{title:"Las Generaciones de Adán",subtitle:"Este es el libro de las generaciones de Adán",info:{"Versículos":"32","Palabras":"580","Generaciones listadas":"10 (desde Adán hasta Noé)","Vida más larga":"Matusalén - 969 años","Persona trasladada":"Enoc - 'caminó con Dios'"},curiosities:[{icon:"📊",text:"La edad promedio de los patriarcas antediluvianos era de 857 años, mucho mayor que después del diluvio."},{icon:"🚶",text:"Enoc 'caminó con Dios' y fue trasladado sin ver muerte - solo él y Elías tuvieron este privilegio."},{icon:"🔢",text:"Matusalén murió el mismo año del diluvio. Su nombre significa 'cuando él muera, será enviado'."},{icon:"👶",text:"Adán vivió para ver nacer a Lamec (abuelo de Noé), conectando directamente las generaciones."}],events:[{day:"Adán",description:"930 años - El primer hombre, padre de toda la humanidad"},{day:"Set",description:"912 años - Reemplazó a Abel, línea del Mesías"},{day:"Enós",description:"905 años - En su tiempo se comenzó a invocar el nombre de Jehová"},{day:"Cainán",description:"910 años - Cuarta generación desde Adán"},{day:"Mahalaleel",description:"895 años - Su nombre significa 'alabanza de Dios'"},{day:"Jared",description:"962 años - Padre de Enoc"},{day:"Enoc",description:"365 años - Trasladado por Dios sin ver muerte"},{day:"Matusalén",description:"969 años - El hombre que más vivió"},{day:"Lamec",description:"777 años - Padre de Noé"},{day:"Noé",description:"950 años - Constructor del arca, salvador de la humanidad"}]}
    };

    // Estado
    let currentSection = 'books';
    let currentChapter = 1;
    let currentSearch = '';

    // Init
    document.addEventListener('DOMContentLoaded', async () => {
      // Cargar datos primero
      await loadData();

      // Tabs principales
      document.querySelectorAll('.main-tab-btn').forEach(btn => btn.addEventListener('click', function(){ showSection(this.getAttribute('data-section'), this); }));
      // Tabs testamento
      document.querySelectorAll('.testament-btn').forEach(btn => btn.addEventListener('click', function(){ showTestament(this.getAttribute('data-testament'), this); }));
      // Botones capítulos
      document.querySelectorAll('.chapter-btn').forEach(btn => btn.addEventListener('click', function(){ showChapter(parseInt(this.getAttribute('data-chapter')), this); }));
      // Verso aleatorio
      document.getElementById('newVerseBtn').addEventListener('click', showRandomVerse);
      // Nuevas funcionalidades de versículos
      document.getElementById('favoriteBtn').addEventListener('click', toggleFavorite);
      document.getElementById('copyVerseBtn').addEventListener('click', copyVerse);
      document.getElementById('readingModeBtn').addEventListener('click', toggleReadingMode);
      // Plan de lectura
      document.getElementById('startReadingPlan').addEventListener('click', showReadingPlan);
      document.getElementById('closeReadingPlan').addEventListener('click', closeReadingPlan);
      // Menu móvil
      document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
      // Navegación smooth scroll
      initSmoothScrolling();
      // Buscador
      const searchInput = document.getElementById('bookSearch');
      const clearBtn = document.getElementById('clearSearch');
      if (searchInput) searchInput.addEventListener('input', () => { currentSearch = searchInput.value; filterBooks(); });
      if (clearBtn) clearBtn.addEventListener('click', () => { if(searchInput){searchInput.value='';searchInput.focus();} currentSearch=''; filterBooks(); });

      initTheme();
      showTestament('antiguo', document.querySelector('.testament-btn.active'));
      showChapter(1, document.querySelector('.chapter-btn.active'));
      setTimeout(animateNumbers, 400);
      initStatObserver();
      loadFavorites();
      updateVerseDisplay();
    });

    // Secciones
    function showSection(section, clicked){
      document.querySelectorAll('.main-tab-btn').forEach(b => b.classList.remove('active'));
      clicked.classList.add('active');
      document.getElementById('booksSection').classList.toggle('hidden', section !== 'books');
      document.getElementById('genesisSection').classList.toggle('hidden', section !== 'genesis');
      currentSection = section;
    }

    // Capítulos
    function showChapter(chapterNum, clicked){
      document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
      clicked.classList.add('active');
      currentChapter = chapterNum;
      const chapter = genesisChapters[chapterNum];
      const html = `
        <div class="chapter-header">
          <h3 class="chapter-title">Génesis ${chapterNum}</h3>
          <p class="chapter-subtitle">${chapter.title}</p>
        </div>
        <div class="chapter-grid">
          <div class="chapter-info">
            <h4 class="info-title">📊 Datos Importantes</h4>
            ${Object.entries(chapter.info).map(([k,v])=>`<div class="info-item"><span class="info-label">${k}:</span><span class="info-value">${v}</span></div>`).join('')}
          </div>
          <div class="chapter-curiosities">
            <h4 class="curiosities-title">🤔 Datos Curiosos</h4>
            ${chapter.curiosities.map(c=>`<div class="curiosity-item"><div class="curiosity-icon">${c.icon}</div><div class="curiosity-text">${c.text}</div></div>`).join('')}
          </div>
        </div>
        ${chapterNum===5 ? `
          <div class="genealogy-map">
            <h4 class="map-title">🌳 Árbol Genealógico - De Adán a Noé</h4>
            <div class="genealogy-tree" id="genealogyTree"></div>
          </div>` : `
          <div class="key-events">
            <h4 class="events-title">🗓️ ${chapterNum<=2 ? 'Eventos Clave' : 'Cronología'}</h4>
            <div class="event-timeline">${chapter.events.map(ev=>`<div class="event-item"><div class="event-day">${ev.day}</div><div class="event-description">${ev.description}</div></div>`).join('')}</div>
          </div>`}
      `;
      document.getElementById('chapterContent').innerHTML = html;
      if (chapterNum===5) renderGenealogyMap();
    }

    function renderGenealogyMap(){
      const genealogyTree = document.getElementById('genealogyTree');
      const data = [
        { name: "Adán", age: "930 años", note: "El primer hombre", special: true, generation: 1, yearsBc: 4004 },
        { name: "Set", age: "912 años", note: "Reemplazó a Abel", generation: 2, yearsBc: 3874 },
        { name: "Enós", age: "905 años", note: "Se invocó el nombre de Jehová", generation: 3, yearsBc: 3769 },
        { name: "Cainán", age: "910 años", note: "Cuarta generación", generation: 4, yearsBc: 3679 },
        { name: "Mahalaleel", age: "895 años", note: "Alabanza de Dios", generation: 5, yearsBc: 3609 },
        { name: "Jared", age: "962 años", note: "Padre de Enoc", generation: 6, yearsBc: 3544 },
        { name: "Enoc", age: "365 años", note: "Trasladado sin ver muerte", special: "enoch", generation: 7, yearsBc: 3382 },
        { name: "Matusalén", age: "969 años", note: "El hombre que más vivió", generation: 8, yearsBc: 3317 },
        { name: "Lamec", age: "777 años", note: "Padre de Noé", generation: 9, yearsBc: 3130 },
        { name: "Noé", age: "950 años", note: "Constructor del arca", special: "noah", generation: 10, yearsBc: 2948 }
      ];
      genealogyTree.innerHTML = data.map((p,i)=>{
        const isLast = i===data.length-1;
        const special = p.special==="noah"?"noah-highlight":p.special==="enoch"?"enoch-highlight":p.special===true?"special":"";
        return `<div class="generation-row"><div class="generation-label">Gen ${p.generation}</div><div class="person-node ${special}" data-person="${p.name}"><div class="person-tooltip">${getPersonTooltip(p)}</div><div class="person-name">${p.name}</div><div class="person-age">${p.age}</div><div class="person-note">${p.note}</div>${!isLast?'<div class="connection-line vertical-line"></div>':''}</div><div class="timeline-years">${p.yearsBc} a.C.</div></div>`
      }).join('');
    }

    function getPersonTooltip(p){
      const t = { "Adán":"Formado del polvo de la tierra","Set":"Nacido cuando Adán tenía 130 años","Enós":"En su tiempo se comenzó la adoración pública","Cainán":"Vivió durante 910 años","Mahalaleel":"Su nombre significa 'bendito de Dios'","Jared":"Vivió 962 años, casi un milenio","Enoc":"Caminó con Dios 300 años","Matusalén":"Murió el año del diluvio","Lamec":"Profetizó sobre Noé","Noé":"Salvó a la humanidad del diluvio" };
      return t[p.name] || "Patriarca antediluviano";
    }

    // Libros
    function showTestament(testament, clicked){
      document.querySelectorAll('.testament-btn').forEach(b => b.classList.remove('active'));
      clicked.classList.add('active');
      const grid = document.getElementById('booksGrid');
      const books = testament === 'antiguo' ? oldTestamentBooks : newTestamentBooks;
      grid.innerHTML = '';
      books.forEach((book,i)=>{
        const el = document.createElement('div');
        el.className = 'book-item';
        el.textContent = book;
        el.setAttribute('tabindex','0');
        const flash = ()=>{
          el.style.background = '#4ecdc4'; el.style.color = '#fff';
          setTimeout(()=>{
            el.style.background = document.body.classList.contains('dark') ? 'rgba(17,24,39,.85)' : 'rgba(255,255,255,.9)';
            el.style.color = document.body.classList.contains('dark') ? '#e5e7eb' : '#333';
          },300);
        };
        el.addEventListener('click', flash);
        el.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); flash(); }});
        grid.appendChild(el);
      });
      filterBooks();
    }

    // Normalizar texto para búsqueda (quitar acentos)
    function normalizeText(text) {
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    function filterBooks(){
      const term = (currentSearch||'').toLowerCase();
      const termNormalized = normalizeText(currentSearch||'');

      document.querySelectorAll('#booksGrid .book-item').forEach(el=>{
        const bookText = el.textContent;
        const bookNormalized = normalizeText(bookText);
        const visible = bookText.toLowerCase().includes(term) || bookNormalized.includes(termNormalized);
        el.style.display = visible ? 'block' : 'none';
      });
    }

    // Verso aleatorio
    function showRandomVerse(){
      const idx = Math.floor(Math.random() * famousVerses.length);
      const v = famousVerses[idx];
      const verseText = document.getElementById('verseText');
      const verseReference = document.getElementById('verseReference');
      verseText.style.opacity='0'; verseReference.style.opacity='0';
      setTimeout(()=>{ verseText.textContent = `"${v.text}"`; verseReference.textContent = v.reference; verseText.style.opacity='1'; verseReference.style.opacity='1'; }, 250);
    }

    // Animación de números
    function animateNumbers(){
      document.querySelectorAll('.stat-number').forEach(stat=>{
        const finalNumber = parseInt(stat.textContent.replace(/,/g,''));
        let cur = 0; const step = Math.max(1, Math.floor(finalNumber/100));
        const timer = setInterval(()=>{
          cur += step; if(cur>=finalNumber){ cur = finalNumber; clearInterval(timer); }
          stat.textContent = cur>999 ? cur.toLocaleString() : cur;
        }, 20);
      });
    }

    // IntersectionObserver para tarjetas estadísticas
    function initStatObserver(){
      const cards = document.querySelectorAll('.stat-card');
      const obs = new IntersectionObserver(entries=>{
        entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('reveal'); obs.unobserve(e.target); } });
      }, {threshold:0.2});
      cards.forEach(c=>obs.observe(c));
    }

    // Tema
    function applyTheme(theme){
      document.body.classList.toggle('dark', theme==='dark');
      localStorage.setItem('theme', theme);
      const btn = document.getElementById('themeToggle');
      if(btn){
        const icon = btn.querySelector('.toggle-icon');
        const text = btn.querySelector('.toggle-text');
        if (icon && text) {
          icon.textContent = theme==='dark' ? '☀️' : '🌙';
          text.textContent = theme==='dark' ? 'Claro' : 'Oscuro';
        }
        btn.setAttribute('aria-label', theme==='dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      }
    }
    function initTheme(){
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(saved || (prefersDark ? 'dark' : 'light'));
      const btn = document.getElementById('themeToggle');
      if(btn){ btn.addEventListener('click', ()=> applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark')); }
    }

    // === NUEVAS FUNCIONALIDADES ===

    // Sistema de favoritos
    function toggleFavorite() {
      if (famousVerses.length === 0) return;

      const currentVerse = famousVerses[currentVerseIndex];
      const favoriteIndex = favorites.findIndex(fav => fav.reference === currentVerse.reference);

      if (favoriteIndex > -1) {
        favorites.splice(favoriteIndex, 1);
        document.getElementById('favoriteBtn').textContent = '⭐';
      } else {
        favorites.push({...currentVerse});
        document.getElementById('favoriteBtn').textContent = '🌟';
      }

      localStorage.setItem('bibleFavorites', JSON.stringify(favorites));
      loadFavorites();
    }

    function loadFavorites() {
      const favoritesList = document.getElementById('favoritesList');
      if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-favorites">No tienes versículos favoritos aún. ¡Agrega algunos con el botón ⭐!</p>';
        return;
      }

      favoritesList.innerHTML = favorites.map(verse => `
        <div class="favorite-item">
          <div class="favorite-text">"${verse.text}"</div>
          <div class="favorite-reference">${verse.reference}</div>
          <div class="favorite-actions">
            <button onclick="copySpecificVerse('${verse.text}', '${verse.reference}')" title="Copiar">📋</button>
            <button onclick="removeFavorite('${verse.reference}')" title="Eliminar">🗑️</button>
          </div>
        </div>
      `).join('');
    }

    function removeFavorite(reference) {
      favorites = favorites.filter(fav => fav.reference !== reference);
      localStorage.setItem('bibleFavorites', JSON.stringify(favorites));
      loadFavorites();
      updateFavoriteButton();
    }

    function updateFavoriteButton() {
      if (famousVerses.length === 0) return;
      const currentVerse = famousVerses[currentVerseIndex];
      const isFavorite = favorites.some(fav => fav.reference === currentVerse.reference);
      document.getElementById('favoriteBtn').textContent = isFavorite ? '🌟' : '⭐';
    }

    // Copiar versículo
    function copyVerse() {
      if (famousVerses.length === 0) return;
      const currentVerse = famousVerses[currentVerseIndex];
      copySpecificVerse(currentVerse.text, currentVerse.reference);
    }

    function copySpecificVerse(text, reference) {
      const fullText = `"${text}" - ${reference}`;
      navigator.clipboard.writeText(fullText).then(() => {
        showCopyFeedback();
      }).catch(() => {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = fullText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyFeedback();
      });
    }

    function showCopyFeedback() {
      const feedback = document.getElementById('copyFeedback');
      feedback.style.display = 'block';
      feedback.style.opacity = '1';
      setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.style.display = 'none', 300);
      }, 2000);
    }

    // Modo de lectura
    function toggleReadingMode() {
      isReadingMode = !isReadingMode;
      document.body.classList.toggle('reading-mode', isReadingMode);
      document.getElementById('readingModeBtn').textContent = isReadingMode ? '👁️‍🗨️' : '👁️';
    }

    // Plan de lectura
    function showReadingPlan() {
      const modal = document.getElementById('readingPlanModal');
      const content = document.getElementById('readingPlanContent');

      if (readingPlan.days) {
        content.innerHTML = `
          <div class="plan-header">
            <h4>${readingPlan.title}</h4>
            <p>${readingPlan.description}</p>
          </div>
          <div class="plan-days">
            ${readingPlan.days.map(day => `
              <div class="plan-day ${day.completed ? 'completed' : ''}">
                <div class="day-header">
                  <h5>Día ${day.day}: ${day.title}</h5>
                  <button onclick="toggleDayComplete(${day.day - 1})" class="complete-btn">
                    ${day.completed ? '✅' : '⬜'}
                  </button>
                </div>
                <div class="day-content">
                  <p><strong>Lectura:</strong> ${day.reading}</p>
                  <p>${day.summary}</p>
                  <div class="key-verse">${day.keyVerse}</div>
                  <p><em>Reflexión: ${day.reflection}</em></p>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      modal.style.display = 'block';
    }

    function closeReadingPlan() {
      document.getElementById('readingPlanModal').style.display = 'none';
    }

    function toggleDayComplete(dayIndex) {
      if (readingPlan.days && readingPlan.days[dayIndex]) {
        readingPlan.days[dayIndex].completed = !readingPlan.days[dayIndex].completed;
        localStorage.setItem('readingPlanProgress', JSON.stringify(readingPlan.days));
        showReadingPlan(); // Refresh the display
      }
    }

    // Actualizar display de versículo
    function updateVerseDisplay() {
      if (famousVerses.length > 0) {
        currentVerseIndex = Math.floor(Math.random() * famousVerses.length);
        const verse = famousVerses[currentVerseIndex];
        document.getElementById('verseText').textContent = `"${verse.text}"`;
        document.getElementById('verseReference').textContent = verse.reference;
        updateFavoriteButton();
      }
    }

    // Modificar función showRandomVerse existente
    function showRandomVerse(){
      if (famousVerses.length === 0) return;

      currentVerseIndex = Math.floor(Math.random() * famousVerses.length);
      const v = famousVerses[currentVerseIndex];
      const verseText = document.getElementById('verseText');
      const verseReference = document.getElementById('verseReference');

      verseText.style.opacity='0';
      verseReference.style.opacity='0';

      setTimeout(()=>{
        verseText.textContent = `"${v.text}"`;
        verseReference.textContent = v.reference;
        verseText.style.opacity='1';
        verseReference.style.opacity='1';
        updateFavoriteButton();
      }, 250);
    }

    // === FUNCIONES DE NAVEGACIÓN MODERNA ===

    // Menu móvil
    function toggleMobileMenu() {
      const menu = document.getElementById('navMenu');
      const btn = document.getElementById('mobileMenuBtn');

      menu.classList.toggle('active');
      btn.classList.toggle('active');
    }

    // Navegación smooth scroll y highlighting activo
    function initSmoothScrolling() {
      // Agregar evento click a todos los links de navegación
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            // Cerrar menú móvil si está abierto
            const menu = document.getElementById('navMenu');
            const btn = document.getElementById('mobileMenuBtn');
            menu.classList.remove('active');
            btn.classList.remove('active');

            // Scroll suave
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });

            // Actualizar link activo
            updateActiveNavLink(link);
          }
        });
      });

      // Scroll spy - detectar sección visible
      const sections = document.querySelectorAll('[id]');
      const navLinks = document.querySelectorAll('.nav-link');

      const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
            if (activeLink) {
              updateActiveNavLink(activeLink);
            }
          }
        });
      }, observerOptions);

      sections.forEach(section => observer.observe(section));
    }

    function updateActiveNavLink(activeLink) {
      // Remover clase active de todos los links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });

      // Agregar clase active al link actual
      activeLink.classList.add('active');
    }

    // Header scroll effect
    function initHeaderScrollEffect() {
      const header = document.querySelector('.modern-header');
      let lastScrollY = window.scrollY;

      window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
          header.style.background = currentScrollY > lastScrollY
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
      });
    }

    // Inicializar efectos del header al cargar
    document.addEventListener('DOMContentLoaded', () => {
      initHeaderScrollEffect();
    });
