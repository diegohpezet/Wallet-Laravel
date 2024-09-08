import { useAccount } from "@/Hooks/AccountProvider";
import { FormEventHandler, useEffect, useState } from "react";
import { Bounce, toast } from 'react-toastify';
import NumberInput from "@/Components/NumberInput";
import axios from "axios";

export default function AccountDetails() {
  const { alias, accountName, isModalOpen, setModalOpen } = useAccount();
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState("");

  const closeModal = () => {
    setAmount(null);
    setModalOpen(false);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Evitar el scroll cuando el modal está abierto
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    // Realizar el envío del formulario aquí
    try {
      const response = await axios.post(route('transfer.sendCash', { alias: alias, amount: amount }))

      if (response.status === 200) {
        toast.success('💰 ' + response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setAmount(null);
        setModalOpen(false);
      }
    } catch (error: any) {
      setError("An error occurred: " + error.response.data.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div
        className={`relative bg-white dark:bg-gray-800 w-full max-w-md p-6 m-auto rounded-lg shadow-lg transform transition-all duration-300 ease-out ${isModalOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}
      >
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Account Details</h2>
        <div>
          {accountName ? (
            <p className="text-gray-700 dark:text-gray-200">Account Name: {accountName}</p>
          ) : (
            <p className="text-gray-700 dark:text-gray-200">No account selected</p>
          )}
        </div>
        <form onSubmit={submit}>
          {/* Formulario de transferencia */}
          <NumberInput placeholder="0" value={amount ? amount : undefined} setValue={setAmount} />
          <div className="">
            <button
              onClick={closeModal}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 mt-4 rounded"
            >
              Close
            </button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white mx-4 px-4 py-2 rounded">Confirm</button>
          </div>
          <p className="text-red-500">{error}</p>
        </form>
      </div>
    </div>
  );
}