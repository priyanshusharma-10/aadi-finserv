import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  Building2,
  CheckCircle,
  ShieldCheck,
  UploadCloud,
  FileCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { documentCategories } from '../constants/documentConfig';
import styles from './InfoPage.module.css';
import docStyles from './Documents.module.css';

const categoryIcons: Record<string, typeof FileText> = {
  kyc: FileText,
  income_salaried: Briefcase,
  income_self_employed: Building2,
};

const categoryBadges: Record<string, string> = {
  kyc: 'Mandatory for All Applicants',
  income_salaried: 'Salaried Employees',
  income_self_employed: 'Business Owners & Self-Employed',
};

export function Documents() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Required Documents — Aadi Finserv</title>
        <meta
          name="description"
          content="View the checklist of documents required to apply for a loan with Aadi Finserv in Indore, Madhya Pradesh."
        />
      </Helmet>

      <main className={styles.page}>
        <div className="container">
          {/* Section Header */}
          <div className={styles.header}>
            <SectionHeader
              eyebrow="What You'll Need"
              title="Required Documents"
              description="Keep these ready before starting your application. Everything is submitted digitally — no physical copies or branch visits required."
            />
          </div>

          {/* Category Cards Grid */}
          <div className={docStyles.grid}>
            {documentCategories.map((cat) => {
              const IconComponent = categoryIcons[cat.id] || FileText;
              const badgeText = categoryBadges[cat.id];

              return (
                <div key={cat.id} className={docStyles.category}>
                  <div className={docStyles.categoryHeader}>
                    <div className={docStyles.iconWrap}>
                      <IconComponent size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className={docStyles.categoryTitle}>{cat.title}</h2>
                      <span className={docStyles.badgeTag}>{badgeText}</span>
                    </div>
                  </div>

                  <p className={docStyles.categoryDesc}>{cat.description}</p>

                  <ul className={docStyles.list}>
                    {cat.documents.map((doc) => (
                      <li key={doc.id} className={docStyles.item}>
                        <div className={docStyles.itemHeader}>
                          <CheckCircle
                            size={16}
                            className={doc.required ? docStyles.iconRequired : docStyles.iconOptional}
                            aria-hidden="true"
                          />
                          <span className={docStyles.docTitle}>{doc.title}</span>
                          <span
                            className={`${docStyles.reqPill} ${
                              doc.required ? docStyles.reqMandatory : docStyles.reqOptional
                            }`}
                          >
                            {doc.required ? 'Required' : 'Optional'}
                          </span>
                        </div>
                        <p className={docStyles.docDesc}>{doc.description}</p>
                      </li>
                    ))}
                  </ul>

                  <div className={docStyles.categoryFooter}>
                    <span className={docStyles.docCount}>
                      <FileCheck size={14} aria-hidden="true" />
                      {cat.documents.length} Items Listed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Checklist Banner */}
          <div className={docStyles.actionBanner}>
            <div className={docStyles.actionBannerContent}>
              <div className={docStyles.actionIconWrap}>
                <UploadCloud size={28} aria-hidden="true" />
              </div>
              <div>
                <h3 className={docStyles.actionTitle}>Have Your Documents Ready?</h3>
                <p className={docStyles.actionDesc}>
                  Upload them directly in our 5-minute digital application wizard and get instant approval.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/apply')}
            >
              Start Loan Application
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>

          {/* Tips Grid Section */}
          <div className={docStyles.tipsSection}>
            <div className={docStyles.tipsHeaderGroup}>
              <Sparkles size={20} className={docStyles.sparkleIcon} aria-hidden="true" />
              <h3 className={docStyles.tipsTitle}>Tips for Instant Approval & Document Upload</h3>
            </div>

            <div className={docStyles.tipsGrid}>
              {[
                { title: 'Clear Legibility', text: 'Ensure scanned copies or photos are clear and unblurred — blurred text delays verification.' },
                { title: 'Preferred Format', text: 'PDF format is strongly recommended for multi-page bank statements and ITR filings.' },
                { title: 'File Size Limit', text: 'Each document upload must be under 5 MB in size for fast server processing.' },
                { title: 'Accepted Formats', text: 'We support PDF, JPG, JPEG, and PNG formats directly from your phone or computer.' },
                { title: 'Active Validity', text: 'Identity cards (Aadhaar, PAN) and salary slips must be current and un-expired.' },
                { title: '100% Data Protection', text: 'All uploaded files are encrypted with bank-grade SSL security.' },
              ].map((tip, i) => (
                <div key={i} className={docStyles.tipCard}>
                  <ShieldCheck size={18} className={docStyles.tipIcon} aria-hidden="true" />
                  <div>
                    <p className={docStyles.tipCardTitle}>{tip.title}</p>
                    <p className={docStyles.tipCardText}>{tip.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
