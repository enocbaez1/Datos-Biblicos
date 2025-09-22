
const { useState, useEffect, useMemo } = React;

const heroHighlights = [
  { icon: '\uD83D\uDCD8', text: '66 libros, un mensaje de esperanza' },
  { icon: '\u23F3', text: '15 siglos de historia inspirada' },
  { icon: '\uD83C\uDF0D', text: '3 idiomas que unen culturas' }
];

const statsData = [
  { value: 66, label: 'Libros', description: '39 en el Antiguo Testamento y 27 en el Nuevo.' },
  { value: 783137, label: 'Palabras', description: 'Aproximadamente 31 000 vers?culos conectados entre s?.' },
  { value: 40, label: 'Autores', description: 'Diversas voces inspiradas a lo largo de quince siglos.' },
  { value: 1189, label: 'Cap?tulos', description: '929 cap?tulos en el Antiguo Testamento y 260 en el Nuevo.' },
  { value: 31102, label: 'Vers?culos', description: 'Desde G?nesis 1:1 hasta Apocalipsis 22:21.' },
  { value: 3, label: 'Idiomas base', description: 'Hebreo, arameo y griego conforman el texto original.' }
];

const highlightSlides = [
  {
    id: 'canon',
    icon: '\uD83D\uDCD6',
    title: 'Biblioteca inspirada',
    tag: 'Panorama',
    headline: '66 libros, 40 autores, 3 idiomas',
    description: 'La Biblia re?ne poes?a, profec?a, narrativa y cartas en una gran historia de redenci?n.',
    reference: 'Canon b?blico',
    note: 'Armon?a a lo largo de 15 siglos',
    metrics: [
      { label: 'Libros', value: '66' },
      { label: 'Autores', value: '40' },
      { label: 'Siglos', value: '15' }
    ]
  },
  {
    id: 'genesis',
    icon: '\uD83C\uDF0E',
    title: 'Dise?o de la creaci?n',
    tag: 'G?nesis',
    headline: 'Siete d?as que ordenan el caos',
    description: 'Del ?sea la luz? al reposo, G?nesis 1 muestra a un Dios que separa, nombra y bendice con prop?sito.',
    reference: 'G?nesis 1:1-31',
    note: 'Trabajo y descanso equilibrados',
    metrics: [
      { label: 'D?as creativos', value: '6 + 1' },
      { label: 'Veces ?bueno?', value: '7' }
    ]
  },
  {
    id: 'verso',
    icon: '\u2728',
    title: 'Palabra para hoy',
    tag: 'Inspiraci?n',
    headline: '?Porque de tal manera am? Dios al mundo...?',
    description: 'La Biblia late en frases breves que renuevan la esperanza.',
    reference: 'Juan 3:16',
    note: 'Vers?culos listos para animarte',
    metrics: [
      { label: 'Versos disponibles', value: '0' },
      { label: 'Renovaci?n cada', value: '8 s' }
    ]
  }
];

const booksByTestament = {
  antiguo: [
    'G?nesis','?xodo','Lev?tico','N?meros','Deuteronomio','Josu?','Jueces','Rut','1 Samuel','2 Samuel','1 Reyes','2 Reyes','1 Cr?nicas','2 Cr?nicas','Esdras','Nehem?as','Ester','Job','Salmos','Proverbios','Eclesiast?s','Cantares','Isa?as','Jerem?as','Lamentaciones','Ezequiel','Daniel','Oseas','Joel','Am?s','Abd?as','Jon?s','Miqueas','Nah?m','Habacuc','Sofon?as','Hageo','Zacar?as','Malaqu?as'
  ],
  nuevo: [
    'Mateo','Marcos','Lucas','Juan','Hechos','Romanos','1 Corintios','2 Corintios','G?latas','Efesios','Filipenses','Colosenses','1 Tesalonicenses','2 Tesalonicenses','1 Timoteo','2 Timoteo','Tito','Filem?n','Hebreos','Santiago','1 Pedro','2 Pedro','1 Juan','2 Juan','3 Juan','Judas','Apocalipsis'
  ]
};

const genesisChapters = [
  {
    id: 1,
    title: 'La creaci?n del universo',
    subtitle: 'Dios habla y todo cobra forma',
    summary: 'Seis d?as de obra creativa y un d?a apartado para el reposo que marca el ritmo b?blico.'
  },
  {
    id: 2,
    title: 'El jard?n y la vocaci?n humana',
    subtitle: 'El huerto de Ed?n como hogar y responsabilidad',
    summary: 'G?nesis 2 profundiza en el trabajo, la obediencia y la comuni?n de la pareja.'
  },
  {
    id: 3,
    title: 'La ca?da y la promesa',
    subtitle: 'La serpiente enga?a, Dios promete restaurar',
    summary: 'El evangelio aparece anticipado en la simiente de la mujer.'
  },
  {
    id: 4,
    title: 'Ca?n y Abel',
    subtitle: 'Dos ofrendas, dos corazones',
    summary: 'Dios invita a dominar el pecado antes de que golpee.'
  },
  {
    id: 5,
    title: 'De Ad?n a No?',
    subtitle: 'Diez generaciones de esperanza',
    summary: 'Dios mantiene viva la promesa mientras crece la humanidad.'
  }
];

