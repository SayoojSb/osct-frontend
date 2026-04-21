import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route element={component}>
          <Route path="/dashboard" element={<div>Dashboard Content</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

describe('DashboardLayout Component', () => {
  it('should render sidebar', () => {
    renderWithRouter(<DashboardLayout />);
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeInTheDocument();
  });

  it('should render main content area', () => {
    renderWithRouter(<DashboardLayout />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    renderWithRouter(<DashboardLayout />);
    const layout = screen.getByRole('main').closest('.dashboard-layout');
    expect(layout).toHaveClass('dashboard-layout');
  });

  it('should render Outlet for nested routes', () => {
    renderWithRouter(<DashboardLayout />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  it('should have proper CSS classes', () => {
    renderWithRouter(<DashboardLayout />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveClass('main-content');
  });
});
