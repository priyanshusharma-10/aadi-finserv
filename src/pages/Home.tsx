import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Clock,
  TrendingDown,
  Phone,
  CheckCircle,
  Users,
  Award,
  Star,
  MessageCircle,
  MapPin,
  ArrowRight,
  User,
  Briefcase,
  TrendingUp,
  Home as HomeIcon,
  Building2,
  Truck,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { EmiCalculator } from '../components/calculator/EmiCalculator';
import { FaqAccordion } from '../components/faq/FaqAccordion';
import { AdvisorModal } from '../components/forms/AdvisorModal';
import { useModal } from '../hooks/useModal';
import { faqData } from '../constants/faqData';
import { processSteps } from '../constants/processSteps';
import { rateDetails } from '../constants/rateConfig';
import { documentCategories } from '../constants/documentConfig';
import { loanConfig } from '../config/loanConfig';
import logoImg from '../assets/images.png';
import styles from './Home.module.css';

const serviceItems = [
  { icon: User, title: 'Personal Loan', desc: 'Up to ₹40 Lakhs', color: 'red' },
  { icon: Briefcase, title: 'Salaried Loan', desc: 'From 10.5% p.a.', color: 'crimson' },
  { icon: TrendingUp, title: 'Business Loan', desc: 'No Collateral Required', color: 'navy' },
  { icon: Users, title: 'Professional Loan', desc: 'Doctors & CAs Special', color: 'rose' },
  { icon: HomeIcon, title: 'Home Loan', desc: 'From 8.5% p.a.', color: 'red' },
  { icon: Building2, title: 'Loan Against Property', desc: 'Up to 75% LTV', color: 'dark' },
  { icon: RefreshCw, title: 'Overdraft / CC Limit', desc: 'Flexible Revolving Credit', color: 'navy' },
  { icon: Truck, title: 'Vehicle & Machinery', desc: 'Fast Asset Financing', color: 'red' },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Home Loan Client, Indore',
    text: 'Aadi Finserv made my home loan process incredibly smooth and stress-free. Their team guided me through every single step, and the disbursal was significantly faster than I expected.',
    rating: 5,
  },
  {
    name: 'Suresh Patel',
    role: 'Business Loan Client, MP',
    text: 'As a small business owner, getting an unsecured business loan was crucial for my inventory expansion. Aadi Finserv provided excellent solutions with minimal hassle and great rates.',
    rating: 5,
  },
  {
    name: 'Anita Mehta',
    role: 'Property Loan Client, Indore',
    text: 'The team at Aadi Finserv is highly knowledgeable and approachable. They helped me get the best possible interest rate for my loan against property. True professionals.',
    rating: 5,
  },
];

const serviceAreas = [
  'Vijay Nagar', 'Scheme 54', 'Palasia', 'Rajwada',
  'Bhawarkua', 'Saket', 'Nipania', 'Rau', 'Khajrana', 'MR-10',
];

