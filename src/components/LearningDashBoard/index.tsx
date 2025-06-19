import {FaPlay } from "react-icons/fa";
import MainButton from "../MainButton";
import ProgressCircle from "../ProgressCircle";
import fetchService from "@/utils/fetch";
import { currentUser } from "@clerk/nextjs/server";
import { Vocabulary} from '@/types/';


export default async function LearningDashBoard() {
  const clerkUser = await currentUser();
  const count = await fetchService.getVocTotalAndCount(clerkUser!.id)
  return (
    <div className=" py-5 px-4 w-full mx-auto flex justify-between items-center">
     <div className="flex justify-center items-center">
     <ProgressCircle total={count.total} count={count.count} />
     <p className="text-xs md:text-md">{count.count} mastered vocabularies.</p>
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
