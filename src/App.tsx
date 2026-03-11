import { useState, useEffect } from 'react'
import './App.css'

interface Idea {
  id: string;
  title: string;
  category: string;
  description: string;
  mrr: string;
  time: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  problem: string;
  targetAudience: string;
  marketSizeBr: string;
  competitors: string;
  whyNow: string;
  mrr6m: string;
  avgTicket: string;
  clients5k: string;
  stack: string[];
  difficultyStars: number;
  firstStep: string;
}

const IDEAS: Idea[] = [
  {
    id: "01",
    title: "AgendaIA",
    category: "Saúde & Bem-estar",
    description: "Psicólogos e terapeutas autônomos sem sistema de gestão",
    mrr: "R$14k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "Psicólogos e terapeutas autônomos gerenciam agenda pelo WhatsApp, cobram via PIX manual e não têm histórico financeiro de pacientes.",
    targetAudience: "Psicólogos, terapeutas, nutricionistas autônomos",
    marketSizeBr: "500k+ psicólogos + 300k nutricionistas. Menos de 8% usam qualquer software.",
    competitors: "TuorMed e iClinic — caros e complexos demais para autônomos.",
    whyNow: "Pós-pandemia explodiu a demanda por terapia. O terapeuta autônomo virou nicho enorme e ignorado.",
    mrr6m: "R$6k–R$14k",
    avgTicket: "R$59/mês",
    clients5k: "85",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 2,
    firstStep: "Entre em 3 grupos de psicólogos no Facebook e pergunte: \"Como você organiza sua agenda hoje?\""
  },
  {
    id: "02",
    title: "MediaKitPro",
    category: "Criadores de Conteúdo",
    description: "Criadores perdem parcerias por falta de media kit profissional",
    mrr: "R$18k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "Criadores perdem parcerias com marcas por demorar dias para montar um media kit atualizado. A maioria usa Canva manual com dados desatualizados.",
    targetAudience: "Criadores de TikTok, Instagram e YouTube com 5k–500k seguidores",
    marketSizeBr: "Mais de 10 milhões de criadores ativos. Só os maiores têm assessoria para isso.",
    competitors: "Beacons existe mas é gringo e limitado. Nenhum focado no Brasil com dados automáticos.",
    whyNow: "Marcas médias estão contratando micro influenciadores e esses criadores não têm ferramenta profissional.",
    mrr6m: "R$8k–R$18k",
    avgTicket: "R$37/mês",
    clients5k: "136",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 2,
    firstStep: "Poste nos comentários de criadores médios no TikTok perguntando como eles enviam propostas para marcas."
  },
  {
    id: "03",
    title: "ContratoZap",
    category: "Freelancers",
    description: "Freelancers usam Word, PDF manual e planilha separados",
    mrr: "R$16k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "Freelancers usam Word para proposta, PDF manual para contrato e planilha para recibo. Sem histórico, sem profissionalismo, sem proteção jurídica básica.",
    targetAudience: "Designers, devs, fotógrafos, social media freelancers",
    marketSizeBr: "24 milhões de freelancers no Brasil. Mercado desatendido nessa dor.",
    competitors: "Bonsai existe mas é gringo e caro. Nenhum concorrente direto em português.",
    whyNow: "O movimento freelancer explodiu no Brasil. Toda semana surgem novos profissionais sem estrutura.",
    mrr6m: "R$7k–R$16k",
    avgTicket: "R$47/mês",
    clients5k: "107",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 2,
    firstStep: "Pesquise no Reddit Brasil e grupos de Facebook \"como fazer contrato freelancer\" e leia os comentários."
  },
  {
    id: "04",
    title: "DashCreator",
    category: "Criadores de Conteúdo",
    description: "Sem visão unificada de métricas entre TikTok, Reels e YouTube",
    mrr: "R$20k/mês",
    time: "2 semanas",
    difficulty: "Médio",
    problem: "Criadores em TikTok + Instagram + YouTube precisam entrar em 3 plataformas para ver métricas. Sem visão consolidada de crescimento e monetização.",
    targetAudience: "Criadores com presença em múltiplas plataformas",
    marketSizeBr: "Mais de 2 milhões de criadores sérios que monitoram métricas.",
    competitors: "Metricool existe mas é caro para criadores pequenos. Nenhum com foco no criador brasileiro.",
    whyNow: "TikTok virou obrigatório, criando lacuna de ferramentas que conectem todas as plataformas num painel acessível.",
    mrr6m: "R$9k–R$20k",
    avgTicket: "R$47/mês",
    clients5k: "107",
    stack: ["Lovable", "Supabase", "APIs das plataformas"],
    difficultyStars: 3,
    firstStep: "Pergunte para 5 criadores que você segue como eles acompanham o crescimento deles hoje."
  },
  {
    id: "05",
    title: "PrecificaFácil",
    category: "Pequenos Negócios",
    description: "38 milhões de autônomos cobram por intuição, sem calcular margem",
    mrr: "R$12k/mês",
    time: "3 dias",
    difficulty: "Fácil",
    problem: "Manicures, fotógrafos, designers e personal trainers cobram por intuição. Não sabem calcular custo real, margem ou preço mínimo.",
    targetAudience: "Prestadores de serviço autônomos de qualquer nicho",
    marketSizeBr: "38 milhões de MEIs e autônomos. Maior nicho inexplorado do Brasil digital.",
    competitors: "Nenhum focado especificamente em precificação para autônomos brasileiros.",
    whyNow: "Apenas 5% das pequenas empresas usam SaaS — o mercado está maduro para ferramentas simples e baratas.",
    mrr6m: "R$5k–R$12k",
    avgTicket: "R$27/mês",
    clients5k: "186",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 1,
    firstStep: "Poste uma enquete no Instagram: \"Você sabe exatamente quanto cobra e por quê?\" e observe as respostas."
  },
  {
    id: "06",
    title: "LinkVenda",
    category: "Infoprodutores",
    description: "Hotmart e Kiwify cobram 9–14% de quem ainda está começando",
    mrr: "R$25k/mês",
    time: "2 semanas",
    difficulty: "Médio",
    problem: "Infoprodutores iniciantes pagam 9–14% de taxa no Hotmart/Kiwify. Para quem fatura menos de R$5k/mês, o custo proporcional é inviável.",
    targetAudience: "Infoprodutores iniciantes, criadores vendendo e-books, templates e cursos pequenos",
    marketSizeBr: "Mercado de infoprodutos no Brasil passou de R$20 bilhões. A base da pirâmide é desatendida.",
    competitors: "Hotmart, Kiwify, Eduzz — todos com taxas altas e estruturas complexas para iniciantes.",
    whyNow: "A cultura de vender produtos digitais explodiu. Cada criador quer lançar algo — e precisa de solução mais barata para começar.",
    mrr6m: "R$10k–R$25k",
    avgTicket: "R$37/mês + 3%",
    clients5k: "136",
    stack: ["Lovable", "Supabase", "Stripe"],
    difficultyStars: 3,
    firstStep: "Calcule quanto um infoprodutor que fatura R$3k/mês paga de taxa no Hotmart e mostre essa conta nas redes sociais."
  },
  {
    id: "07",
    title: "CorretoApp",
    category: "Mercado Imobiliário",
    description: "400k corretores autônomos gerenciam leads pelo WhatsApp",
    mrr: "R$20k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "400k corretores autônomos gerenciam leads por WhatsApp, caderneta ou planilha. Sem pipeline, histórico ou follow-up automatizado.",
    targetAudience: "Corretores autônomos e pequenas imobiliárias",
    marketSizeBr: "400k+ corretores registrados. Mercado imobiliário aquecido com grande volume de autônomos sem ferramenta.",
    competitors: "Pipedrive e CRMs genéricos são caros e não têm foco no corretor brasileiro.",
    whyNow: "Mercado imobiliário brasileiro está aquecido em 2026 e corretores autônomos crescem como categoria.",
    mrr6m: "R$8k–R$20k",
    avgTicket: "R$67/mês",
    clients5k: "75",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 2,
    firstStep: "Entre em grupos de corretores no WhatsApp e Telegram e pergunte como controlam seus leads hoje."
  },
  {
    id: "08",
    title: "CardápioSmart",
    category: "Alimentação",
    description: "Restaurantes não sabem quais pratos têm mais visualizações",
    mrr: "R$18k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "Restaurantes usam cardápios estáticos em PDF ou papel. Não sabem quais pratos têm mais visualizações e não conseguem atualizar preços rapidamente.",
    targetAudience: "Restaurantes locais, lanchonetes, marmitarias, hamburguerias artesanais",
    marketSizeBr: "1,3 milhão de bares e restaurantes. Menos de 15% usam cardápio digital com algum dado.",
    competitors: "iFood tem cardápio mas só funciona dentro da plataforma. Soluções independentes são caras ou simples demais.",
    whyNow: "QR code se normalizou no comportamento do consumidor brasileiro pós-pandemia.",
    mrr6m: "R$7k–R$18k",
    avgTicket: "R$49/mês",
    clients5k: "102",
    stack: ["Lovable", "Supabase"],
    difficultyStars: 2,
    firstStep: "Vá a um restaurante local e pergunte ao dono se ele sabe quais pratos são mais pedidos e por quê."
  },
  {
    id: "09",
    title: "ReputaLocal",
    category: "Marketing Local",
    description: "PMEs não monitoram nem respondem avaliações no Google",
    mrr: "R$22k/mês",
    time: "1 semana",
    difficulty: "Fácil",
    problem: "Pequenos negócios recebem avaliações no Google e não respondem. Não monitoram nem pedem avaliações proativamente e perdem clientes para concorrentes com mais estrelas.",
    targetAudience: "Clínicas, salões, lojas, restaurantes e qualquer negócio local com perfil no Google",
    marketSizeBr: "Mais de 6 milhões de PMEs com perfil no Google Meu Negócio no Brasil.",
    competitors: "BrightLocal custa USD 44+/mês — inviável para PME brasileira. Nenhum concorrente em português com esse foco.",
    whyNow: "Google virou principal canal de descoberta de negócios locais no Brasil e reputação deixou de ser opcional.",
    mrr6m: "R$9k–R$22k",
    avgTicket: "R$79/mês",
    clients5k: "64",
    stack: ["Lovable", "Supabase", "Google Business API"],
    difficultyStars: 2,
    firstStep: "Procure seu negócio local favorito no Google e veja se as avaliações negativas têm resposta."
  },
  {
    id: "10",
    title: "AgenteVendas",
    category: "Automação IA",
    description: "PMEs perdem clientes fora do horário por falta de atendimento",
    mrr: "R$30k/mês",
    time: "2 semanas",
    difficulty: "Médio",
    problem: "Pequenos negócios perdem clientes fora do horário comercial por falta de atendimento automatizado. Soluções existentes são complexas e caras.",
    targetAudience: "Pequenas lojas, clínicas, prestadores de serviço que recebem pedidos pelo WhatsApp",
    marketSizeBr: "99% das PMEs brasileiras usam WhatsApp como canal principal de vendas.",
    competitors: "ManyChat e ZapSign — complexos e caros para o pequeno negócio.",
    whyNow: "Agentes IA via WhatsApp têm zero barreira de adoção e maior potencial de viralização do momento.",
    mrr6m: "R$12k–R$30k",
    avgTicket: "R$97/mês",
    clients5k: "52",
    stack: ["Lovable", "Supabase", "Evolution API"],
    difficultyStars: 3,
    firstStep: "Mande mensagem para 3 pequenos negócios fora do horário comercial e veja o que acontece."
  }
];

