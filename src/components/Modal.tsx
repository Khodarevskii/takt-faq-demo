import { useEffect, useRef } from 'react';

export interface Notice { title: string; text: string }

export function Modal({ notice, onClose }: { notice: Notice | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !notice) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [notice]);

  return (
    <dialog ref={ref} className="modal" aria-labelledby="notice-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      {notice && <div className="modal-content">
        <p className="eyebrow">Такт · демоверсия</p>
        <h2 id="notice-title">{notice.title}</h2>
        <p>{notice.text}</p>
        <button className="primary-button" onClick={onClose} autoFocus>Понятно</button>
      </div>}
    </dialog>
  );
}
