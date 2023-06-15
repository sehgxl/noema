const PrimaryBtn = (props) => {
  return (
    <button
      onClick={() => {
        props.handleClick(props);
      }}
      className="w-full rounded-md bg-purple-500 text-lg text-slate-800"
    >
      {props.btnText}
    </button>
  );
};

export default PrimaryBtn;
