import CloseButton from "../atoms/CloseButton";
import Button from "../atoms/Button";

export default function ViewRequest({ setView }: { setView: any }) {
  return (
    <div className="mt-10 max-w-md p-10 mx-auto bg-white shadow-xl shadow-neutral-100 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl">View Verification Request</div>
        <CloseButton onClick={() => setView(false)} />
      </div>
      <form className="mt-8 relative">
        <div className="mt-5">
          <div className="text-base text-gray-500">Document Type</div>
          <div className="text-sm">NID</div>
        </div>
        <div className="mt-3">
          <div className="text-base text-gray-500">Document Number</div>
          <div className="text-sm">1234567890</div>
        </div>
        <div className="mt-3">
          <div className="text-base text-gray-500">Document Image</div>
          <div className="text-sm">1234567890</div>
        </div>
        <div className="flex space-x-5 mt-5">
          <Button type="button" cancel>
            Reject verification
          </Button>
          <Button type="button">Verify Account</Button>
        </div>
      </form>
    </div>
  );
}
