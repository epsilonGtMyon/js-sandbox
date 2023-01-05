(async function () {
  const play1Elem = document.getElementById("play1");
  const stop1Elem = document.getElementById("stop1");
  const play2Elem = document.getElementById("play2");
  const stop2Elem = document.getElementById("stop2");
  const muteElem = document.getElementById("mute");
  const unmuteElem = document.getElementById("unmute");
  const muteValueElem = document.getElementById("muteValue");

  const loopElem = document.getElementById("loop")
  const volumeElem = document.getElementById("volume")
  const volumeValueElem = document.getElementById("volumeValue")
  const delayElem = document.getElementById("delay")
  const delayValueElem = document.getElementById("delayValue")
  const durationElem = document.getElementById("duration")
  const durationValueElem = document.getElementById("durationValue")
  const consoleElem = document.getElementById("console");


  const snd = new Snd({
    easySetup: false,
  });

  function updateVolumeLabel() {
    volumeValueElem.textContent = volumeElem.value
  }
  function updateDelayLabel() {
    delayValueElem.textContent = delayElem.value
  }
  function updateDurationLabel() {
    durationValueElem.textContent = durationElem.value
  }

  function updateMuteLabel() {
    muteValueElem.textContent = snd.isMuted ? "ミュート" : "音出る"
  }
  
  function clearConsole() {
    while (consoleElem.firstChild) {
      consoleElem.removeChild(consoleElem.firstChild);
    }
  }
  function log(text) {
    const div = document.createElement("div");
    div.textContent = text;
    consoleElem.append(div);
    consoleElem.parentElement.scrollTo(
      0,
      consoleElem.parentElement.scrollHeight
    );
  }

  function play(soundKey) {
    const loop = loopElem.checked
    const volume = volumeElem.valueAsNumber
    const delay = delayElem.valueAsNumber
    const duration = durationElem.valueAsNumber
    const playOption = {
      loop,
      volume,
      delay,
      duration,
      callback: (id) => {
        log(`callback: id = ${id}`)
      }
    }
    // loopの事を考えると止めてから鳴らすのもありなのかな...
    // snd.stop(Snd.SOUNDS.BUTTON)
    snd.play(soundKey, playOption)
  }
  function stop(soundKey) {
    snd.stop(soundKey)
  }
  
  play1Elem.addEventListener("click", () => {
    play(Snd.SOUNDS.BUTTON)
  });
  stop1Elem.addEventListener("click", () => {
    stop(Snd.SOUNDS.BUTTON)
  })
  play2Elem.addEventListener("click", () => {
    play(Snd.SOUNDS.PROGRESS_LOOP)
  });
  stop2Elem.addEventListener("click", () => {
    stop(Snd.SOUNDS.PROGRESS_LOOP)
  })
  muteElem.addEventListener("click", () => {
    snd.mute()
    updateMuteLabel()
  })
  unmuteElem.addEventListener("click", () => {
    snd.unmute()
    updateMuteLabel()
  })

  volumeElem.addEventListener("change", () => updateVolumeLabel())
  delayElem.addEventListener("change", () => updateDelayLabel())
  durationElem.addEventListener("change", () => updateDurationLabel())



  //初期処理
  await snd.load(Snd.KITS.SND01);
  updateVolumeLabel()
  updateDelayLabel()
  updateDurationLabel()
  updateMuteLabel()
})();
