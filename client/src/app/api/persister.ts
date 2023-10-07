import { PersistedClient, Persister, PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import { get, set, del, createStore } from "idb-keyval";
import config from '@/config/config';

const reactQueryDB = createStore('react-query-db', 'react-query-store');

// creates an IDB persister for react query to use as cache
// @source https://github.com/TanStack/query/discussions/3198
const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await set(config.IDB_CACHE_KEY, client, reactQueryDB);
  },
  restoreClient: async () => {
    return await get<PersistedClient>(config.IDB_CACHE_KEY, reactQueryDB);
  },
  removeClient: async () => {
    await del(config.IDB_CACHE_KEY, reactQueryDB);
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
