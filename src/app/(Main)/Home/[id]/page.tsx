'use client'

import MainFunctionBar from "@/components/MainFunctionBar";
import { Article } from "@/types";
import React,{ useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import VocCard from "@/components/VocCard";

const newsList: Article = { 
  id:"1sdf",
  title: "Richard Chamberlain, Shogun star, dies aged.90.", 
  date: "2023-10-01",
  author: "John Doe",
  image: "https://picsum.photos/800/600",
};

// 可點擊單字元件
const ClickableWord = ({ word, onClick }: { word: string; onClick: (word: string) => void }) => {
  return (
    <span 
      className="inline-block cursor-pointer hover:bg-blue-100 px-0.5 rounded transition-colors"
      onClick={() => onClick(word)}
    >
      {word}
    </span>
  );
};

export default function HomeArticle() {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => { 
    const fetchNewsContent = async () => {
      try {
        // 在實際應用中，這裡應該從 API 獲取內容
        // 這裡為了簡化，直接返回硬編碼的內容
        const newsContent = `Distance runner Ben Connor says he has declined to race for Great Britain at the European Road Running Championships after being asked to pay to compete.

Connor - who was part of Team GB at the Tokyo 2020 Olympics - had been selected to run the half marathon in Leuven, Belgium in April.

In its selection policy, UK Athletics asks athletes for a fee of up to £1,100 to cover things like travel, accommodation, food, kit and staff.

Connor wrote in a post on Instagram that England Athletics have offered to subsidise the cost, "to which I'm sure many are grateful".

But the 32-year-old added that he felt "representing GB shouldn't come down to who can or cannot afford to pay for it".

"Representing your country is a privilege, and in athletics is earned via a qualifying process, which while not always perfect, gives everyone the same chances to gain selection," Connor wrote.

"Coming from a working class background I don't like the potential precedent being set where people, especially junior athletes of the future, don't have the same development or competition opportunities because of finances.

"I wish there was more transparency and honesty regarding the state of our governing bodies finances and about how our sport is being managed for this to be the position."

In a statement, UK Athletics (UKA) said the fee is likely to be under £500 and that athletes were aware of the cost when expressing an interest in competing.

It added that as more competitions get added to the calendar it is "impossible" to fund all teams.

"Upon selection athletes were also advised that the earlier 'maximum contribution amount' of £1,100, was likely to be under £500 and in some cases around the £2-250 mark with a further contribution from their home country athletics organisation," the statement read.

"UKA feels it is better to give athletes opportunity to compete than opt not to send teams at all."

World 1500m silver medallist and now commentator Hannah England says the idea of athletes being priced out of competing is "really worrying and sad" but there is just not enough money to go around.

"£20m of UK Sport funding goes to UK Athletics and it then asks athletes to pay to compete. That does not look like a good narrative," England told BBC 5 Live Breakfast.

"But that funding is audited and has to go towards producing Olympic medals. This is a new championship so there is no precedent for Olympians coming from that event.

"So it is either ask people to contribute or they don't send a team. And that is really hard for people to stomach."

The Championships are one of a number of events in which UK Athletics is asking for a contribution, with up to £200 listed for July's European Under-23 Championships in Bergen.

In the policy for that event, UK Athletics says: "We recognise that the financial commitment associated can present challenges for some athletes. To address this, the UKA Performance Pathway team is committed to working closely with athletes facing financial hardship to explore solutions that enable their involvement."`;

        setContent(newsContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch news content:", error);
        setIsLoading(false);
      }
    };

    fetchNewsContent();
  }, []);
  
  // 處理點擊單字事件
  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    // 這裡可以加入您需要的其他邏輯，例如查詢單字意思、翻譯等
    console.log(`Word clicked: ${word}`);
  };

  // 將內容分割成段落，然後每個段落再分割成單字
const renderClickableContent = () => {
  // 按段落分割，並修剪每個段落的前導空白
  const paragraphs = content.split('\n\n').map(p => p.trim());
  
  return paragraphs.map((paragraph, pIndex) => {
    // 使用正則表達式保留標點符號，但將它們從單字中分離出來
    const parts = paragraph.split(/(\s+|[.,\"'\(\):;])/);
    
    return (
      <p key={pIndex} className="mb-4 leading-relaxed text-gray-800">
        {parts.map((part, partIndex) => {
          // 檢查是否為空白或標點符號
          const isWhitespaceOrPunctuation = /^\s+$|^[.,\"'\(\):;]$/.test(part);
          
          // 如果是空白或標點符號，直接返回，否則返回可點擊的單字
          return isWhitespaceOrPunctuation ? (
            <React.Fragment key={`${pIndex}-${partIndex}`}>{part}</React.Fragment>
          ) : (
            <ClickableWord 
              key={`${pIndex}-${partIndex}`} 
              word={part} 
              onClick={handleWordClick} 
            />
          );
        })}
      </p>
    );
  });
};

  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <div className="flex justify-start items-center w-full pt-10 px-5 md:px-0">
          <h1 className="text-3xl font-bold text-black">{newsList.title}</h1>
        </div>
        <div className="flex justify-between items-center w-full  px-5 md:px-0">
                        <div className="flex gap-2">
                          <p>{newsList.author}</p>
                          <p>{newsList.date}</p>
                        </div>
                        <button className="p-5 rounded-full hover:bg-white"><FaBookmark /></button>
                      </div>
        <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
          <img className="w-full rounded-xl my-5" src={newsList.image} alt={newsList.title} />
          <article className="text-lg">
            {renderClickableContent()}
          </article>
          
          {/* 顯示選中的單字 */}
          {selectedWord && (
            <VocCard selectedWord={selectedWord} onClose={() => setSelectedWord(null)} />
          )}
        </div>
        
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      </div>
    </div>
  );
}