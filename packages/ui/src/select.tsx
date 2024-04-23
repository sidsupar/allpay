/*
  Pass:
  options array,
  and a onSelect method which will set a react state on selecting the value

*/
interface SUPPORTED_BANKS {
  name:string,
  redirectUrl:string
}
interface select {
  option:SUPPORTED_BANKS[],
  onSelect:any
}

export const Select = ({ option, onSelect }: select) => {
  return (
    <div>
      <div>
      <label htmlFor="basnkSelection" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         id="basnkSelection" onChange={(e) => onSelect(e.target.value)}>
          <option selected>Choose your bank</option>
          {option.map((opt, index)=>{
            return (
              <option key={index+"optBanks"} value={opt?.name}>{opt?.name}</option>
            )
          })}
        </select>
      </div>
    </div>
  );
};
