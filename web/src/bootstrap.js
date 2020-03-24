import { initFirebase } from "services/auth";
import { loadFonts } from "./fonts";

const config = [initFirebase, loadFonts];

export default () => {
  config.forEach(fun => fun());
};