export function Home() {
  const navigate = useNavigate();
  const advisorModal = useModal();

  return (
    <>
      <Helmet>
        <title>Aadi Finserv — Best Finance & Loan Services in Indore, MP</title>
        <meta
          name="description"
          content="Aadi Finserv is India's trusted B2B & B2C finance aggregation platform in Indore. Personal loans, business loans, home loans, LAP and more. Over ₹250 Cr+ monthly disbursal since 2007."
        />
        <meta property="og:title" content="Aadi Finserv — Trusted Financial Partner Since 2007" />
        <meta
          property="og:description"
          content="₹250 Cr+ monthly disbursal. 1000+ happy clients. Personal, Business, Home Loans & more in Indore, Madhya Pradesh."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.aadifinserve.in/" />
      </Helmet>

      <main>
        {/* ── Hero ── */}
        <section className={styles.hero} aria-labelledby="hero-heading" id="home">
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.heroBgShape1} />
            <div className={styles.heroBgShape2} />
            <div className={styles.heroBgDots} />
          </div>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <ShieldCheck size={15} aria-hidden="true" />
                <span>Trusted Financial Partner Since 2007</span>
              </div>

              <h1 id="hero-heading" className={styles.heroTitle}>
                Best B2C Finance &{' '}
                <span className={styles.heroTitleAccent}>Loan Services</span>
                {' '}in Indore, MP
              </h1>

              <p className={styles.heroDescription}>
                Empowering your financial dreams with tailored loan solutions. India's most preferred financial aggregation platform — disbursing over{' '}
                <strong>₹250 Crores monthly</strong> with{' '}
                <strong>100% customer satisfaction</strong> across Indore and Madhya Pradesh.
              </p>

              <div className={styles.heroCtas}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/apply')}
                  aria-label="Apply for a loan"
                >
                  Get Free Consultation
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={advisorModal.open}
                  leftIcon={<Phone size={16} />}
                >
                  Talk to an Advisor
                </Button>
              </div>

              <div className={styles.trustBadges}>
                {[
                  { icon: ShieldCheck, text: '100% Transparent' },
                  { icon: Clock, text: '24-hr Disbursal' },
                  { icon: TrendingDown, text: 'From 8.5% p.a.' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className={styles.trustBadge}>
                    <Icon size={15} aria-hidden="true" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: EMI Calculator Card */}
            <div className={styles.heroRight}>
              <div className={styles.heroCalculatorCard} id="emi-calculator">
                <div className={styles.heroCalculatorHeader}>
                  <p className={styles.heroCalculatorEyebrow}>Instant EMI Calculator</p>
                  <p className={styles.heroCalculatorSub}>Calculate your monthly repayment</p>
                </div>
                <EmiCalculator compact />
              </div>

              <div className={styles.heroWhatsapp}>
                <a
                  href="https://wa.me/916263069808?text=Hello%20Aadi%20Finserv,%20I%20am%20interested%20in%20your%20loan%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.whatsappBtn}
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Chat on WhatsApp Directly
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className={styles.statsStrip} aria-label="Key statistics">
          <div className="container">
            <div className={styles.statsGrid}>
              {[
                { value: '₹250 Cr+', label: 'Monthly Disbursal' },
                { value: '1000+', label: 'Happy Clients' },
                { value: '17+', label: 'Years of Excellence' },
                { value: '100%', label: 'Customer Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Section ── */}
        <section className={`section ${styles.about}`} id="about" aria-labelledby="about-heading">
          <div className="container">
            <div className={styles.aboutInner}>
              <div className={styles.aboutContent}>
                <SectionHeader
                  eyebrow="About Aadi Finserv"
                  title="Building Financial Futures in Indore"
                  description="Aadi Finserv Pvt Ltd is a premier B2B & B2C Finance aggregation platform with comprehensive sourcing and fulfillment capabilities."
                  align="left"
                  id="about-heading"
                />
                <p className={styles.aboutText}>
                  Our remarkable journey began as <strong>Shri Nakoda Agency</strong> in 2007, serving the local community with integrity. In 2019, we evolved into <strong>KUSID Consultants Pvt Ltd</strong>, and in 2022 we strategically rebranded as <strong>Aadi Finserv Pvt Ltd</strong> to better reflect our expanded vision, broader service portfolio, and nationwide reach — while maintaining our strong, trusted roots in Indore.
                </p>
                <div className={styles.aboutFeatures}>
                  {[
                    { icon: ShieldCheck, title: 'Trusted & Secure', desc: '100% transparent processing with no hidden charges.' },
                    { icon: Clock, title: 'Quick Disbursal', desc: 'Fast-track approval for urgent financial needs.' },
                    { icon: Users, title: 'Expert Advisory', desc: 'Dedicated financial advisors for personalized service.' },
                    { icon: MapPin, title: 'Pan India Reach', desc: 'Serving clients across India from our Indore hub.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className={styles.aboutFeature}>
                      <div className={styles.aboutFeatureIcon}>
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className={styles.aboutFeatureTitle}>{title}</p>
                        <p className={styles.aboutFeatureDesc}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.aboutVisual}>
                <div className={styles.aboutCardStack}>
                  <div className={styles.aboutMainCard}>
                    <div className={styles.aboutCardHeader}>
                      <img src={logoImg} alt="Aadi Finserv Logo" className={styles.aboutCardLogoImg} />
                      <div>
                        <p className={styles.aboutCardTitle}>Aadi Finserv</p>
                        <p className={styles.aboutCardSub}>Established 2007</p>
                      </div>
                    </div>
                    <div className={styles.aboutStats}>
                      {[
                        ['₹250 Cr+', 'Monthly'],
                        ['1000+', 'Clients'],
                        ['17+', 'Years'],
                      ].map(([v, l]) => (
                        <div key={l} className={styles.aboutStat}>
                          <span className={styles.aboutStatValue}>{v}</span>
                          <span className={styles.aboutStatLabel}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={styles.aboutFloatBadge1}>
                    <CheckCircle size={14} />
                    RBI Compliant NBFC Partners
                  </div>
                  <div className={styles.aboutFloatBadge2}>
                    <Star size={12} fill="currentColor" />
                    4.9 / 5 Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Section ── */}
        <section className={`section ${styles.services}`} id="services" aria-labelledby="services-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Comprehensive Loan Services"
              title="Financial Products Tailored to You"
              description="A wide spectrum of financial products designed to meet your personal and business funding requirements with competitive interest rates and flexible tenures."
              id="services-heading"
            />
            <div className={styles.servicesGrid}>
              {serviceItems.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className={`${styles.serviceCard} ${styles[`service_${color}`]}`}>
                  <div className={styles.serviceIconWrap}>
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceTitle}>{title}</h3>
                    <p className={styles.serviceDesc}>{desc}</p>
                  </div>
                  <ChevronRight size={16} className={styles.serviceArrow} aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className={styles.servicesMore}>
              <p className={styles.servicesMoreText}>Also: Loan Against Land, Warehouse Loans, Channel Finance, Dropline Overdraft</p>
              <Button variant="outline" size="sm" onClick={() => navigate('/apply')}>
                Enquire About Any Loan
              </Button>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className={`section ${styles.howItWorks}`} id="how-it-works" aria-labelledby="how-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Simple 4-Step Process"
              title="From Application to Disbursal"
              description="Getting a loan from the best finance platform in Indore is straightforward, transparent, and designed for your convenience."
              id="how-heading"
              dark
            />
            <div className={styles.processGrid}>
              {processSteps.map((step, index) => (
                <div key={step.id} className={styles.processStep}>
                  <div className={styles.processNumberWrap}>
                    <div className={styles.processNumber}>{step.number}</div>
                    {index < processSteps.length - 1 && (
                      <div className={styles.processConnector} aria-hidden="true" />
                    )}
                  </div>
                  <div className={styles.processContent}>
                    <h3 className={styles.processTitle}>{step.title}</h3>
                    <p className={styles.processDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Eligibility ── */}
        <section className={`section ${styles.eligibility}`} aria-labelledby="eligibility-heading">
          <div className="container">
            <div className={styles.eligibilityInner}>
              <div className={styles.eligibilityContent}>
                <SectionHeader
                  eyebrow="Who Can Apply"
                  title="Are You Eligible?"
                  description="Quick, simple criteria. Most employed individuals and professionals across Madhya Pradesh qualify."
                  align="left"
                  id="eligibility-heading"
                />
                <div className={styles.eligibilityCriteria}>
                  {[
                    { icon: Users, label: 'Age Limit', value: `${loanConfig.minAge} – ${loanConfig.maxAge} years` },
                    { icon: TrendingDown, label: 'Monthly Income', value: `₹${loanConfig.minIncome.toLocaleString('en-IN')}+` },
                    { icon: Award, label: 'Credit Score', value: `${loanConfig.minCreditScore}+ CIBIL` },
                    { icon: CheckCircle, label: 'Residency', value: 'Resident Indian' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className={styles.criteriaCard}>
                      <div className={styles.criteriaIcon}>
                        <Icon size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <p className={styles.criteriaLabel}>{label}</p>
                        <p className={styles.criteriaValue}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/apply')}
                >
                  Check My Eligibility
                </Button>
              </div>

              <div className={styles.eligibilityVisual}>
                <div className={styles.eligibilityCard}>
                  <p className={styles.eligibilityCardEyebrow}>Sample Approved Profile</p>
                  {[
                    ['Employment', 'Salaried / Self-Employed'],
                    ['Monthly Income', '₹35,000+'],
                    ['Credit Score', '720+ CIBIL'],
                    ['Loan Sanctioned', '₹8,00,000'],
                    ['Rate Offered', '12.5% p.a.'],
                    ['Tenure Chosen', '36 months'],
                    ['Monthly EMI', '₹26,931'],
                  ].map(([k, v]) => (
                    <div key={k} className={styles.eligibilityCardRow}>
                      <span className={styles.eligibilityCardKey}>{k}</span>
                      <span className={styles.eligibilityCardVal}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Rates ── */}
        <section className={`section ${styles.rates}`} id="rates" aria-labelledby="rates-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Transparent Pricing"
              title="Rates & Charges"
              description="No hidden fees. Everything you'll pay is documented upfront across all loan products."
              id="rates-heading"
            />
            <div className={styles.ratesGrid}>
              {rateDetails.map((rate) => (
                <div key={rate.id} className={styles.rateCard}>
                  <p className={styles.rateCardLabel}>{rate.label}</p>
                  <p className={styles.rateCardValue}>{rate.value}</p>
                  {rate.note && <p className={styles.rateCardNote}>{rate.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Documents Required ── */}
        <section className={`section ${styles.documentsSection}`} id="documents" aria-labelledby="docs-heading">
          <div className="container">
            <SectionHeader
              eyebrow="What You'll Need"
              title="Required Documents"
              description="Keep these handy before starting your application — everything is submitted digitally, no branch visits needed."
              id="docs-heading"
            />
            <div className={styles.docCategoriesGrid}>
              {documentCategories.map((cat) => (
                <div key={cat.id} className={styles.docCategory}>
                  <h3 className={styles.docCategoryTitle}>{cat.title}</h3>
                  <p className={styles.docCategoryDesc}>{cat.description}</p>
                  <ul className={styles.docList}>
                    {cat.documents.map((doc) => (
                      <li key={doc.id} className={styles.docItem}>
                        <CheckCircle
                          size={14}
                          className={doc.required ? styles.docIconRequired : styles.docIconOptional}
                          aria-hidden="true"
                        />
                        <div>
                          <span className={styles.docTitle}>{doc.title}</span>
                          {!doc.required && (
                            <span className={styles.docOptional}> (optional)</span>
                          )}
                          <p className={styles.docDescription}>{doc.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className={`section ${styles.testimonials}`} aria-labelledby="testimonials-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Client Testimonials"
              title="Trusted by Clients Across MP"
              description="Hear from our satisfied clients who have achieved their financial goals with Aadi Finserv in Indore."
              id="testimonials-heading"
            />
            <div className={styles.testimonialsGrid}>
              {testimonials.map((t) => (
                <div key={t.name} className={styles.testimonialCard}>
                  <div className={styles.testimonialStars} aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
                    ))}
                  </div>
                  <p className={styles.testimonialText}>"{t.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar} aria-hidden="true">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className={styles.testimonialName}>{t.name}</p>
                      <p className={styles.testimonialRole}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service Areas ── */}
        <section className={`section ${styles.serviceAreas}`} id="service-areas" aria-labelledby="areas-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Our Service Areas"
              title="Serving All of Indore & Madhya Pradesh"
              description="From our base at 325, Orbit Mall, Vijay Nagar, we proudly serve clients across all major localities in Indore and the wider Madhya Pradesh region."
              id="areas-heading"
            />
            <div className={styles.areasGrid}>
              {serviceAreas.map((area) => (
                <div key={area} className={styles.areaChip}>
                  <MapPin size={13} aria-hidden="true" />
                  {area}
                </div>
              ))}
              <div className={`${styles.areaChip} ${styles.areaChipSpecial}`}>
                <MapPin size={13} aria-hidden="true" />
                Pan India (Digital)
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={`section ${styles.faqSection}`} id="faq" aria-labelledby="faq-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Questions & Answers"
              title="Frequently Asked Questions"
              description="Detailed, transparent answers about our loan products, eligibility, and services in Indore, Madhya Pradesh."
              id="faq-heading"
            />
            <div className={styles.faqContent}>
              <FaqAccordion items={faqData.slice(0, 6)} />
              <div className={styles.faqCta}>
                <Button variant="outline" onClick={() => navigate('/faq')}>
                  View All Questions
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact / Bottom CTA ── */}
        <section className={styles.ctaBanner} id="contact" aria-labelledby="cta-heading">
          <div className="container">
            <div className={styles.ctaInner}>
              <div className={styles.ctaContent}>
                <h2 id="cta-heading" className={styles.ctaTitle}>
                  Ready to Secure Your Financial Future?
                </h2>
                <p className={styles.ctaDescription}>
                  Contact our Indore office today for a free, no-obligation financial consultation. Our expert team is available Mon–Sat, 10 AM – 7 PM.
                </p>
                <div className={styles.ctaButtons}>
                  <Button variant="primary" size="lg" onClick={() => navigate('/apply')}>
                    Apply Now
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={advisorModal.open}
                    leftIcon={<Phone size={16} />}
                  >
                    Speak to an Advisor
                  </Button>
                </div>
              </div>
              <div className={styles.ctaContact}>
                <div className={styles.ctaContactCard}>
                  <div className={styles.ctaContactRow}>
                    <MapPin size={18} aria-hidden="true" />
                    <div>
                      <p className={styles.ctaContactLabel}>Office Address</p>
                      <p className={styles.ctaContactValue}>325, Orbit Mall, Vijay Nagar, Indore, MP 452001</p>
                    </div>
                  </div>
                  <div className={styles.ctaContactRow}>
                    <Phone size={18} aria-hidden="true" />
                    <div>
                      <p className={styles.ctaContactLabel}>Phone Number</p>
                      <a href="tel:+916263069808" className={styles.ctaContactLink}>+91 62630 69808</a>
                    </div>
                  </div>
                  <div className={styles.ctaContactRow}>
                    <Clock size={18} aria-hidden="true" />
                    <div>
                      <p className={styles.ctaContactLabel}>Working Hours</p>
                      <p className={styles.ctaContactValue}>Mon–Sat: 10:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/916263069808?text=Hello%20Aadi%20Finserv,%20I%20would%20like%20to%20inquire%20about%20a%20loan."
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.ctaWhatsapp}
                  >
                    <MessageCircle size={16} aria-hidden="true" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AdvisorModal isOpen={advisorModal.isOpen} onClose={advisorModal.close} />
    </>
  );
}
