import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { mainNavItems } from '../../constants/navigationConfig';
import { Button } from '../common/Button';
import { useTheme } from '../../context/ThemeContext';
import logoImg from '../../assets/images.png';
import styles from './Header.module.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleOverlayClick = useCallback(() => setIsMenuOpen(false), []);

  const isAnchorLink = (href: string) => href.startsWith('/#') || href.startsWith('#');

  const renderNavLink = (item: (typeof mainNavItems)[0], mobile = false) => {
    if (isAnchorLink(item.href)) {
      return (
        <a
          key={item.id}
          href={item.href}
          className={`${mobile ? styles.mobileNavLink : styles.navLink}`}
          onClick={() => setIsMenuOpen(false)}
        >
          {item.label}
        </a>
      );
    }
    return (
      <NavLink
        key={item.id}
        to={item.href}
        className={({ isActive }) =>
          `${mobile ? styles.mobileNavLink : styles.navLink} ${isActive ? styles.active : ''}`
        }
      >
        {item.label}
      </NavLink>
    );
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} role="banner">
        <div className={`container ${styles.inner}`}>
          {/* Brand Logo */}
          <Link to="/" className={styles.logo} aria-label="Aadi Finserv home">
            <div className={styles.logoImageWrap}>
              <img src={logoImg} alt="Aadi Finserv Logo" className={styles.logoImage} />
            </div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoText}>Aadi Finserv</span>
              <span className={styles.logoSub}>We Understand Your Needs</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {mainNavItems.map((item) => (
                <li key={item.id}>{renderNavLink(item)}</li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA & Theme Switcher */}
          <div className={styles.desktopCta}>
            <button
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon size={19} className={styles.themeIcon} />
              ) : (
                <Sun size={19} className={styles.themeIcon} />
              )}
            </button>

            <a href="tel:+916263069808" className={styles.phoneLink} aria-label="Call us">
              <Phone size={14} aria-hidden="true" />
              <span>+91 62630 69808</span>
            </a>
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = '/apply')}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <div className={styles.mobileRightControls}>
            <button
              className={styles.themeToggleBtnMobile}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <button
              ref={toggleRef}
              className={styles.mobileToggle}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <img src={logoImg} alt="Aadi Finserv Logo" className={styles.mobileLogoImage} />
          <span className={styles.mobileLogoText}>Aadi Finserv</span>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {mainNavItems.map((item) => (
              <li key={item.id}>{renderNavLink(item, true)}</li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileCta}>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => {
              setIsMenuOpen(false);
              window.location.href = '/apply';
            }}
          >
            Apply Now
          </Button>
          <a href="tel:+916263069808" className={styles.mobilePhone}>
            <Phone size={16} aria-hidden="true" />
            +91 62630 69808
          </a>
        </div>
      </div>
    </>
  );
}
