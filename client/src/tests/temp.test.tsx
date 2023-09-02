import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import LoginPage from '@/pages/login/page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/app/api/queryClient';
import { renderWithClient, renderWithClientAndRouter, renderWithClientAndRouter2 } from './utils';
import userEvent from '@testing-library/user-event';
import { server } from "../../vitest.setup";
import { rest } from 'msw';
import RegisterPage from '@/pages/register/page';

afterEach(() => {
  cleanup();
});

describe('log into app', () => {
  describe('given that login succeeds', () => {
    it('should redirect to `/`', async () => {
      const result = renderWithClientAndRouter2(
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<p>user is logged in</p>} />
        </>,
        {
          initialRoute: '/login'
        },
      );

      const user = userEvent.setup();

      const usernameField = result.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const password = result.getByLabelText(/password/i);
      await user.type(password, '123456');
      const button = result.getByRole('button', { name: /login/i });
      await user.click(button);

      expect(await result.findByText(/user is logged in/i)).toBeInTheDocument();
    });
  });

  describe('given that login fails', () => {
    it('should display a warning and not redirect to `/`', async () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const result = renderWithClientAndRouter2(<Route path="/" element={<LoginPage />} />);
      const user = userEvent.setup();
      const usernameField = result.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const password = result.getByLabelText(/password/i);
      await user.type(password, '123456');
      const button = result.getByRole('button', { name: /login/i });
      await user.click(button);

      expect(await result.findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    });
  });
});

describe('register', () => {
  describe('given that registration succeeds', () => {
    it('should redirect to `/`', async () => {
      const result = renderWithClientAndRouter2(
        <>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<p>user is logged in</p>} />
        </>,
        {
          initialRoute: '/register'
        },
      );

      const user = userEvent.setup();

      const emailField = result.getByRole('textbox', { name: /email/i });
      await user.type(emailField, 'test@test.com');
      const usernameField = result.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const nameField = result.getByLabelText(/^name$/i);
      await user.type(nameField, 'test');
      const password = result.getByLabelText(/^password$/i);
      await user.type(password, '123456');
      const confirmPassword = result.getByLabelText(/confirm password/i);
      await user.type(confirmPassword, '123456');
      const button = result.getByRole('button', { name: /register/i });
      await user.click(button);

      expect(await result.findByText(/user is logged in/i)).toBeInTheDocument();
    });
  });

  describe('given that registration fails', () => {
    it('should display a warning and not redirect to `/`', async () => {
      server.use(
        rest.get('*', (req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const result = renderWithClientAndRouter2(<Route path="/" element={<RegisterPage />} />);

      const user = userEvent.setup();

      const emailField = result.getByRole('textbox', { name: /email/i });
      await user.type(emailField, 'test@test.com');
      const usernameField = result.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const nameField = result.getByLabelText(/^name$/i);
      await user.type(nameField, 'test');
      const password = result.getByLabelText(/^password$/i);
      await user.type(password, '123456');
      const confirmPassword = result.getByLabelText(/confirm password/i);
      await user.type(confirmPassword, '123456');
      const button = result.getByRole('button', { name: /register/i });
      await user.click(button);

      expect(await result.findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    });
  });
});