function App() {
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>('Todos');
  const [mrrFilter, setMrrFilter] = useState<string>('Todos');

  // Parse MRR value for filtering
  const getMrrValue = (mrrString: string) => {
    // "R$14k/mês" -> 14
    const match = mrrString.match(/R\$(\d+)k/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const filteredIdeas = IDEAS.filter(idea => {
    // Difficulty filter
    if (difficultyFilter !== 'Todos' && idea.difficulty !== difficultyFilter) {
      return false;
    }
    
    // MRR filter
    const mrrVal = getMrrValue(idea.mrr);
    if (mrrFilter === 'Até R$15k' && mrrVal > 15) return false;
    if (mrrFilter === 'R$15k–R$25k' && (mrrVal < 15 || mrrVal > 25)) return false;
    if (mrrFilter === 'Acima de R$25k' && mrrVal <= 25) return false;
    
    return true;
  });

  // Focus lock and escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdea(null);
    };
    if (selectedIdea) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIdea]);
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🏆</span>
            Top 10 SaaS
          </div>
          <span className="logo-subtext">Atualizado: Março 2026</span>
        </div>
        
        <div className="header-right">
          <div className="badge badge-green">
            ✦ Curadoria exclusiva
          </div>
        </div>
      </header>

      <main className="hero">
        <div className="hero-badge-wrapper">
          <div className="badge badge-dark">
            ✦ 10 ideias. Já escolhidas. Só executar.
          </div>
        </div>
        
        <h1 className="hero-title">
          As Melhores Apostas de Agora
        </h1>
        
        <p className="hero-subtitle">
          Curadoria das 10 ideias com maior janela de mercado no Brasil — com tudo mapeado para você começar.
        </p>
        
        <div className="hero-metrics">
          <div className="metric-item">
            10 ideias validadas
            <span className="metric-separator">·</span>
          </div>
          <div className="metric-item">
            R$5k–30k MRR potencial
            <span className="metric-separator">·</span>
          </div>
          <div className="metric-item">
            100% vibe code
          </div>
        </div>
      </main>

      <section className="ideas-section">
        <div className="filters-bar">
          <div className="filters-group">
            <span className="filter-label">Dificuldade:</span>
            <div className="filter-pills">
              <button 
                className={`filter-pill ${difficultyFilter === 'Todos' ? 'active' : ''}`}
                onClick={() => setDifficultyFilter('Todos')}
              >Todos</button>
              <button 
                className={`filter-pill ${difficultyFilter === 'Fácil' ? 'active filter-green' : ''}`}
                onClick={() => setDifficultyFilter('Fácil')}
              >Fácil</button>
              <button 
                className={`filter-pill ${difficultyFilter === 'Médio' ? 'active filter-orange' : ''}`}
                onClick={() => setDifficultyFilter('Médio')}
              >Médio</button>
            </div>
          </div>
          
          <div className="filters-group">
            <span className="filter-label">MRR:</span>
            <div className="filter-pills">
              <button 
                className={`filter-pill ${mrrFilter === 'Todos' ? 'active' : ''}`}
                onClick={() => setMrrFilter('Todos')}
              >Todos</button>
              <button 
                className={`filter-pill ${mrrFilter === 'Até R$15k' ? 'active' : ''}`}
                onClick={() => setMrrFilter('Até R$15k')}
              >Até R$15k</button>
              <button 
                className={`filter-pill ${mrrFilter === 'R$15k–R$25k' ? 'active' : ''}`}
                onClick={() => setMrrFilter('R$15k–R$25k')}
              >R$15k–R$25k</button>
              <button 
                className={`filter-pill ${mrrFilter === 'Acima de R$25k' ? 'active' : ''}`}
                onClick={() => setMrrFilter('Acima de R$25k')}
              >Acima de R$25k</button>
            </div>
          </div>
          
          <div className="filters-count">
            {filteredIdeas.length} {filteredIdeas.length === 1 ? 'ideia encontrada' : 'ideias encontradas'}
          </div>
        </div>

        <div className="ideas-grid">
          {filteredIdeas.map((idea, index) => (
            <div 
              key={idea.id} 
              className="card card-animated" 
              onClick={() => setSelectedIdea(idea)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-header">
                <div className="badge badge-gray">{idea.id}</div>
                <div className={`badge ${idea.difficulty === 'Fácil' ? 'badge-green-solid' : 'badge-orange-solid'}`}>
                  {idea.difficulty}
                </div>
              </div>
              
              <h3 className="card-title">
                {idea.title}
              </h3>
              
              <div className="card-category">
                <div className="badge badge-purple">{idea.category}</div>
              </div>
              <p className="card-description">{idea.description}</p>
              
              {/* Special badges positioned relative to card text/category area, or floating */}
              {idea.id === "05" && (
                <div className="special-badge lightning">
                  ⚡ Mais rápido
                </div>
              )}
              {idea.id === "10" && (
                <div className="special-badge fire">
                  🔥 Maior potencial
                </div>
              )}
              
              <div className="card-separator"></div>
              
              <div className="card-footer">
                <div className="card-mrr">
                  <span>📈</span> {idea.mrr}
                </div>
                <div className="card-time">
                  <span>⏱</span> {idea.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Side Panel Overlay */}
      <div 
        className={`panel-backdrop ${selectedIdea ? 'open' : ''}`} 
        onClick={() => setSelectedIdea(null)}
      />

      {/* Side Panel */}
      <div className={`side-panel ${selectedIdea ? 'open' : ''}`}>
        {selectedIdea && (
          <div className="panel-content">
            <button className="panel-close" onClick={() => setSelectedIdea(null)}>✕</button>
            
            <div className="panel-header">
              <h2 className="panel-title">{selectedIdea.title}</h2>
              <div className="panel-badges">
                <div className="badge badge-purple">{selectedIdea.category}</div>
                <div className={`badge ${selectedIdea.difficulty === 'Fácil' ? 'badge-green-solid' : 'badge-orange-solid'}`}>
                  {selectedIdea.difficulty}
                </div>
              </div>
              <div className="panel-mrr-highlight">
                <span>💰</span> <span className="mrr-val">{selectedIdea.mrr} estimado</span>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>🎯</span> Visão Geral</h3>
              <div className="section-content">
                <p className="detail-row">
                  <span className="detail-label-orange">Problema:</span> <span className="detail-text">{selectedIdea.problem}</span>
                </p>
                <p className="detail-row">
                  <span className="detail-label-purple">Público-alvo:</span> <span className="detail-text">{selectedIdea.targetAudience}</span>
                </p>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>📊</span> Análise de Mercado</h3>
              <div className="section-content">
                <p className="detail-row">
                  <span className="detail-label">Tamanho do mercado BR:</span> <span className="detail-text">{selectedIdea.marketSizeBr}</span>
                </p>
                <p className="detail-row">
                  <span className="detail-label">Concorrentes:</span> <span className="detail-text">{selectedIdea.competitors}</span>
                </p>
                <p className="detail-row">
                  <span className="detail-label-green">Por que agora:</span> <span className="detail-text italic">{selectedIdea.whyNow}</span>
                </p>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>📈</span> Potencial Financeiro</h3>
              <div className="metrics-grid">
                <div className="metric-box">
                  <div className="metric-box-label">MRR (6 meses)</div>
                  <div className="metric-box-val">{selectedIdea.mrr6m}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-label">Ticket Médio</div>
                  <div className="metric-box-val">{selectedIdea.avgTicket}</div>
                </div>
                <div className="metric-box">
                  <div className="metric-box-label">P/ R$5k MRR</div>
                  <div className="metric-box-val">{selectedIdea.clients5k}</div>
                </div>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title"><span>⚡</span> Execução Prática</h3>
              <div className="execution-content">
                <div className="stack-row">
                  <span className="detail-label">Stack:</span>
                  <div className="stack-badges">
                    {selectedIdea.stack.map(s => (
                      <span key={s} className="badge badge-dark stack-badge">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="execution-details">
                  <p className="detail-row">
                    <span className="detail-label">Tempo MVP:</span> <span className="detail-text">{selectedIdea.time}</span>
                  </p>
                  <p className="detail-row">
                    <span className="detail-label">Dificuldade:</span> 
                    <span className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < selectedIdea.difficultyStars ? 'star-filled' : 'star-empty'}>★</span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title step-title"><span>🚀</span> Primeiro Passo</h3>
              <div className="first-step-box">
                {selectedIdea.firstStep}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <footer className="footer">
        ⚡ Curadoria por Arquiteto de SaaS · Atualizado trimestralmente
      </footer>
    </div>
  )
}

export default App
