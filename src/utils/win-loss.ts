import { createContext, useContext, useState } from 'react';

type WinLossContextOutput = {
  wins: number;
  losses: number;
  setWins: (value: number) => void;
  setLosses: (value: number) => void;
  incrementWins: (value: number) => void;
  incrementLosses: (value: number) => void;
};

const WinLossContext = createContext<WinLossContextOutput>({} as unknown as WinLossContextOutput);

type WinLossProviderProps = {
  children: React.ReactNode;
};

export function WinLossProvider({ children }: WinLossProviderProps) {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
}