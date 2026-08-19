import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import {
  footerProductLinks,
  footerCompanyLinks,
  footerLegalLinks,
} from '../../constants/navigationConfig';
import logoImg from '../../assets/images.png';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  const renderLink = (item: { id: string; label: string; href: string }) => {
    const isExternal = item.href.startsWith('http');
    const isAnchor = item.href.startsWith('#') || item.href.startsWith('/#');

    if (isExternal) {
      return (
        <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {item.label}
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      );
    }
    if (isAnchor) {
      return (
        <a key={item.id} href={item.href} className={styles.link}>
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.id} to={item.href} className={styles.link}>
        {item.label}
      </Link>
    );
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerTop}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand column */}
            <div className={styles.brand}>
              <Link to="/" className={styles.logo} aria-label="Aadi Finserv home">
                <div className={styles.logoImageWrap}>
                  <img src={logoImg} alt="Aadi Finserv Logo" className={styles.logoImage} />
                </div>
                <div className={styles.logoTextGroup}>
                  <span className={styles.logoName}>Aadi Finserv</span>
                  <span className={styles.logoSub}>We Understand Your Needs</span>
                </div>
              </Link>
              <p className={styles.tagline}>
                India's premier B2B & B2C finance aggregation platform — delivering transparent, fast, and reliable loan solutions across Indore and Madhya Pradesh.
              </p>

              <div className={styles.contactBlock}>
                <a
                  href="https://maps.google.com/?q=325+Orbit+Mall+Vijay+Nagar+Indore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                >
                  <MapPin size={15} aria-hidden="true" />
                  <span>325, Orbit Mall, Vijay Nagar, Indore, MP 452001</span>
                </a>
                <a href="tel:+916263069808" className={styles.contactItem}>
                  <Phone size={15} aria-hidden="true" />
                  <span>+91 62630 69808</span>
                </a>
                <a href="mailto:sambhav.jain@aadiloans.in" className={styles.contactItem}>
                  <Mail size={15} aria-hidden="true" />
                  <span>sambhav.jain@aadiloans.in</span>
                </a>
                <div className={styles.contactItem}>
                  <Clock size={15} aria-hidden="true" />
                  <span>Mon – Sat: 10 AM – 7 PM</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Our Services</h3>
              <ul className={styles.linkList}>
                {footerProductLinks.map((item) => (
                  <li key={item.id}>{renderLink(item)}</li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Company</h3>
              <ul className={styles.linkList}>
                {footerCompanyLinks.map((item) => (
                  <li key={item.id}>{renderLink(item)}</li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>Legal & Regulatory</h3>
              <ul className={styles.linkList}>
                {footerLegalLinks.map((item) => (
                  <li key={item.id}>{renderLink(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.bottom}>
            <p className={styles.copyright}>
              © {year} Aadi Finserv Pvt Ltd. All rights reserved.
            </p>
            <p className={styles.reg}>
              Originally Shri Nakoda Agency (2007) · KUSID Consultants Pvt Ltd (2019) · Aadi Finserv Pvt Ltd (2022)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
