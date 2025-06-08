const buttons = document.querySelectorAll(".chara-buttons button[data-group]");
const groups = document.querySelectorAll(".chara-group");
let currentGroup = document.querySelector(".chara-group.chara-show");
let currentActiveButton = document.querySelector(".chara-button-active");
let ButtonToggle = false;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetClass = button.getAttribute("data-group");
    const nextGroup = document.querySelector("." + targetClass);

    if (currentGroup === nextGroup || ButtonToggle) return;

    //ボタン
    currentActiveButton.classList.remove("chara-button-active");
    button.classList.add("chara-button-active");

    currentActiveButton = button;
    // 現在のグループをフェードアウト
    currentGroup.classList.remove("chara-show");
    currentGroup.classList.add("chara-hide");
    const resetGroup = currentGroup;

    //フェードアウト終了後次のグループをフェードイン
    ButtonToggle = true;
    setTimeout(() => {
      resetGroup.classList.remove("chara-hide");
      nextGroup.classList.remove("chara-hide"); // 念のため
      nextGroup.classList.add("chara-show");

      //リセット
      ButtonToggle = false;
    }, 700);

    // 現在のグループを更新
    currentGroup = nextGroup;
  });
});

function scrollAnimation() {
  // アニメーションを適用したい全ての要素を取得
  const animatedElements = document.querySelectorAll(".animated-element");

  const observerOptions = {
    root: null, // ビューポートをルートとして使用
    rootMargin: "0px", // ルートのマージン（ビューポートの端からどれくらいの距離で発火するか）
    threshold: 0.9, // 要素の90%が見えたら発火
  };

  const animatedElements_fast = document.querySelectorAll(
    ".animated-element-fast"
  );

  const observerOptionsForSchedule = {
    root: null, // ビューポートをルートとして使用
    rootMargin: "0px", // ルートのマージン（ビューポートの端からどれくらいの距離で発火するか）
    threshold: 0.1, // 要素の10%が見えたら発火
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入った
        entry.target.classList.add("anime-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 各要素を監視対象に追加
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  const observer_fast = new IntersectionObserver((entries, observer_fast) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入った
        entry.target.classList.add("anime-active");
        observer_fast.unobserve(entry.target);
      }
    });
  }, observerOptionsForSchedule);

  // 各要素を監視対象に追加
  animatedElements_fast.forEach((element) => {
    observer_fast.observe(element);
  });
};

function glitch(element) {
  let count = 0;
  setInterval(() => {
    // element
    const skew = Math.random() * 20 - 10;
    // element::before
    const top1 = Math.random() * 100;
    const btm1 = Math.random() * 100;
    // element::after
    const top2 = Math.random() * 100;
    const btm2 = Math.random() * 100;

    element.style.setProperty("--skew", `${skew}deg`);
    element.style.setProperty("--t1", `${top1}%`);
    element.style.setProperty("--b1", `${btm1}%`);
    element.style.setProperty("--t2", `${top2}%`);
    element.style.setProperty("--b2", `${btm2}%`);
    element.style.setProperty("--scale", `1`);

    count++;

    if (count % 15 === 0) {
      const bigSkew = Math.random() * 180 - 90;
      element.style.setProperty("--skew", `${bigSkew}deg`);
    }

    if (count % 30 === 0) {
      const bigScale = 1 + Math.random() / 2;
      element.style.setProperty("--scale", `${bigScale}`);
    }
  }, 100);
}

const footer = document.querySelector(".glitch");
glitch(footer);

