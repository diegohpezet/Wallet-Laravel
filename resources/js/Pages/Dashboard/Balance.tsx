import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

interface BalanceProps {
  balance: number;
}

export default function Balance({ balance }: BalanceProps) {
  const currentBalance = balance.toString(); // Change to get from DB
  const [cashAmount, setCashAmount] = useState(currentBalance.toString());

  const [showIcon, setShowIcon] = useState(<BiHide />);

  const toggleShowCashAmount = () => {
    cashAmount == currentBalance.toString() ? setCashAmount('***.**') : setCashAmount(currentBalance);
    showIcon == <BiHide /> ? setShowIcon(<BiShow />) : setShowIcon(<BiHide />)
  }
  return (
    <div className="max-w-4xl shadow-sm m-auto">
      <div className="my-10 mx-2 p-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
        <p className="text-gray-600 dark:text-gray-100">Available money</p>
        <div className="flex">
          <p className="pe-6 text-gray-900 dark:text-gray-100 font-extrabold text-4xl">
            USD {cashAmount.split('.')[0]}<span className="text-xl align-top">{cashAmount.split('.')[1]}</span>
          </p>
          <div>
            <button className="text-2xl border rounded-full text-gray-900 dark:text-gray-100" onClick={toggleShowCashAmount}>
              {showIcon}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
