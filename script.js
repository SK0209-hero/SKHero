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
}

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
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});


const correctAnswer = ["漢字辞典","かんじじてん"]; // 複数の正解パターンを許容
        const nextPageUrl = "secret_page.html"; // 正解時に遷移する次のページのURL

        const triggerCheckbox = document.getElementById('trigger');
    const body = document.body;

    triggerCheckbox.addEventListener('change', function() {
        if (this.checked) {
            // ポップアップが開いたらスクロールを禁止
            body.classList.add('no-scroll');
        } else {
            // ポップアップが閉じたらスクロールを解除
            body.classList.remove('no-scroll');
            // ポップアップが閉じられたら結果表示をリセット
            document.querySelector(".popup-result").textContent = "";
            document.querySelector(".popup-result").className = "popup-result";
            document.quizForm.input.value = ""; // 入力欄もクリア
        }
    });

        function AnswerCheck() {
            const userAnswer = document.quizForm.input.value.trim(); // 入力値を取得し、前後の空白を除去
            const resultDiv = document.querySelector(".popup-result");


            let isCorrect = false;
            for (let i = 0; i < correctAnswer.length; i++) {
                if (userAnswer === correctAnswer[i]) {
                    isCorrect = true;
                    break;
                }
            }

            if (isCorrect) {
                resultDiv.textContent = "正解です！ 特別ページに移動します。";
                resultDiv.className = "popup-result correct";
                setTimeout(() => {
                    window.location.href = nextPageUrl; // 1秒後に次のページへ遷移
                }, 1000);
            } else {
                resultDiv.textContent = "不正解です。もう一度お試しください。";
                resultDiv.className = "popup-result incorrect";
            }
        }
//ロード後アニメーション
function LoadedAnimation() {
  window.scrollTo(0, 0);
  const body = document.body;
  const posterTextarea = document.querySelector(".poster-textarea");
  const fadeChars = document.querySelectorAll(".poster-textarea .poster-anime");
  const heroSection = document.querySelector(".area-poster");

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
  // --- 初期処理開始 ---
  disableScroll();

  const animationDuration = 1000;
  const delayBetweenChars = 200;
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

  setTimeout(() => {
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
    const shouldScroll = imageRect.bottom > viewportHeight || imageRect.top < 0;

    if (shouldScroll) {
      console.log(
        "画像が画面外なので、フェードと同時に下にスクロールを実行します。"
      );
      customSmoothScrollToElementBottom(targetImage, totalFadeInTime).then(
        () => {
          console.log("下へのスクロールが完了しました。1秒待機します...");
          setTimeout(() => {
            console.log("1秒待機後、ページトップへスクロールを開始します。");
            customSmoothScrollToTop(1500).then(() => {
              enableScroll();
              console.log(
                "ページトップへのスクロールが完了し、スクロールが有効になりました。"
              );
              scrollAnimation();
              const secretPageButton = document.querySelector('.secret-page'); //アニメーション中に開かれないために
        secretPageButton.style.display = 'block';
            });
          }, 1000);

          fadeChars.forEach((char) => {
            char.style.transition = "none";
          });
          posterTextarea.style.transition = "none";
        }
      );
    } else {
      console.log(
        "画像が画面内にあるので、自動スクロールはしません。"
      );
      setTimeout(() => {
        enableScroll();
        console.log("スクロールを有効にします。");
        scrollAnimation();
        const secretPageButton = document.querySelector('.secret-page'); //アニメーション中に開かれないために
        secretPageButton.style.display = 'block';
      }, totalFadeInTime);
      fadeChars.forEach((char) => {
        char.style.transition = "none";
      });
      posterTextarea.style.transition = "none";
    }
  }, 50);

  // カスタムスムーズスクロール関数
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

  // ページトップへスムーズスクロール
  function customSmoothScrollToTop(duration) {
    return new Promise((resolve) => {
      const startScrollY = window.scrollY || window.pageYOffset;
      const targetScrollY = 0;
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
}

let progress = 0;
        let isLoaded = false;
        let canFinish = false;
        const percentageElement = document.getElementById('percentage');
        const startTime = Date.now();
        const minLoadTime = 3000; // 最低3秒
        
        // プログレスバーとパーセンテージの更新
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            
            if (elapsed < minLoadTime) {
                // 3秒未満の場合は80%まで徐々に進行
                const timeProgress = Math.min((elapsed / minLoadTime) * 80, 80);
                progress = Math.min(progress + Math.random() * 1.5 + 0.5, timeProgress);
                percentageElement.textContent = Math.floor(progress) + '%';
                setTimeout(updateProgress, 100 + Math.random() * 150);
            } else if (isLoaded && elapsed >= minLoadTime) {
                // 3秒経過かつロード完了時は100%まで進める
                if (progress < 100) {
                    progress = Math.min(progress + 5, 100);
                    percentageElement.textContent = Math.floor(progress) + '%';
                    if (progress < 100) {
                        setTimeout(updateProgress, 50);
                    } else {
                        finishLoading();
                    }
                }
            } else if (elapsed >= minLoadTime) {
                // 3秒経過したがまだロード未完了の場合は95%で待機
                progress = Math.min(progress + 0.2, 95);
                percentageElement.textContent = Math.floor(progress) + '%';
                setTimeout(updateProgress, 200);
            } else {
                // まだ3秒経過していない場合
                setTimeout(updateProgress, 100);
            }
            const progressFill = document.querySelector('.progress-fill');

            // プログレスバーの更新
            progressFill.style.width = progress + '%';
        };

        // ロード完了処理
        const loading_area = document.querySelector(".loading-area");
        const finishLoading = () => {
            setTimeout(() => {
              loading_area.style.opacity = "0";
              setTimeout(() => {
                LoadedAnimation();
                loading_area.style.display ="none";
              }, 1000);
            }, 500);
        };

        // ページ読み込み完了イベントリスナー
        window.addEventListener('load', () => {
            isLoaded = true;
            console.log('ページ読み込み完了');
        });

        // DOMContentLoaded後にプログレス開始
        document.addEventListener('DOMContentLoaded', () => {
            updateProgress();
        });

        // パーティクルの動的生成
        const particlesContainer = document.querySelector('.particles');
        const particleInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            if (elapsed > minLoadTime + 2000 && progress >= 100) {
                clearInterval(particleInterval);
                return;
            }
            
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particlesContainer.appendChild(particle);
            
            // パーティクルを削除
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 8000);
        }, 800); 