import {area as shapeArea, create, group, selectAll} from "d3";
import {Curve} from "../curve.js";
import {defined} from "../defined.js";
import {Mark, indexOf, maybeZ} from "../mark.js";
import {applyDirectStyles, applyIndirectStyles, applyTransform, applyGroupedChannelStyles} from "../style.js";
import {maybeIdentityX, maybeIdentityY} from "../transforms/identity.js";
import {maybeStackX, maybeStackY} from "../transforms/stack.js";

const defaults = {
  strokeWidth: 1,
  strokeMiterlimit: 1
};

export class Area extends Mark {
  constructor(data, options = {}) {
    const {x1, y1, x2, y2, curve, tension} = options;
    super(
      data,
      [
        {name: "x1", value: x1, scale: "x"},
        {name: "y1", value: y1, scale: "y"},
        {name: "x2", value: x2, scale: "x", optional: true},
        {name: "y2", value: y2, scale: "y", optional: true},
        {name: "z", value: maybeZ(options), optional: true}
      ],
      options,
      defaults
    );
    this.curve = Curve(curve, tension);
  }
  render(I, {x, y}, channels) {
    const {x1: X1, y1: Y1, x2: X2 = X1, y2: Y2 = Y1, z: Z} = channels;
    const {dx, dy} = this;
    return create("svg:g")
        .call(applyIndirectStyles, this)
        .call(applyTransform, x, y, dx, dy)
        .call(g => g.selectAll()
          .data(Z ? group(I, i => Z[i]).values() : [I])
          .join("path")
            .call(applyDirectStyles, this)
            .call(applyGroupedChannelStyles, this, channels)
            .attr("d", shapeArea()
              .curve(this.curve)
              .defined(i => defined(X1[i]) && defined(Y1[i]) && defined(X2[i]) && defined(Y2[i]))
              .x0(i => X1[i])
              .y0(i => Y1[i])
              .x1(i => X2[i])
              .y1(i => Y2[i])))
      .node();
  }
  select(S, {transition}) {
    let sel = selectAll(this.nodes).selectChildren();
    if (transition) {
      const {delay, duration} = typeof transition === "object" ? transition : {};
      sel = sel.transition();
      if (delay !== undefined) sel.delay(delay);
      if (duration !== undefined) sel.duration(duration);
    }
    return sel
      .style("opacity", 1e-6)
      .filter(([i]) => S[i])
      .style("opacity", 1);
  }
}

export function area(data, options) {
  return new Area(data, options);
}

export function areaX(data, {y = indexOf, ...options} = {}) {
  return new Area(data, maybeStackX(maybeIdentityX({...options, y1: y, y2: undefined})));
}

export function areaY(data, {x = indexOf, ...options} = {}) {
  return new Area(data, maybeStackY(maybeIdentityY({...options, x1: x, x2: undefined})));
}
