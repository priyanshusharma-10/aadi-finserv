import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, CheckCircle, Clock, FileText, CreditCard, Banknote, XCircle } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { Spinner } from '../components/common/Spinner';
import { useApplicationStatus } from '../hooks/useApplicationStatus';
import { formatDate, formatINR } from '../utils/formatting';
import type { ApplicationStatus as StatusType } from '../types/application';
import styles from './ApplicationStatus.module.css';

interface StatusStep {
  id: StatusType;
  label: string;
  description: string;
  icon: typeof CheckCircle;
}

const STATUS_STEPS: StatusStep[] = [
  { id: 'submitted', label: 'Submitted', description: 'Application received', icon: FileText },
  { id: 'verification', label: 'Verification', description: 'Identity & details verified', icon: CheckCircle },
  { id: 'document_verification', label: 'Documents', description: 'Documents under review', icon: FileText },
  { id: 'credit_assessment', label: 'Credit Check', description: 'Credit assessment in progress', icon: CreditCard },
  { id: 'approved', label: 'Approved', description: 'Loan offer generated', icon: CheckCircle },
  { id: 'disbursed', label: 'Disbursed', description: 'Funds transferred', icon: Banknote },
];

const statusOrder: Record<StatusType, number> = {
  submitted: 0,
  verification: 1,
  document_verification: 2,
  credit_assessment: 3,
  approved: 4,
  disbursed: 5,
  rejected: -1,
};

export function ApplicationStatus() {
  const [applicationId, setApplicationId] = useState('');
  const [mobile, setMobile] = useState('');
  const { status, data, error, lookup, reset } = useApplicationStatus();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId.trim() || !mobile.trim()) return;
    lookup(applicationId.trim(), mobile.trim());
  };

  const currentStatusIndex = data ? statusOrder[data.status] : -1;

  return (
    <>
      <Helmet>
        <title>Application Status — Aadi Finserv</title>
        <meta name="description" content="Track the status of your loan application with Aadi Finserv in Indore, MP." />
      </Helmet>

      <main className={styles.page}>
        <div className="container">
          <div className={styles.header}>
            <h1 className={styles.title}>Track Your Application</h1>
            <p className={styles.subtitle}>
              Enter your Application ID and registered mobile number to check real-time status.
            </p>
          </div>

          {/* Lookup form */}
          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <Input
                label="Application ID"
                type="text"
                value={applicationId}
                onChange={(e) => { setApplicationId(e.target.value); reset(); }}
                placeholder="e.g. AF26123456"
                hint="The reference number from your confirmation message"
                required
              />
              <Input
                label="Registered Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => { setMobile(e.target.value); reset(); }}
                placeholder="10-digit mobile number"
                required
                maxLength={10}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === 'loading'}
                leftIcon={<Search size={16} />}
              >
                Track Application
              </Button>
            </form>
          </div>

          {/* Loading */}
          {status === 'loading' && (
            <div className={styles.loadingWrapper}>
              <Spinner size="lg" label="Fetching application status..." />
              <p className={styles.loadingText}>Looking up your application...</p>
            </div>
          )}

          {/* Error */}
          {status === 'error' && error && (
            <div className={styles.resultCard}>
              <ErrorState
                title="Application Not Found"
                message={error}
                onRetry={() => lookup(applicationId, mobile)}
              />
            </div>
          )}

          {/* Success */}
          {status === 'success' && data && (
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <div>
                  <p className={styles.resultEyebrow}>Application</p>
                  <p className={styles.resultId}>{data.applicationId}</p>
                </div>
                <div className={styles.resultMeta}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Applicant</span>
                    <span className={styles.metaValue}>{data.applicantName}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Loan Amount</span>
                    <span className={styles.metaValue}>{formatINR(data.loanAmount)}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Submitted</span>
                    <span className={styles.metaValue}>{formatDate(data.submittedAt)}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Last Updated</span>
                    <span className={styles.metaValue}>{formatDate(data.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {data.status === 'rejected' ? (
                <div className={styles.rejectedBanner}>
                  <XCircle size={24} aria-hidden="true" />
                  <div>
                    <p className={styles.rejectedTitle}>Application Not Approved</p>
                    <p className={styles.rejectedMessage}>
                      Unfortunately your application could not be approved at this time. You may re-apply after 6 months.
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.timeline} aria-label="Application progress timeline">
                  {STATUS_STEPS.map((step, index) => {
                    const isCompleted = currentStatusIndex >= index;
                    const isCurrent = currentStatusIndex === index;
                    const Icon = isCompleted ? CheckCircle : (isCurrent ? Clock : step.icon);

                    return (
                      <div
                        key={step.id}
                        className={`${styles.timelineStep} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''}`}
                        aria-current={isCurrent ? 'step' : undefined}
                      >
                        <div className={styles.timelineLeft}>
                          <div className={styles.timelineIcon}>
                            <Icon size={18} aria-hidden="true" />
                          </div>
                          {index < STATUS_STEPS.length - 1 && (
                            <div className={`${styles.timelineConnector} ${isCompleted ? styles.connectorCompleted : ''}`} aria-hidden="true" />
                          )}
                        </div>
                        <div className={styles.timelineContent}>
                          <p className={styles.timelineLabel}>{step.label}</p>
                          <p className={styles.timelineDesc}>{step.description}</p>
                          {isCurrent && data.nextAction && (
                            <p className={styles.timelineAction}>{data.nextAction}</p>
                          )}
                          {isCurrent && data.estimatedDate && (
                            <p className={styles.timelineEta}>
                              Estimated completion: <strong>{data.estimatedDate}</strong>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
