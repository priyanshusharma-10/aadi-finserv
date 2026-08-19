import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Briefcase,
  Home as HomeIcon,
  Building2,
  Award,
  Percent,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { useModal } from '../hooks/useModal';
import { rateDetails, feeSchedule } from '../constants/rateConfig';
import styles from './InfoPage.module.css';
import rateStyles from './Rates.module.css';

const categoryIcons: Record<string, typeof User> = {
  'personal-loan': User,
  'business-loan': Briefcase,
  'home-loan': HomeIcon,
  'lap': Building2,
  'professional': Award,
  'processing-fee': Percent,
};

const categoryBadges: Record<string, string> = {
  'personal-loan': 'Unsecured · Fast Disbursal',
  'business-loan': 'No Collateral Required',
  'home-loan': 'Up to 30 Years Tenure',
  'lap': 'High Loan-to-Value',
  'professional': 'Doctors & CAs Special',
  'processing-fee': 'One-Time Disclosed Fee',
};

export function Rates() {
  const feeModal = useModal();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Interest Rates & Charges — Aadi Finserv</title>
        <meta
          name="description"
          content="View all transparent loan rates, processing fees and charges from Aadi Finserv in Indore."
        />
      </Helmet>

      <main className={styles.page}>
        <div className="container">
          {/* Section Header */}
          <div className={styles.header}>
            <SectionHeader
              eyebrow="Transparent Pricing"
              title="Rates & Charges"
              description="All fees and interest rates are disclosed upfront on a reducing balance basis. No hidden surprises at disbursement."
            />
          </div>

          {/* Rate Cards Grid */}
          <div className={rateStyles.grid}>
            {rateDetails.map((rate) => {
              const IconComponent = categoryIcons[rate.id] || Zap;
              const badgeText = categoryBadges[rate.id];

              return (
                <div key={rate.id} className={rateStyles.card}>
                  <div className={rateStyles.cardTop}>
                    <div className={rateStyles.iconWrap}>
                      <IconComponent size={22} aria-hidden="true" />
                    </div>
                    {badgeText && <span className={rateStyles.badgeTag}>{badgeText}</span>}
                  </div>

                  <h3 className={rateStyles.cardTitle}>{rate.label}</h3>

                  <div className={rateStyles.rateDisplayWrap}>
                    <p className={rateStyles.cardValue}>{rate.value}</p>
                  </div>

                  <p className={rateStyles.cardNote}>{rate.note}</p>

                  <div className={rateStyles.cardFooter}>
                    <button
                      type="button"
                      className={rateStyles.calcLink}
                      onClick={() => navigate('/#emi-calculator')}
                    >
                      Calculate EMI
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/apply')}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Fee Schedule Banner */}
          <div className={rateStyles.scheduleSection}>
            <div className={rateStyles.scheduleTrigger}>
              <div className={rateStyles.scheduleInfo}>
                <div className={rateStyles.scheduleHeaderGroup}>
                  <ShieldCheck size={26} className={rateStyles.shieldIcon} aria-hidden="true" />
                  <h2 className={rateStyles.scheduleTitle}>Full Fee Schedule & Penalties</h2>
                </div>
                <p className={rateStyles.scheduleDesc}>
                  Includes detailed breakdown of processing fees, bounce charges, prepayment terms, and foreclosure certificates.
                </p>
              </div>
              <Button variant="primary" size="md" onClick={feeModal.open}>
                View Complete Schedule
              </Button>
            </div>
          </div>

          {/* Disclaimer Banner */}
          <div className={rateStyles.disclaimer}>
            <Info size={18} className={rateStyles.disclaimerIcon} aria-hidden="true" />
            <p>
              * Interest rates are indicative and subject to final credit assessment, applicant profile, and lender terms.
              All interest calculations use reducing balance methods. Applicable GST is levied on processing and service fees.
            </p>
          </div>
        </div>
      </main>

      {/* Fee Schedule Modal */}
      <Modal
        isOpen={feeModal.isOpen}
        onClose={feeModal.close}
        title="Full Fee Schedule & Regulatory Terms"
        description="Comprehensive breakdown of all charges applicable to Aadi Finserv loans."
        size="lg"
      >
        <div className={rateStyles.feeTable}>
          {feeSchedule.map((item) => (
            <div key={item.label} className={rateStyles.feeRow}>
              <div className={rateStyles.feeLabelGroup}>
                <CheckCircle size={14} className={rateStyles.feeCheckIcon} aria-hidden="true" />
                <span className={rateStyles.feeLabel}>{item.label}</span>
              </div>
              <span className={rateStyles.feeValue}>{item.value}</span>
            </div>
          ))}
        </div>
        <p className={rateStyles.feeDisclaimer}>
          All charges are subject to applicable GST (18%). Rates and terms may be revised with prior notice.
          Refer to your sanction letter and loan agreement for final execution terms.
        </p>
      </Modal>
    </>
  );
}
