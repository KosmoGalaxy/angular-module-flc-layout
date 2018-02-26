import {Injectable} from '@angular/core';
import * as _ from "lodash";
import {LayoutElementComponent} from "./layout-element.component";
import {NativeElement} from "./native-element";

@Injectable()
export class LayoutService {

  private _layoutElementNativeDepthMap: Map<number, LayoutElementComponent[]> = new Map<number, LayoutElementComponent[]>();
  private _layoutElementNativeDepthMapMaxDepth: number;
  private _layoutElementNativeElementMap: Map<NativeElement, LayoutElementComponent> = new Map<NativeElement, LayoutElementComponent>();

  constructor() {}

  registerLayoutElement(layoutElement: LayoutElementComponent) {
    const nativeElement: NativeElement = layoutElement.nativeElement;
    const nativeParents: NativeElement[] = layoutElement.getNativeParents();
    const nativeDepth: number = nativeParents.length;
    if (nativeDepth > this._layoutElementNativeDepthMapMaxDepth) {
      this._layoutElementNativeDepthMapMaxDepth = nativeDepth;
    }
    this._setLayoutElementParent(layoutElement, nativeParents);
    this._setLayoutElementsParents(layoutElement, nativeElement, nativeDepth);
    layoutElement.nativeDepth = nativeDepth;
    this._addLayoutElementToNativeElementMap(layoutElement, nativeDepth);
    this._layoutElementNativeElementMap.set(nativeElement, layoutElement);
  }

  private _setLayoutElementParent(layoutElement: LayoutElementComponent, nativeParents: NativeElement[]) {
    _.forEach(nativeParents, nativeParent => {
      const layoutParent: LayoutElementComponent = this._layoutElementNativeElementMap.get(nativeParent);
      if (layoutParent) {
        layoutElement.layoutParent = layoutParent;
        return false;
      }
    });
  }

  private _setLayoutElementsParents(layoutElement: LayoutElementComponent, nativeElement: NativeElement, nativeDepth: number) {
    for (let depth: number = nativeDepth + 1; depth <= this._layoutElementNativeDepthMapMaxDepth; depth++) {
      _.forEach(this._layoutElementNativeDepthMap.get(depth), depthLayoutElement => {
        if (!depthLayoutElement.layoutParent || depthLayoutElement.layoutParent.nativeDepth < nativeDepth) {
          const depthNativeParents: NativeElement[] = depthLayoutElement.getNativeParents();
          _.forEach(depthNativeParents, depthNativeParent => {
            if (depthNativeParent.isSameNode(nativeElement)) {
              depthLayoutElement.layoutParent = layoutElement;
              return false;
            }
          });
        }
      });
    }
  }

  private _addLayoutElementToNativeElementMap(layoutElement: LayoutElementComponent, nativeDepth: number) {
    if (this._layoutElementNativeDepthMap.has(nativeDepth)) {
      this._layoutElementNativeDepthMap.get(nativeDepth).push(layoutElement);
    } else {
      this._layoutElementNativeDepthMap.set(nativeDepth, [layoutElement]);
    }
  }

}
