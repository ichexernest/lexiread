'use client'

import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import MainButton from "../MainButton"; // Adjust the path based on your project structure

export default function SaveButton({
    isSaved,
    saveType,
    saveId
}: {
    isSaved: boolean;
    saveType: string;
    saveId: string;
}) {
    const [saved, setSaved] = useState<boolean>(isSaved);
    const [loading, setLoading] = useState<boolean>(false);

    async function saveItem(saveType: string, saveId: string) {
        console.log(`Saving ${saveType}-${saveId}...`);
        await new Promise(res => setTimeout(res, 500));
    }

    async function unsaveItem(saveType: string, saveId: string) {
        console.log(`Unsaving ${saveType}-${saveId}...`);
        await new Promise(res => setTimeout(res, 500));
    }

    const handleClick = async () => {
        if (loading) return;
        setLoading(true);
        if (saved) {
            await unsaveItem(saveType, saveId);
            setSaved(false);
        } else {
            await saveItem(saveType, saveId);
            setSaved(true);
        }
        setLoading(false);
    };


    return (
            <>
                {loading ? (
                    <div className="animate-spin rounded-full w-[40px] h-[40px] border-b-2 border-white"></div>
                ) : (
                    <MainButton size="sm" icon={saved ? <FaBookmark className="text-[#d89024]" /> : <FaBookmark className="text-gray-300"/>} hint={saved ? "Unsave" : "Save"} haveHint={true} onClick={handleClick} />
                )}
            </>
    );
}
