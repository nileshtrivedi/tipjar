import React from "react";
import { addDecorator } from "@storybook/react";

import Providers from "../src/Providers";
import { loadFonts } from "../src/fonts";

addDecorator(storyFn => <Providers>{storyFn()}</Providers>);

loadFonts();
