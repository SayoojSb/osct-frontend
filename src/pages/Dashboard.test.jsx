import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Dashboard Page', () => {
  it('should render hero section', () => {
    renderWithRouter(<Dashboard />);
    const heroTitle = screen.getByText('Learn How to Make Your First PR');
    expect(heroTitle).toBeInTheDocument();
  });

  it('should render hero button', () => {
    renderWithRouter(<Dashboard />);
    const button = screen.getByRole('button', { name: 'START LEARNING' });
    expect(button).toBeInTheDocument();
  });

  it('should render three cards', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Learn How to Make Your First PR')).toBeInTheDocument();
    expect(screen.getByText('Start with Easy Issues')).toBeInTheDocument();
    expect(screen.getByText('Explore Open Source Repositories')).toBeInTheDocument();
  });

  it('should render card buttons', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByRole('button', { name: 'Start Learning' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View Easy Issues' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explore Repos' })).toBeInTheDocument();
  });

  it('should render Recent Activity section', () => {
    renderWithRouter(<Dashboard />);
    const activityTitle = screen.getByText('Recent Activity');
    expect(activityTitle).toBeInTheDocument();
  });

  it('should render Learning Streak section', () => {
    renderWithRouter(<Dashboard />);
    const streakTitle = screen.getByText('Learning Streak');
    expect(streakTitle).toBeInTheDocument();
  });

  it('should render streak count', () => {
    renderWithRouter(<Dashboard />);
    const streakCount = screen.getByText('0');
    expect(streakCount).toBeInTheDocument();
  });

  it('should render streak label', () => {
    renderWithRouter(<Dashboard />);
    const streakLabel = screen.getByText('Days in a row');
    expect(streakLabel).toBeInTheDocument();
  });

  it('should have proper card styling', () => {
    renderWithRouter(<Dashboard />);
    const cards = screen.getAllByRole('button', { name: /Start Learning|View Easy Issues|Explore Repos/ });
    cards.forEach(card => {
      expect(card.closest('.card')).toHaveClass('dashboard-card');
    });
  });

  it('should have proper hero section styling', () => {
    renderWithRouter(<Dashboard />);
    const heroTitle = screen.getByText('Learn How to Make Your First PR');
    expect(heroTitle.closest('.hero')).toHaveClass('hero');
  });

  it('should have proper activity sections layout', () => {
    renderWithRouter(<Dashboard />);
    const activitySections = screen.getByText('Recent Activity').closest('.activity-sections');
    expect(activitySections).toHaveClass('activity-sections');
  });
});
