import type {Data, MarkOptions, RenderableMark} from "../mark.js";

export interface TickOptions extends MarkOptions {
  // TODO
}

export function tickX(data?: Data | null, options?: TickOptions): TickX;

export function tickY(data?: Data | null, options?: TickOptions): TickY;

export class TickX extends RenderableMark {}

export class TickY extends RenderableMark {}