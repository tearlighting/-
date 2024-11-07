import { EColors } from './gameControls'
import { SquareGroup } from './squareGroup'
import { TetrisUtil } from './tetrisUtil'
import {IContainerSize, IPosition, TShpae} from './types'
const g = TetrisUtil.g
const getShapes = TetrisUtil.getShapes
/**
 * 因为每种图形的旋转规则都不一样，将这了的图形坐标数组，改为类
 */
// const TShpaes = getShapes(g(0,0),g(-1,0),g(1,0),g(0,1)) 
// const LShape = getShapes(g(0,0),g(0,1),g(-1,0),g(-2,0))
// const LMirrorShape = getShapes(g(0,0),g(0,1),g(1,0),g(2,0))
// const SShape = getShapes(g(0,0),g(0,1),g(-1,0),g(1,1))
// const SMirrorShape = getShapes(g(0,0),g(0,1),g(-1,1),g(1,0))
// const SquareShape = getShapes(g(0,0),g(0,1),g(1,0),g(1,1))
// export abstract class DefaultShapeRotateShape extends SquareGroup{
//     protected _uniqueShape: TShpae = []
//     constructor(
//         protected _center: IPosition,
//         protected _color: string
//     ){
//         super(DefaultShapeRotateShape._uniqueShape,_center,_color)
//     }
// } 
class TShpaes extends SquareGroup{
    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(-1,0),g(1,0),g(0,1)),_center,_color)
    }
}
class LShape extends SquareGroup{
    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(0,1),g(-1,0),g(-2,0)),_center,_color)
    }
}
class LMirrorShape extends SquareGroup{

    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(0,1),g(1,0),g(2,0)),_center,_color)
    }
}

class SShape extends SquareGroup{

    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(0,1),g(-1,0),g(1,1)),_center,_color)
    }
    rotate(panelSize: IContainerSize): void {
        super.rotate(panelSize)
        this._isColck = !this._isColck
    }
}
class SMirrorShape extends SquareGroup{
    // protected static _uniqueShape: TShpae = getShapes(g(0,0),g(0,1),g(-1,1),g(1,0))
    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(0,1),g(-1,1),g(1,0)),_center,_color)
    }
    rotate(panelSize: IContainerSize): void {
        super.rotate(panelSize)
        this._isColck = !this._isColck
    }
}

class SquareShape extends SquareGroup{
    // protected static _uniqueShape: TShpae = getShapes(g(0,0),g(0,1),g(1,0),g(1,1))
    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(0,1),g(1,0),g(1,1)),_center,_color)
    }
    rotate(): void {
       return
    }
}

class LineShape extends SquareGroup{
    // protected static _uniqueShape: TShpae = getShapes(g(0,0),g(-1,0),g(1,0),g(2,0))
    constructor(
        protected _center: IPosition,
        protected _color: EColors,
    ){
        super(getShapes(g(0,0),g(-1,0),g(1,0),g(2,0)),_center,_color)
    }
    rotate(panelSize: IContainerSize): void {
        super.rotate(panelSize)
        this._isColck = !this._isColck
    }
}



export default {
        TShpaes,
        LShape,
        LMirrorShape,
        SShape,
        SMirrorShape,
        SquareShape,
        LineShape,
        // DefaultShapeRotateShape
}