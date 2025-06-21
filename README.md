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
javascript:(function(){const e={enableRandomFallback:!0},t=[{question:"授權意願",type:"radio",answer:"我已了解並同意"},{question:"email",type:"text",answer:"你的gmail "},{question:"學號後三碼",type:"text",answer:"176549"},{question:"您的學號",type:"text",answer:"你的學號 "},{question:"作答之時間",type:"time",answer:"[CURRENT_TIME]"}];console.log("🚀 執行【天才混合腳本 - 指令優先版】...");let n=0,o=0,a=0;const l=/選\s*[\[「](\d+)[\]」]/;function s(e,t){if(!e)return!1;const n=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;return n.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),!0}function c(e){if("string"!=typeof e)return e;if("[CURRENT_TIME]"===e.toUpperCase()){const e=new Date;let t=e.getHours();const n=String(e.getMinutes()).padStart(2,"0");return t>12&&(t-=12),0===t&&(t=12),{hours:String(t),minutes:n}}return e}document.querySelectorAll('[role="listitem"]').forEach(i=>{const r=i.querySelector('[role="heading"]');if(!r)return;const d=r.parentElement.textContent||"",u=d.match(l);if(u){console.log(`🎯 特殊指令填充: 選 "${u[1]}"`);const e=i.querySelectorAll('[role="radio"]'),t=Array.from(e).find(e=>e.getAttribute("data-value")===u[1]);t&&t.click(),a++}else{const l=r.textContent.trim();if(!l)return;const d=t.find(e=>l.includes(e.question));if(d){console.log(`✅ 規則填充: "${d.question}"`);const t=c(d.answer);switch(d.type){case"text":case"textarea":{const e=i.querySelector('input[type="text"], textarea');e&&s(e,t);break}case"radio":{const e=Array.from(i.querySelectorAll('[role="radio"]'));let n;"[RANDOM_CHOICE]"===t.toUpperCase()?n=e[Math.floor(Math.random()*e.length)]:n=e.find(e=>e.parentElement.textContent.trim().includes(t)),n&&n.click();break}case"checkbox":{const e=Array.from(i.querySelectorAll(%27[role="checkbox"]%27)),n=Array.isArray(t)?t:[t];e.forEach(e=>{const o=e.parentElement.textContent.trim();n.some(e=>o.includes(e))&&e.click()});break}case"time":{const e=i.querySelectorAll(%27input[type="text"]%27);if(e.length>=2){const n=e[0],o=e[1];"object"==typeof t&&(s(n,t.hours),s(o,t.minutes))}break}case"scale":{const e=Array.from(i.querySelectorAll(%27[role="radio"]%27));let n;"[RANDOM_CHOICE]"===t.toUpperCase()?n=e[Math.floor(Math.random()*e.length)]:n=e.find(e=>e.getAttribute("data-value")===String(t)),n&&n.click()}}n++}else if(e.enableRandomFallback){const t=i.querySelector(%27[role="radiogroup"]%27);if(t){const e=t.querySelectorAll(%27[role="radio"]%27);e.length>2&&(e[Math.floor(Math.random()*e.length)].click(),o++)}}}}),console.log(`✨ 本次頁面處理完畢！(指令填充: ${a}, 規則填充: ${n}, 隨機填充: ${o})`)})();
```


### 步驟二：組合最終腳本

![image](https://github.com/user-attachments/assets/ff28e73e-0acf-48d2-80c8-be1bb9ef90a6)

將你在上一步驟修改好後的全部程式碼再次完整複製。
在你的瀏覽器（Chrome, Firefox, Edge 等）的書籤列上按右鍵，選擇「新增書籤」。
名稱：取一個你好記的名字，例如 自動填寫問卷。
網址 (URL)：直接貼上你剛剛複製的所有內容。
儲存書籤。
提示：因為程式碼開頭已經包含了 javascript:，所以你不需要手動輸入，直接整段貼上即可！

### 步驟三：建立書籤
在你的瀏覽器（Chrome, Firefox, Edge 等）的書籤列上按右鍵，選擇「新增書籤」或「新增頁面」。
在「名稱」欄位，取一個你好記的名字，例如 自動填寫問卷。
在「網址 (URL)」欄位，貼上 javascript:，然後緊接著貼上你在步驟二組合好的全部程式碼。
它看起來會像這樣：javascript:const myRules=[...];function runAutoFill...
儲存書籤。
💡 如何使用
打開你想要填寫的 Google 表單頁面。
點擊一下你在書籤列上建立的那個書籤。
完成！表單已經根據你的規則自動填好了。
