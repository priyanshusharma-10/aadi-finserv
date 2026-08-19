import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
  /** Optional id for the heading — used for aria-labelledby on sections */
  id?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  dark = false,
  id,
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]} ${dark ? styles.dark : ''} ${className}`}>
      {eyebrow && <p className={`${styles.eyebrow} sectionEyebrow`}>{eyebrow}</p>}
      <h2 id={id} className={`${styles.title} sectionTitle`}>{title}</h2>
      {description && <p className={`${styles.description} sectionDescription`}>{description}</p>}
    </div>
  );
}
