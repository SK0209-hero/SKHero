const body = document.body;

//リロード時確実にページトップへ
history.scrollRestoration = "manual";
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});
// スクロールをブロックする関数
function disableScroll() {
  body.classList.add("no-scroll");
}

// スクロールブロックを解除する関数
function enableScroll() {
  body.classList.remove("no-scroll");
}

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
}

let progress = 0;
let isLoaded = false;
let canFinish = false;
const percentageElement = document.getElementById("percentage");
const startTime = Date.now();
const minLoadTime = 0; // 最低3秒 /////////////////////////////////////////////////あとでもどす 3000

// プログレスバーとパーセンテージの更新
const updateProgress = () => {
  const elapsed = Date.now() - startTime;

  if (elapsed < minLoadTime) {
    // 3秒未満の場合は80%まで徐々に進行
    const timeProgress = Math.min((elapsed / minLoadTime) * 80, 80);
    progress = Math.min(progress + Math.random() * 1.5 + 0.5, timeProgress);
    percentageElement.textContent = Math.floor(progress) + "%";
    setTimeout(updateProgress, 100 + Math.random() * 150);
  } else if (isLoaded && elapsed >= minLoadTime) {
    // 3秒経過かつロード完了時は100%まで進める
    if (progress < 100) {
      progress = Math.min(progress + 5, 100);
      percentageElement.textContent = Math.floor(progress) + "%";
      if (progress < 100) {
        setTimeout(updateProgress, 50);
      } else {
        finishLoading();
      }
    }
  } else if (elapsed >= minLoadTime) {
    // 3秒経過したがまだロード未完了の場合は95%で待機
    progress = Math.min(progress + 0.2, 95);
    percentageElement.textContent = Math.floor(progress) + "%";
    setTimeout(updateProgress, 200);
  } else {
    // まだ3秒経過していない場合
    setTimeout(updateProgress, 100);
  }
  const progressFill = document.querySelector(".progress-fill");

  // プログレスバーの更新
  progressFill.style.width = progress + "%";
};

// ロード完了処理
const loading_area = document.querySelector(".loading-area");
const finishLoading = () => {
  setTimeout(() => {
    loading_area.style.opacity = "0";
    setTimeout(() => {
      loading_area.style.display = "none";
      setTimeout(() => {
        scrollAnimation();
        enableScroll();
      }, 500);
    }, 1000);
  }, 500);
};

// ページ読み込み完了イベントリスナー
window.addEventListener("load", () => {
  isLoaded = true;
  console.log("ページ読み込み完了");
});

// DOMContentLoaded後にプログレス開始
document.addEventListener("DOMContentLoaded", () => {
  updateProgress();
});

// パーティクルの動的生成
const particlesContainer = document.querySelector(".particles");
const particleInterval = setInterval(() => {
  const elapsed = Date.now() - startTime;
  if (elapsed > minLoadTime + 2000 && progress >= 100) {
    clearInterval(particleInterval);
    return;
  }

  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration = Math.random() * 4 + 4 + "s";
  particlesContainer.appendChild(particle);

  // パーティクルを削除
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, 8000);
}, 800);
