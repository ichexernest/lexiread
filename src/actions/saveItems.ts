'use server'

import { addVocabularyByUser, addArticleByUser, removeVocabularyByUser, removeArticleByUser } from "@/prisma-db"
import { currentUser } from "@clerk/nextjs/server"  

export async function toggleSaveItem(saveType: string, saveId: string, action: 'save' | 'unsave') {
  const user = await currentUser();
  if (!user) return { success: false, message: 'Not logged in' }

  try {
    if (action === 'save') {
      if (saveType === 'voc') await addVocabularyByUser(user.id, saveId) //publicVocabularyId
      if (saveType === 'article') await addArticleByUser(user.id , saveId) // publicArticleId
    } else {
      if (saveType === 'voc') await removeVocabularyByUser(user.id, saveId)
      if (saveType === 'article') await removeArticleByUser(user.id, saveId)
    }

    return { success: true }
  } catch (err) {
    console.error('Server action error:', err)
    return { success: false, message: 'Server error' }
  }
}