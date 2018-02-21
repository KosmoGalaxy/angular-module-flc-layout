import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {LayoutElementComponent} from "./layout-element.component";

@Injectable()
export class LayoutService {

  private _layoutElementNativeDepthMap: Map<number, LayoutElementComponent[]> = new Map<number, LayoutElementComponent[]>();
  private _layoutElementNativeDepthMapMaxDepth: number;
  private _layoutElementNativeElementMap: Map<HTMLElement, LayoutElementComponent> = new Map<HTMLElement, LayoutElementComponent>();

  constructor() {}

  registerLayoutElement(layoutElement: LayoutElementComponent, nativeElement: HTMLElement) {
    const nativeParents: HTMLElement[] = layoutElement.getNativeParents();
    const nativeDepth: number = nativeParents.length;
    if (nativeDepth > this._layoutElementNativeDepthMapMaxDepth) {
      this._layoutElementNativeDepthMapMaxDepth = nativeDepth;
    }
    _.forEach(nativeParents, nativeParent => {
      const layoutParent: LayoutElementComponent = this._layoutElementNativeElementMap.get(nativeParent);
      if (layoutParent) {
        layoutElement.layoutParent = layoutParent;
        return false;
      }
    });
    for (let depth: number = nativeDepth + 1; depth <= this._layoutElementNativeDepthMapMaxDepth; depth++) {
      _.forEach(this._layoutElementNativeDepthMap.get(depth), depthLayoutElement => {
        if (!depthLayoutElement.layoutParent || depthLayoutElement.layoutParent.nativeDepth < nativeDepth) {
          const depthNativeParents: HTMLElement[] = depthLayoutElement.getNativeParents();
          _.forEach(depthNativeParents, depthNativeParent => {
            if (depthNativeParent.isSameNode(nativeElement)) {
              depthLayoutElement.layoutParent = layoutElement;
              return false;
            }
          });
        }
      });
    }
    layoutElement.nativeDepth = nativeDepth;
    if (this._layoutElementNativeDepthMap.has(nativeDepth)) {
      this._layoutElementNativeDepthMap.get(nativeDepth).push(layoutElement);
    } else {
      this._layoutElementNativeDepthMap.set(nativeDepth, [layoutElement]);
    }
    this._layoutElementNativeElementMap.set(nativeElement, layoutElement);
  }

}
