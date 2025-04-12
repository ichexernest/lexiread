import {FaPlay } from "react-icons/fa";

export default function LearningDashBoard({}) {

  return (
    <div className=" py-24 px-4 shadow-lg rounded-xl bg-white/40 backdrop-blur-lg w-[720px] mx-auto">
      <div>90%</div>
          <button  className="rounded-full w-[60px] h-[60px] shadow-xl bg-white/40 text-2xl flex justify-center items-center backdrop-blur-lg hover:bg-white/60"><FaPlay/></button>
      
  </div>
  );
}