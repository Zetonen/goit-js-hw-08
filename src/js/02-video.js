import Vimeo from "@vimeo/player";
import throttle from "lodash.throttle";

const refs = {
  framePlayer: document.querySelector("#vimeo-player"),
};
const player = new Vimeo(refs.framePlayer);
updatingCurrentTime();

player.on("timeupdate", throttle(saveVideoTime, 1000));

function updatingCurrentTime() {
  const savedTime = localStorage.getItem("videoplayer-current-time");
  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

function saveVideoTime(data) {
  localStorage.setItem("videoplayer-current-time", `${data.seconds}`);
}
