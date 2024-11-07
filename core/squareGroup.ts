import { EColors } from "./gameControls";
import { TertrisRule } from "./rules";
import { Square } from "./squrare";
import { TetrisUtil } from "./tetrisUtil";
import { IContainerSize, IPosition, TShpae } from "./types";
import { SquarePageViewer } from "./viewer/squarePageViewer";

export class SquareGroup{
    private _squrares: readonly Square[]
    protected _isColck = true
    constructor(
        protected _shape: TShpae,
        protected _center: IPosition,
        protected _color: EColors
    ) {
       this._squrares = _shape.map(s=>{
           const sq = new Square(TetrisUtil.getLogicPostionByAbsolute(_center,s),_color)
           //todo 这个dom感觉应该参数化
        //    sq.viewer = new SquarePageViewer(sq,document.getElementById("container"))
           return sq
        })
    }
    get squares(){
        return this._squrares
    }
    /**
     * 设置中心点时候，顺便move了
     */
    set center(v: IPosition){
         this._center = v         
         this.move()
    }
    get center(){
        return this._center
    }
    get shape(){
        return this._shape
    }
    private move(){
         this.squares.forEach((s,i)=>{  
            s.point = TetrisUtil.getLogicPostionByAbsolute(this._center,this._shape[i])
         })
    }
    /**
     * 统一的rotate
     * 如果你在这里判断每个图形的规则,一方面会变得很复杂,而且不是不便于理解，这里建议使用子类来完成不同的规则,将每个具体图形继承这个类
     * 是不是多态我已经忘了，有机会我要和后端一起学习oop
     */
    rotate(panelSize: IContainerSize){
    //    console.log(this);
       
       this._shape = TetrisUtil.rotateShape(this,panelSize,this._isColck)       
       this.move()
    }
    remove(){
        this.squares.forEach(s=>{
            s.viewer.remove()
        })
    }

}