import { type BBox } from "./utils";

type Size = [number, number];

export class BBoxUtil {
  private originalBBox: BBox;
  private rescaledBBox: BBox;
  private scaleRatioX: number;
  private scaleRatioY: number;
  private centerPoint: Size;
  constructor(origBbx: BBox, streamResolution: Size, videoElementSize: Size) {
    this.originalBBox = origBbx;
    this.scaleRatioX = videoElementSize[0] / streamResolution[0];
    this.scaleRatioY = videoElementSize[1] / streamResolution[1];
    this.rescaledBBox = [
      this.originalBBox[0] * this.scaleRatioX,
      this.originalBBox[1] * this.scaleRatioY,
      this.originalBBox[2] * this.scaleRatioX,
      this.originalBBox[3] * this.scaleRatioY,
    ];
    this.centerPoint = [
      (this.rescaledBBox[2] - this.rescaledBBox[0] / 2) + this.rescaledBBox[0],
      (this.rescaledBBox[3] - this.rescaledBBox[1] / 2) + this.rescaledBBox[1],
    ];
  }

  public getOriginalBBox(): BBox {
    return this.originalBBox;
  }

  public getRescaledBBox(): BBox {
    return this.rescaledBBox;
  }

  public getCenterPoint(): Size {
    return this.centerPoint;
  }
}