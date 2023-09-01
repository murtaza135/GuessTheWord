import { render } from '@testing-library/react';
import { rest } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

export const handlers = [
  rest.post(
    '*/auth/login/local',
    (req, res, ctx) => {
      return res(
        ctx.status(204),
        ctx.cookie("access", "test")
      );
    }
  )
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

export function renderWithClient(ui: React.ReactElement, initialRoute?: string) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[initialRoute ?? '/']}>
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
          <MemoryRouter initialEntries={[initialRoute ?? '/']}>
            <Routes>
              <Route path="/" element={rerenderUi} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      ),
  };
}

export function renderWithClientWithRoutes(routes: React.ReactNode, initialRoute?: string) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[initialRoute ?? '/']}>
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
          <MemoryRouter initialEntries={[initialRoute ?? '/']}>
            <Routes>
              {rerenderRoutes}
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>
      ),
  };
}

export function createWrapper(initialRoute?: string) {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode; }) => (
    <QueryClientProvider client={testQueryClient}>
      <MemoryRouter initialEntries={[initialRoute ?? '/']}>
        <Routes>
          <Route path="/" element={children} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}