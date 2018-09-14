import eventManager from "./eventManager";
import { HIDE_ALL, DISPLAY_MENU } from "./actions";

export default {
  show({ id, event, props }){
    eventManager.emit(DISPLAY_MENU(id), event);
  },
  hideAll(){
    eventManager.emit(HIDE_ALL);
  }
}
