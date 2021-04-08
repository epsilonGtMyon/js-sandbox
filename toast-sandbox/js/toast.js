class Toast {
  static push(message, position, type) {
    //positionによってどっちのコンテナに配置するか決める
    const container = position.startsWith("is-top")
      ? document.querySelector(".toast-conntainer__top")
      : document.querySelector(".toast-conntainer__bottom");

    //トースト本体
    const toast = document.createElement("div");
    toast.classList.add("toast", position, type);
    toast.textContent = message;

    //閉じるボタン
    const close = document.createElement("div");
    close.textContent = "×";
    close.classList.add("close");
    close.addEventListener("click", () => {
      const timerId = toast.dataset.timerId;
      clearTimeout(Number(timerId));
      toast.remove();
    });
    toast.append(close);

    //コンテナの先頭に
    container.prepend(toast);
    const id = setTimeout(() => {
      toast.remove();
    }, 5000);
    //タイマーはdatasetに保存しておく
    toast.dataset.timerId = id;
  }
}
