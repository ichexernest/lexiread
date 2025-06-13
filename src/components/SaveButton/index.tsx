'use client'

import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import MainButton from "../MainButton";
import { toggleSaveItem } from "@/actions/saveItems"
interface SaveButtonProps {
    isSaved: boolean,
    saveType: string,
    saveId: string
}
export default function SaveButton({
    isSaved,
    saveType,
    saveId
}: SaveButtonProps) {
    const [saved, setSaved] = useState<boolean>(isSaved);
    const [loading, setLoading] = useState<boolean>(false);



const handleClick = async () => {
    if (loading) return
    setLoading(true)
    console.log('handleClick', saveType, saveId, saved)
    const result = await toggleSaveItem(saveType, saveId, saved ? 'unsave' : 'save')
    if (result.success) {
      setSaved(!saved)
    } else {
      alert(result.message || '操作失敗')
    }

    setLoading(false)
  }


    return (
            <>
                {loading ? (
                    <div className="animate-spin rounded-full w-[40px] h-[40px] border-b-2 border-white"></div>
                ) : (
                    <MainButton size="sm" icon={saved ? <FaBookmark className="text-secondary" /> : <FaBookmark className="text-gray-300"/>} hint={saved ? "Unsave" : "Save"} haveHint={true} onClick={handleClick} />
                )}
            </>
    );
}
