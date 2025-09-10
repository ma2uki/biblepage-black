/*

ローディングから画面遷移
================================================ */
const loadingAreaGrey = document.querySelector('#loading');
const loadingAreaGreen = document.querySelector('#loading-screen');
const loadingText = document.querySelector('#loading p');

window.addEventListener('load', () => {
  // ローディング中（グレースクリーン）
  loadingAreaGrey.animate(
    {
      opacity: [1, 0],
      visibility: 'hidden',
    },
    {
      duration: 2000,
      delay: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );

  // ローディング中（薄緑スクリーン）
  loadingAreaGreen.animate(
    {
      translate: ['0 100vh', '0 0', '0 -100vh']
    },
    {
      duration: 2000,
      delay: 800,
      easing: 'ease',
      fill: 'forwards',
    }
  );  

  // ローディング中テキスト
  loadingText.animate(
    [
      {
        opacity: 1,
        offset: .8  //80%
      },
      {
        opacity: 0,
        offset: 1  //100%
      },
    ], 
    {
      duration: 1200,
      easing: 'ease',
      fill: 'forwards',
    }
  );
});

/*
画像ぎゃらり
================================================ */


const mainImageElement = document.querySelector('#main-display-img'); // IDで指定
const mainVideoElement = document.querySelector('#main-display-video'); // IDで指定
const thumbItems = document.querySelectorAll('.gallery-thumbnails li');

// 初期表示で動画(img3.mp4)を表示
window.addEventListener('DOMContentLoaded', () => {
  mainImageElement.style.display = 'none';
  mainVideoElement.src = 'images/img3.mp4';
  mainVideoElement.style.display = 'block';
  mainVideoElement.play();
});

thumbItems.forEach((item) => {
    item.addEventListener('mouseover', (event) => {
        // マウスが乗った要素（imgまたはvideo）を取得
        const hoveredElement = event.target;

        // clickedElementがimgかvideoか、またはliの中のimg/videoかなどを判別
        let src = '';
        let type = '';

        if (hoveredElement.tagName === 'IMG') {
            src = hoveredElement.src;
            type = 'image';
        } else if (hoveredElement.tagName === 'VIDEO') {
            src = hoveredElement.src;
            type = 'video';
        } else if (hoveredElement.closest('img')) { // liの中のimgにカーソルが当たった場合
            src = hoveredElement.closest('img').src;
            type = 'image';
        } else if (hoveredElement.closest('video')) { // liの中のvideoにカーソルが当たった場合
            src = hoveredElement.closest('video').src;
            type = 'video';
        }

        if (src) {
            if (type === 'image') {
                mainImageElement.src = src;
                mainImageElement.style.display = 'block';
                mainVideoElement.style.display = 'none';
                mainVideoElement.pause(); // 動画の再生を停止
                mainImageElement.animate({ opacity: [0, 1] }, 500);
            } else if (type === 'video') {
                mainVideoElement.src = src;
                mainVideoElement.style.display = 'block';
                mainImageElement.style.display = 'none';
                mainVideoElement.animate({ opacity: [0, 1] }, 500);
                mainVideoElement.play(); // 動画を再生
            }
        }
    });
});


/*
スライドメニュー
================================================ */
const menuOpen = document.querySelector('#menu-open');
const menuClose = document.querySelector('#menu-close');
const menuPanel = document.querySelector('#menu-panel');
const menuItems = document.querySelectorAll('#menu-panel li');
const menuOptions = {
  duration: 1400,
  easing: 'ease',
  fill: 'forwards',
};

// メニューを開く
menuOpen.addEventListener('click', () => {
  menuPanel.animate({translate: ['100vw', 0]}, menuOptions);
  // リンクをひとつずつ順に表示
  menuItems.forEach((menuItem, index) => {
    menuItem.animate(
      {
        opacity: [0, 1],
        translate: ['2rem', 0],
      },
      {
        duration: 2400,
        delay: 300 * index,
        easing: 'ease',
        fill: 'forwards',
      }
    );
  });
});

// メニューを閉じる
menuClose.addEventListener('click', () => {
  menuPanel.animate({translate: [0, '100vw']}, menuOptions);
  menuItems.forEach((menuItem) => {
    menuItem.animate({opacity: [1, 0]}, menuOptions);
  });
});

// 確認事項ダイアログ表示処理
window.addEventListener('DOMContentLoaded', () => {
  const openDialogBtn = document.getElementById('open-dialog');
  const infoDialog = document.getElementById('info-dialog');
  const closeDialogBtn = document.getElementById('close-dialog');
  if (openDialogBtn && infoDialog && closeDialogBtn) {
    openDialogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      infoDialog.showModal();
    });
    closeDialogBtn.addEventListener('click', () => {
      infoDialog.close();
    });
  }
});

/*
スクロールで要素を表示
================================================ */
// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          filter: ['blur(.4rem)', 'blur(0)'], 
          translate: ['0 4rem', 0],
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      // 一度ふわっと表示されたら監視をやめる
      obs.unobserve(entry.target);
    }
  });
};

// 監視設定
const fadeObserver = new IntersectionObserver(animateFade);

// .fadeinを監視するよう指示
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});