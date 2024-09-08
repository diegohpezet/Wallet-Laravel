import React, { createContext, useContext, useState } from 'react';

interface AccountContextProps {
  alias: string;
  setAlias: (alias: string) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alias, setAlias] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <AccountContext.Provider
      value={{
        alias,
        setAlias,
        accountName,
        setAccountName,
        isModalOpen,
        setModalOpen,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
