import type { Question } from '../data/faq';

interface Props {
  question: Question;
  expanded: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, expanded, onToggle }: Props) {
  const triggerId = `trigger-${question.id}`;
  const panelId = `answer-${question.id}`;

  return (
    <article className={`accordion-item${expanded ? ' is-open' : ''}`}>
      <h3>
        <button id={triggerId} className="question" aria-expanded={expanded} aria-controls={panelId} onClick={onToggle}>
          <span>{question.title}</span>
          <span className="toggle-icon" aria-hidden="true" />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded} className="answer">
        <p>{question.answer}</p>
        {question.draft && <small className="draft-note">Демонстрационный ответ · требует согласования</small>}
      </div>
    </article>
  );
}
