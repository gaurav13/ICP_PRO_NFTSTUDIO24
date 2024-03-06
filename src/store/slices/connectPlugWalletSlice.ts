import { ConnectPlugWalletSlice } from '@/types/store';

const connectPlugWalletSlice = (
  set: (fn: (state: ConnectPlugWalletSlice) => ConnectPlugWalletSlice) => void,
  get: () => ConnectPlugWalletSlice
) => ({
  identity: null,
  principal: '',
  reward: null,
  balance: null,
  emailConnected: false,
  auth: {
    state: 'initializing-auth',
    connectedWithWeb2: false,
    actor: null,
    client: null,
    isLoading: true,
  },
  userAuth: {
    name: '',
    status: false,
    role: '',
    principalText: '',
    principalArray: null,
    isAdminBlocked: false,
  },
  articleHeadingsHierarchy: null,

  setAuth: (input: any): void =>
    set((state) => ({
      ...state,
      auth: input,
    })),
  setEmailConnected: (input: boolean): void =>
    set((state) => ({
      ...state,
      emailConnected: input,
    })),

  setIdentity: (input: any): void =>
    set((state) => ({
      ...state,
      identity: input,
    })),
  setReward: (input: any): void =>
    set((state) => ({
      ...state,
      reward: input,
    })),
  setBalance: (input: any): void =>
    set((state) => ({
      ...state,
      balance: input,
    })),

  setPrincipal: (input: any): void =>
    set((state) => ({
      ...state,
      principal: input,
    })),

  setUserAuth: (input: any): void =>
    set((state) => ({
      ...state,
      userAuth: input,
    })),
  setArticleHeadingsHierarchy: (input: any): void =>
    set((state) => ({
      ...state,
      articleHeadingsHierarchy: input,
    })),
});

export default connectPlugWalletSlice;
