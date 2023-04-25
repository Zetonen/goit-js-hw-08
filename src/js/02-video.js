import Vimeo from "@vimeo/player";
import throttle from "lodash.throttle";
import { save, load } from "./storage.js";

const SAVE_KEY_CODE = "videoplayer-current-time";
const refs = {
  framePlayer: document.querySelector("#vimeo-player"),
};
const player = new Vimeo(refs.framePlayer);
updatingCurrentTime();

player.on("timeupdate", throttle(saveVideoTime, 1000));

function updatingCurrentTime() {
  const savedTime = load(SAVE_KEY_CODE);
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

function saveVideoTime(data) {
  save(SAVE_KEY_CODE, `${data.seconds}`);
}
