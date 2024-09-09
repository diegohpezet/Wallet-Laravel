import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import NumberInput from "@/Components/NumberInput";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect, useState } from "react";

export default function CardDetails() {
  const { data, setData, post, errors, processing, reset } = useForm({
    amount: 0,
    card_number: '',
    card_expiry: '',
    card_cvc: '',
    card_holder_name: '',
  });

  const normalizeCardNumber = (number: string) => number.replace(/\s+/g, '').replace(/-/g, '');

  const normalizeCVV = (cvv: string) => cvv.replace(/\s+/g, '');

  const normalizeCardHolderName = (name: string) => name.toUpperCase();

  const normalizeExpiryDate = (date: string) => {
    let sanitizedInput = date.replace(/[^0-9]/g, '');

    if (sanitizedInput.length === 0) {
      return '';
    }

    if (sanitizedInput.length >= 3) {
      sanitizedInput = sanitizedInput.slice(0, 2) + '/' + sanitizedInput.slice(2);
    }

    return sanitizedInput.slice(0, 5);
  };

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Once deposited, your funds will be added to your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      color: document.querySelector('html')?.classList.contains('dark') ? "#FFFFFF" : "#000000",
      background: document.querySelector('html')?.classList.contains('dark') ? "#1F2937" : "#FFFFFF",
      customClass: {
        confirmButton: "bg-blue-500",
        cancelButton: "bg-red-500",
      },
      
    }).then((result) => {
      if (result.isConfirmed) {
        post(route('deposit.depositCash', { ...data }), {
          onError: () => {
            toast.error("Something went wrong...", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
            });
          },

          onSuccess: () => {
            toast.success('💰 Your cash is now available!', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              progress: undefined,
            });
            reset();
          },
        });
      }
    });
  };

  return (
    <div className="max-w-2xl m-auto">
      <div className="py-6 px-6 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg my-10 mx-2">
        <form onSubmit={submit} >
          <div className="pb-4 mt-2 border-b">
            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="card_number">
              Amount to deposit
            </label>
            <NumberInput placeholder="1234.56" setValue={(value: number) => setData('amount', value)} />
            <InputError message={errors.amount} className="mt-1" />
          </div>
          <div className="mb-4 mt-2">
            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="card_number">
              Card Number
            </label>
            <TextInput
              id="card_number"
              type="text"
              name="card_number"
              value={data.card_number}
              onChange={(e) => {
                const normalizedCardNumber = normalizeCardNumber(e.target.value);
                if (!isNaN(Number(normalizedCardNumber)) && normalizedCardNumber.length <= 16) {
                  setData('card_number', normalizedCardNumber);
                }
              }}
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="xxxx xxxx xxxx xxxx"
            />
            <InputError message={errors.card_number && "Invalid card number"} className="mt-1" />
          </div>
          <div className="mb-4 flex">
            <div className="me-3">
              <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2 me-7" htmlFor="expiration_date">
                Expiry
              </label>
              <TextInput
                id="card_expiry"
                type="month"
                name="card_expiry"
                value={data.card_expiry}
                onChange={(e) => {
                  const normalizedExpiryDate = normalizeExpiryDate(e.target.value);
                  setData('card_expiry', normalizedExpiryDate);
                }}
                className="mt-3 w-15 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="MM/YY"
              />
              <InputError message={errors.card_expiry && "Invalid expiry date"} className="mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="cvv">
                CVV
              </label>
              <TextInput
                id="card_cvc"
                type="text"
                name="card_cvc"
                value={data.card_cvc}
                onChange={(e) => {
                  const normalizedCVV = normalizeCVV(e.target.value);
                  if (normalizedCVV.length <= 4 && !isNaN(Number(normalizedCVV))) {
                    setData('card_cvc', normalizedCVV);
                  }
                }}
                className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="XXX"
              />
              <InputError message={errors.card_cvc && "Invalid CVV"} className="mt-1" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-200 font-bold mb-2" htmlFor="name_on_card">
              Name on Card
            </label>
            <TextInput
              id="card_holder_name"
              type="text"
              name="card_holder_name"
              value={data.card_holder_name}
              onChange={(e) => {
                const normalizedName = normalizeCardHolderName(e.target.value);
                setData('card_holder_name', normalizedName);
              }}
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
            />
            <InputError message={errors.card_holder_name} className="mt-1" />
          </div>
          <div className="flex justify-end -pe-5">
            <PrimaryButton type="submit" disabled={processing}>
              Continue
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  )
}