const verseCollection = [
  { text: 'Porque de tal manera am? Dios al mundo, que ha dado a su Hijo unig?nito.', reference: 'Juan 3:16' },
  { text: 'Todo lo puedo en Cristo que me fortalece.', reference: 'Filipenses 4:13' },
  { text: 'El Se?or es mi pastor; nada me faltar?.', reference: 'Salmos 23:1' },
  { text: 'Conf?a en el Se?or con todo tu coraz?n.', reference: 'Proverbios 3:5' }
];

const resourceLinks = [
  {
    title: 'Biblia en l?nea',
    description: 'Consulta diferentes traducciones y planes de lectura.',
    url: 'https://www.biblegateway.com/'
  },
  {
    title: 'Bible Project (ES)',
    description: 'Videos animados que explican contextos y temas teol?gicos.',
    url: 'https://bibleproject.com/es/'
  },
  {
    title: 'Blue Letter Bible',
    description: 'Herramientas para profundizar en los idiomas originales.',
    url: 'https://www.blueletterbible.org/'
  }
];

const faqItems = [
  {
    question: '?C?mo se divide la Biblia?',
    answer: 'En Antiguo Testamento (39 libros) y Nuevo Testamento (27 libros), agrupados por g?neros literarios.'
  },
  {
    question: '?Por qu? existen tantas traducciones?',
    answer: 'Cada traducci?n busca ser fiel a los manuscritos originales y acercar el mensaje al lenguaje actual.'
  },
  {
    question: '?Qu? es un vers?culo para memorizar?',
    answer: 'Un pasaje breve y significativo que se aprende de memoria para recordarlo en la vida diaria.'
  }
];

highlightSlides[2].metrics[0].value = verseCollection.length.toString();

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return undefined;
    }
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event) => setPrefers(event.matches);
    mediaQuery.addEventListener?.('change', handler);
    mediaQuery.addListener?.(handler);
    return () => {
      mediaQuery.removeEventListener?.('change', handler);
      mediaQuery.removeListener?.(handler);
    };
  }, []);

  return prefers;
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-pressed={theme === 'dark'}>
      <span aria-hidden="true">{theme === 'dark' ? '??' : '??'}</span>
      <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  );
}

