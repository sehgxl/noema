const PrimaryBtn = ({ btnText, handleClick, handleProps }) => {
  return (
    <button
      onClick={() => {
        handleClick(handleProps);
      }}
      className="w-full rounded-md bg-purple-500 text-lg text-slate-800"
    >
      {btnText}
    </button>
  );
};

export default PrimaryBtn;
