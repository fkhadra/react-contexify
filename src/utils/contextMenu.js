import eventManager from "./eventManager";
import { HIDE_ALL, DISPLAY_MENU } from "./constant";

export default {
  show({ id, event }){
    eventManager.emit(DISPLAY_MENU(id), event);
  },
  hideAll(){
    eventManager.emit(HIDE_ALL);
  }
}
