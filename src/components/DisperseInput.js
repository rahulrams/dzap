const DisperseInput = ({ addresses, onUpdate }) => {
  const onInputChange = (event) => {
    let value = event.target.value;
    onUpdate(
      value.split(/\r\n|\r|\n/).map((o) => {
        const match = o.match(/(\w+)(,| |=)(\w+)/);
        return {
          address: match[1],
          separator: match[2],
          amount: match[3],
        };
      })
    );
  };
  return (
    <div className="w-full">
      <div className="flex w-full py-3">
        <div className="flex-1">Addresses with amount</div>
        <div className="flex flex-initial justify-items-end px-4">
          Upload File
        </div>
      </div>
      <div className="flex w-full bg-black px-7 py-5 rounded">
        <div
          className={
            "disperse-numbering text-base flex-initial px-1 py-2 leading-5 text-slate-400"
          }
        >
          {addresses.length > 0 ? (
            addresses.map((address, i) => <div key={i}>{i + 1}</div>)
          ) : (
            <div>1</div>
          )}
        </div>
        <div className="flex-1">
          <textarea
            spellCheck="false"
            className={
              "disperse-input w-full resize-none bg-black text-white border-l border-white-500 px-2 py-2"
            }
            onChange={onInputChange}
            rows={9}
            value={addresses
              .map(
                ({ address, separator, amount }) =>
                  `${address}${separator}${amount}`
              )
              .join("\r\n")}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default DisperseInput;
