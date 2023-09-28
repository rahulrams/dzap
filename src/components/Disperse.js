import { useEffect, useState } from "react";
import DisperseInput from "./DisperseInput";
import DisperseValidation from "./DisperseValidation";

const Disperse = () => {
  const [validate, setValidate] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const onUpdate = (data) => {
    setAddresses(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidate(true);
  };

  const removeDuplicates = () => {
    const seen = new Set();
    const filteredAddresses = addresses.filter((item, i) => {
      const duplicate = seen.has(item.address);
      seen.add(item.address);
      return !duplicate;
    });
    setAddresses(filteredAddresses);
  };

  useEffect(() => {
    setValidate(false);
  }, [addresses]);
  return (
    <div
      className="container mx-auto bg-slate-800 text-white p-5 text-sm"
      style={{ width: 840 }}
    >
      <form onSubmit={onSubmit}>
        <DisperseInput addresses={addresses} onUpdate={onUpdate} />
        <div className="w-full flex pt-6">
          <div className="flex-1">Separated by ',' or ' ' or '='</div>
          <div className="flex-initial justify-items-end px-4 text-slate-400">
            Show example
          </div>
        </div>
        {validate && (
          <DisperseValidation
            onRemoveDuplicates={removeDuplicates}
            addresses={addresses}
          />
        )}
        <div className="w-full pt-6">
          <button
            type="submit"
            className={
              "w-full bg-gradient-to-r from-violet-500 to-violet-800 px-8 py-4 color-white rounded-full"
            }
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Disperse;
