// src/hooks/useVocs.ts
import { useEffect, useState, useCallback } from "react";
import { Vocabulary } from "@/types";

const ALL_VOCS: Vocabulary[] = [
    {
      "id": "63cf470d",
      "vocabulary": "umbrella",
      "addDate": "2023-09-13",
      "meaning": "a device for protection from rain",
      "localizeMeaning": "(n.) 雨傘",
      "example": "She opened her umbrella during the downpour.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "43fc2acb",
      "vocabulary": "eagle",
      "addDate": "2023-01-29",
      "meaning": "a large bird of prey",
      "localizeMeaning": "(n.) 老鷹",
      "example": "The eagle soared high above.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "c2eda64e",
      "vocabulary": "igloo",
      "addDate": "2023-12-06",
      "meaning": "a dome-shaped Eskimo house",
      "localizeMeaning": "(n.) 冰屋",
      "example": "The igloo kept them warm.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "911ccfbb",
      "vocabulary": "hammer",
      "addDate": "2023-12-03",
      "meaning": "a tool with a heavy head",
      "localizeMeaning": "(n.) 鐵鎚",
      "example": "He used a hammer to fix the nail.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "f3ddfb8a",
      "vocabulary": "yacht",
      "addDate": "2023-10-21",
      "meaning": "a medium-sized sailing boat",
      "localizeMeaning": "(n.) 遊艇",
      "example": "They sailed their yacht across the bay.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "905c7591",
      "vocabulary": "whale",
      "addDate": "2023-02-14",
      "meaning": "a large marine mammal",
      "localizeMeaning": "(n.) 鯨魚",
      "example": "The whale breached the ocean surface.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "f41b0e4c",
      "vocabulary": "key",
      "addDate": "2023-06-18",
      "meaning": "a tool for unlocking",
      "localizeMeaning": "(n.) 鑰匙",
      "example": "He lost his key.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "c42cf7cf",
      "vocabulary": "xylophone",
      "addDate": "2023-12-07",
      "meaning": "a musical instrument",
      "localizeMeaning": "(n.) 木琴",
      "example": "She learned to play the xylophone.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "1b24680f",
      "vocabulary": "airplane",
      "addDate": "2023-07-23",
      "meaning": "a powered flying vehicle",
      "localizeMeaning": "(n.) 飛機",
      "example": "The airplane took off smoothly.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "3a20f8de",
      "vocabulary": "violin",
      "addDate": "2023-12-16",
      "meaning": "a string instrument",
      "localizeMeaning": "(n.) 小提琴",
      "example": "He played the violin beautifully.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "861a4b43",
      "vocabulary": "glasses",
      "addDate": "2023-12-30",
      "meaning": "eyewear for vision correction",
      "localizeMeaning": "(n.) 眼鏡",
      "example": "He put on his glasses to read.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "de6fb894",
      "vocabulary": "book",
      "addDate": "2023-04-29",
      "meaning": "a set of written pages",
      "localizeMeaning": "(n.) 書",
      "example": "He read a thrilling book.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "d0ba1ff5",
      "vocabulary": "zebra",
      "addDate": "2023-08-13",
      "meaning": "an African wild horse with black-and-white stripes",
      "localizeMeaning": "(n.) 斑馬",
      "example": "The zebra grazed in the savanna.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "92059ae3",
      "vocabulary": "jacket",
      "addDate": "2023-04-18",
      "meaning": "an outer garment",
      "localizeMeaning": "(n.) 外套",
      "example": "She wore a warm jacket.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "a2e90f71",
      "vocabulary": "candle",
      "addDate": "2023-07-09",
      "meaning": "a source of light made of wax",
      "localizeMeaning": "(n.) 蠟燭",
      "example": "The candle flickered in the dark.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "5a79f50d",
      "vocabulary": "nest",
      "addDate": "2023-03-31",
      "meaning": "a bird's home",
      "localizeMeaning": "(n.) 鳥巢",
      "example": "The nest was in the tree.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "db61a67e",
      "vocabulary": "drum",
      "addDate": "2023-01-16",
      "meaning": "a percussion instrument",
      "localizeMeaning": "(n.) 鼓",
      "example": "He beat the drum rhythmically.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "6fa91084",
      "vocabulary": "fan",
      "addDate": "2023-10-01",
      "meaning": "a device for creating airflow",
      "localizeMeaning": "(n.) 電風扇",
      "example": "She turned on the fan.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "d9860837",
      "vocabulary": "mirror",
      "addDate": "2023-12-19",
      "meaning": "a reflective surface",
      "localizeMeaning": "(n.) 鏡子",
      "example": "She looked in the mirror.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "f25ae221",
      "vocabulary": "ladder",
      "addDate": "2023-07-08",
      "meaning": "a climbing tool",
      "localizeMeaning": "(n.) 梯子",
      "example": "She climbed the ladder.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "9cbd74f6",
      "vocabulary": "mirror",
      "addDate": "2023-04-14",
      "meaning": "a reflective surface",
      "localizeMeaning": "(n.) 鏡子",
      "example": "She looked in the mirror.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "33d39fd2",
      "vocabulary": "igloo",
      "addDate": "2023-01-20",
      "meaning": "a dome-shaped Eskimo house",
      "localizeMeaning": "(n.) 冰屋",
      "example": "The igloo kept them warm.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "21d1c680",
      "vocabulary": "glasses",
      "addDate": "2023-04-15",
      "meaning": "eyewear for vision correction",
      "localizeMeaning": "(n.) 眼鏡",
      "example": "He put on his glasses to read.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "aec6433d",
      "vocabulary": "umbrella",
      "addDate": "2023-11-24",
      "meaning": "a device for protection from rain",
      "localizeMeaning": "(n.) 雨傘",
      "example": "She opened her umbrella during the downpour.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "f7fff479",
      "vocabulary": "candle",
      "addDate": "2023-05-07",
      "meaning": "a source of light made of wax",
      "localizeMeaning": "(n.) 蠟燭",
      "example": "The candle flickered in the dark.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "3446b215",
      "vocabulary": "ladder",
      "addDate": "2023-04-27",
      "meaning": "a climbing tool",
      "localizeMeaning": "(n.) 梯子",
      "example": "She climbed the ladder.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "b08d9fa8",
      "vocabulary": "drum",
      "addDate": "2023-03-08",
      "meaning": "a percussion instrument",
      "localizeMeaning": "(n.) 鼓",
      "example": "He beat the drum rhythmically.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "1c39f199",
      "vocabulary": "book",
      "addDate": "2023-08-08",
      "meaning": "a set of written pages",
      "localizeMeaning": "(n.) 書",
      "example": "He read a thrilling book.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "ef5a083e",
      "vocabulary": "yacht",
      "addDate": "2023-01-26",
      "meaning": "a medium-sized sailing boat",
      "localizeMeaning": "(n.) 遊艇",
      "example": "They sailed their yacht across the bay.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "ace21d78",
      "vocabulary": "fan",
      "addDate": "2023-03-09",
      "meaning": "a device for creating airflow",
      "localizeMeaning": "(n.) 電風扇",
      "example": "She turned on the fan.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "43a80437",
      "vocabulary": "eagle",
      "addDate": "2023-12-20",
      "meaning": "a large bird of prey",
      "localizeMeaning": "(n.) 老鷹",
      "example": "The eagle soared high above.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "f1fee2ce",
      "vocabulary": "xylophone",
      "addDate": "2023-07-13",
      "meaning": "a musical instrument",
      "localizeMeaning": "(n.) 木琴",
      "example": "She learned to play the xylophone.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "9dc9b766",
      "vocabulary": "key",
      "addDate": "2023-12-06",
      "meaning": "a tool for unlocking",
      "localizeMeaning": "(n.) 鑰匙",
      "example": "He lost his key.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "581b7857",
      "vocabulary": "jacket",
      "addDate": "2023-06-05",
      "meaning": "an outer garment",
      "localizeMeaning": "(n.) 外套",
      "example": "She wore a warm jacket.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "105bff67",
      "vocabulary": "whale",
      "addDate": "2023-12-19",
      "meaning": "a large marine mammal",
      "localizeMeaning": "(n.) 鯨魚",
      "example": "The whale breached the ocean surface.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "fd7be6f7",
      "vocabulary": "hammer",
      "addDate": "2023-02-05",
      "meaning": "a tool with a heavy head",
      "localizeMeaning": "(n.) 鐵鎚",
      "example": "He used a hammer to fix the nail.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "2f9a5ae6",
      "vocabulary": "zebra",
      "addDate": "2023-12-22",
      "meaning": "an African wild horse with black-and-white stripes",
      "localizeMeaning": "(n.) 斑馬",
      "example": "The zebra grazed in the savanna.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "e11bc201",
      "vocabulary": "airplane",
      "addDate": "2023-07-28",
      "meaning": "a powered flying vehicle",
      "localizeMeaning": "(n.) 飛機",
      "example": "The airplane took off smoothly.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "34b577d1",
      "vocabulary": "violin",
      "addDate": "2023-06-25",
      "meaning": "a string instrument",
      "localizeMeaning": "(n.) 小提琴",
      "example": "He played the violin beautifully.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "93e81371",
      "vocabulary": "nest",
      "addDate": "2023-09-25",
      "meaning": "a bird's home",
      "localizeMeaning": "(n.) 鳥巢",
      "example": "The nest was in the tree.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "234506c2",
      "vocabulary": "candle",
      "addDate": "2023-07-14",
      "meaning": "a source of light made of wax",
      "localizeMeaning": "(n.) 蠟燭",
      "example": "The candle flickered in the dark.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "3b9fa021",
      "vocabulary": "ladder",
      "addDate": "2023-04-15",
      "meaning": "a climbing tool",
      "localizeMeaning": "(n.) 梯子",
      "example": "She climbed the ladder.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "519fb2ac",
      "vocabulary": "glasses",
      "addDate": "2023-08-05",
      "meaning": "eyewear for vision correction",
      "localizeMeaning": "(n.) 眼鏡",
      "example": "He put on his glasses to read.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "10f2e6c1",
      "vocabulary": "xylophone",
      "addDate": "2023-08-17",
      "meaning": "a musical instrument",
      "localizeMeaning": "(n.) 木琴",
      "example": "She learned to play the xylophone.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "0eb45084",
      "vocabulary": "violin",
      "addDate": "2023-05-22",
      "meaning": "a string instrument",
      "localizeMeaning": "(n.) 小提琴",
      "example": "He played the violin beautifully.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "02ff425a",
      "vocabulary": "mirror",
      "addDate": "2023-07-30",
      "meaning": "a reflective surface",
      "localizeMeaning": "(n.) 鏡子",
      "example": "She looked in the mirror.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "8c4dfd87",
      "vocabulary": "drum",
      "addDate": "2023-08-02",
      "meaning": "a percussion instrument",
      "localizeMeaning": "(n.) 鼓",
      "example": "He beat the drum rhythmically.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "cf28a85d",
      "vocabulary": "hammer",
      "addDate": "2023-12-02",
      "meaning": "a tool with a heavy head",
      "localizeMeaning": "(n.) 鐵鎚",
      "example": "He used a hammer to fix the nail.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "c0d39351",
      "vocabulary": "key",
      "addDate": "2023-02-11",
      "meaning": "a tool for unlocking",
      "localizeMeaning": "(n.) 鑰匙",
      "example": "He lost his key.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "a24f4609",
      "vocabulary": "nest",
      "addDate": "2023-05-07",
      "meaning": "a bird's home",
      "localizeMeaning": "(n.) 鳥巢",
      "example": "The nest was in the tree.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "df416d78",
      "vocabulary": "igloo",
      "addDate": "2023-05-15",
      "meaning": "a dome-shaped Eskimo house",
      "localizeMeaning": "(n.) 冰屋",
      "example": "The igloo kept them warm.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "6c59e01e",
      "vocabulary": "zebra",
      "addDate": "2023-01-05",
      "meaning": "an African wild horse with black-and-white stripes",
      "localizeMeaning": "(n.) 斑馬",
      "example": "The zebra grazed in the savanna.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "31d17e7e",
      "vocabulary": "eagle",
      "addDate": "2023-05-22",
      "meaning": "a large bird of prey",
      "localizeMeaning": "(n.) 老鷹",
      "example": "The eagle soared high above.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "bd274a73",
      "vocabulary": "airplane",
      "addDate": "2023-03-26",
      "meaning": "a powered flying vehicle",
      "localizeMeaning": "(n.) 飛機",
      "example": "The airplane took off smoothly.",
      "familiarity": 2,
      "saved": true
    },
    {
      "id": "09c4a6ce",
      "vocabulary": "whale",
      "addDate": "2023-02-26",
      "meaning": "a large marine mammal",
      "localizeMeaning": "(n.) 鯨魚",
      "example": "The whale breached the ocean surface.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "21437ccb",
      "vocabulary": "umbrella",
      "addDate": "2023-12-16",
      "meaning": "a device for protection from rain",
      "localizeMeaning": "(n.) 雨傘",
      "example": "She opened her umbrella during the downpour.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "e1da6ee8",
      "vocabulary": "fan",
      "addDate": "2023-09-20",
      "meaning": "a device for creating airflow",
      "localizeMeaning": "(n.) 電風扇",
      "example": "She turned on the fan.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "1657bd23",
      "vocabulary": "jacket",
      "addDate": "2023-06-09",
      "meaning": "an outer garment",
      "localizeMeaning": "(n.) 外套",
      "example": "She wore a warm jacket.",
      "familiarity": 1,
      "saved": true
    },
    {
      "id": "4e142232",
      "vocabulary": "yacht",
      "addDate": "2023-06-30",
      "meaning": "a medium-sized sailing boat",
      "localizeMeaning": "(n.) 遊艇",
      "example": "They sailed their yacht across the bay.",
      "familiarity": 3,
      "saved": true
    },
    {
      "id": "904b1726",
      "vocabulary": "book",
      "addDate": "2023-12-07",
      "meaning": "a set of written pages",
      "localizeMeaning": "(n.) 書",
      "example": "He read a thrilling book.",
      "familiarity": 3,
      "saved": true
    }
  ]
  

const PAGE_SIZE = 20;

export function useVocs() {
  const [data, setData] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 300)); // 模擬延遲

    const start = page * PAGE_SIZE;
    const next = ALL_VOCS.slice(start, start + PAGE_SIZE);

    setData((prev) => [...prev, ...next]);
    setPage((p) => p + 1);
    setHasMore(start + PAGE_SIZE < ALL_VOCS.length);
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadMore(); // 第一次進來先載入一頁
  }, []);

  return { data, loading, loadMore, hasMore };
}
