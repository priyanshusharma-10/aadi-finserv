import { Helmet } from 'react-helmet-async';
import { SectionHeader } from '../components/common/SectionHeader';
import { FaqAccordion } from '../components/faq/FaqAccordion';
import { faqData } from '../constants/faqData';
import styles from './InfoPage.module.css';

export function Faq() {
  return (
    <>
      <Helmet>
        <title>FAQ — Aadi Finserv</title>
        <meta name="description" content="Answers to frequently asked questions about Aadi Finserv loan products and services in Indore." />
      </Helmet>
      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <SectionHeader
              eyebrow="Support & Guidance"
              title="Frequently Asked Questions"
              description="Everything you need to know about applying for, managing, and repaying your personal loan with Aadi Finserv."
            />
          </div>
          <div className={styles.content}>
            <FaqAccordion items={faqData} />
          </div>
        </div>
      </main>
    </>
  );
}
