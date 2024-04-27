export default function MenuButton({
  handleClick,
  buttonText,
  type,
  rightBorder,
}) {
  const padding = type === "icon" ? "p-4" : "px-4 py-2";
  const border =
    rightBorder === "none"
      ? "border-none"
      : "!border-r-[0.5px] border-gray-700";

  return (
    <span
      className={`cursor-pointer select-none ${border} ${padding} duration-150 ease-in-out hover:bg-gray-200`}
      onClick={handleClick}
    >
      {buttonText}
    </span>
  );
}
