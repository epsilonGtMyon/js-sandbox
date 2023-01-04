(async function () {
  const kitElem = document.getElementById("kit");

  const p1_buttonElem = document.getElementById("p1_button");
  const p1_caution_Elem = document.getElementById("p1_caution");
  const p1_celebration_Elem = document.getElementById("p1_celebration");
  const p1_disabled_Elem = document.getElementById("p1_disabled");
  const p1_notification_Elem = document.getElementById("p1_notification");
  const p1_progress_loop_Elem = document.getElementById("p1_progress_loop");
  const p1_ringtone_loop_Elem = document.getElementById("p1_ringtone_loop");
  const p1_select_Elem = document.getElementById("p1_select");
  const p1_swipe_Elem = document.getElementById("p1_swipe");
  const p1_tap_Elem = document.getElementById("p1_tap");
  const p1_toggle_off_Elem = document.getElementById("p1_toggle_off");
  const p1_toggle_on_Elem = document.getElementById("p1_toggle_on");
  const p1_transition_down_Elem = document.getElementById("p1_transition_down");
  const p1_transition_up_Elem = document.getElementById("p1_transition_up");
  const p1_type_Elem = document.getElementById("p1_type");

  const p2_buttonElem = document.getElementById("p2_button");
  const p2_caution_Elem = document.getElementById("p2_caution");
  const p2_celebration_Elem = document.getElementById("p2_celebration");
  const p2_disabled_Elem = document.getElementById("p2_disabled");
  const p2_notification_Elem = document.getElementById("p2_notification");
  const p2_progress_loop_Elem = document.getElementById("p2_progress_loop");
  const p2_ringtone_loop_Elem = document.getElementById("p2_ringtone_loop");
  const p2_select_Elem = document.getElementById("p2_select");
  const p2_swipe_Elem = document.getElementById("p2_swipe");
  const p2_tap_Elem = document.getElementById("p2_tap");
  const p2_toggle_off_Elem = document.getElementById("p2_toggle_off");
  const p2_toggle_on_Elem = document.getElementById("p2_toggle_on");
  const p2_transition_down_Elem = document.getElementById("p2_transition_down");
  const p2_transition_up_Elem = document.getElementById("p2_transition_up");
  const p2_type_Elem = document.getElementById("p2_type");

  const snd = new Snd({
    easySetup: false,
  });

  kitElem.addEventListener("change", async (ev) => {
    // value = Snd.KITS.SND0Xの値が入っている
    const value = ev.target.value;

    // キットを変更するにはloadを呼ぶ
    await snd.load(value);
  });

  p1_buttonElem.addEventListener("click", () => snd.play(Snd.SOUNDS.BUTTON));
  p1_caution_Elem.addEventListener("click", () => snd.play(Snd.SOUNDS.CAUTION));
  p1_celebration_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.CELEBRATION)
  );
  p1_disabled_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.DISABLED)
  );
  p1_notification_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.NOTIFICATION)
  );
  p1_progress_loop_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.PROGRESS_LOOP)
  );
  p1_ringtone_loop_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.RINGTONE_LOOP)
  );
  p1_select_Elem.addEventListener("click", () => snd.play(Snd.SOUNDS.SELECT));
  p1_swipe_Elem.addEventListener("click", () => snd.play(Snd.SOUNDS.SWIPE));
  p1_tap_Elem.addEventListener("click", () => snd.play(Snd.SOUNDS.TAP));
  p1_toggle_off_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.TOGGLE_OFF)
  );
  p1_toggle_on_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.TOGGLE_ON)
  );
  p1_transition_down_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.TRANSITION_DOWN)
  );
  p1_transition_up_Elem.addEventListener("click", () =>
    snd.play(Snd.SOUNDS.TRANSITION_UP)
  );
  p1_type_Elem.addEventListener("click", () => snd.play(Snd.SOUNDS.TYPE));

  p2_buttonElem.addEventListener("click", () => snd.playButton());
  p2_caution_Elem.addEventListener("click", () => snd.playCaution());
  p2_celebration_Elem.addEventListener("click", () => snd.playCelebration());
  p2_disabled_Elem.addEventListener("click", () => snd.playDisabled());
  p2_notification_Elem.addEventListener("click", () => snd.playNotification());
  p2_progress_loop_Elem.addEventListener("click", () => snd.playProgressLoop());
  p2_ringtone_loop_Elem.addEventListener("click", () => snd.playRingtoneLoop());
  p2_select_Elem.addEventListener("click", () => snd.playSelect());
  p2_swipe_Elem.addEventListener("click", () => snd.playSwipe());
  p2_tap_Elem.addEventListener("click", () => snd.playTap());
  p2_toggle_off_Elem.addEventListener("click", () => snd.playToggleOff());
  p2_toggle_on_Elem.addEventListener("click", () => snd.playToggleOn());
  p2_transition_down_Elem.addEventListener("click", () => snd.playTransitionDown());
  p2_transition_up_Elem.addEventListener("click", () => snd.playTransitionUp());
  p2_type_Elem.addEventListener("click", () => snd.playType());

  await snd.load(Snd.KITS.SND01);
})();
