import {FaPlay } from "react-icons/fa";
import MainButton from "../MainButton";
import ProgressCircle from "../ProgressCircle";

export default function LearningDashBoard({}) {

  return (
    <div className=" py-5 px-4 w-[720px] mx-auto flex justify-between items-center">
     <div className="flex justfy-center items-center">
     <ProgressCircle percent={90} />
     <p>959 mastered vocabularies.</p>
     </div>
                <MainButton
                  key={"/Quiz"}
                  href={"/Quiz"}
                  icon={<FaPlay />}
                  hint={"Quiz"}
                  haveHint={true}
                />
  </div>
  );
}