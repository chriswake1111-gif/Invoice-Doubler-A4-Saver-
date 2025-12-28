export interface ImageSettings {
  zoom: number;
  x: number;
  y: number;
  gap: number; // Gap between the two images in percentage or pixels
  brightness: number;
  contrast: number;
}

export const DEFAULT_SETTINGS: ImageSettings = {
  zoom: 100, // 100% width
  x: 0,
  y: 0,
  gap: 40, // pixels
  brightness: 100,
  contrast: 100,
};