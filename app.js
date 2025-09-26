// Datos globales
    let oldTestamentBooks = [];
    let newTestamentBooks = [];
    let famousVerses = [];
    let readingPlan = [];
    let inspirationalQuotes = [];
    let currentVerseIndex = 0;
    let currentQuoteIndex = 0;
    let favorites = JSON.parse(localStorage.getItem('bibleFavorites')) || [];
    let isReadingMode = false;

    // Cargar datos desde JSON
    async function loadData() {
      try {
        const [booksResponse, versesResponse, planResponse, quotesResponse] = await Promise.all([
          fetch('./data/books.json'),
          fetch('./data/verses.json'),
          fetch('./data/reading-plan.json'),
          fetch('./data/inspirational-quotes.json')
        ]);

        const books = await booksResponse.json();
        const verses = await versesResponse.json();
        const plan = await planResponse.json();
        const quotes = await quotesResponse.json();

        oldTestamentBooks = books.antiguo;
        newTestamentBooks = books.nuevo;
        famousVerses = verses;
        readingPlan = plan;
        inspirationalQuotes = quotes;

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
      5:{title:"Las Generaciones de Adán",subtitle:"Este es el libro de las generaciones de Adán",info:{"Versículos":"32","Palabras":"580","Generaciones listadas":"10 (desde Adán hasta Noé)","Vida más larga":"Matusalén - 969 años","Persona trasladada":"Enoc - 'caminó con Dios'"},curiosities:[{icon:"📊",text:"La edad promedio de los patriarcas antediluvianos era de 857 años, mucho mayor que después del diluvio."},{icon:"🚶",text:"Enoc 'caminó con Dios' y fue trasladado sin ver muerte - solo él y Elías tuvieron este privilegio."},{icon:"🔢",text:"Matusalén murió el mismo año del diluvio. Su nombre significa 'cuando él muera, será enviado'."},{icon:"👶",text:"Adán vivió para ver nacer a Lamec (abuelo de Noé), conectando directamente las generaciones."}],events:[{day:"Adán",description:"930 años - El primer hombre, padre de toda la humanidad"},{day:"Set",description:"912 años - Reemplazó a Abel, línea del Mesías"},{day:"Enós",description:"905 años - En su tiempo se comenzó a invocar el nombre de Jehová"},{day:"Cainán",description:"910 años - Cuarta generación desde Adán"},{day:"Mahalaleel",description:"895 años - Su nombre significa 'alabanza de Dios'"},{day:"Jared",description:"962 años - Padre de Enoc"},{day:"Enoc",description:"365 años - Trasladado por Dios sin ver muerte"},{day:"Matusalén",description:"969 años - El hombre que más vivió"},{day:"Lamec",description:"777 años - Padre de Noé"},{day:"Noé",description:"950 años - Constructor del arca, salvador de la humanidad"}]},
      6:{title:"Corrupción y el Arca",subtitle:"Noé recibe instrucciones divinas",info:{"Versículos":"22","Tema":"Gracia en medio del juicio"},curiosities:[{icon:"🎯",text:"Primera mención de la gracia en la Biblia"},{icon:"🚢",text:"El arca tenía proporciones perfectas para navegar"}],events:[{day:"Corrupción",description:"La maldad se multiplica en la tierra"},{day:"Gracia",description:"Noé halla gracia ante Dios"}]},
      7:{title:"El Diluvio",subtitle:"Juicio global y preservación",info:{"Versículos":"24","Duración":"40 días de lluvia"},curiosities:[{icon:"🌊",text:"Las aguas cubrieron los montes más altos"},{icon:"🚪",text:"Dios mismo cerró la puerta del arca"}],events:[{day:"Lluvia",description:"40 días y 40 noches de lluvia"},{day:"Salvación",description:"Solo 8 personas se salvan"}]},
      8:{title:"Fin del Diluvio",subtitle:"Dios recuerda a Noé",info:{"Versículos":"22","Señal":"Hoja de olivo"},curiosities:[{icon:"🕊️",text:"La paloma trajo una hoja de olivo fresca"},{icon:"💭",text:"Dios se 'acordó' de Noé - actuó fielmente"}],events:[{day:"Viento",description:"Dios hace pasar viento sobre la tierra"},{day:"Altar",description:"Noé edifica altar y ofrece sacrificio"}]},
      9:{title:"Pacto con Noé",subtitle:"Arco iris como señal eterna",info:{"Versículos":"29","Señal":"Arco iris"},curiosities:[{icon:"🌈",text:"Primer arco iris mencionado en la Biblia"},{icon:"🩸",text:"Prohibición de comer sangre establecida"}],events:[{day:"Pacto",description:"Dios establece pacto con Noé"},{day:"Señal",description:"Arco iris como recordatorio eterno"}]},
      10:{title:"Tabla de las Naciones",subtitle:"Descendientes de los hijos de Noé",info:{"Versículos":"32","Naciones":"70 pueblos"},curiosities:[{icon:"🌍",text:"Origen de todas las naciones del mundo"},{icon:"7️⃣",text:"70 naciones representan la totalidad"}],events:[{day:"Jafet",description:"Pueblos del norte y oeste"},{day:"Cam",description:"Pueblos del sur y este"}]},
      11:{title:"Torre de Babel",subtitle:"Confusión de lenguas",info:{"Versículos":"32","Resultado":"Dispersión"},curiosities:[{icon:"🗼",text:"Torre construida con ladrillos y asfalto"},{icon:"🗣️",text:"Dios confunde el lenguaje humano"}],events:[{day:"Torre",description:"Intentan edificar hasta el cielo"},{day:"Confusión",description:"Dios confunde sus lenguas"}]},
      12:{title:"Llamado de Abram",subtitle:"Promesa de bendición global",info:{"Versículos":"20","Edad":"75 años"},curiosities:[{icon:"🌍",text:"Promesa para todas las familias de la tierra"},{icon:"⛪",text:"Edifica altares dondequiera que va"}],events:[{day:"Llamado",description:"Sal de tu tierra y parentela"},{day:"Promesa",description:"Te haré una gran nación"}]},
      13:{title:"Separación de Lot",subtitle:"Generosidad y elección",info:{"Versículos":"18","Elección":"Lot elige la llanura"},curiosities:[{icon:"🏜️",text:"Lot elige por la vista, no por fe"},{icon:"⛪",text:"Abram regresa al altar anterior"}],events:[{day:"Riqueza",description:"Abundante ganado causa conflicto"},{day:"Separación",description:"Abram permite a Lot elegir primero"}]},
      14:{title:"Rescate de Lot",subtitle:"Melquisedec bendice a Abram",info:{"Versículos":"24","Soldados":"318 entrenados"},curiosities:[{icon:"👑",text:"Melquisedec: rey y sacerdote"},{icon:"💰",text:"Primer diezmo registrado en la Biblia"}],events:[{day:"Guerra",description:"Reyes orientales vs occidentales"},{day:"Rescate",description:"Abram libera a Lot"}]},
      15:{title:"Pacto con Abram",subtitle:"Justicia por fe",info:{"Versículos":"21","Promesa":"Descendencia como estrellas"},curiosities:[{icon:"⚖️",text:"'Le fue contado por justicia' - base del evangelio"},{icon:"🔥",text:"Antorcha de fuego pasa entre los animales"}],events:[{day:"Promesa",description:"Descendencia innumerable como estrellas"},{day:"Justicia",description:"Abram cree y le es contado por justicia"}]},
      16:{title:"Hagar e Ismael",subtitle:"Impaciencia interfiere con promesa",info:{"Versículos":"16","Edad Abram":"86 años"},curiosities:[{icon:"👁️",text:"Hagar llama a Dios 'El Roi' - El que me ve"},{icon:"👂",text:"Ismael significa 'Dios oye'"}],events:[{day:"Plan",description:"Sarai propone Hagar como sustituta"},{day:"Huida",description:"Hagar huye al desierto"}]},
      17:{title:"Pacto de Circuncisión",subtitle:"Abraham y Sara - nuevos nombres",info:{"Versículos":"27","Nuevo nombre":"Abraham = padre de multitudes"},curiosities:[{icon:"💪",text:"El Shaddai - Dios Todopoderoso"},{icon:"✂️",text:"Circuncisión como señal del pacto"}],events:[{day:"Nombres",description:"Abram se vuelve Abraham, Sarai es Sara"},{day:"Isaac",description:"Promesa de Isaac para el año siguiente"}]},
      18:{title:"Visitación Divina",subtitle:"Promesa confirmada e intercesión",info:{"Versículos":"33","Visitantes":"3 varones"},curiosities:[{icon:"👥",text:"Tres visitantes representan a Dios"},{icon:"❓",text:"'¿Hay algo difícil para Dios?'"}],events:[{day:"Visita",description:"Tres varones visitan a Abraham"},{day:"Intercesión",description:"Abraham intercede por Sodoma"}]},
      19:{title:"Destrucción de Sodoma",subtitle:"Juicio divino y escape de Lot",info:{"Versículos":"38","Ciudades":"Sodoma y Gomorra"},curiosities:[{icon:"🧂",text:"Esposa de Lot se convierte en sal"},{icon:"🏘️",text:"Zoar significa 'pequeña'"}],events:[{day:"Advertencia",description:"Ángeles advierten a Lot"},{day:"Destrucción",description:"Fuego y azufre del cielo"}]},
      20:{title:"Abraham y Abimelec",subtitle:"Gracia en medio de errores",info:{"Versículos":"18","Título":"Abraham llamado profeta"},curiosities:[{icon:"📖",text:"Primera vez 'profeta' en la Biblia"},{icon:"💰",text:"Mil piezas de plata como vindicación"}],events:[{day:"Error",description:"Abraham presenta a Sara como hermana"},{day:"Intervención",description:"Dios protege a Sara en sueños"}]}
    };

    // Estado
    let currentChapter = 1;
    let currentBook = 'genesis';
    let currentSearch = '';
    let currentChapterData = null;
    let currentTab = 'resumen';
    let currentDay = 1;
    let currentQuestion = 0;
    let currentTrivia = 0;
    let triviaAnswers = [];

    // Generar opciones del dropdown de capítulos en el modal
    function generateChapterDropdown() {
      const dropdown = document.getElementById('chapterSelectorDropdown');
      if (!dropdown) return;

      // Limpiar opciones existentes
      dropdown.innerHTML = '';

      // Generar opciones para capítulos 1-20
      Array.from({length: 20}, (_, i) => i + 1).forEach(chapterNum => {
        const option = document.createElement('option');
        option.value = chapterNum;
        option.textContent = `Capítulo ${chapterNum}`;
        dropdown.appendChild(option);
      });
    }

    // Navegación entre capítulos
    function navigateChapter(direction) {
      if (currentBook !== 'genesis') return;

      let newChapter = currentChapter;
      if (direction === 'prev' && currentChapter > 1) {
        newChapter = currentChapter - 1;
      } else if (direction === 'next' && currentChapter < 20) {
        newChapter = currentChapter + 1;
      }

      if (newChapter !== currentChapter) {
        openChapterModal('genesis', newChapter);
      }
    }

    // Actualizar UI de navegación
    function updateNavigationUI() {
      const prevBtn = document.getElementById('prevChapterBtn');
      const nextBtn = document.getElementById('nextChapterBtn');
      const dropdown = document.getElementById('chapterSelectorDropdown');

      if (prevBtn) prevBtn.disabled = currentChapter <= 1;
      if (nextBtn) nextBtn.disabled = currentChapter >= 20;
      if (dropdown) dropdown.value = currentChapter;
    }

    // Init
    document.addEventListener('DOMContentLoaded', async () => {
      // Cargar datos primero
      await loadData();

      // Generar dropdown de capítulos en el modal
      generateChapterDropdown();

      // Tabs testamento
      document.querySelectorAll('.testament-btn').forEach(btn => btn.addEventListener('click', function(){ showTestament(this.getAttribute('data-testament'), this); }));
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
      // Interacciones del hero
      initHeroInteractions();
      // Buscador
      const searchInput = document.getElementById('bookSearch');
      const clearBtn = document.getElementById('clearSearch');
      if (searchInput) searchInput.addEventListener('input', () => { currentSearch = searchInput.value; filterBooks(); });
      if (clearBtn) clearBtn.addEventListener('click', () => { if(searchInput){searchInput.value='';searchInput.focus();} currentSearch=''; filterBooks(); });
      // Chapter modal
      initChapterModal();

      // Navigation buttons en modal
      const prevBtn = document.getElementById('prevChapterBtn');
      const nextBtn = document.getElementById('nextChapterBtn');
      const dropdown = document.getElementById('chapterSelectorDropdown');

      if (prevBtn) prevBtn.addEventListener('click', () => navigateChapter('prev'));
      if (nextBtn) nextBtn.addEventListener('click', () => navigateChapter('next'));
      if (dropdown) dropdown.addEventListener('change', (e) => {
        const selectedChapter = parseInt(e.target.value);
        openChapterModal('genesis', selectedChapter);
      });

      initTheme();
      showTestament('antiguo', document.querySelector('.testament-btn.active'));
      showChapter(1, document.querySelector('.chapter-btn.active'));
      setTimeout(animateNumbers, 400);
      initStatObserver();
      loadFavorites();
      updateVerseDisplay();
      initHeroAnimations();
    });


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
        el.addEventListener('click', () => {
          flash();
          if (book === 'Génesis') {
            console.log('Opening Genesis chapter modal...');
            openChapterModal('genesis', 1);
          }
        });
        el.addEventListener('keydown', e=>{
          if(e.key==='Enter' || e.key===' '){
            e.preventDefault();
            flash();
            if (book === 'Génesis') {
              openChapterModal('genesis', 1);
            }
          }
        });
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

    // Animación de números mejorada
    function animateNumbers(){
      document.querySelectorAll('.stat-number').forEach(stat=>{
        // Skip if it's inside a comparison (will be animated separately)
        if (stat.closest('.stat-comparison')) return;

        const textContent = stat.textContent.trim();
        let finalNumber;
        let suffix = '';

        // Handle numbers with + suffix
        if (textContent.includes('+')) {
          finalNumber = parseInt(textContent.replace(/[,+]/g, ''));
          suffix = '+';
        } else {
          finalNumber = parseInt(textContent.replace(/,/g, ''));
        }

        if (isNaN(finalNumber)) return;

        let cur = 0;
        const step = Math.max(1, Math.floor(finalNumber/100));
        const timer = setInterval(()=>{
          cur += step;
          if(cur >= finalNumber){
            cur = finalNumber;
            clearInterval(timer);
          }
          const formattedNumber = cur > 999 ? cur.toLocaleString() : cur;
          stat.textContent = formattedNumber + suffix;
        }, 20);
      });

      // Animate comparison numbers separately
      document.querySelectorAll('.stat-comparison .stat-number').forEach(stat=>{
        const finalNumber = parseInt(stat.textContent.replace(/,/g,''));
        if (isNaN(finalNumber)) return;

        let cur = 0;
        const step = Math.max(1, Math.floor(finalNumber/80));
        const timer = setInterval(()=>{
          cur += step;
          if(cur >= finalNumber){
            cur = finalNumber;
            clearInterval(timer);
          }
          stat.textContent = cur.toLocaleString();
        }, 25);
      });

      // Animate genre bars
      setTimeout(() => {
        document.querySelectorAll('.genre-bar').forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
      }, 500);
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

    // === FUNCIONES DEL HERO ENRIQUECIDO ===

    // Inicializar animaciones del hero
    function initHeroAnimations() {
      initHeroStatCounter();
      initInspirationRotation();
    }

    // Inicializar interacciones del hero
    function initHeroInteractions() {
      initBenefitButtons();
      initStepperButtons();
      initEnhancedInspirationChip();
    }

    // Botones de beneficios
    function initBenefitButtons() {
      document.querySelectorAll('.benefit-item').forEach(item => {
        const action = item.getAttribute('data-action');

        const handleClick = () => {
          switch(action) {
            case 'plan':
              document.getElementById('startReadingPlan').click();
              break;
            case 'verse':
              document.querySelector('a[href="#versiculo"]').click();
              break;
            case 'explore':
              document.querySelector('a[href="#explorar"]').click();
              break;
          }
        };

        item.addEventListener('click', handleClick);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        });
      });
    }

    // Botones del stepper
    function initStepperButtons() {
      document.querySelectorAll('.step-item').forEach(item => {
        const step = item.getAttribute('data-step');

        const handleClick = () => {
          switch(step) {
            case '1':
              document.querySelector('a[href="#empezar"]').click();
              break;
            case '2':
              document.querySelector('a[href="#explorar"]').click();
              break;
            case '3':
              document.querySelector('a[href="#favoritos"]').click();
              break;
          }
        };

        item.addEventListener('click', handleClick);
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        });
      });
    }

    // Chip inspiracional mejorado
    function initEnhancedInspirationChip() {
      const chip = document.getElementById('inspirationChip');
      if (!chip) return;

      // Agregar tooltip
      chip.setAttribute('title', 'Haz clic para cambiar versículo');

      // Agregar indicador visual de que es clickeable
      chip.style.position = 'relative';

      // Crear indicador de acción
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        width: 12px;
        height: 12px;
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        border-radius: 50%;
        opacity: 0.8;
        animation: pulse 2s infinite;
      `;
      chip.appendChild(indicator);

      // Agregar animación pulse en CSS si no existe
      if (!document.querySelector('#pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Contador animado del hero stat
    function initHeroStatCounter() {
      const statNumber = document.querySelector('.hero-stat-number');
      if (!statNumber) return;

      const targetValue = parseInt(statNumber.getAttribute('data-target'));
      let currentValue = 0;
      const increment = targetValue / 100;
      const duration = 2000; // 2 segundos
      const stepTime = duration / 100;

      const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(counter);
        }
        statNumber.textContent = Math.floor(currentValue).toLocaleString();
      }, stepTime);
    }

    // Rotación de frases inspiradoras
    function initInspirationRotation() {
      if (inspirationalQuotes.length === 0) return;

      const chip = document.getElementById('inspirationChip');
      const textElement = chip.querySelector('.inspiration-text');
      const refElement = chip.querySelector('.inspiration-ref');

      function updateQuote() {
        const quote = inspirationalQuotes[currentQuoteIndex];

        // Efecto de fade out
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.95)';

        setTimeout(() => {
          textElement.textContent = `"${quote.text}"`;
          refElement.textContent = quote.reference;

          // Efecto de fade in
          chip.style.opacity = '1';
          chip.style.transform = 'scale(1)';

          currentQuoteIndex = (currentQuoteIndex + 1) % inspirationalQuotes.length;
        }, 300);
      }

      // Cambiar cada 6 segundos
      setInterval(updateQuote, 6000);

      // Permitir click para cambiar manualmente
      chip.addEventListener('click', updateQuote);
      chip.style.cursor = 'pointer';
    }

    // Efectos adicionales para modo oscuro en hero
    function updateHeroDarkMode() {
      const isDark = document.body.classList.contains('dark');
      const particles = document.querySelectorAll('.particle');

      particles.forEach(particle => {
        if (isDark) {
          particle.style.background = 'rgba(96, 165, 250, 0.6)';
        } else {
          particle.style.background = 'rgba(255, 255, 255, 0.6)';
        }
      });
    }

    // Actualizar la función applyTheme para incluir efectos del hero
    const originalApplyTheme = window.applyTheme || applyTheme;
    if (typeof applyTheme === 'function') {
      window.applyTheme = function(theme) {
        originalApplyTheme(theme);
        updateHeroDarkMode();
      };
    }

    // ===== CHAPTER MODAL SYSTEM =====

    // Initialize chapter modal functionality
    function initChapterModal() {
      // Close modal handlers
      const closeBtn = document.querySelector('.chapter-close');
      const modal = document.querySelector('.chapter-modal');

      if (closeBtn) {
        closeBtn.addEventListener('click', closeChapterModal);
      }

      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            closeChapterModal();
          }
        });
      }

      // Tab handlers - using event delegation since modal content is dynamic
      document.addEventListener('click', (e) => {
        if (e.target.classList.contains('chapter-tab')) {
          const tabName = e.target.dataset.tab;
          console.log('Tab clicked:', tabName);
          switchChapterTab(tabName);
        }
      });

      // Note: Timeline slider and trivia navigation will be attached dynamically when content is loaded

      // Escape key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
          closeChapterModal();
        }
      });
    }

    // Load chapter data
    async function loadChapterData(book, chapter) {
      try {
        const url = `./data/chapters/${book}-${chapter}.json`;
        console.log('Attempting to load chapter data from:', url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Chapter data not found: ${response.status}`);
        const data = await response.json();
        console.log('Chapter data loaded successfully from JSON:', data);
        return data;
      } catch (error) {
        console.error('Error loading chapter data from JSON:', error);

        // Fallback a datos embebidos para Genesis
        if (book === 'genesis' && genesisChapters[chapter]) {
          console.log('Using fallback embedded data for Genesis chapter:', chapter);
          return convertEmbeddedToModalFormat(genesisChapters[chapter], chapter);
        }

        console.error('No fallback data available for:', `${book} ${chapter}`);
        return null;
      }
    }

    // Convertir datos embebidos al formato del modal
    function convertEmbeddedToModalFormat(embeddedData, chapterNum) {
      return {
        book: "Génesis",
        chapter: chapterNum,
        title: embeddedData.title,
        subtitle: embeddedData.subtitle,
        summary: embeddedData.subtitle,
        timeline: {
          period: "Génesis",
          context: embeddedData.subtitle,
          placement: `Capítulo ${chapterNum}`
        },
        days: embeddedData.events ? embeddedData.events.map((event, index) => ({
          day: index + 1,
          title: event.day,
          icon: "📖",
          description: event.description,
          verse: "",
          reference: `Génesis ${chapterNum}`,
          significance: event.description
        })) : [],
        interestingFacts: embeddedData.curiosities ? embeddedData.curiosities.map((curiosity, index) => ({
          id: `fact-${index}`,
          title: curiosity.text.substring(0, 30) + "...",
          summary: curiosity.text,
          explanation: curiosity.text,
          verse: "",
          reference: `Génesis ${chapterNum}`
        })) : [],
        reflectionQuestions: [{
          id: "embedded-q1",
          question: `¿Qué enseñanza principal extraes de ${embeddedData.title}?`,
          category: "personal",
          hints: ["Reflexiona sobre el tema principal", "Considera las lecciones espirituales"]
        }],
        trivia: [{
          question: `¿Cuál es el tema principal de ${embeddedData.title}?`,
          options: ["Creación", "Fe", "Obediencia"],
          correct: 1,
          explanation: embeddedData.subtitle
        }],
        comparison: {
          title: `Transformación en ${embeddedData.title}`,
          before: {
            title: "Situación inicial",
            description: "Estado previo a los eventos del capítulo",
            elements: ["Contexto inicial"],
            verse: "",
            reference: `Génesis ${chapterNum}`
          },
          after: {
            title: "Resultado final",
            description: embeddedData.subtitle,
            elements: embeddedData.info ? Object.keys(embeddedData.info) : [],
            verse: "",
            reference: `Génesis ${chapterNum}`
          }
        },
        memorizeVerse: {
          text: `Versículo clave del capítulo ${chapterNum} de Génesis`,
          reference: `Génesis ${chapterNum}:1`,
          theme: embeddedData.title
        },
        mainTeaching: embeddedData.subtitle,
        practicalApplication: [
          `Aplicar las enseñanzas de ${embeddedData.title} en la vida diaria`,
          "Reflexionar sobre las lecciones espirituales del capítulo",
          "Compartir estas verdades con otros"
        ]
      };
    }

    // Open chapter modal
    async function openChapterModal(book, chapter) {
      console.log('openChapterModal called with:', book, chapter);
      const modal = document.querySelector('.chapter-modal');
      if (!modal) {
        console.error('Modal not found!');
        return;
      }

      // Load chapter data
      currentChapterData = await loadChapterData(book, chapter);
      if (!currentChapterData) {
        alert('Los datos del capítulo no están disponibles aún.');
        return;
      }

      // Reset state
      currentTab = 'resumen';
      currentDay = 1;
      currentQuestion = 0;
      currentTrivia = 0;
      triviaAnswers = [];

      // Update current chapter and book
      currentChapter = chapter;
      currentBook = book;

      // Update modal content
      updateModalHeader();
      updateModalContent();

      // Update navigation UI
      updateNavigationUI();

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus first tab
      const firstTab = document.querySelector('.chapter-tab[data-tab="resumen"]');
      if (firstTab) firstTab.focus();
    }

    // Close chapter modal
    function closeChapterModal() {
      const modal = document.querySelector('.chapter-modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentChapterData = null;
      }
    }

    // Update modal header
    function updateModalHeader() {
      if (!currentChapterData) return;

      const title = document.querySelector('.chapter-modal-title');
      const subtitle = document.querySelector('.chapter-modal-subtitle');

      if (title) {
        title.textContent = `${currentChapterData.book} ${currentChapterData.chapter}`;
      }
      if (subtitle) {
        subtitle.textContent = currentChapterData.subtitle;
      }
    }

    // Switch between tabs
    function switchChapterTab(tabName) {
      currentTab = tabName;

      // Update tab active states
      document.querySelectorAll('.chapter-tab').forEach(tab => {
        tab.classList.remove('active');
      });
      const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
      if (activeTab) {
        activeTab.classList.add('active');
      }

      // Update content
      updateModalContent();
    }

    // Update modal content based on current tab
    function updateModalContent() {
      if (!currentChapterData) return;

      const content = document.querySelector('.chapter-tab-content.active');
      if (content) content.classList.remove('active');

      document.querySelectorAll('.chapter-tab-content').forEach(tab => {
        tab.classList.remove('active');
      });

      const targetContent = document.getElementById(`${currentTab}Content`);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Generate content based on tab
      switch (currentTab) {
        case 'resumen':
          updateResumenContent();
          break;
        case 'timeline':
          updateTimelineContent();
          break;
        case 'datos':
          updateDatosContent();
          break;
        case 'reflexion':
          updateReflexionContent();
          break;
        case 'trivia':
          updateTriviaContent();
          break;
        case 'comparacion':
          updateComparacionContent();
          break;
      }
    }

    // Update timeline content
    function updateTimelineContent() {
      const container = document.getElementById('timelineContent');
      if (!container || !currentChapterData.days) return;

      const html = `
        <div class="timeline-container">
          <input type="range" class="timeline-slider" id="timelineSlider"
                 min="1" max="${currentChapterData.days.length}" value="${currentDay}">
          <div class="timeline-days" id="timelineDays">
            ${currentChapterData.days.map((day, index) => `
              <div class="day-card ${index + 1 === currentDay ? 'active' : ''}" data-day="${index + 1}">
                <div class="day-header">
                  <div class="day-icon">${day.icon}</div>
                  <div class="day-info">
                    <h3>${day.title}</h3>
                    <div class="day-number">Día ${day.day}</div>
                  </div>
                </div>
                <div class="day-description">${day.description}</div>
                <div class="day-verse">
                  <div class="day-verse-text">"${day.verse}"</div>
                  <div class="day-verse-ref">${day.reference}</div>
                </div>
                <div class="day-significance">${day.significance}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      container.innerHTML = html;

      // Re-attach slider event
      const slider = document.getElementById('timelineSlider');
      if (slider) {
        slider.addEventListener('input', (e) => {
          updateTimelineDay(parseInt(e.target.value));
        });
      }
    }

    // Update timeline day
    function updateTimelineDay(day) {
      currentDay = day;

      // Update active day card
      document.querySelectorAll('.day-card').forEach(card => {
        card.classList.remove('active');
      });

      const activeCard = document.querySelector(`[data-day="${day}"]`);
      if (activeCard) {
        activeCard.classList.add('active');
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // Update resumen content
    function updateResumenContent() {
      const container = document.getElementById('resumenContent');
      if (!container) return;

      const html = `
        <div class="resumen-summary">
          <h3>📖 Resumen</h3>
          <p>${currentChapterData.summary}</p>
        </div>

        <div class="resumen-timeline">
          <h4>⏰ Contexto Temporal</h4>
          <div class="timeline-info">
            <div class="timeline-item">
              <strong>Período:</strong> ${currentChapterData.timeline.period}
            </div>
            <div class="timeline-item">
              <strong>Contexto:</strong> ${currentChapterData.timeline.context}
            </div>
            <div class="timeline-item">
              <strong>Ubicación:</strong> ${currentChapterData.timeline.placement}
            </div>
          </div>
        </div>

        <div class="resumen-teaching">
          <h4>💡 Enseñanza Principal</h4>
          <p>${currentChapterData.mainTeaching}</p>
        </div>

        <div class="resumen-application">
          <h4>🎯 Aplicación Práctica</h4>
          <ul>
            ${currentChapterData.practicalApplication.map(app => `<li>${app}</li>`).join('')}
          </ul>
        </div>

        <div class="resumen-verse">
          <h4>📝 Versículo para Memorizar</h4>
          <div class="memorize-verse">
            <div class="verse-text">"${currentChapterData.memorizeVerse.text}"</div>
            <div class="verse-ref">${currentChapterData.memorizeVerse.reference}</div>
            <div class="verse-theme">${currentChapterData.memorizeVerse.theme}</div>
          </div>
        </div>
      `;

      container.innerHTML = html;
    }

    // Update datos content
    function updateDatosContent() {
      const container = document.getElementById('datosContent');
      if (!container || !currentChapterData.interestingFacts) return;

      const html = `
        <div class="facts-grid">
          ${currentChapterData.interestingFacts.map(fact => `
            <div class="fact-card" data-fact-id="${fact.id}">
              <div class="fact-title">${fact.title}</div>
              <div class="fact-summary">${fact.summary}</div>
              <div class="fact-explanation">${fact.explanation}</div>
              <div class="fact-verse">
                "${fact.verse}"
                <div class="fact-reference">${fact.reference}</div>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.innerHTML = html;

      // Add click handlers for fact cards
      document.querySelectorAll('.fact-card').forEach(card => {
        card.addEventListener('click', () => {
          card.style.transform = 'scale(0.98)';
          setTimeout(() => {
            card.style.transform = 'translateY(-5px)';
          }, 150);
        });
      });
    }

    // Update reflexion content
    function updateReflexionContent() {
      const container = document.getElementById('reflexionContent');
      if (!container || !currentChapterData.reflectionQuestions) return;

      const html = `
        <div class="questions-grid">
          ${currentChapterData.reflectionQuestions.map((question, index) => `
            <div class="question-card" data-question-id="${question.id}">
              <div class="question-category">${question.category}</div>
              <div class="question-text">${question.question}</div>
              <div class="question-hints">
                ${question.hints.map(hint => `<span class="hint-tag">${hint}</span>`).join('')}
              </div>
              <div class="question-response">
                <textarea placeholder="Escribe tu reflexión aquí..."
                          id="response-${index}"
                          data-question-id="${question.id}"></textarea>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      container.innerHTML = html;

      // Load saved responses
      loadQuestionResponses();

      // Auto-save responses
      document.querySelectorAll('.question-response textarea').forEach(textarea => {
        textarea.addEventListener('input', saveQuestionResponse);
      });
    }

    // Save question response to localStorage
    function saveQuestionResponse(e) {
      const questionId = e.target.dataset.questionId;
      const response = e.target.value;
      const key = `reflection-${currentChapterData.book}-${currentChapterData.chapter}-${questionId}`;
      localStorage.setItem(key, response);
    }

    // Load question responses from localStorage
    function loadQuestionResponses() {
      if (!currentChapterData.reflectionQuestions) return;

      currentChapterData.reflectionQuestions.forEach((question, index) => {
        const key = `reflection-${currentChapterData.book}-${currentChapterData.chapter}-${question.id}`;
        const savedResponse = localStorage.getItem(key);
        const textarea = document.getElementById(`response-${index}`);
        if (textarea && savedResponse) {
          textarea.value = savedResponse;
        }
      });
    }

    // Update trivia content
    function updateTriviaContent() {
      const container = document.getElementById('triviaContent');
      if (!container || !currentChapterData.trivia) return;

      if (currentTrivia >= currentChapterData.trivia.length) {
        showTriviaResults();
        return;
      }

      const question = currentChapterData.trivia[currentTrivia];
      const isAnswered = triviaAnswers[currentTrivia] !== undefined;

      const html = `
        <div class="trivia-container">
          <div class="trivia-question">
            <h3>Pregunta ${currentTrivia + 1} de ${currentChapterData.trivia.length}</h3>
            <p>${question.question}</p>
            <div class="trivia-options">
              ${question.options.map((option, index) => {
                let className = 'trivia-option';
                if (isAnswered) {
                  if (index === question.correct) {
                    className += ' correct';
                  } else if (index === triviaAnswers[currentTrivia]) {
                    className += ' incorrect';
                  }
                }
                return `<div class="${className}" data-option="${index}">${option}</div>`;
              }).join('')}
            </div>
            ${isAnswered ? `
              <div class="trivia-explanation show">
                ${question.explanation}
              </div>
            ` : ''}
          </div>
          <div class="trivia-controls">
            <button class="trivia-nav" id="triviaPrev" ${currentTrivia === 0 ? 'disabled' : ''}>
              Anterior
            </button>
            <div class="trivia-progress">
              ${currentTrivia + 1} / ${currentChapterData.trivia.length}
            </div>
            <button class="trivia-nav" id="triviaNext" ${isAnswered ? '' : 'disabled'}>
              ${currentTrivia === currentChapterData.trivia.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </div>
      `;

      container.innerHTML = html;

      // Add option click handlers
      if (!isAnswered) {
        document.querySelectorAll('.trivia-option').forEach(option => {
          option.addEventListener('click', () => {
            const selectedIndex = parseInt(option.dataset.option);
            answerTrivia(selectedIndex);
          });
        });
      }

      // Re-attach navigation handlers
      const prevBtn = document.getElementById('triviaPrev');
      const nextBtn = document.getElementById('triviaNext');

      if (prevBtn) prevBtn.addEventListener('click', () => navigateTrivia(-1));
      if (nextBtn) nextBtn.addEventListener('click', () => navigateTrivia(1));
    }

    // Answer trivia question
    function answerTrivia(selectedIndex) {
      triviaAnswers[currentTrivia] = selectedIndex;
      updateTriviaContent(); // Refresh to show results
    }

    // Navigate trivia
    function navigateTrivia(direction) {
      console.log('Navigating trivia:', direction, 'from index:', currentTrivia);
      const newIndex = currentTrivia + direction;
      console.log('New index would be:', newIndex, 'Total questions:', currentChapterData.trivia.length);

      if (newIndex >= 0 && newIndex < currentChapterData.trivia.length) {
        currentTrivia = newIndex;
        console.log('Moving to question:', currentTrivia + 1);
        updateTriviaContent();
      } else if (newIndex >= currentChapterData.trivia.length) {
        console.log('Showing results');
        showTriviaResults();
      }
    }

    // Show trivia results
    function showTriviaResults() {
      const container = document.getElementById('triviaContent');
      if (!container) return;

      const correct = triviaAnswers.filter((answer, index) =>
        answer === currentChapterData.trivia[index].correct
      ).length;
      const total = currentChapterData.trivia.length;
      const percentage = Math.round((correct / total) * 100);

      let message = '';
      if (percentage >= 80) {
        message = '¡Excelente! Tienes un gran conocimiento del capítulo.';
      } else if (percentage >= 60) {
        message = '¡Bien hecho! Conoces bien el contenido.';
      } else {
        message = 'Sigue estudiando. Cada lectura te ayudará a entender mejor.';
      }

      const html = `
        <div class="trivia-results">
          <h3>🎉 Resultados del Quiz</h3>
          <div class="score-display">
            <div class="score-number">${correct}/${total}</div>
            <div class="score-percentage">${percentage}%</div>
          </div>
          <p>${message}</p>
          <button class="trivia-nav" onclick="window.restartTrivia()">Intentar de Nuevo</button>
        </div>
      `;

      container.innerHTML = html;
    }

    // Restart trivia
    function restartTrivia() {
      currentTrivia = 0;
      triviaAnswers = [];
      updateTriviaContent();
    }

    // Make functions globally accessible
    window.restartTrivia = restartTrivia;
    window.openChapterModal = openChapterModal;

    // Test function for modal
    window.testModal = function() {
      console.log('Test modal function called');
      const modal = document.querySelector('.chapter-modal');
      console.log('Modal element:', modal);

      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now');

        // Add test content
        const resumenContent = document.getElementById('resumenContent');
        if (resumenContent) {
          resumenContent.innerHTML = `
            <div style="padding: 20px;">
              <h3>🧪 Test Modal</h3>
              <p>Si puedes ver esto, el modal está funcionando correctamente.</p>
              <button onclick="closeChapterModal()" style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                Cerrar Modal
              </button>
              <br><br>
              <button onclick="testWithRealData()" style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer;">
                Probar con Datos Reales
              </button>
            </div>
          `;
        }
      } else {
        console.error('Modal not found!');
        alert('Modal element not found in DOM');
      }
    };

    // Test with real data
    window.testWithRealData = function() {
      console.log('Testing with real data...');

      // Use embedded test data with proper encoding
      currentChapterData = {
        "book": "Génesis",
        "chapter": 1,
        "title": "La Creación",
        "subtitle": "En el principio creó Dios los cielos y la tierra",
        "summary": "Dios crea los cielos y la tierra en seis días y descansa en el séptimo. Cada día marca un orden perfecto que va desde la luz hasta la humanidad, culminando con el ser humano creado a imagen de Dios.",
        "timeline": {
          "period": "El principio de todo",
          "context": "Inicio de la historia de la humanidad y del universo",
          "placement": "Antes del tiempo humano"
        },
        "days": [
          {
            "day": 1,
            "title": "Luz y Tinieblas",
            "icon": "💡",
            "description": "Dios separa la luz de las tinieblas",
            "verse": "Y dijo Dios: Sea la luz; y fue la luz",
            "reference": "Génesis 1:3",
            "significance": "Primera manifestación del poder creador"
          },
          {
            "day": 2,
            "title": "Firmamento",
            "icon": "☁️",
            "description": "Separación de las aguas de arriba y abajo",
            "verse": "E hizo Dios la expansión",
            "reference": "Génesis 1:7",
            "significance": "Establecimiento del espacio celestial"
          },
          {
            "day": 3,
            "title": "Tierra y Vegetación",
            "icon": "🌱",
            "description": "Aparece la tierra seca, mares y plantas",
            "verse": "Produzca la tierra hierba verde",
            "reference": "Génesis 1:11",
            "significance": "Fundación de la vida vegetal"
          }
        ],
        "interestingFacts": [
          {
            "id": "word-power",
            "title": "El Poder de la Palabra",
            "summary": '"Y dijo Dios..." aparece 10 veces',
            "explanation": "Cada acto creativo comienza con la palabra divina, mostrando que Dios habla y las cosas cobran existencia.",
            "verse": "Por la palabra de Jehová fueron hechos los cielos",
            "reference": "Salmos 33:6"
          }
        ],
        "reflectionQuestions": [
          {
            "id": "origin-difference",
            "question": "¿Qué diferencia hay entre la creación divina y las teorías humanas sobre el origen del universo?",
            "category": "teológica",
            "hints": ["Propósito vs casualidad", "Diseño inteligente"]
          }
        ],
        "trivia": [
          {
            "question": "¿En qué día creó Dios el sol, la luna y las estrellas?",
            "options": ["Día 3", "Día 4", "Día 5"],
            "correct": 1,
            "explanation": "El día 4 Dios creó las lumbreras para separar el día de la noche."
          },
          {
            "question": "¿Cuántas veces aparece la frase 'Y dijo Dios' en Génesis 1?",
            "options": ["8 veces", "10 veces", "12 veces"],
            "correct": 1,
            "explanation": "La frase aparece 10 veces, mostrando el poder creador de la palabra divina."
          },
          {
            "question": "¿Qué significa la palabra hebrea 'bara' usada en Génesis 1:1?",
            "options": ["Formar", "Crear de la nada", "Organizar"],
            "correct": 1,
            "explanation": "'Bara' indica creación ex nihilo, solo Dios puede crear sin materiales preexistentes."
          },
          {
            "question": "¿Qué día descansó Dios según Génesis 2:2?",
            "options": ["Día 6", "Día 7", "Día 8"],
            "correct": 1,
            "explanation": "Dios descansó el séptimo día, estableciendo el patrón del sabbat."
          }
        ],
        "comparison": {
          "title": "Del Caos al Orden",
          "before": {
            "title": "Estado Inicial",
            "description": "Tierra desordenada y vacía, tinieblas sobre el abismo",
            "elements": ["Sin forma", "Vacía", "Tinieblas"],
            "verse": "Y la tierra estaba desordenada y vacía",
            "reference": "Génesis 1:2"
          },
          "after": {
            "title": "Creación Completa",
            "description": "Universo ordenado con vida abundante",
            "elements": ["Cielos y tierra", "Vida vegetal", "Humanidad"],
            "verse": "Y vio Dios todo lo que había hecho, y he aquí que era bueno en gran manera",
            "reference": "Génesis 1:31"
          }
        },
        "memorizeVerse": {
          "text": "Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.",
          "reference": "Génesis 1:27",
          "theme": "Dignidad humana"
        },
        "mainTeaching": "Dios es el creador de todo lo que existe, y lo hizo con orden y propósito.",
        "practicalApplication": [
          "Recordar que tu vida tiene un propósito divino",
          "Honrar a Dios como Creador cuidando la creación"
        ]
      };

      currentTab = 'resumen';
      currentDay = 1;

      console.log('Test data loaded:', currentChapterData);

      updateModalHeader();
      updateModalContent();

      console.log('Modal content should be updated now');
    };

    // Make closeChapterModal globally accessible
    window.closeChapterModal = closeChapterModal;

    // Update comparacion content
    function updateComparacionContent() {
      const container = document.getElementById('comparacionContent');
      if (!container || !currentChapterData.comparison) return;

      const comparison = currentChapterData.comparison;

      const html = `
        <div class="comparison-container">
          <h3>${comparison.title}</h3>
          <div class="comparison-slider">
            <div class="comparison-side comparison-before">
              <div class="comparison-title">${comparison.before.title}</div>
              <div class="comparison-description">${comparison.before.description}</div>
              <ul class="comparison-elements">
                ${comparison.before.elements.map(el => `<li>${el}</li>`).join('')}
              </ul>
              <div class="comparison-verse">
                "${comparison.before.verse}"
                <div class="comparison-verse-ref">${comparison.before.reference}</div>
              </div>
            </div>
            <div class="comparison-side comparison-after">
              <div class="comparison-title">${comparison.after.title}</div>
              <div class="comparison-description">${comparison.after.description}</div>
              <ul class="comparison-elements">
                ${comparison.after.elements.map(el => `<li>${el}</li>`).join('')}
              </ul>
              <div class="comparison-verse">
                "${comparison.after.verse}"
                <div class="comparison-verse-ref">${comparison.after.reference}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      container.innerHTML = html;

      // Add interactive divider functionality
      initComparisonSlider();
    }

    // Initialize comparison slider interaction
    function initComparisonSlider() {
      const divider = document.querySelector('.comparison-divider');
      const slider = document.querySelector('.comparison-slider');
      const beforeSide = document.querySelector('.comparison-before');
      const afterSide = document.querySelector('.comparison-after');

      if (!divider || !slider || !beforeSide || !afterSide) return;

      let isDragging = false;

      divider.addEventListener('mousedown', startDragging);
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDragging);

      function startDragging(e) {
        isDragging = true;
        e.preventDefault();
      }

      function drag(e) {
        if (!isDragging) return;

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = (x / rect.width) * 100;

        if (percentage >= 10 && percentage <= 90) {
          beforeSide.style.width = `${percentage}%`;
          afterSide.style.width = `${100 - percentage}%`;
          divider.style.left = `${percentage}%`;
        }
      }

      function stopDragging() {
        isDragging = false;
      }

      // Touch events for mobile
      divider.addEventListener('touchstart', (e) => {
        startDragging(e.touches[0]);
      });

      document.addEventListener('touchmove', (e) => {
        if (isDragging) {
          e.preventDefault();
          drag(e.touches[0]);
        }
      });

      document.addEventListener('touchend', stopDragging);
    }
