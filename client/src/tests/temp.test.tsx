import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import LoginPage from '@/pages/login/page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/app/api/queryClient';
import { renderWithClient, renderWithClientWithRoutes } from './utils';
import userEvent from '@testing-library/user-event';

function Main({ children }: { children: React.ReactNode; }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {children}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// afterEach(() => {
//   cleanup();
// });

it('demo', async () => {
  const result = renderWithClientWithRoutes(<>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<p>user is logged in</p>} />
  </>, '/login');

  const user = userEvent.setup();

  const usernameField = result.getByRole('textbox', { name: /username/i });
  await user.type(usernameField, 'test');
  const password = result.getByLabelText(/password/i);
  await user.type(password, '123456');
  const button = result.getByRole('button', { name: /login/i });
  await user.click(button);
  expect(await result.findByText(/user is logged in/i)).toBeInTheDocument();
});