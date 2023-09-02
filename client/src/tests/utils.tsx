// @resource TkDodo - https://github.com/TkDodo/testing-react-query/tree/main
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoutesFromElements, createMemoryRouter, RouterProvider } from 'react-router-dom';

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

export function renderWithClientAndRouter(routes: React.ReactNode, config?: { initialRoute?: string; }) {
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

  return ({ children }: { children: React.ReactNode; }) => {
    const router = createMemoryRouter(
      createRoutesFromElements(children),
      { initialEntries: [config?.initialRoute ?? '/'] },
    );

    return (
      <QueryClientProvider client={testQueryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  };
}