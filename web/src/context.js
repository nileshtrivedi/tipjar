import { createContext } from "react";
import { getProfileColors } from "utils";

const ProfileThemeContext = createContext(getProfileColors("#3f51b5"));

export { ProfileThemeContext };
