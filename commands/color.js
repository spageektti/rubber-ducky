const { SlashCommandBuilder } = require("@discordjs/builders");

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getHtmlColorName(hex) {
  const htmlColors = {
    "#F0F8FF": "AliceBlue",
    "#FAEBD7": "AntiqueWhite",
    "#00FFFF": "Aqua",
    "#7FFFD4": "Aquamarine",
    "#F0FFFF": "Azure",
    "#F5F5DC": "Beige",
    "#FFE4C4": "Bisque",
    "#000000": "Black",
    "#FFEBCD": "BlanchedAlmond",
    "#0000FF": "Blue",
    "#8A2BE2": "BlueViolet",
    "#A52A2A": "Brown",
    "#DEB887": "BurlyWood",
    "#5F9EA0": "CadetBlue",
    "#7FFF00": "Chartreuse",
    "#D2691E": "Chocolate",
    "#FF7F50": "Coral",
    "#6495ED": "CornflowerBlue",
    "#FFF8DC": "Cornsilk",
    "#DC143C": "Crimson",
    "#00FFFF": "Cyan",
    "#00008B": "DarkBlue",
    "#008B8B": "DarkCyan",
    "#B8860B": "DarkGoldenRod",
    "#A9A9A9": "DarkGray",
    "#006400": "DarkGreen",
    "#8B008B": "DarkMagenta",
    "#556B2F": "DarkOliveGreen",
    "#FF8C00": "DarkOrange",
    "#9932CC": "DarkOrchid",
    "#8B0000": "DarkRed",
    "#E9967A": "DarkSalmon",
    "#8FBC8F": "DarkSeaGreen",
    "#483D8B": "DarkSlateBlue",
    "#2F4F4F": "DarkSlateGray",
    "#00CED1": "DarkTurquoise",
    "#9400D3": "DarkViolet",
    "#FF1493": "DeepPink",
    "#00BFFF": "DeepSkyBlue",
    "#696969": "DimGray",
    "#1E90FF": "DodgerBlue",
    "#B22222": "FireBrick",
    "#FFFAF0": "FloralWhite",
    "#228B22": "ForestGreen",
    "#FF00FF": "Fuchsia",
    "#DCDCDC": "Gainsboro",
    "#F8F8FF": "GhostWhite",
    "#FFD700": "Gold",
    "#DAA520": "GoldenRod",
    "#808080": "Gray",
    "#008000": "Green",
    "#ADFF2F": "GreenYellow",
    "#F0FFF0": "HoneyDew",
    "#FF69B4": "HotPink",
    "#CD5C5C": "IndianRed",
    "#4B0082": "Indigo",
    "#FFFFF0": "Ivory",
    "#F0E68C": "Khaki",
    "#E6E6FA": "Lavender",
    "#FFF0F5": "LavenderBlush",
    "#7CFC00": "LawnGreen",
    "#FFFACD": "LemonChiffon",
    "#ADD8E6": "LightBlue",
    "#F08080": "LightCoral",
    "#E0FFFF": "LightCyan",
    "#FAFAD2": "LightGoldenRodYellow",
    "#D3D3D3": "LightGray",
    "#90EE90": "LightGreen",
    "#FFB6C1": "LightPink",
    "#FFA07A": "LightSalmon",
    "#20B2AA": "LightSeaGreen",
    "#87CEFA": "LightSkyBlue",
    "#778899": "LightSlateGray",
    "#B0C4DE": "LightSteelBlue",
    "#FFFFE0": "LightYellow",
    "#00FF00": "Lime",
    "#32CD32": "LimeGreen",
    "#FAF0E6": "Linen",
    "#FF00FF": "Magenta",
    "#800000": "Maroon",
    "#66CDAA": "MediumAquaMarine",
    "#0000CD": "MediumBlue",
    "#BA55D3": "MediumOrchid",
    "#9370DB": "MediumPurple",
    "#3CB371": "MediumSeaGreen",
    "#7B68EE": "MediumSlateBlue",
    "#00FA9A": "MediumSpringGreen",
    "#48D1CC": "MediumTurquoise",
    "#C71585": "MediumVioletRed",
    "#191970": "MidnightBlue",
    "#F5FFFA": "MintCream",
    "#FFE4E1": "MistyRose",
    "#FFE4B5": "Moccasin",
    "#FFDEAD": "NavajoWhite",
    "#000080": "Navy",
    "#FDF5E6": "OldLace",
    "#808000": "Olive",
    "#6B8E23": "OliveDrab",
    "#FFA500": "Orange",
    "#FF4500": "OrangeRed",
    "#DA70D6": "Orchid",
    "#EEE8AA": "PaleGoldenRod",
    "#98FB98": "PaleGreen",
    "#AFEEEE": "PaleTurquoise",
    "#DB7093": "PaleVioletRed",
    "#FFEFD5": "PapayaWhip",
    "#FFDAB9": "PeachPuff",
    "#CD853F": "Peru",
    "#FFC0CB": "Pink",
    "#DDA0DD": "Plum",
    "#B0E0E6": "PowderBlue",
    "#800080": "Purple",
    "#FF0000": "Red",
    "#BC8F8F": "RosyBrown",
    "#4169E1": "RoyalBlue",
    "#8B4513": "SaddleBrown",
    "#FA8072": "Salmon",
    "#F4A460": "SandyBrown",
    "#2E8B57": "SeaGreen",
    "#FFF5EE": "SeaShell",
    "#A0522D": "Sienna",
    "#C0C0C0": "Silver",
    "#87CEEB": "SkyBlue",
    "#6A5ACD": "SlateBlue",
    "#708090": "SlateGray",
    "#FFFAFA": "Snow",
    "#00FF7F": "SpringGreen",
    "#4682B4": "SteelBlue",
    "#D2B48C": "Tan",
    "#008080": "Teal",
    "#D8BFD8": "Thistle",
    "#FF6347": "Tomato",
    "#40E0D0": "Turquoise",
    "#EE82EE": "Violet",
    "#F5DEB3": "Wheat",
    "#FFFFFF": "White",
    "#F5F5F5": "WhiteSmoke",
    "#FFFF00": "Yellow",
    "#9ACD32": "YellowGreen",
  };

  return htmlColors[hex.toUpperCase()] || "No exact HTML name";
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription(
      "Generate a random color in different formats (HEX, RGB, HSL, HTML)",
    ),
  async execute(interaction) {
    const hexColor = generateRandomHexColor();
    const rgbColor = hexToRgb(hexColor);
    const hslColor = hexToHsl(hexColor);
    const htmlColorName = getHtmlColorName(hexColor);

    await interaction.reply(`**Quack! Here is a random color for you:**
    - **HEX**: ${hexColor}
    - **RGB**: ${rgbColor}
    - **HSL**: ${hslColor}
    - **HTML Name**: ${htmlColorName}`);
  },
};
