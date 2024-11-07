// import { type } from "os"

import { Game } from "./game"
import { SquareGroup } from "./squareGroup"



/**
 * 游戏中的逻辑坐标
 */
interface IPosition{
   readonly x: number,
   readonly y: number
}

interface IRealPositon{
   readonly x: string,
   readonly y: string
}

export interface IContainerSize{
    readonly width: number,
    readonly height: number
}
/**
 * 接口连接连接两个类 
 */
interface IViewer{
    show():void
    remove(): void
}

/**
 * 逻辑相对位置组成的图形
 */
type TShpae = readonly IPosition[]

interface IContainerConfig{
     readonly width: number,
     readonly height: number
}

export abstract class ABTetrisConfig{
    protected readonly abstract panelLogicContainer: IContainerConfig
    // readonly abstract realContainer: IContainerConfig
    // protected readonly abstract squareContainer: IContainerConfig
    protected readonly abstract nextLoginContainer: IContainerConfig

    // static isFit({logicContainer,squareContainer}:ABTetrisConfig){
    //    return logicContainer.width * squareContainer.width === realContainer.width 
    //      &&
    //     logicContainer.height * squareContainer.height === realContainer.height
    // }
    abstract get config():IABTetrisConfigReturn
}

export interface IGameViewer{
   showNext(teris: SquareGroup):void
   switch(teris: SquareGroup): void
   init(game: Game): void
   changePoint(point: number): void
} 


export interface IABTetrisConfigInit{
    panelLogicContainer: IContainerConfig,
    nextLoginContainer: IContainerConfig
}

export interface IABTetrisConfigReturn extends IABTetrisConfigInit{
   
}

export interface IABTetrisViewConfigInit{
    squareContainer: IContainerConfig,
    doms :{
        panel: HTMLElement,
        next: HTMLElement
    }
}

export interface IABTetrisViewConfigReturn extends IABTetrisViewConfigInit{

}

export type{
    IPosition,
    IViewer,
    TShpae,
    IRealPositon,
    // ABTetrisConfig ,
    IContainerConfig
}

