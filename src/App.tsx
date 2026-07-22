import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { AUGUST_2026_IDEAS, type Idea } from './data/ideas-august-2026'

const EDITION = 'Agosto 2026'
const RESEARCH_CUTOFF = '22/07/2026'

function App() {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null)
  const [difficultyFilter, setDifficultyFilter] = useState('Todos')
  const [mrrFilter, setMrrFilter] = useState('Todos')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const getMrrValue = (mrrString: string) => {
    const match = mrrString.match(/R\$(\d+)k/)
    return match ? Number.parseInt(match[1], 10) : 0
  }

  const filteredIdeas = useMemo(() => AUGUST_2026_IDEAS.filter((idea) => {
    if (difficultyFilter !== 'Todos' && idea.difficulty !== difficultyFilter) return false
    const mrr = getMrrValue(idea.mrr)
    if (mrrFilter === 'Até R$12k' && mrr > 12) return false
    if (mrrFilter === 'R$13k–R$18k' && (mrr < 13 || mrr > 18)) return false
    if (mrrFilter === 'Acima de R$18k' && mrr <= 18) return false
    return true
  }), [difficultyFilter, mrrFilter])

  useEffect(() => {
    if (!selectedIdea) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIdea(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIdea])

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <div className="logo"><span className="logo-icon">🏆</span>Top 10 SaaS</div>
          <span className="logo-subtext">Edição: {EDITION}</span>
        </div>
        <div className="header-right"><div className="badge badge-green">✦ Curadoria com fontes</div></div>
      </header>

      <main className="hero">
        <div className="hero-badge-wrapper">
          <div className="badge badge-dark">✦ Edição de agosto preparada em {RESEARCH_CUTOFF}</div>
        </div>
        <h1 className="hero-title">As 10 hipóteses para investigar agora</h1>
        <p className="hero-subtitle">
          Curadoria brasileira baseada em sinais públicos, mudanças operacionais e APIs oficiais — com risco, fonte e primeiro teste de validação.
        </p>
        <div className="hero-metrics" aria-label="Critérios da curadoria">
          <div className="metric-item">10 hipóteses priorizadas<span className="metric-separator">·</span></div>
          <div className="metric-item">MRR alvo, não promessa<span className="metric-separator">·</span></div>
          <div className="metric-item">Fonte em cada análise</div>
        </div>
      </main>

      <section className="ideas-section" aria-label="Ideias priorizadas">
        <div className="edition-note">
          <strong>Como ler esta edição:</strong> agosto ainda não começou na data da pesquisa. A lista usa informações disponíveis até {RESEARCH_CUTOFF}; números financeiros são hipóteses para comparação e exigem validação.
        </div>

        <div className="filters-bar">
          <div className="filters-group">
            <span className="filter-label">Dificuldade:</span>
            <div className="filter-pills">
              {['Todos', 'Fácil', 'Médio', 'Difícil'].map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  className={`filter-pill ${difficultyFilter === difficulty ? `active ${difficulty === 'Fácil' ? 'filter-green' : difficulty !== 'Todos' ? 'filter-orange' : ''}` : ''}`}
                  onClick={() => setDifficultyFilter(difficulty)}
                  aria-pressed={difficultyFilter === difficulty}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-group">
            <span className="filter-label">MRR alvo:</span>
            <div className="filter-pills">
              {['Todos', 'Até R$12k', 'R$13k–R$18k', 'Acima de R$18k'].map((range) => (
                <button
                  key={range}
                  type="button"
                  className={`filter-pill ${mrrFilter === range ? 'active' : ''}`}
                  onClick={() => setMrrFilter(range)}
                  aria-pressed={mrrFilter === range}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="filters-count" aria-live="polite">
            {filteredIdeas.length} {filteredIdeas.length === 1 ? 'ideia encontrada' : 'ideias encontradas'}
          </div>
        </div>

        <div className="ideas-grid">
          {filteredIdeas.map((idea, index) => (
            <button
              type="button"
              key={idea.id}
              className="card card-animated"
              onClick={() => setSelectedIdea(idea)}
              style={{ animationDelay: `${index * 0.06}s` }}
              aria-label={`Abrir análise de ${idea.title}`}
            >
              <div className="card-header">
                <div className="badge badge-gray">{idea.id}</div>
                {!['01', '10'].includes(idea.id) && (
                  <div className={`badge ${idea.difficulty === 'Fácil' ? 'badge-green-solid' : 'badge-orange-solid'}`}>{idea.difficulty}</div>
                )}
              </div>
              <h2 className="card-title">{idea.title}</h2>
              <div className="card-category"><div className="badge badge-purple">{idea.category}</div></div>
              <p className="card-description">{idea.description}</p>
              {idea.id === '01' && <div className="special-badge lightning">⚡ Prazo 31/07</div>}
              {idea.id === '10' && <div className="special-badge fire">🔥 Maior complexidade</div>}
              <div className="card-separator" />
              <div className="card-footer">
                <div className="card-mrr"><span>📈</span> Alvo {idea.mrr}</div>
                <div className="card-time"><span>⏱</span> {idea.time}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className={`panel-backdrop ${selectedIdea ? 'open' : ''}`} onClick={() => setSelectedIdea(null)} aria-hidden="true" />

      <aside
        className={`side-panel ${selectedIdea ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="idea-panel-title"
        aria-hidden={!selectedIdea}
      >
        {selectedIdea && (
          <div className="panel-content">
            <button ref={closeButtonRef} type="button" className="panel-close" onClick={() => setSelectedIdea(null)} aria-label="Fechar análise">✕</button>

            <div className="panel-header">
              <h2 className="panel-title" id="idea-panel-title">{selectedIdea.title}</h2>
              <div className="panel-badges">
                <div className="badge badge-purple">{selectedIdea.category}</div>
                <div className={`badge ${selectedIdea.difficulty === 'Fácil' ? 'badge-green-solid' : 'badge-orange-solid'}`}>{selectedIdea.difficulty}</div>
              </div>
              <div className="panel-mrr-highlight"><span>🎯</span><span className="mrr-val">MRR alvo: {selectedIdea.mrr}</span></div>
              <p className="estimate-note">Hipótese de cenário — não é faturamento validado nem garantia.</p>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>🎯</span> Visão geral</h3>
              <div className="section-content">
                <p className="detail-row"><span className="detail-label-orange">Problema:</span><span className="detail-text">{selectedIdea.problem}</span></p>
                <p className="detail-row"><span className="detail-label-purple">Público:</span><span className="detail-text">{selectedIdea.targetAudience}</span></p>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>📡</span> Sinal e timing</h3>
              <div className="section-content">
                <p className="detail-row"><span className="detail-label">Sinal observado:</span><span className="detail-text">{selectedIdea.marketSizeBr}</span></p>
                <p className="detail-row"><span className="detail-label">Alternativas atuais:</span><span className="detail-text">{selectedIdea.competitors}</span></p>
                <p className="detail-row"><span className="detail-label-green">Por que agora:</span><span className="detail-text italic">{selectedIdea.whyNow}</span></p>
                <a className="source-link" href={selectedIdea.evidenceUrl} target="_blank" rel="noreferrer">↗ Ver fonte: {selectedIdea.evidenceLabel}</a>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>📈</span> Modelo financeiro hipotético</h3>
              <div className="metrics-grid">
                <div className="metric-box"><div className="metric-box-label">MRR em 6 meses</div><div className="metric-box-val">{selectedIdea.mrr6m}</div></div>
                <div className="metric-box"><div className="metric-box-label">Ticket sugerido</div><div className="metric-box-val">{selectedIdea.avgTicket}</div></div>
                <div className="metric-box"><div className="metric-box-label">Clientes p/ R$5k</div><div className="metric-box-val">{selectedIdea.clients5k}</div></div>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>⚡</span> Execução prática</h3>
              <div className="execution-content">
                <div className="stack-row"><span className="detail-label">Stack:</span><div className="stack-badges">{selectedIdea.stack.map((item) => <span key={item} className="badge badge-dark stack-badge">{item}</span>)}</div></div>
                <div className="execution-details">
                  <p className="detail-row"><span className="detail-label">Tempo MVP:</span><span className="detail-text">{selectedIdea.time}</span></p>
                  <p className="detail-row"><span className="detail-label">Dificuldade:</span><span className="stars">{Array.from({ length: 5 }).map((_, index) => <span key={index} className={index < selectedIdea.difficultyStars ? 'star-filled' : 'star-empty'}>★</span>)}</span></p>
                </div>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title step-title"><span>🧪</span> Primeiro experimento</h3>
              <div className="first-step-box">{selectedIdea.firstStep}</div>
            </div>

            <div className="panel-section">
              <h3 className="section-title risk-title"><span>⚠</span> Risco principal</h3>
              <div className="risk-box">{selectedIdea.risk}</div>
            </div>
          </div>
        )}
      </aside>

      <footer className="footer">⚡ Top 10 SaaS · Edição {EDITION} · Pesquisa encerrada em {RESEARCH_CUTOFF}</footer>
    </div>
  )
}

export default App
