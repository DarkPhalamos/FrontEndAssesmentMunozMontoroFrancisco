export type ThemeKeys =
  | "--background-color"
  | "--text-color"
  | "--toggle-border-color"
  | "--background-color-secondary"
  | "--background-color-tertiary"
  | "--background-color-four";

export const lightTheme: Record<ThemeKeys, string> = {
  "--background-color": "#FFFFFF",
  "--text-color": "#000000",
  "--toggle-border-color": "#FFFFFF",
  "--background-color-secondary": "#f0f0f0",

  "--background-color-tertiary": "#FFFFFF",
  "--background-color-four": "#d1d8e0",
};

export const darkTheme: Record<ThemeKeys, string> = {
  "--background-color": "#070F2B",
  "--text-color": "#FFFFFF",
  "--toggle-border-color": "#6B8096",
  "--background-color-secondary": "#1B1A55",
  "--background-color-tertiary": "#535C91",
  "--background-color-four": "#1B1A55",
}; 