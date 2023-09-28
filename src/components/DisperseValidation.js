const DisperseValidation = ({ addresses, onRemoveDuplicates }) => {
  let errors = [];
  let duplicates = [];
  let uniqueAddresses = {};
  addresses.forEach((address, i) => {
    const isAddressInvalid = !(
      address.address.length === 42 || address.address.indexOf("0x") === 0
    );
    const isAmountInvalid = !(address.amount && !isNaN(address.amount));
    if (isAddressInvalid && isAmountInvalid) {
      errors.push(`Line ${i + 1} Invalid Ethereum Address and wrong amount`);
    } else if (isAddressInvalid) {
      errors.push(`Line ${i + 1} Invalid Ethereum Address`);
    } else if (isAmountInvalid) {
      errors.push(`Line ${i + 1} wrong amount`);
    }

    if (!uniqueAddresses[address.address]) {
      uniqueAddresses[address.address] = [];
    }
    uniqueAddresses[address.address].push(i + 1);
  });
  Object.keys(uniqueAddresses).forEach((key, i) => {
    if (uniqueAddresses[key].length > 1) {
      duplicates.push(
        `${key} duplicate in Line: ${uniqueAddresses[key].join(",")}`
      );
    }
  });
  return (
    errors.length + duplicates.length > 0 && (
      <div className="w-full pt-4">
        {duplicates.length > 0 && (
          <div className="w-full flex py-3">
            <div className="flex-1">Duplicate</div>
            <div className="flex flex-initial justify-items-end px-4">
              <button
                onClick={onRemoveDuplicates}
                className="text-red-500 w-auto"
              >
                Keep the first one
              </button>
            </div>
          </div>
        )}
        <div className="border rounded border-red-500 w-full flex px-4 py-3 text-red-500">
          <div className="flex-initial">
            <svg
              className="fill-current h-6 w-6 text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div className="flex-1">
            <ul>
              {errors.map((data, i) => (
                <li key={i}>{data}</li>
              ))}
            </ul>
            <ul>
              {duplicates.map((data, i) => (
                <li key={i}>{data}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default DisperseValidation;