function Topbar({ theme, onToggle }) {
  return (
    <header>
      <div className="brand" aria-label="Datos B?blicos Interactivos">
        <span aria-hidden="true">??</span>
        <span>Datos B?blicos</span>
      </div>
      <nav className="nav-links" aria-label="Secciones principales">
        <a href="#inicio">Inicio</a>
        <a href="#animaciones">Animaciones</a>
        <a href="#estadisticas">Estad?sticas</a>
        <a href="#explorar">Explorar</a>
        <a href="#recursos">Recursos</a>
        <a href="#verso">Vers?culo</a>
        <a href="#faq">FAQ</a>
      </nav>
      <ThemeToggle theme={theme} onToggle={onToggle} />
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <h1>Datos B?blicos Interactivos</h1>
      <p>Explora cifras, relatos destacados y genealog?as que conectan cada libro de la Biblia con su mensaje.</p>
      <ul className="hero-highlights">
        {heroHighlights.map((item) => (
          <li key={item.text} className="hero-token">
            <span aria-hidden="true">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StatsSection({ prefersReducedMotion }) {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    if (prefersReducedMotion) {
      setCounts(statsData.map((item) => item.value));
      return;
    }
    const start = performance.now();
    const duration = 1200;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(statsData.map((item) => Math.round(item.value * progress)));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  }, [prefersReducedMotion]);

  return (
    <section id="estadisticas">
      <h2 className="section-title">Cifras clave</h2>
      <p className="section-note">La Biblia en n?meros esenciales.</p>
      <div className="stats-grid">
        {statsData.map((item, index) => (
          <article className="stat-card" key={item.label}>
            <strong>{counts[index].toLocaleString('es-ES')}</strong>
            <span>{item.label}</span>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HighlightsSection({ prefersReducedMotion }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % highlightSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  const current = highlightSlides[active];

  return (
    <section id="animaciones">
      <h2 className="section-title">Animaciones destacadas</h2>
      <p className="section-note">Peque?os focos tem?ticos que resumen grandes temas b?blicos.</p>
      <div className="surface highlights">
        <div className="highlight-tabs" role="tablist" aria-label="Momentos destacados">
          {highlightSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={index === active ? 'active' : ''}
              aria-selected={index === active}
              onClick={() => setActive(index)}
            >
              <span>{slide.icon} {slide.title}</span>
              <small>{slide.note}</small>
            </button>
          ))}
        </div>
        <article className="highlight-card" role="tabpanel" aria-live="polite">
          <h3>{current.headline}</h3>
          <p>{current.description}</p>
          <p><strong>Referencia:</strong> {current.reference}</p>
          <ul>
            {current.metrics.map((metric) => (
              <li key={metric.label}>
                <span>{metric.label}</span>
                <span>{metric.value}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function BooksExplorer() {
  const [tab, setTab] = useState('antiguo');
  const [filter, setFilter] = useState('');
  const [chapter, setChapter] = useState(genesisChapters[0].id);

  const books = booksByTestament[tab];
  const filteredBooks = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return books;
    return books.filter((book) => book.toLowerCase().includes(term));
  }, [books, filter]);

  const chapterInfo = genesisChapters.find((entry) => entry.id === chapter) ?? genesisChapters[0];

  return (
    <section id="explorar">
      <h2 className="section-title">Explorar la Biblia</h2>
      <p className="section-note">Busca libros, alterna entre testamentos y repasa G?nesis 1-5.</p>
      <div className="surface">
        <div className="books-controls">
          <button
            type="button"
            className={tab === 'antiguo' ? 'active' : ''}
            onClick={() => setTab('antiguo')}
          >
            Antiguo Testamento
          </button>
          <button
            type="button"
            className={tab === 'nuevo' ? 'active' : ''}
            onClick={() => setTab('nuevo')}
          >
            Nuevo Testamento
          </button>
        </div>
        <div className="search-box" role="search">
          <input
            type="search"
            placeholder="Buscar libro..."
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Buscar libro por nombre"
          />
          <button type="button" onClick={() => setFilter('')}>Limpiar</button>
        </div>
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book} className="book" tabIndex="0">{book}</div>
          ))}
          {filteredBooks.length === 0 && <div className="book">Sin coincidencias</div>}
        </div>
      </div>
      <div className="surface chapter-panel">
        <div className="books-controls" role="tablist" aria-label="Cap?tulos de G?nesis">
          {genesisChapters.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={chapter === entry.id ? 'active' : ''}
              aria-selected={chapter === entry.id}
              onClick={() => setChapter(entry.id)}
            >
              Cap?tulo {entry.id}
            </button>
          ))}
        </div>
        <div>
          <h3>{chapterInfo.title}</h3>
          <strong>{chapterInfo.subtitle}</strong>
          <p>{chapterInfo.summary}</p>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section id="recursos">
      <h2 className="section-title">Recursos recomendados</h2>
      <p className="section-note">Herramientas confiables para seguir estudiando.</p>
      <div className="surface resources-grid">
        {resourceLinks.map((resource) => (
          <article className="resource-card" key={resource.title}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Visitar
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function RandomVerseSection() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleNext = () => setIndex((prev) => (prev + 1) % verseCollection.length);

  const handleCopy = () => {
    const verse = verseCollection[index];
    const text = `"${verse.text}" - ${verse.reference}`;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="verso">
      <h2 className="section-title">Vers?culo destacado</h2>
      <p className="section-note">Guarda versos favoritos y comparte el mensaje.</p>
      <div className="surface verse-card" style={{ gap: '16px' }}>
        <p>?{verseCollection[index].text}?</p>
        <span>{verseCollection[index].reference}</span>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" onClick={handleCopy}>{copied ? '?Copiado!' : 'Copiar'}</button>
          <button type="button" onClick={handleNext}>Nuevo vers?culo</button>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [active, setActive] = useState(faqItems[0].question);

  return (
    <section id="faq">
      <h2 className="section-title">Preguntas frecuentes</h2>
      <p className="section-note">Respuestas r?pidas para dudas comunes.</p>
      <div className="faq-list">
        {faqItems.map((item) => {
          const isOpen = active === item.question;
          return (
            <div key={item.question} className="faq-item">
              <button type="button" onClick={() => setActive(isOpen ? '' : item.question)}>
                <span>{item.question}</span>
                <span aria-hidden="true">{isOpen ? '?' : '+'}</span>
              </button>
              {isOpen && <p>{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function GenealogySection() {
  return (
    <section>
      <h2 className="section-title">De Ad?n a No?</h2>
      <p className="section-note">La fidelidad de Dios atraviesa generaciones antes del diluvio.</p>
      <div className="surface timeline">
        {genealogyData.map((person) => (
          <div key={person.name} className={`timeline-item${person.highlight ? ' highlight' : ''}`}>
            <strong>{person.name}</strong>
            <span>{person.age.toLocaleString('es-ES')} a?os</span>
            <p>{person.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      Inspirado en los textos b?blicos. Comparte esperanza cada d?a.
    </footer>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', handler);
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
    >
      Volver arriba
    </button>
  );
}

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="container">
      <Topbar theme={theme} onToggle={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main id="contenido">
        <Hero />
        <HighlightsSection prefersReducedMotion={prefersReducedMotion} />
        <StatsSection prefersReducedMotion={prefersReducedMotion} />
        <BooksExplorer />
        <ResourcesSection />
        <RandomVerseSection />
        <FAQSection />
        <GenealogySection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
