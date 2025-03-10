export default function PageHeaderWithAction({
  title,
  action,
  actionText,
}: {
  title: string;
  action: () => void;
  actionText: string;
}) {
  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div className="mt-3 sm:mt-0 sm:ml-4">
        <button
          type="button"
          onClick={() => action()}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}
