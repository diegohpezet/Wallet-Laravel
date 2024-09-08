import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";
import { useAccount } from "@/Hooks/AccountProvider";
import axios from "axios";
import AccountDetails from "./AccountDetails";

export default function SelectAccount() {
  const { setAlias, setAccountName, setModalOpen } = useAccount();
  const { data, setData, errors, processing, reset } = useForm({
    alias: ''
  });

  const [error, setError] = useState<string | null>(null);

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (data.alias == "") {
      return setError('Please enter an alias');
    }

    try {
      const response = await axios.get(route('profile.getByAlias', data.alias ));

      if (response.status === 200) {
        setAccountName(response.data.user.name);
        setError(null);
        setModalOpen(true);  // Abrir el modal aquí
      } else {
        setAccountName('');
        setError('User not found');
      }
    } catch (err) {
      setAccountName('');
      setError('User not found');
    }

    reset('alias');
  }

  return (
    <div className="max-w-2xl m-auto">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg my-10 mx-2">
        <form onSubmit={submit}>
          <div className="py-6 px-6 text-gray-900 dark:text-gray-100">
            <label className="py-2 block font-medium text-gray-700 dark:text-gray-200 border-b">
              Type in an account to transfer cash to
            </label>
            <TextInput
              id="alias"
              type="text"
              name="alias"
              value={data.alias}
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setData('alias', e.target.value);
                setAlias(e.target.value);
              }}
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
            <InputError message={errors.alias} className="mt-1" />
          </div>
          <div className="flex justify-end">
            <PrimaryButton className="me-6 mb-2" disabled={processing}>
              Continue
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}
