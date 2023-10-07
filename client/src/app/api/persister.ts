import { PersistedClient, Persister, PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import { get, set, del, createStore } from "idb-keyval";

const reactQueryDB = createStore('react-query-db', 'react-query-store');
const REACT_QUERY_STORE_KEY = 'react-query-client' as const;

// creates an IDB persister for react query to use as cache
// @source https://github.com/TanStack/query/discussions/3198
const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await set(REACT_QUERY_STORE_KEY, client, reactQueryDB);
  },
  restoreClient: async () => {
    return await get<PersistedClient>(REACT_QUERY_STORE_KEY, reactQueryDB);
  },
  removeClient: async () => {
    await del(REACT_QUERY_STORE_KEY, reactQueryDB);
  },
};

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister,
  maxAge: Infinity, // idb cache should never expire
  dehydrateOptions: {
    // store data in cache whenever data is available, even if error occurs
    // @source https://github.com/TanStack/query/discussions/3623
    // @resource https://github.com/TanStack/query/blob/5848fab8a560efcf66ef0062c207c3004bccad83/src/core/hydration.ts#L72-L74
    shouldDehydrateQuery: (query) => !!query.state.data,
  },
};
