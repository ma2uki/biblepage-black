
// 1. グローバルな変数の定義
const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

// 2. Intersection Observerの設定（他の処理に依存しない）
const animateFade = (entries, obs) => {
    // ... fade animation code ...
};
const fadeObserver = new IntersectionObserver(animateFade);

// 3. DOMContentLoadedイベントでの初期化処理
document.addEventListener('DOMContentLoaded', function () {
    // ページめくり機能の初期化
    const items = document.querySelectorAll('.text-item');
    // ... page turning code ...

    // Particles初期化
    if (window.particlesJS) {
        particlesJS('particles-ga', {
            // ... particles config ...
        });
    }

    // fade elementsの監視開始
    const fadeElements = document.querySelectorAll('.fadein');
    fadeElements.forEach((fadeElement) => {
        fadeObserver.observe(fadeElement);
    });
});

// 4. windowのload時の処理（最後のローディング）
window.addEventListener('load', () => {
    // ローディングアニメーション
    // ... loading animation code ...
});

// 5. ParticlesJS全体の設定
particlesJS("particles-js-canvas-el", {
    // ... particles config ...
});






