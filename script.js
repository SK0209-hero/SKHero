const buttons = document.querySelectorAll(".chara-buttons button[data-group]");
const groups = document.querySelectorAll(".chara-group");
let currentGroup = document.querySelector(".chara-group.chara-show");
let ButtonToggle = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const targetClass = button.getAttribute("data-group");
    const nextGroup = document.querySelector("." + targetClass);

    if (currentGroup === nextGroup || ButtonToggle) return;

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
    },300);

    // 現在のグループを更新
    currentGroup = nextGroup;
  });
});