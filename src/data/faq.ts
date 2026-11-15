export interface Question {
  id: string;
  title: string;
  answer: string;
  /** Only the first answer is visible in the supplied design. */
  draft?: boolean;
}

export interface Topic {
  id: string;
  title: string;
  questions: Question[];
}

// Draft copy is deliberately separated from the layout for editorial review.
// Do not replace missing product, pricing or privacy facts with invented claims.
export const topics: Topic[] = [
  {
    id: 'about', title: 'О сервисе', questions: [
      { id: 'therapy', title: 'Это психотерапия?', answer: 'Нет. Это дневник с ИИ-помощником для самопомощи между событием и реакцией. Для глубокой работы помощник предложит живого специалиста.' },
      { id: 'assistant', title: 'Кто отвечает — человек или ИИ?', answer: 'В дневнике отвечает ИИ-помощник. Общение с живым психологом — отдельный формат работы. ИИ может ошибаться и не заменяет специалиста.', draft: true },
      { id: 'start', title: 'С чего начать, если не знаю, что писать?', answer: 'Можно начать с одной фразы: «Сейчас я чувствую…» или описать событие, которое тебя волнует. Не нужно подбирать правильные слова — начни с того, что есть.', draft: true },
      { id: 'mobile', title: 'Работает ли с телефона?', answer: 'Да, эту страницу можно открыть в браузере телефона, планшета или компьютера. Устанавливать приложение для просмотра не нужно.', draft: true },
    ],
  },
  {
    id: 'privacy', title: 'Безопасность и данные', questions: [
      { id: 'access', title: 'Кто видит мои записи?', answer: 'В этой демонстрации записи не создаются и не отправляются на сервер. Правила доступа к записям реального сервиса необходимо уточнить в утверждённой политике обработки данных.', draft: true },
      { id: 'delete', title: 'Как удалить историю?', answer: 'В демонстрации история не сохраняется. Инструкция по удалению записей и аккаунта появится после подключения личного кабинета.', draft: true },
      { id: 'storage', title: 'Где хранятся данные?', answer: 'Эта демонстрационная страница не собирает записи дневника. Информацию о хранении данных действующего сервиса должен предоставить оператор в политике обработки данных.', draft: true },
    ],
  },
  {
    id: 'sessions', title: 'Психолог и сеансы', questions: [
      { id: 'referral', title: 'Когда помощник предложит психолога?', answer: 'Для более глубокой работы помощник может предложить обратиться к живому специалисту. Ты также можешь самостоятельно выбрать помощь психолога.', draft: true },
      { id: 'sharing', title: 'Что получит психолог?', answer: 'Порядок передачи информации специалисту будет описан перед записью на сеанс. В этой демонстрации данные психологам не передаются.', draft: true },
      { id: 'session', title: 'Как проходит сеанс?', answer: 'Формат, продолжительность и условия встречи нужно уточнить у центра перед записью. В демонстрационной версии запись на сеанс пока не подключена.', draft: true },
    ],
  },
  {
    id: 'payment', title: 'Оплата', questions: [
      { id: 'price', title: 'Сколько это стоит?', answer: 'Тарифы не указаны в макете. Актуальная стоимость будет опубликована после подтверждения центром. Эта демонстрация бесплатна и не принимает платежи.', draft: true },
      { id: 'trial', title: 'Есть ли бесплатное знакомство?', answer: 'Условия знакомства с сервисом необходимо уточнить у центра. В демонстрации можно свободно изучить страницу и попробовать поиск по вопросам.', draft: true },
    ],
  },
];

export function normalizeSearch(value: string): string {
  return value.toLocaleLowerCase('ru').replaceAll('ё', 'е').trim();
}

export function matchesQuestion(question: Question, query: string): boolean {
  const text = normalizeSearch(`${question.title} ${question.answer}`);
  return normalizeSearch(query).split(/\s+/).every(word => text.includes(word));
}
