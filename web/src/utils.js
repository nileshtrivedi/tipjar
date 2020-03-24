import {
  lighten,
  darken,
  meetsContrastGuidelines,
  parseToRgb,
  rgba
} from "polished";
import {
  forEach,
  isPlainObject,
  camelCase,
  snakeCase,
  isArray,
  find
} from "lodash-es";

const getProfileColors = profileTheme => {
  let profileThemeDark = darken(0.1, profileTheme);
  let profileThemeLight = lighten(0.4, profileTheme);
  let profileThemeLighter = lighten(0.5, profileTheme);

  const contrastScore = meetsContrastGuidelines(
    profileThemeDark,
    profileThemeLight
  );
  const contrastTestPass = Object.entries(contrastScore).reduce(
    (pass, [_, value]) => pass && value,
    true
  );

  if (!contrastTestPass) {
    profileThemeDark = darken(0.2, profileTheme);
  }

  return {
    profileTheme,
    profileThemeDark,
    profileThemeLight,
    profileThemeLighter
  };
};

const hexToRgba = (hex, alpha) =>
  rgba({
    ...parseToRgb(hex),
    alpha
  });

const rgbToRgba = (rgb, alpha) =>
  rgba({
    ...parseToRgb(rgb),
    alpha
  });

/**
 * Recursively converts the keys of an object
 * to camelCase. Also works on nested arrays
 * of objects
 *
 * @param {Object} object
 */
const objectKeysToCamelCase = object => {
  if (!isArray(object) && !isPlainObject(object)) return object;

  const camelCaseObject = {};
  forEach(object, (value, key) => {
    if (isArray(value)) {
      value = value.map(item => objectKeysToCamelCase(item));
    }
    if (isPlainObject(value)) {
      value = objectKeysToCamelCase(value);
    }
    camelCaseObject[camelCase(key)] = value;
  });
  return camelCaseObject;
};

/**
 * Recursively converts the keys of an object
 * to snake_case. Also works on nested arrays
 * of objects
 *
 * @param {Object} object
 */
const objectKeysToSnakeCase = object => {
  if (!isArray(object) && !isPlainObject(object)) return object;

  const snakeCaseObject = {};
  forEach(object, (value, key) => {
    if (isArray(value)) {
      value = value.map(item => objectKeysToSnakeCase(item));
    }
    if (isPlainObject(value)) {
      value = objectKeysToSnakeCase(value);
    }
    snakeCaseObject[snakeCase(key)] = value;
  });
  return snakeCaseObject;
};

/**
 * Load an external script in the window object.
 * Returns a promise that resolves once the
 * script is loaded.
 *
 * @param {String} options.url url to fetch the script from
 */
const loadScript = ({ url }) => {
  return new Promise((resolve, reject) => {
    const isScriptAlreadyLoaded = find(document.getElementsByTagName("src"), {
      src: url
    });

    if (isScriptAlreadyLoaded) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.onload = () => {
        resolve();
      };
      script.src = url;

      document.head.appendChild(script);
    }
  });
};

export {
  getProfileColors,
  hexToRgba,
  rgbToRgba,
  objectKeysToCamelCase,
  objectKeysToSnakeCase,
  loadScript
};
