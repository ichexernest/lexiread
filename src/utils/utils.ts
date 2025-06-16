function selectVocabulariesByFamiliarity<T>(
  vocabularies: T[], 
  getFamiliarity: (item: T) => number,
  limit: number = 15
): T[] {
  // 如果總數不足 limit，直接返回所有單字
  if (vocabularies.length <= limit) {
    return vocabularies;
  }

  // 按照 familiarity 分組
  const groups = {
    level0: vocabularies.filter(v => getFamiliarity(v) === 0),    // 最不熟悉
    level1_2: vocabularies.filter(v => getFamiliarity(v) >= 1 && getFamiliarity(v) <= 2), // 中等不熟悉
    level3: vocabularies.filter(v => getFamiliarity(v) === 3),    // 中等熟悉
    level4: vocabularies.filter(v => getFamiliarity(v) === 4),    // 較熟悉
  };

  // 計算各級距的理想數量 (比例: 1-2 > 3 > 0 > 4)
  // 分配比例：40% (1-2), 30% (3), 20% (0), 10% (4)
  const idealCounts = {
    level1_2: Math.ceil(limit * 0.4),  // 6個
    level3: Math.ceil(limit * 0.3),    // 5個
    level0: Math.ceil(limit * 0.2),    // 3個
    level4: Math.ceil(limit * 0.1),    // 1個
  };

  const selected: T[] = [];

  // 從指定組別隨機挑選單字的輔助函數
  const pickFromGroup = (group: T[], maxCount: number): number => {
    const shuffled = [...group].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(maxCount, group.length));
    selected.push(...picked);
    return picked.length;
  };

  // 第一輪：按理想比例挑選
  pickFromGroup(groups.level1_2, idealCounts.level1_2);
  pickFromGroup(groups.level3, idealCounts.level3);
  pickFromGroup(groups.level0, idealCounts.level0);
  pickFromGroup(groups.level4, idealCounts.level4);

  // 計算還需要多少個單字
  const remaining = limit - selected.length;

  if (remaining > 0) {
    // 第二輪：從剩餘的單字中補充，維持優先順序
    const usedItems = new Set(selected);
    const remainingGroups = {
      level1_2: groups.level1_2.filter(v => !usedItems.has(v)),
      level3: groups.level3.filter(v => !usedItems.has(v)),
      level0: groups.level0.filter(v => !usedItems.has(v)),
      level4: groups.level4.filter(v => !usedItems.has(v)),
    };

    // 按優先順序補充
    let stillNeed = remaining;
    
    if (stillNeed > 0 && remainingGroups.level1_2.length > 0) {
      const picked = pickFromGroup(remainingGroups.level1_2, stillNeed);
      stillNeed -= picked;
    }
    
    if (stillNeed > 0 && remainingGroups.level3.length > 0) {
      const picked = pickFromGroup(remainingGroups.level3, stillNeed);
      stillNeed -= picked;
    }
    
    if (stillNeed > 0 && remainingGroups.level0.length > 0) {
      const picked = pickFromGroup(remainingGroups.level0, stillNeed);
      stillNeed -= picked;
    }
    
    if (stillNeed > 0 && remainingGroups.level4.length > 0) {
      pickFromGroup(remainingGroups.level4, stillNeed);
    }
  }

  // 最終隨機打亂順序，避免同級距的單字聚集在一起
  return selected.sort(() => 0.5 - Math.random()).slice(0, limit);
}

function generateSlug (title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替換為連字符
    .replace(/-+/g, '-') // 多個連字符合併為一個
    .trim()
    .substring(0, 100); // 限制長度
}
function formatDateToLocalString(
  isoString: string,
  locale = 'zh-TW',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Taipei',
  }
): string {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat(locale, options).format(date)
}
function debounce<T extends (...args: never[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function cleanWord  (word: string) { 
  // 檢查輸入是否有效
  if (!word || typeof word !== 'string') {
    return null
  }
  
  let cleaned = word.trim()
  if (!cleaned) {
    return null
  }

  cleaned = cleaned.replace(/^[^\w\s-]+/, '')
  cleaned = cleaned.replace(/[^\w\s-]+$/, '')

  if (!cleaned.trim()) {
    return null
  }
  
  cleaned = cleaned.toLowerCase()
  cleaned = cleaned.replace(/\s+/g, ' ')
  
  return cleaned
}

const utils = {
  selectVocabulariesByFamiliarity: selectVocabulariesByFamiliarity,
  generateSlug: generateSlug,
  formatDateToLocalString: formatDateToLocalString,
  debounce: debounce,
  cleanWord:cleanWord
}

export default utils;