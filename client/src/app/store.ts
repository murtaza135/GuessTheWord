import { create, StoreApi, UseBoundStore } from 'zustand';
import { guestModeSlice, GuestModeSlice } from '@/features/auth/slices/guest-mode.slice';

type WithSelectors<S> = S extends { getState: () => infer T; }
  ? S & { use: { [K in keyof T]: () => T[K] }; }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    ; (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

const useStoreWithoutSelectors = create<GuestModeSlice>()((...a) => ({
  ...guestModeSlice(...a),
}));

const useStore = createSelectors(useStoreWithoutSelectors);

export default useStore;
