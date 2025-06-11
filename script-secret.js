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
      }, 100);
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

 // 画像ファイルの拡張子リスト
        
        // よく使われる画像ファイル名のパターン（実際のプロジェクトでは動的に取得）
        const commonImageNames = [
            "gallery1", "gallery2", "gallery3", "gallery4", "gallery5",
  "gallery6", "gallery7", "gallery8", "gallery9", "gallery10",
  "gallery11", "gallery12", "gallery13", "gallery14", "gallery15",
  "gallery16", "gallery17", "gallery18", "gallery19", "gallery20",
  "gallery21", "gallery22", "gallery23", "gallery24", "gallery25"
        ];

        let foundImages = [];
        let modal, modalImg, closeBtn, prevBtn, nextBtn, modalTitle, modalCounter;
        let currentImageIndex = 0;

        // DOM要素を取得
        window.addEventListener('DOMContentLoaded', function() {
            modal = document.getElementById('modal');
            modalImg = document.getElementById('modal-img');
            closeBtn = document.querySelector('.close');
            prevBtn = document.getElementById('prevBtn');
            nextBtn = document.getElementById('nextBtn');
            modalTitle = document.getElementById('modal-title');
            modalCounter = document.getElementById('modal-counter');
            
            // モーダルイベント
            closeBtn.onclick = closeModal;
            prevBtn.onclick = showPrevImage;
            nextBtn.onclick = showNextImage;
            
            modal.onclick = function(e) {
                if (e.target === modal) closeModal();
            };
            
            // キーボードイベント
            document.addEventListener('keydown', function(e) {
                if (modal.style.display === 'block') {
                    switch(e.key) {
                        case 'Escape':
                            closeModal();
                            break;
                        case 'ArrowLeft':
                            showPrevImage();
                            break;
                        case 'ArrowRight':
                            showNextImage();
                            break;
                    }
                }
            });
            
            loadImages();
        });

        async function loadImages() {
            const loadingEl = document.getElementById('gallery-loading');
            const errorEl = document.getElementById('error');
            const galleryEl = document.getElementById('gallery');

            try {
                // 様々な画像ファイル名と拡張子の組み合わせを試す
                for (const name of commonImageNames) {
                        const imagePath = `img/secret/gallery/${name}.webp`;
                        
                        try {
                            const exists = await checkImageExists(imagePath);
                            if (exists) {
                                foundImages.push({
                                    path: imagePath,
                                    name: `${name}.webp`,
                                    displayName: name.charAt(0).toUpperCase() + name.slice(1)
                                });
                            }
                        } catch (e) {
                            // 画像が存在しない場合は無視
                        }
                }

                loadingEl.style.display = 'none';

                if (foundImages.length === 0) {
                    errorEl.style.display = 'block';
                    errorEl.innerHTML = `
                        <h3>画像が見つかりませんでした</h3>
                        <p>img/secretフォルダに以下のような名前の画像ファイルを配置してください：</p>
                    `;
                    return;
                }

                displayGallery();
                galleryEl.style.display = 'grid';

            } catch (error) {
                loadingEl.style.display = 'none';
                errorEl.style.display = 'block';
                console.error('画像読み込みエラー:', error);
            }
        }

        function checkImageExists(imagePath) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = imagePath;
            });
        }

        function displayGallery() {
            const galleryEl = document.getElementById('gallery');
            
            foundImages.forEach((image, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.animationDelay = `${index * 0.1}s`;
                
                galleryItem.innerHTML = `
                    <img src="${image.path}" alt="${image.displayName}" loading="lazy">
                `;
                
                // クリックでモーダル表示
                galleryItem.addEventListener('click', () => {
                    openModal(index);
                });
                
                galleryEl.appendChild(galleryItem);
            });
        }

        function openModal(imageIndex) {
            currentImageIndex = imageIndex;
            showCurrentImage();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        function showCurrentImage() {
            const currentImage = foundImages[currentImageIndex];
            modalImg.src = currentImage.path;
            modalImg.alt = currentImage.displayName;
            
            // ボタンの状態を更新
            prevBtn.disabled = currentImageIndex === 0;
            nextBtn.disabled = currentImageIndex === foundImages.length - 1;
        }

        function showPrevImage() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                showCurrentImage();
            }
        }

        function showNextImage() {
            if (currentImageIndex < foundImages.length - 1) {
                currentImageIndex++;
                showCurrentImage();
            }
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // 画像の遅延読み込み効果
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .gallery-item {
                animation: fadeInUp 0.6s ease forwards;
                opacity: 0;
            }
        `;
        document.head.appendChild(style);