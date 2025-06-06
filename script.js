const buttons = document.querySelectorAll(".chara-buttons button[data-group]");
const groups = document.querySelectorAll(".chara-group");
let currentGroup = document.querySelector(".chara-group.chara-show");
let currentActiveButton = document.querySelector(".chara-button-active");
let ButtonToggle = false;

buttons.forEach(button => {
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
    },700);

    // 現在のグループを更新
    currentGroup = nextGroup;
  });
});


document.addEventListener('DOMContentLoaded', function() {
            // アニメーションを適用したい全ての要素を取得
            const animatedElements = document.querySelectorAll('.animated-element');

            const observerOptions = {
                root: null, // ビューポートをルートとして使用
                rootMargin: '0px', // ルートのマージン（ビューポートの端からどれくらいの距離で発火するか）
                threshold: 0.9 // 要素の90%が見えたら発火
            };

            const animatedElements_fast = document.querySelectorAll('.animated-element-fast');

            const observerOptionsForSchedule = {
                root: null, // ビューポートをルートとして使用
                rootMargin: '0px', // ルートのマージン（ビューポートの端からどれくらいの距離で発火するか）
                threshold: 0.1 // 要素の0.5%が見えたら発火
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 要素がビューポートに入った
                        entry.target.classList.add('anime-active');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // 各要素を監視対象に追加
            animatedElements.forEach(element => {
                observer.observe(element);
            });

            const observer_fast = new IntersectionObserver((entries, observer_fast) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 要素がビューポートに入った
                        entry.target.classList.add('anime-active');
                        observer_fast.unobserve(entry.target);
                    }
                });
            }, observerOptionsForSchedule);

            // 各要素を監視対象に追加
            animatedElements_fast.forEach(element => {
                observer_fast.observe(element);
            });
        });

