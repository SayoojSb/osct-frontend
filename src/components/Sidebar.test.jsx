import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Sidebar Component', () => {
  beforeEach(() => {
    // Reset window size to desktop
    global.innerWidth = 1024;
  });

  it('should render sidebar with logo', () => {
    renderWithRouter(<Sidebar />);
    const logo = screen.getByText('OSCT');
    expect(logo).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('DASHBOARD')).toBeInTheDocument();
    expect(screen.getByText('REPOSITORIES')).toBeInTheDocument();
    expect(screen.getByText('LEARNING')).toBeInTheDocument();
    expect(screen.getByText('CONTRIBUTIONS')).toBeInTheDocument();
    expect(screen.getByText('SETTINGS')).toBeInTheDocument();
  });

  it('should render New Contribution button', () => {
    renderWithRouter(<Sidebar />);
    const button = screen.getByText('NEW CONTRIBUTION');
    expect(button).toBeInTheDocument();
  });

  it('should render Help Center link', () => {
    renderWithRouter(<Sidebar />);
    const link = screen.getByText('HELP CENTER');
    expect(link).toBeInTheDocument();
  });

  it('should have proper ARIA labels', () => {
    renderWithRouter(<Sidebar />);
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
  });

  it('should render hamburger menu on mobile', () => {
    global.innerWidth = 500;
    renderWithRouter(<Sidebar />);
    const hamburger = screen.getByRole('button', { name: 'Toggle navigation' });
    expect(hamburger).toBeInTheDocument();
  });

  it('should toggle sidebar when hamburger is clicked', async () => {
    global.innerWidth = 500;
    renderWithRouter(<Sidebar />);
    const hamburger = screen.getByRole('button', { name: 'Toggle navigation' });
    
    fireEvent.click(hamburger);
    
    await waitFor(() => {
      expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('should have proper navigation links', () => {
    renderWithRouter(<Sidebar />);
    const dashboardLink = screen.getByRole('link', { name: 'DASHBOARD' });
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });

  it('should have proper button styling classes', () => {
    renderWithRouter(<Sidebar />);
    const button = screen.getByText('NEW CONTRIBUTION');
    expect(button).toHaveClass('sidebar__button');
  });

  it('should render sidebar with correct role', () => {
    renderWithRouter(<Sidebar />);
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('sidebar');
  });

  it('should have proper focus management', () => {
    renderWithRouter(<Sidebar />);
    const logo = screen.getByText('OSCT').closest('a');
    logo.focus();
    expect(document.activeElement).toBe(logo);
  });
});
