import { use } from "react";
import VocItem from "@/components/VocItem";
import { Vocabulary } from "@/types";
import MainFunctionBar from "@/components/MainFunctionBar";

const newsList: Vocabulary[] = [
  {
    id: "1a2b3c",
    vocabulary: "apple",
    addDate: "2023-01-05",
    meaning: "a fruit",
    localizeMeaning: "(n.) 蘋果",
    example: "An apple a day keeps the doctor away.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "2d3e4f",
    vocabulary: "banana",
    addDate: "2023-02-12",
    meaning: "a yellow fruit",
    localizeMeaning: "(n.) 香蕉",
    example: "Monkeys love to eat bananas.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "3g4h5i",
    vocabulary: "cat",
    addDate: "2023-03-20",
    meaning: "a small domesticated carnivorous mammal",
    localizeMeaning: "(n.) 貓",
    example: "The cat jumped onto the windowsill.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "4j5k6l",
    vocabulary: "dog",
    addDate: "2023-04-03",
    meaning: "a domesticated canid",
    localizeMeaning: "(n.) 狗",
    example: "A dog is a man's best friend.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "5m6n7o",
    vocabulary: "elephant",
    addDate: "2023-05-10",
    meaning: "a large mammal with a trunk",
    localizeMeaning: "(n.) 大象",
    example: "The elephant walked slowly across the savannah.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "6p7q8r",
    vocabulary: "flower",
    addDate: "2023-06-18",
    meaning: "the seed-bearing part of a plant",
    localizeMeaning: "(n.) 花",
    example: "She picked a flower from the garden.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "7s8t9u",
    vocabulary: "guitar",
    addDate: "2023-07-22",
    meaning: "a stringed musical instrument",
    localizeMeaning: "(n.) 吉他",
    example: "He strummed the guitar gently.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "8v9w0x",
    vocabulary: "hat",
    addDate: "2023-08-11",
    meaning: "a head covering",
    localizeMeaning: "(n.) 帽子",
    example: "She wore a big sun hat to the beach.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "9y0z1a",
    vocabulary: "island",
    addDate: "2023-09-30",
    meaning: "a landmass surrounded by water",
    localizeMeaning: "(n.) 島嶼",
    example: "They spent their vacation on a tropical island.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "0b1c2d",
    vocabulary: "jungle",
    addDate: "2023-10-15",
    meaning: "a dense forest",
    localizeMeaning: "(n.) 叢林",
    example: "The jungle was full of exotic animals.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "1e2f3g",
    vocabulary: "kite",
    addDate: "2023-01-30",
    meaning: "a toy flown in the wind",
    localizeMeaning: "(n.) 風箏",
    example: "Children flew kites at the park.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "2h3i4j",
    vocabulary: "lemon",
    addDate: "2023-02-17",
    meaning: "a sour citrus fruit",
    localizeMeaning: "(n.) 檸檬",
    example: "Lemon juice is very sour.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "3k4l5m",
    vocabulary: "mountain",
    addDate: "2023-03-25",
    meaning: "a large natural elevation",
    localizeMeaning: "(n.) 山",
    example: "He climbed the highest mountain.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "4n5o6p",
    vocabulary: "notebook",
    addDate: "2023-04-28",
    meaning: "a book for writing notes",
    localizeMeaning: "(n.) 筆記本",
    example: "She wrote her thoughts in a notebook.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "5q6r7s",
    vocabulary: "orange",
    addDate: "2023-05-13",
    meaning: "a citrus fruit",
    localizeMeaning: "(n.) 柳橙",
    example: "He drank a glass of orange juice.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "6t7u8v",
    vocabulary: "penguin",
    addDate: "2023-06-05",
    meaning: "a flightless seabird",
    localizeMeaning: "(n.) 企鵝",
    example: "Penguins live in Antarctica.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "7w8x9y",
    vocabulary: "queen",
    addDate: "2023-07-19",
    meaning: "a female monarch",
    localizeMeaning: "(n.) 女王",
    example: "The queen waved to the crowd.",
    familiarity: 2,
    saved: true,
  },
  {
    id: "8z9a0b",
    vocabulary: "rainbow",
    addDate: "2023-08-03",
    meaning: "a multicolored arc in the sky",
    localizeMeaning: "(n.) 彩虹",
    example: "A rainbow appeared after the rain.",
    familiarity: 1,
    saved: true,
  },
  {
    id: "9c0d1e",
    vocabulary: "sand",
    addDate: "2023-09-08",
    meaning: "grains found on beaches",
    localizeMeaning: "(n.) 沙子",
    example: "Children built castles in the sand.",
    familiarity: 3,
    saved: true,
  },
  {
    id: "0f1g2h",
    vocabulary: "turtle",
    addDate: "2023-10-20",
    meaning: "a slow-moving reptile with a shell",
    localizeMeaning: "(n.) 烏龜",
    example: "The turtle slowly crossed the road.",
    familiarity: 2,
    saved: true,
  },
];


export default function Voc() {
  const fetchNews = async () => {
    return newsList;
  }
  
  const result = use(fetchNews());
  
  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <p className="text-3xl text-black p-10">Saved Vocabularies</p>
        {result.map((news) => (
          <VocItem key={news.id} item={news} />
        ))}
        
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      </div>
    </div>
  );
}