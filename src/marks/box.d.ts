import type {CompoundMark, Data, MarkOptions} from "../mark.js";

export interface BoxOptions extends MarkOptions {
  // TODO
}

export function boxX(data?: Data | null, options?: BoxOptions): CompoundMark;

export function boxY(data?: Data | null, options?: BoxOptions): CompoundMark;
