import { useEffect, useState } from 'react';
import { AccordionItem } from './components/AccordionItem';
import { Footer, Header, HelpLink } from './components/SiteChrome';
import { Modal, type Notice } from './components/Modal';
import { matchesQuestion, topics } from './data/faq';

export default function App() {
  const [query, setQuery] = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(['therapy']));
  const [activeTopic, setActiveTopic] = useState('about');
  const [notice, setNotice] = useState<Notice | null>(null);
  const searching = query.trim().length > 0;
  const visibleTopics = topics.map(topic => ({ ...topic, questions: topic.questions.filter(question => matchesQuestion(question, query)) })).filter(topic => topic.questions.length > 0);
  const resultCount = visibleTopics.reduce((count, topic) => count + topic.questions.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveTopic(visible[0].target.id);
    }, { rootMargin: '-10% 0px -65% 0px' });
    document.querySelectorAll('.faq-topic').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [query]);

  const toggleQuestion = (id: string) => setOpenIds(previous => {
    const next = new Set(previous);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });

  return <>
    <a className="skip-link" href="#questions">Перейти к вопросам</a>
    <div className="hero" id="top">
      <Header showNotice={setNotice} />
      <div className="hero-body"><div className="container hero-content">
        <p className="eyebrow"><span aria-hidden="true" />05 — Вопросы</p>
        <h1>Ответы на <em>частые вопросы</em></h1>
        <div className="search-field">
          <label htmlFor="faq-search">Найти ответ</label>
          <div className="search-input"><input id="faq-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Например: удалить историю" autoComplete="off" aria-controls="questions" />
            {query && <button aria-label="Очистить поиск" onClick={() => { setQuery(''); document.getElementById('faq-search')?.focus(); }}>×</button>}
          </div>
        </div>
      </div></div>
    </div>
    <main id="questions" className="container faq-layout" tabIndex={-1}>
      <aside><nav className="topic-nav" aria-label="Темы вопросов">
        {topics.map((topic, index) => <a key={topic.id} href={`#${topic.id}`} className={activeTopic === topic.id ? 'active' : ''} aria-current={activeTopic === topic.id ? 'location' : undefined} onClick={() => { setQuery(''); setActiveTopic(topic.id); }}><span>{String(index + 1).padStart(2, '0')}</span>{topic.title}</a>)}
      </nav></aside>
      <div className="faq-content">
        <p className={searching ? 'search-status' : 'sr-only'} role="status">{searching ? `Найдено вопросов: ${resultCount}` : ''}</p>
        {visibleTopics.map(topic => <section className="faq-topic" id={topic.id} key={topic.id} aria-labelledby={`heading-${topic.id}`}>
          <h2 id={`heading-${topic.id}`}>{topic.title}</h2>
          <div className="accordion">{topic.questions.map(question => <AccordionItem key={question.id} question={question} expanded={openIds.has(question.id)} onToggle={() => toggleQuestion(question.id)} />)}</div>
        </section>)}
        {resultCount === 0 && <div className="empty-state"><h2>Пока ничего не нашлось</h2><p>Попробуй другое слово: «телефон», «история» или «оплата».</p><button className="primary-button" onClick={() => setQuery('')}>Показать все вопросы</button></div>}
        <div className="contact-card"><div><h2>Не нашла ответ?</h2><p>Напиши нам: [ПОЧТА ЦЕНТРА]. Если тебе опасно сейчас — звони <a href="tel:112">112</a>.</p></div><HelpLink /></div>
      </div>
    </main>
    <Footer showNotice={setNotice} />
    <Modal notice={notice} onClose={() => setNotice(null)} />
  </>;
}
