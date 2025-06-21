# 通用 Google 表單自動填寫書籤工具 (Universal Google Form Auto-filler)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

這是一個強大且可自訂的書籤工具，讓你能夠為任何 Google 表單建立「填充規則」，並一鍵自動填寫。告別重複輸入學號、Email 和固定的答案！

## ✨ 特色

-   **無需安裝**：只是一個瀏覽器書籤，不需安裝任何擴充功能。
-   **高度自訂**：透過簡單的 JavaScript 設定檔，你可以定義任何問題的答案。
-   **支援多種題型**：文字、單選、複選、時間、量表題。
-   **智慧填充**：支援特殊值，例如 `[CURRENT_TIME]` 自動填入當前時間，`[RANDOM_CHOICE]` 隨機選擇選項。
-   **安全透明**：所有程式碼都開源在 GitHub，你可以清楚知道它做了什麼，沒有隱私風險。

## 🚀 安裝與設定 (3 個步驟)

### 步驟一：準備你的個人設定檔

首先，複製下面的設定檔範本。你需要根據**你想自動填寫的表單**來修改它。

```javascript
const myRules = [
    // --- 範例 1: 填寫文字 (例如 Email 或學號) ---
    {
        question: "電子郵件", // 表單上的問題「關鍵字」
        type: "text",
        answer: "your-email@example.com" // 在這裡填入「你的」答案
    },
    {
        question: "學號",
        type: "text",
        answer: "YOUR_STUDENT_ID" // 在這裡填入「你的」學號
    },
    {
        question: "姓名",
        type: "text",
        answer: "王大明"
    },
    // --- 範例 2: 選擇一個單選項目 ---
    {
        question: "您是否同意以上條款", // 問題關鍵字
        type: "radio",
        answer: "同意" // 選項的「完整文字」
    },
    {
        question: "您對本次活動的評價", // 隨機選擇一個選項
        type: "radio",
        answer: "[RANDOM_CHOICE]"
    },
    // --- 範例 3: 勾選多個複選項目 ---
    {
        question: "您感興趣的領域",
        type: "checkbox",
        answer: ["科技", "藝術", "運動"] // 將所有想勾選的項目文字放進來
    },
    // --- 範例 4: 填寫量表題 (例如 1-5 分) ---
    {
        question: "課程的整體滿意度",
        type: "scale",
        answer: 5 // 直接填寫分數 (數字)
    },
    // --- 範例 5: 填寫時間 ---
    {
        question: "填寫時間",
        type: "time",
        answer: "[CURRENT_TIME]" // 特殊指令：自動填入當前時間
    }
];

// ↓↓↓ 將你修改好的 myRules 貼在這裡 ↓↓↓
const myRules = [
  { question: "電子郵件", type: "text", answer: "your-email@example.com" },
  { question: "學號", type: "text", answer: "your-student-id" }
  // ... 其他規則
];
// ↑↑↑ 將你修改好的 myRules 貼在這裡 ↑↑↑


// --- 以下為核心程式碼，請勿修改 ---
function runAutoFill(config){console.log("🚀 執行【通用自動填寫腳本】...");function fillInput(inputElement,value){if(!inputElement)return!1;const nativeInputValueSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;return nativeInputValueSetter.call(inputElement,value),inputElement.dispatchEvent(new Event("input",{bubbles:!0})),!0}function processSpecialValue(value){if("string"!=typeof value)return value;if("[CURRENT_TIME]"===value.toUpperCase()){const now=new Date,hours=String(now.getHours()),minutes=String(now.getMinutes()).padStart(2,"0");return{hours,minutes}}return value}document.querySelectorAll('[role="listitem"]').forEach(block=>{const questionTitleElement=block.querySelector('[role="heading"]');if(questionTitleElement){const questionText=questionTitleElement.textContent.trim();if(questionText){const rule=config.find(r=>questionText.includes(r.question));if(rule){console.log(`✅ 找到匹配規則: "${rule.question}"`);const answer=processSpecialValue(rule.answer);try{switch(rule.type){case"text":case"textarea":{const input=block.querySelector('input[type="text"], textarea');input&&fillInput(input,answer);break}case"radio":{const options=Array.from(block.querySelectorAll('[role="radio"]'));let targetOption;"[RANDOM_CHOICE]"===answer.toUpperCase()?targetOption=options[Math.floor(Math.random()*options.length)]:targetOption=options.find(opt=>opt.parentElement.textContent.trim().includes(answer)),targetOption&&targetOption.click();break}case"checkbox":{const options=Array.from(block.querySelectorAll('[role="checkbox"]')),answers=Array.isArray(answer)?answer:[answer];options.forEach(opt=>{const label=opt.parentElement.textContent.trim();answers.some(ans=>label.includes(ans))&&opt.click()});break}case"time":{const hourInput=block.querySelector('input[aria-label="小時"]'),minuteInput=block.querySelector('input[aria-label="分鐘"]');hourInput&&minuteInput&&"object"==typeof answer&&(fillInput(hourInput,answer.hours),fillInput(minuteInput,answer.minutes));break}case"scale":{const options=Array.from(block.querySelectorAll('[role="radio"]'));let targetOption;"[RANDOM_CHOICE]"===answer.toUpperCase()?targetOption=options[Math.floor(Math.random()*options.length)]:targetOption=options.find(opt=>opt.getAttribute("data-value")===String(answer)),targetOption&&targetOption.click()}}}catch(e){console.error(`處理 "${rule.question}" 時發生錯誤:`,e)}}}}}),console.log("✨ 本次頁面處理完畢！")}runAutoFill(myRules);

步驟三：建立書籤
在你的瀏覽器（Chrome, Firefox, Edge 等）的書籤列上按右鍵，選擇「新增書籤」或「新增頁面」。
在「名稱」欄位，取一個你好記的名字，例如 自動填寫問卷。
在「網址 (URL)」欄位，貼上 javascript:，然後緊接著貼上你在步驟二組合好的全部程式碼。
它看起來會像這樣：javascript:const myRules=[...];function runAutoFill...
儲存書籤。
💡 如何使用
打開你想要填寫的 Google 表單頁面。
點擊一下你在書籤列上建立的那個書籤。
完成！表單已經根據你的規則自動填好了。
