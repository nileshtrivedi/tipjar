import WebFontLoader from "webfontloader";

const loadFonts = () => {
  WebFontLoader.load({
    google: {
      families: [
        "Playfair Display:400,500,600",
        "Source Sans Pro:400,600,700, 900"
      ]
    }
  });
};

export { loadFonts };
