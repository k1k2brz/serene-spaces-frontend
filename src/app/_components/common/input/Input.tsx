interface InputProps {
  isError?: string;
  className?: string;
  value: string;
  type?: 'text' | 'number' | 'password' | 'email';
  onChange: (...args: any) => void;
}

export const Input = ({ isError, className = '', type = 'text', value, onChange }: InputProps) => {
  const props = {
    value,
    type,
    onChange,
  };

  return (
    <div>
      <input
        className={`w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-serene-500 ${isError ? 'border-red-500' : ''} ${className} `}
        {...props}
      />
    </div>
  );
};
