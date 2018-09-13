import eventManager from "./eventManager";
import { ACTION } from "./constant";

export default {
  show({ id, event }){
    console.log(id, event)
    eventManager.emit(`display::${id}`, event)
  },
  hideAll(){

  }
}