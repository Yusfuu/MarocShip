export const Input = ({ label, type = 'text', name, value, onChange }: any) => {
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        autoComplete='off'
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        className='input-primary'></input>
    </div>
  );
};
