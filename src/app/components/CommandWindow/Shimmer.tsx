export function Shimmer() {
  return (
    <div className="animate-pulse space-y-3 px-3 py-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}
