export default function PromoCode() {
  return (
    <div className="max-w-2xl m-auto">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg my-10 mx-2">
        <form method="POST" >
          <div className="flex justify-end p-6">
            <input type="text" name="target" id="targetLabel" placeholder="PROMO CODE" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            <input type="submit" value="Use it now!" className="bg-blue-500 shadow-md hover:bg-blue-400 text-white font-bold rounded-lg cursor-pointer ms-3 p-2" />
          </div>
        </form>
      </div>
    </div>
  )
}
