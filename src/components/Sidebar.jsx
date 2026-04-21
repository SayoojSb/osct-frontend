import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Navigation items with icons
  const navigationItems = [
    { id: "dashboard", label: "DASHBOARD", icon: "home", href: "/dashboard" },
    { id: "repositories", label: "REPOSITORIES", icon: "folder", href: "/org-repos" },
    { id: "learning", label: "LEARNING", icon: "book", href: "/learn" },
    { id: "contributions", label: "CONTRIBUTIONS", icon: "commit", href: "/contributions" },
    { id: "settings", label: "SETTINGS", icon: "gear", href: "/settings" },
  ];

  // Check if current route matches navigation item
  const isActive = (href) => location.pathname === href;

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigation item clicked on mobile
  const handleNavClick = (href) => {
    navigate(href);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Close sidebar when backdrop clicked
  const handleBackdropClick = () => {
    setIsOpen(false);
  };

  // Render icon based on icon name
  const renderIcon = (iconName) => {
    const iconMap = {
      home: (
        <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      folder: (
        <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      book: (
        <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      commit: (
        <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M1 12h6m6 0h6" />
        </svg>
      ),
      gear: (
        <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24" />
        </svg>
      ),
    };
    return iconMap[iconName] || null;
  };

  return (
    <>
      {/* Hamburger Menu - Mobile Only */}
      {isMobile && (
        <button
          className="hamburger"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger__line" />
          <span className="hamburger__line" />
          <span className="hamburger__line" />
        </button>
      )}

      {/* Sidebar Backdrop - Mobile Only */}
      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={handleBackdropClick} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo Section */}
        <div className="sidebar__logo-section">
          <a
            href="/dashboard"
            className="sidebar__logo"
            aria-label="OSCT Dashboard"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/dashboard");
            }}
          >
            <span className="sidebar__logo-text">OSCT</span>
          </a>
          <span className="sidebar__logo-mode">CURATOR MODE</span>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar__nav">
          <ul className="sidebar__nav-list">
            {navigationItems.map((item) => (
              <li key={item.id} className="sidebar__nav-item">
                <a
                  href={item.href}
                  className={`sidebar__nav-link ${isActive(item.href) ? "active" : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  aria-label={item.label}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {renderIcon(item.icon)}
                  <span className="sidebar__nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* New Contribution Button */}
        <button
          className="sidebar__button"
          aria-label="Add new contribution"
          onClick={() => {
            navigate("/add");
            if (isMobile) {
              setIsOpen(false);
            }
          }}
        >
          <span className="sidebar__button-text">NEW CONTRIBUTION</span>
        </button>

        {/* Help Center Link */}
        <a
          href="/help"
          className="sidebar__help-link"
          aria-label="Help Center"
          onClick={(e) => {
            e.preventDefault();
            navigate("/help");
            if (isMobile) {
              setIsOpen(false);
            }
          }}
        >
          <span className="sidebar__help-text">HELP CENTER</span>
        </a>
      </aside>
    </>
  );
}

export default Sidebar;
