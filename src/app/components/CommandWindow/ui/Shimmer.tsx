export function Shimmer() {
  return (
    <div className="animate-pulse space-y-3 px-5 py-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-100 rounded"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        <div className="h-4 bg-gray-100 rounded w-4/6"></div>
      </div>
    </div>
  );
}
