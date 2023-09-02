import { render } from '@testing-library/react';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes, createRoutesFromElements, createMemoryRouter, RouterProvider } from 'react-router-dom';

export const handlers = [
  rest.post(
    '*/auth/login/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "1")
      );
    }
  ),
  rest.post(
    '*/auth/register/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "1")
      );
    }
  ),
  rest.post(
    '*/auth/authorize/local',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
      );
    }
  ),
  rest.get(
    '*/auth/profile',
    (_req, res, ctx) => {
      const user = { userId: 1 };
      return res(
        ctx.status(200),
        ctx.json(user)
      );
    }
  ),
  rest.get(
    '*/auth/accounts',
    (_req, res, ctx) => {
      const accounts = { localAccount: null, oAuthAccounts: [] };
      return res(
        ctx.status(200),
        ctx.json(accounts)
      );
    }
  ),
  rest.post(
    '*/auth/logout',
    (_req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "")
      );
    }
  ),
];

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => { }, // ignore errors
  }
});

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter>
            <Routes>
              <Route path="/" element={rerenderUi} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      ),
  };
}

export function renderWithClientAndRouter(routes: React.ReactNode, config?: { initialRoute?: string; }) {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[config?.initialRoute ?? '/']}>
        <Routes>
          {routes}
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderRoutes: React.ReactNode) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          <MemoryRouter initialEntries={[config?.initialRoute ?? '/']}>
            <Routes>
              {rerenderRoutes}
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      ),
  };
}

export function renderWithClientAndRouter2(routes: React.ReactNode, config?: { initialRoute?: string; }) {
  const testQueryClient = createTestQueryClient();

  const router = createMemoryRouter(
    createRoutesFromElements(routes),
    { initialEntries: [config?.initialRoute ?? '/'] },
  );

  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  return {
    ...result,
    rerender: (rerenderRoutes: React.ReactNode) => {
      const newRouter = createMemoryRouter(createRoutesFromElements(rerenderRoutes), { initialEntries: [config?.initialRoute ?? '/'] });
      return rerender(
        <QueryClientProvider client={testQueryClient}>
          <RouterProvider router={newRouter} />
        </QueryClientProvider>
      );
    },
  };
}

export function createWrapper(config?: { initialRoute?: string; }) {
  const testQueryClient = createTestQueryClient();

  return ({ children }: { children: React.ReactNode; }) => (
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[config?.initialRoute ?? '/']}>
        <Routes>
          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}