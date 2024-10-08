import { GiPayMoney } from "react-icons/gi";
import { TransferInterface, User } from '@/types';
import { useAccount } from "@/Hooks/AccountProvider";
import axios from "axios";

interface HistoryProps {
  transfers: TransferInterface[];
  currentUser: User;
}

interface UsersHistory {
  account: TransferInterface['receiver'];
  created_at: TransferInterface['created_at'];
}

export default function History({ transfers, currentUser }: HistoryProps) {
  const { setAccountName, setModalOpen, setAlias } = useAccount();

  // Filter transactions, to keep just the ones realized by the user
  const usersHistory = Object.values(transfers.filter((transfer) => transfer.sender.id === currentUser.id).map((transfer) => {
    // Remove unnecessary information
    return {
      account: transfer.receiver,
      created_at: transfer.created_at
    }
  }).reduce((acc: { [key: number]: UsersHistory }, current) => {
    // Remove repeated records
    const accountId = current.account.id;

    if (!acc[accountId] || new Date(acc[accountId].created_at) < new Date(current.created_at)) {
      acc[accountId] = current;
    }

    return acc;
  }, {})
  ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());  // Sort by date

  const openTransferMenu = async (alias: string) => {
    try {
      const response = await axios.get(route('profile.getByAlias', alias));

      if (response.status === 200) {
        setAccountName(response.data.user.name);
        setAlias(alias);
        setModalOpen(true);  // Abrir el modal aquí
      } else {
        setAccountName('');
      }
    } catch (err) {
      setAccountName('');
    }
  }

  return (
    <div className="max-w-2xl m-auto">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg my-10 mx-2 p-6">
        <div className="border-b">
          <p className="py-2 font-bold text-gray-600 dark:text-gray-200">Recent activity</p>
        </div>
        <ul className="-mb-px text-sm font-medium text-gray-500 dark:text-gray-400">
          {usersHistory.length === 0 ? (<li className="">There is nothing to show here....</li>) : (
            usersHistory.map((transfer) => {
              const account = transfer.account
              const avatarUrl = `https://ui-avatars.com/api/?name=${account.name.split(" ")[0]}+${account.name.split(" ")[1]}&background=0D8ABC&color=fff`
              const date = new Date(transfer.created_at).toDateString();

              return (
                <li key={transfer.account.id} onClick={(e) => { openTransferMenu(account.alias) }}>
                  <div className="flex py-3 px-2 hover:bg-slate-100 dark:hover:bg-gray-700 cursor-pointer">
                    <div className="flex-shrink-0">
                      <img
                        src={avatarUrl}
                        alt={account.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    <div className="py-1.5 px-4">
                      <p className="text-sm text-gray-900 dark:text-gray-100">
                        {account.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {date}
                      </p>
                    </div>
                  </div>
                </li>
              )
            }))}
        </ul>
      </div>
    </div>
  );
}
