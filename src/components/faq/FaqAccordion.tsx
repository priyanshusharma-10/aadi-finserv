import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '../../types/loan';
import styles from './FaqAccordion.module.css';

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.accordion} role="list">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headingId = `faq-heading-${item.id}`;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id} className={`${styles.item} ${isOpen ? styles.open : ''}`} role="listitem">
            <h3 className={styles.heading}>
              <button
                id={headingId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                type="button"
              >
                <span className={styles.question}>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={styles.chevron}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