//リロード時確実にページトップへ
history.scrollRestoration = "manual";
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0,0);
  const body = document.body;
  const posterTextarea = document.querySelector(".poster-textarea");
  const fadeChars = document.querySelectorAll(".poster-textarea .poster-anime");
  const heroSection = document.querySelector(".area-poster");
  scrollTo(0,0);
  // スクロールをブロックする関数
  function disableScroll() {
    body.classList.add("no-scroll");
  }

  // スクロールブロックを解除する関数
  function enableScroll() {
    body.classList.remove("no-scroll");
  }

  // 要素がビューポート内に完全に表示されているかチェックする関数
  function isElementFullyInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // --- ロード完了時の初期処理 ---
  window.onload = () => {
    window.scrollTo(0, 0);
    // ロード直後にスクロールを無効化 (これは常に実行)
    disableScroll();

    // フェードインアニメーションを開始 (JavaScriptで個別に制御)
    const animationDuration = 1000; // 各文字のアニメーション時間を1秒に
    const delayBetweenChars = 200; // 各文字間の遅延時間を0.2秒に
    const totalFadeInTime =
      fadeChars.length > 0
        ? (fadeChars.length - 1) * delayBetweenChars + animationDuration
        : 0;

    fadeChars.forEach((char, index) => {
      setTimeout(() => {
        char.style.transition = `opacity ${
          animationDuration / 1000
        }s ease-out, transform ${animationDuration / 1000}s ease-out`;
        char.style.opacity = 1;
        char.style.transform = "Scale(1)";
      }, index * delayBetweenChars);
    });

    // フェードインが開始されたごく短い遅延後に、条件付きで自動スクロールを開始
    setTimeout(() => {
      // ごくわずかな遅延でスクロールチェックと開始
      const targetImage = document.querySelector(".area-poster img");

      if (!targetImage) {
        enableScroll();
        console.error(
          "指定された画像要素が見つかりませんでした。スクロールを有効にします。"
        );
        return;
      }

      const imageRect = targetImage.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const shouldScroll =
        imageRect.bottom > viewportHeight || imageRect.top < 0;

      if (shouldScroll) {
        console.log(
          "画像が画面外なので、フェードと同時に下にスクロールを実行します。"
        );
        customSmoothScrollToElementBottom(targetImage, totalFadeInTime).then(
          () => {
            console.log("下へのスクロールが完了しました。1秒待機します...");
            setTimeout(() => {
              // 1秒待機
              console.log("1秒待機後、ページトップへスクロールを開始します。");
              // ページトップへのスクロール時間は任意で設定（例: 1500ms）
              customSmoothScrollToTop(1500).then(() => {
                enableScroll(); // 全ての自動スクロールが完了したらスクロールを有効化
                console.log(
                  "ページトップへのスクロールが完了し、スクロールが有効になりました。"
                );
                scrollAnimation(); //ページ全体のアニメーション開始
              });
            }, 1000); // 1000ミリ秒 = 1秒待機

            // アニメーション完了後、transitionをリセット (下へのスクロールが完了した時点でリセット)

            fadeChars.forEach((char) => {
              char.style.transition = "none";
            });
            posterTextarea.style.transition = "none";
          }
        );
      } else {
        console.log(
          "画像が画面内にあるので、自動スクロールはしません。スクロールを有効にします。"
        );
        setTimeout(() => {
          enableScroll();
          scrollAnimation(); //ページ全体のアニメーション開始
        }, totalFadeInTime);
        fadeChars.forEach((char) => {
          char.style.transition = "none";
        });
        posterTextarea.style.transition = "none";
      }
    }, 50);
  };

  // カスタムスムーズスクロール関数 (requestAnimationFrameを使用)
  function customSmoothScrollToElementBottom(element, duration) {
    return new Promise((resolve) => {
      const startScrollY = window.scrollY || window.pageYOffset;
      const elementRect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const targetScrollY = startScrollY + elementRect.bottom - viewportHeight;
      const distance = targetScrollY - startScrollY;

      if (Math.abs(distance) < 1) {
        window.scrollTo(0, targetScrollY);
        resolve();
        return;
      }

      let startTime = null;

      function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startScrollY + distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetScrollY);
          resolve();
        }
      }

      requestAnimationFrame(animateScroll);
    });
  }

  // ページトップへスムーズスクロールする関数
  function customSmoothScrollToTop(duration) {
    return new Promise((resolve) => {
      const startScrollY = window.scrollY || window.pageYOffset;
      const targetScrollY = 0; // ページトップ
      const distance = targetScrollY - startScrollY;

      if (Math.abs(distance) < 1) {
        // 既にトップにいる場合
        window.scrollTo(0, targetScrollY);
        resolve();
        return;
      }

      let startTime = null;

      function animateScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // イージング関数
        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        window.scrollTo(0, startScrollY + distance * easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          window.scrollTo(0, targetScrollY);
          resolve();
        }
      }

      requestAnimationFrame(animateScroll);
    });
  }
});
