export default function Status({ status }: { status: string }) {
  return (
    <div
      className={`flex justify-center items-center font-semibold capitalize text-xs ${
        status === "VERIFIED"
          ? "bg-green-100 rounded-full py-2 px-6 w-20 text-green-600"
          : status === "PENDING VERIFICATION"
          ? "bg-yellow-100 rounded-full py-2 px-2 text-yellow-400"
          : status === "UNVERIFIED"
          ? "bg-red-100 rounded-full p-2 px-2 w-24 text-red-500"
          : ""
      }`}
    >
      {status}
    </div>
  );
}
