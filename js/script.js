document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');

// テキストサイズの自動調整
    function adjustTextSize(textElement) {
        const text = textElement.textContent;
        const textLength = text.length;
        
        // 既存のサイズクラスを削除
        textElement.classList.remove('text-short', 'text-medium', 'text-long', 'text-very-long');
        
        // 文字数に応じてクラスを追加
        if (textLength <= 20) {
            textElement.classList.add('text-short');
        } else if (textLength <= 40) {
            textElement.classList.add('text-medium');
        } else if (textLength <= 80) {
            textElement.classList.add('text-long');
        } else {
            textElement.classList.add('text-very-long');
        }
    }

    // 全てのテキストのサイズを初期化
    function initializeTextSizes() {
        textItems.forEach(item => {
            const span = item.querySelector('span');
            if (span) {
                adjustTextSize(span);
            }
        });
    }

    initializeTextSizes();