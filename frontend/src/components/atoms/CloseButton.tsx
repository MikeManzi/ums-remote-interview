import close from "../../assets/close.svg";

export default function CloseButton({ onClick }: { onClick?: any }) {
  return (
    <div
      className="bg-gray-100 rounded-lg p-3 cursor-pointer"
      onClick={onClick}
    >
      <img src={close} className="w-4" />
    </div>
  );
}
