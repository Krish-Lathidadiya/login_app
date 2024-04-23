import React from 'react';

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Error Page</h2>
        <p className="mt-4 text-lg text-gray-600">Oops! Something went wrong.</p>
        <div className="mt-6">
          <button className="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
