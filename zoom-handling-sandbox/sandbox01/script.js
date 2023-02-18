(function () {
  const startMonitoringElem = document.getElementById("startMonitoring")
  const stopMonitoringElem = document.getElementById("stopMonitoring")
  const zoomStateElem = document.getElementById("zoomState")

  /** zoom変更検知の監視を止める関数 */
  let onChangedZoomStopper = null

  /**
   * windowのズーム倍率変更を検知
   *
   * @param {(ratios: {oldDevicePixelRatio: number, newDevicePixelRatio:number}) => void} handler 変更検知時のハンドラ
   * @returns
   */
  function onChangedZoom(handler) {
    let devicePixelRatio = window.devicePixelRatio;

    const onResize = (event) => {
      if (event.target.devicePixelRatio === devicePixelRatio) {
        return;
      }
      const previousDevicePixelRatio = devicePixelRatio;
      devicePixelRatio = event.target.devicePixelRatio;

      handler({
        oldDevicePixelRatio: previousDevicePixelRatio,
        newDevicePixelRatio: devicePixelRatio,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }

  function startZoomMonitoring() {
    onChangedZoomStopper = onChangedZoom((ratios) => {
      const zoomPercent = Math.round(ratios.newDevicePixelRatio * 100)
      zoomStateElem.textContent = `倍率 ${zoomPercent}%, 日時:${new Date().toLocaleString()}`
    });
  }

  startMonitoringElem.addEventListener("click", () => {
    startMonitoringElem.classList.toggle("none")
    stopMonitoringElem.classList.toggle("none")
    startZoomMonitoring()
  })

  stopMonitoringElem.addEventListener("click", () => {
    startMonitoringElem.classList.toggle("none")
    stopMonitoringElem.classList.toggle("none")
    onChangedZoomStopper()
  })

  startZoomMonitoring()
})();
