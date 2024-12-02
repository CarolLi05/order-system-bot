export default function OrderCard() {
  return (
    <div className="rounded-md border p-4">
      <p className="text-lg font-bold mb-2">
        Order Card #1
        <span className="px-2 py-1 rounded-full text-sm text-white bg-orange-500 ml-2">
          Normal
        </span>
      </p>
      <span className="inline-flex algin-items-center justify-content-center px-2 py-1 rounded-full text-sm text-white bg-orange-500">
        status
      </span>
    </div>
  );
}
