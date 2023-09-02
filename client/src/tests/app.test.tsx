import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { screen, cleanup } from '@testing-library/react';
import { Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { renderWithClientAndRouter } from './utils';
import { server } from "../../vitest.setup";
import LoginPage from '@/pages/login/page';
import RegisterPage from '@/pages/register/page';
import ConnectLocalAccountPage from '@/pages/connect-local-account/page';
import ProfilePage from '@/pages/profile/page';

afterEach(() => {
  cleanup();
});

describe('/login', () => {
  describe('given that login succeeds', () => {
    it('should redirect to `/`', async () => {
      renderWithClientAndRouter(
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<p>user is logged in</p>} />
        </>,
        {
          initialRoute: '/login'
        },
      );

      const user = userEvent.setup();

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const password = screen.getByLabelText(/password/i);
      await user.type(password, '123456');
      const button = screen.getByRole('button', { name: /login/i });
      await user.click(button);

      expect(await screen.findByText(/user is logged in/i)).toBeInTheDocument();
    });
  });

  describe('given that login fails', () => {
    it('should display a warning and not redirect to `/`', async () => {
      server.use(
        rest.get('*', (_req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      renderWithClientAndRouter(<Route path="/" element={<LoginPage />} />);

      const user = userEvent.setup();

      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const password = screen.getByLabelText(/password/i);
      await user.type(password, '123456');
      const button = screen.getByRole('button', { name: /login/i });
      await user.click(button);

      expect(await screen.findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    });
  });
});

describe('/register', () => {
  describe('given that registration succeeds', () => {
    it('should redirect to `/`', async () => {
      renderWithClientAndRouter(
        <>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<p>user is logged in</p>} />
        </>,
        {
          initialRoute: '/register'
        },
      );

      const user = userEvent.setup();

      const emailField = screen.getByRole('textbox', { name: /email/i });
      await user.type(emailField, 'test@test.com');
      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const nameField = screen.getByLabelText(/^name$/i);
      await user.type(nameField, 'test');
      const password = screen.getByLabelText(/^password$/i);
      await user.type(password, '123456');
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      await user.type(confirmPassword, '123456');
      const button = screen.getByRole('button', { name: /register/i });
      await user.click(button);

      expect(await screen.findByText(/user is logged in/i)).toBeInTheDocument();
    });
  });

  describe('given that registration fails', () => {
    it('should display a warning and not redirect to `/`', async () => {
      server.use(
        rest.get('*', (_req, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      renderWithClientAndRouter(<Route path="/" element={<RegisterPage />} />);

      const user = userEvent.setup();

      const emailField = screen.getByRole('textbox', { name: /email/i });
      await user.type(emailField, 'test@test.com');
      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const nameField = screen.getByLabelText(/^name$/i);
      await user.type(nameField, 'test');
      const password = screen.getByLabelText(/^password$/i);
      await user.type(password, '123456');
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      await user.type(confirmPassword, '123456');
      const button = screen.getByRole('button', { name: /register/i });
      await user.click(button);

      expect(await screen.findByRole('textbox', { name: /username/i })).toBeInTheDocument();
    });
  });
});

describe('/connections/guess', () => {
  describe('given that authorization succeeds', () => {
    it('should redirect to `/profile`', async () => {
      renderWithClientAndRouter(
        <>
          <Route path="/connections/guess" element={<ConnectLocalAccountPage />} />
          <Route path="/profile" element={<p>user profile</p>} />
        </>,
        {
          initialRoute: '/connections/guess'
        },
      );

      const user = userEvent.setup();

      const emailField = screen.getByRole('textbox', { name: /email/i });
      await user.type(emailField, 'test@test.com');
      const usernameField = screen.getByRole('textbox', { name: /username/i });
      await user.type(usernameField, 'test');
      const nameField = screen.getByLabelText(/^name$/i);
      await user.type(nameField, 'test');
      const password = screen.getByLabelText(/^password$/i);
      await user.type(password, '123456');
      const confirmPassword = screen.getByLabelText(/confirm password/i);
      await user.type(confirmPassword, '123456');
      const button = screen.getByRole('button', { name: /link account/i });
      await user.click(button);

      expect(await screen.findByText(/user profile/i)).toBeInTheDocument();
    });
  });
});

describe('/profile', () => {
  describe('given that a user is already logged in', () => {
    it('should show all profile details on the profile page', async () => {
      renderWithClientAndRouter(<Route path="/" element={<ProfilePage />} />);

      expect(await screen.findByText(/test@test.com/i)).toBeInTheDocument();
      expect(await screen.findByText(/^test$/i)).toBeInTheDocument();
    });
  });
});