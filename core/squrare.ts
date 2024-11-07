/**
 * 最小的类 --小方块
 * 里面的全是逻辑数据,和界面数据没用任何关系
 */

import { IPosition, IViewer } from "./types";

export class Square{
    // private _point:IPosition
    // private _color:string
    //显示者
    private _viewer?:IViewer
    get point(){
        return this._point
    }
    set point(p: IPosition){
        this._point = p  
        //只知道数据变化要显示
        this._viewer?.show() 
        // console.log(this.point,this.viewer);
        
    }
    get color(){
        return this._color
    }
    get viewer():IViewer|undefined{
        return this._viewer
    }
    set viewer(v:IViewer){
        this._viewer = v
    }
    constructor(
        private _point:IPosition,
        private _color:string
    ){}
}

/**
 * 显示会变化
 * 但显示与Square无关
 * 开闭原则 Square不用修改 view可以拓展
 */
class SquareViewer implements IViewer{
    constructor(
        private square: Square
    ){}
    show(): void {
        console.log(this.square.point); 
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
    
}



// const sq = new Square({x:0,y:0},'red')

// //不能让他绕过
// // sq.point.x = 1