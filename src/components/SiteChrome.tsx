import { useEffect, useRef, useState } from 'react';
import type { Notice } from './Modal';

type ShowNotice = (notice: Notice) => void;

export function HelpLink() {
  return <a className="help-link" href="tel:112"><span aria-hidden="true" />Срочная помощь</a>;
}

export function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#top" className={`brand${footer ? ' brand-footer' : ''}`} aria-label="Такт — к началу страницы">
    <img src={`./assets/logo-${footer ? 'footer' : 'header'}.svg`} alt="" />Такт
  </a>;
}

const serviceLinks = ['Как это работает', 'Практики', 'О методе', 'Вопросы'];
const documents = ['Безопасность и данные', 'Политика обработки данных', 'Пользовательское соглашение', 'Согласие на обработку'];

function DemoLink({ title, showNotice }: { title: string; showNotice: ShowNotice }) {
  if (title === 'Вопросы') return <a href="#top" aria-current="page">{title}</a>;
  if (title === 'Безопасность' || title === 'Безопасность и данные') return <a href="#privacy">{title}</a>;
  return <button className="text-link" onClick={() => showNotice({ title, text: 'В этой демонстрации реализована страница «Вопросы». Этот раздел можно подключить после подготовки остальных страниц и утверждения материалов.' })}>{title}</button>;
}

export function Header({ showNotice }: { showNotice: ShowNotice }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    if (menuOpen) window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);
  const login = () => showNotice({ title: 'Личный кабинет', text: 'Это демонстрация страницы вопросов. Авторизация и дневник пока не подключены; вводить личные данные не нужно.' });

  return <header className="header">
    <div className="container header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Основная навигация">
        {['Как это работает', 'Практики', 'Безопасность', 'О методе', 'Вопросы'].map(title => <DemoLink key={title} title={title} showNotice={showNotice} />)}
      </nav>
      <div className="header-actions"><HelpLink /><button className="login" onClick={login}>Войти</button>
        <button ref={menuButton} className="menu-button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <span aria-hidden="true">×</span> : <img src="./assets/menu.svg" alt="" />}
        </button>
      </div>
    </div>
    <nav id="mobile-menu" className="mobile-menu" aria-label="Мобильная навигация" hidden={!menuOpen} onClick={() => setMenuOpen(false)}>
      {['Как это работает', 'Практики', 'Безопасность', 'О методе', 'Вопросы'].map(title => <DemoLink key={title} title={title} showNotice={showNotice} />)}
      <button className="text-link" onClick={login}>Войти</button>
    </nav>
  </header>;
}

export function Footer({ showNotice }: { showNotice: ShowNotice }) {
  return <footer className="footer">
    <img className="footer-orbits" src="./assets/orbits.svg" alt="" loading="lazy" />
    <div className="container">
      <div className="footer-grid">
        <div className="footer-about"><Brand footer /><p>Дневник с ИИ-помощником по методу 7D. Проект Академии жизненных сил, психологического центра Татьяны Николаевны.</p></div>
        <nav aria-label="Сервис"><h2>Сервис</h2>{serviceLinks.map(title => <DemoLink key={title} title={title} showNotice={showNotice} />)}</nav>
        <nav aria-label="Документы"><h2>Документы</h2>{documents.map(title => <DemoLink key={title} title={title} showNotice={showNotice} />)}</nav>
        <div className="footer-contact"><h2>Связь</h2><p>[ПОЧТА ЦЕНТРА]</p><p>[ТЕЛЕФОН ЦЕНТРА]</p><a className="emergency" href="tel:112">Если опасно сейчас — звони <strong>112</strong></a></div>
      </div>
      <div className="footer-bottom"><p>© Академия жизненных сил · 18+ · Это ИИ-помощник, а не психотерапия</p><p className="values">Глубина <span>✦</span> Трансформация <span>✦</span> Система <span>✦</span> Уровень</p></div>
    </div>
  </footer>;
}
