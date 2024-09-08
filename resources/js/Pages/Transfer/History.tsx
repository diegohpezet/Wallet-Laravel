import { GiPayMoney } from "react-icons/gi";
import { TransferInterface, User } from '@/types';
import { useAccount } from "@/Hooks/AccountProvider";
import axios from "axios";

interface HistoryProps {
  transfers: TransferInterface[];
  currentUser: User;
}

export default function History({ transfers, currentUser }: HistoryProps) {
  const { setAlias, setAccountName, setModalOpen } = useAccount();

  const openTransferMenu = async (alias: string) => {
    try {
      console.log(alias)
      const response = await axios.get(route('profile.getByAlias', alias));

      if (response.status === 200) {
        setAccountName(response.data.user.name);
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
          {transfers.length === 0 ? (<li className="">There is nothing to show here....</li>) : (
            transfers.map((transfer) => {
              const isSender = transfer.sender.id === currentUser.id;
              const account = isSender ? transfer.receiver : transfer.sender;
              const avatarUrl = `https://ui-avatars.com/api/?name=${account.name.split(" ")[0]}+${account.name.split(" ")[1]}&background=0D8ABC&color=fff`
              const date = new Date(transfer.created_at).toDateString();

              return (
                <li key={transfer.id} onClick={(e) => {openTransferMenu(account.alias)}}>
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
