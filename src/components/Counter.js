"use client";
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled>
        Count: {count}
      </button>
      <div className="space-x-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setCount(count + 1)}
        >
          Count +
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={() => setCount(count - 1)}
        >
          Count --
        </button>
      </div>
    </div>
  );
}