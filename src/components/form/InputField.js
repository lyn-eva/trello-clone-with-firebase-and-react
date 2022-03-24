function InputField({ id, value, placeholder, type, error, onChange }) {
  return (
    <div className="mt-6">
      <label className="block ml-1" htmlFor={id}>
        {id}
      </label>
      {error && <small className="text-red-400 block -mb-1">{error}</small>}
      <input
        onChange={onChange}
        value={value}
        id={id}
        type={type || ""}
        placeholder={placeholder}
        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-clr-cyan"
      />
    </div>
  );
}

export default InputField;
