import { GiPayMoney, GiReceiveMoney, GiTakeMyMoney } from "react-icons/gi";
import { FaHistory } from "react-icons/fa";
import { PiHandArrowDown, PiHandArrowUp } from "react-icons/pi";
import { TransferInterface, User } from "@/types";
import { useState } from "react";

interface RecentProps {
  currentUser: User;
  transfers: TransferInterface[];
}
export default function Recent({ currentUser, transfers }: RecentProps) {
  const selectedCategoryClassList = "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
  const categoryClassList = "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"

  // Filter functionality
  const sortedTransfers = transfers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const [ recentActivity, setRecentActivity ] = useState<TransferInterface[]>(sortedTransfers);
  
  
  const handleCategoryChange = (category: string) => {
    switch (category) {
      case "History":
        setRecentActivity(transfers);
        break;
      case "Received":
        setRecentActivity(transfers.filter((transfer) => transfer.receiver.id === currentUser.id));
        break;
      case "Sent":
        setRecentActivity(transfers.filter((transfer) => transfer.sender.id === currentUser.id));
        break;
      default:
        setRecentActivity(transfers);
        break;
    }
  }

  return (
    <div className="max-w-4xl shadow-sm m-auto">
      <div className="my-10 mx-2 p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <div className="text-sm font-medium text-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className={categoryClassList} onClick={(e) => handleCategoryChange("History")}>
                <FaHistory className="me-1" /> History
              </a>
            </li>
            <li>
              <a href="#" className={categoryClassList} onClick={(e) => handleCategoryChange("Received")}>
                <PiHandArrowDown className="me-1" />Received
              </a>
            </li>
            <li>
              <a href="#" className={categoryClassList} onClick={(e) => handleCategoryChange("Sent")}>
                <PiHandArrowUp className="me-1" />Sent
              </a>
            </li>
          </ul>
        </div>

        <table className="w-full border-collapse text-gray-900 dark:text-gray-100">
          <tbody>
            {recentActivity?.length === 0 ? (<tr><td className="pt-5">There is no recent activity to show</td></tr>) : (
              recentActivity?.map((transfer) => {
                const isSender = transfer.sender.id === currentUser.id;
                const accountName = isSender ? transfer.receiver.name : transfer.sender.name;
                const transferDate = new Date(transfer.created_at).toDateString();

                return (
                  <tr className="border-t">
                    <td className="ps-6 py-4 w-2">
                      {isSender ? <GiPayMoney className="text-5xl border rounded-full bg-gray-50 dark:text-white-900 dark:bg-gray-700" /> : <GiReceiveMoney className="text-5xl border rounded-full bg-gray-50 dark:text-white-900 dark:bg-gray-700" />}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{accountName}</p>
                      <p>Cash {isSender ? "sent" : "received"}</p>
                    </td>
                    <td className="px-6 py-4 text-end">
                      <p className="font-bold text-red-500">- $ {transfer.amount}</p>
                      <p>{transferDate}</p>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
