export default function Button({ text, className }) {
  return (
    <button
      className={`${className} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
}