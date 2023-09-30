import { PersistedClient, Persister, PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import { get, set, del } from "idb-keyval";
import config from '@/config/config';

const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    await set(config.IDB_CACHE_KEY, client);
  },
  restoreClient: async () => {
    return await get<PersistedClient>(config.IDB_CACHE_KEY);
  },
  removeClient: async () => {
    await del(config.IDB_CACHE_KEY);
  },
};

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
  persister,
  maxAge: Infinity,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => !!query.state.data
  }
};
