import type {ChannelValueSpec} from "../channel.js";
import type {FrameAnchor} from "../options.js";
import type {Data, MarkOptions, RenderableMark} from "../mark.js";

export type TextAnchor = "start" | "middle" | "end";

export type LineAnchor = "top" | "middle" | "bottom";

export type TextOverflow =
  | "clip"
  | "ellipsis"
  | "clip-start"
  | "clip-end"
  | "ellipsis-start"
  | "ellipsis-middle"
  | "ellipsis-end";

export interface TextOptions extends MarkOptions {
  text?: ChannelValueSpec;
  frameAnchor?: FrameAnchor;
  textAnchor?: TextAnchor;
  lineAnchor?: LineAnchor;
  lineHeight?: number;
  lineWidth?: number;
  textOverflow?: TextOverflow;
  monospace?: boolean;
  fontFamily?: string;
  fontSize?: ChannelValueSpec;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: string | number;
  rotate?: ChannelValueSpec;
}

export function text(data?: Data | null, options?: TextOptions): Text;

export function textX(data?: Data | null, options?: TextOptions): Text;

export function textY(data?: Data | null, options?: TextOptions): Text;

export class Text extends RenderableMark {}