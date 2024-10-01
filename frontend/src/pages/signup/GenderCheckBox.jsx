const GenderCheckBox = ({ onCheckBoxChange, selectGender }) => {
  return (
    <div className="flex mt-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${
            selectGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>
      <div>
        <label
          className={`label gap-2 cursor-pointer ${
            selectGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;

// STARTER CODE FOR THE GENDERCHECKBOX COMPONENT

// const GenderCheckBox = () => {
//     return (
//       <div className="flex mt-2">
//         <div className="form-control">
//           <label className="label gap-2 cursor-pointer">
//             <span className="label-text">Male</span>
//             <input type="checkbox" className="checkbox border-slate-900" />
//           </label>
//         </div>
//         <div>
//           <label className="label gap-2 cursor-pointer">
//             <span className="label-text">Female</span>
//             <input type="checkbox" className="checkbox border-slate-900" />
//           </label>
//         </div>
//       </div>
//     );
//   };

//   export default GenderCheckBox;
