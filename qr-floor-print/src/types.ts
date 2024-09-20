import { IWorkspace } from "./models/IWorkspace";

export interface DynamicStyles {
  [key: string]: string;
}

export interface IWorkspaceList extends IWorkspace {
  key: string;
}

export interface ITransform {
  translation: ITranslation;
  scale: number;
}

interface ITranslation {
  x: number;
  y: number;
}

export interface ITranslationBounds {
  yMax?: number;
  yMin?: number;
  xMax?: number;
  xMin?: number;
}

export interface ISvgDimensions {
  svgWidth: number;
  svgHeight: number;
}

export enum StatusColor {
  Red = "#fa8585",
  Green = "#bde3ab",
  Yellow = "#fdd46a",
  Gray = "#d3d3d3",
}

export enum DataAttributes {
  ID = "id",
  NAME = "name",
  STATUS = "status",
}
