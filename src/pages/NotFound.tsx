import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/common/Button';
import styles from './NotFound.module.css';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Page Not Found — Sugam Finance</title>
      </Helmet>
      <main className={styles.page}>
        <div className={styles.content}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/apply')}>
              Apply for a Loan
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
