import {FaPlay } from "react-icons/fa";
import MainButton from "../MainButton";
import ProgressCircle from "../ProgressCircle";
import { UserVocabulary as VocItemType } from '@/types/';
interface LearningDashBoardProps {
  initialVocs: VocItemType[];
}


export default function LearningDashBoard({ initialVocs }: LearningDashBoardProps) {
  const totalVocs = initialVocs.length;
  const masteredVocs = initialVocs.filter(voc => voc.familiarity >= 4).length;
  const progress = totalVocs > 0 ? (masteredVocs / totalVocs) * 100 : 0;
  return (
    <div className=" py-5 px-4 w-[720px] mx-auto flex justify-between items-center">
     <div className="flex justfy-center items-center">
     <ProgressCircle percent={progress} />
     <p>{masteredVocs} mastered vocabularies.</p>
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