export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-green-600"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
}