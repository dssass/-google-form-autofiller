// autofill.js

function runAutoFill(config) {
    console.log("🚀 執行【通用自動填寫腳本】...");

    // --- 輔助函式 ---
    function fillInput(inputElement, value) {
        if (!inputElement) return false;
        // 確保先觸發 React 的事件系統 (Google Form 使用 React)
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(inputElement, value);
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        return true;
    }

    // 處理特殊值，例如 [CURRENT_TIME]
    function processSpecialValue(value) {
        if (typeof value !== 'string') return value;

        if (value.toUpperCase() === '[CURRENT_TIME]') {
            const now = new Date();
            const hours = String(now.getHours());
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return { hours, minutes };
        }
        // 未來可以增加更多特殊值，例如 [RANDOM_NUMBER], [TODAY] 等
        return value;
    }


    // --- 主要邏輯 ---
    const allQuestionBlocks = document.querySelectorAll('[role="listitem"]');

    allQuestionBlocks.forEach(block => {
        // 找到問題標題 (更可靠的選擇器)
        const questionTitleElement = block.querySelector('[role="heading"]');
        if (!questionTitleElement) return;

        const questionText = questionTitleElement.textContent.trim();
        if (!questionText) return;

        // 在使用者的設定中尋找匹配的規則
        const rule = config.find(r => questionText.includes(r.question));
        if (!rule) return;

        console.log(`✅ 找到匹配規則: "${rule.question}"`);
        const answer = processSpecialValue(rule.answer);

        try {
            switch (rule.type) {
                case 'text':
                case 'textarea': {
                    const input = block.querySelector('input[type="text"], textarea');
                    if (input) fillInput(input, answer);
                    break;
                }

                case 'radio': {
                    const options = Array.from(block.querySelectorAll('[role="radio"]'));
                    let targetOption;
                    if (answer.toUpperCase() === '[RANDOM_CHOICE]') {
                        targetOption = options[Math.floor(Math.random() * options.length)];
                    } else {
                        targetOption = options.find(opt =>
                            opt.parentElement.textContent.trim().includes(answer)
                        );
                    }
                    if (targetOption) targetOption.click();
                    break;
                }

                case 'checkbox': {
                    const options = Array.from(block.querySelectorAll('[role="checkbox"]'));
                    const answers = Array.isArray(answer) ? answer : [answer];
                    options.forEach(opt => {
                        const label = opt.parentElement.textContent.trim();
                        if (answers.some(ans => label.includes(ans))) {
                            opt.click();
                        }
                    });
                    break;
                }

                case 'time': {
                    const hourInput = block.querySelector('input[aria-label="小時"]');
                    const minuteInput = block.querySelector('input[aria-label="分鐘"]');
                    if (hourInput && minuteInput && typeof answer === 'object') {
                        fillInput(hourInput, answer.hours);
                        fillInput(minuteInput, answer.minutes);
                    }
                    break;
                }

                case 'scale': { // 量表題 (例如 1 到 5 分)
                     const options = Array.from(block.querySelectorAll('[role="radio"]'));
                     let targetOption;
                     // 支援 "[RANDOM_CHOICE]" 或指定數字
                     if (answer.toUpperCase() === '[RANDOM_CHOICE]') {
                         targetOption = options[Math.floor(Math.random() * options.length)];
                     } else {
                         targetOption = options.find(opt => opt.getAttribute('data-value') === String(answer));
                     }
                     if (targetOption) targetOption.click();
                     break;
                }
            }
        } catch (e) {
            console.error(`處理 "${rule.question}" 時發生錯誤:`, e);
        }
    });

    console.log("✨ 本次頁面處理完畢！");
}
