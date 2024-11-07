import { IContainerSize, IPosition, IRealPositon, TShpae } from "./types";
import shapes from "./shapes";
import { SquareGroup } from "./squareGroup";
import { EControls } from "./gameControls";
import { TertrisRule } from "./rules";
import { Square } from "./squrare";
export class TetrisUtil{
    /**
     * 
     * @param position 逻辑坐标
     * @returns 
     * 通过逻辑坐标计算真实坐标
     */
    static getRealPosition(position: IPosition,realSize:IPosition){
        const res:IRealPositon = {
            x: position.x * realSize.x + "px",
            y: position.y * realSize.y + "px"
        }
        return res
    }
    /**
     * 
     * @param position 中心点位置
     * @param absolute 相对位置
     * @returns 通过相对坐标 计算逻辑坐标
     */
    static getLogicPostionByAbsolute(position:IPosition,absolute:IPosition):IPosition{
        return {
            x:position.x+absolute.x,
            y:position.y+absolute.y
        }
    }

    static getLogicPostion(center: IPosition,absolutes:TShpae){
        return absolutes.map(a=>this.getLogicPostionByAbsolute(center,a))
    }
    /**
     * 
     * @param min 
     * @param max 
     * @returns 计算min-max之间随机数, 取不到max
     */
    static getRandom(min,max){
        const dec = max-min
        if(dec<0){
            throw new Error('最大值不能小于最小值')
        }
        return Math.floor(Math.random()*dec+min)
    }

    static isType<T>(target: any,...arg:Array<keyof T>):target is T{      
        return arg.every(v=>{
            let res = target[v]===0||target[v]
            return res
            
        })
    }
    /**
    * 
    * @param group 目标图形
    * @param isClock 旋转方向
    * @returns 旋转后的相对位置
    * 顺时针(x,y)=>(-y,x)
    * 逆时针(x,y)=>(y,-x)
    */
    static rotateShape(group: SquareGroup,panelSize: IContainerSize,isClock=true):TShpae{       
       const res = group.shape.map(({x,y})=>{
             if(isClock){
                return {
                    x:-y,
                    y:x
                }
             }else{
                return {
                    x:y,
                    y:-x
                }
             }
        })
       
        
        if(TetrisUtil.isShapeInContainer(res,group.center,panelSize)){
            return res
        }
        return group.shape
    }

    /**
     * 
     * @param arg 相对坐标
     * @returns 
     * 快速生成相对坐标数组
     */
    static getShapes(...arg:IPosition[]):TShpae{
        return arg
    }
    /**
     * 
     * @param x 
     * @param y 
     * @returns 
     * 快速生成坐标
     */
    static g(x,y):IPosition{
        return {x,y}
    }

        /**
     * 
     * @param containerWidth 逻辑宽度
     * @param teris 
     * 中心点坐标初始化在容器中上方
     */
     static resetCenterPosition(containerWidth: number,teris: SquareGroup,panelSize:IContainerSize){
            const x = Math.ceil(containerWidth/2 - 1)
            // teris.shape.map(s=>{
            //    return TetrisUtil.getLogicPostionByAbsolute(teris.center,s)
            // })
            const newCenter = {x,y:0}
            while(!TetrisUtil.isShapeInContainer(teris,newCenter,panelSize) && newCenter.y< 0
            // logicConfig.config.panelLogicContainer.height /**没有实际意义，只是不想他死循环太久 */
            ){
                 newCenter.y++
            }
            // if(newCenter.y===logicConfig.config.panelLogicContainer.height){
            //     console.error('获取新中心点失败, 可能是游戏面板逻辑大小高度问题',
            //     teris.squares.map(x=>x.point),
            //     existSquares.map(s=>s.point),
            //     teris.shape,
            //     teris.center,
            //     newCenter   
            //   )
                
            // }
            teris.center = newCenter
     }
     /**
      * 
      * @param target 逻辑坐标
      * 逻辑坐标是否在容器内
      */
     static isPointInContainer(target: IPosition,panelSize: IContainerSize){
        // const {panelLogicContainer} = logicConfig.config
        const {x,y} = target
        return x >= 0 && x < panelSize.width && y >= 0 && y< panelSize.height
     }
     
     static isShapeInContainer(shape: TShpae,targetPostion: IPosition,panelSize: IContainerSize):boolean
     static isShapeInContainer(shape: SquareGroup,targetPostion: IPosition,panelSize: IContainerSize):boolean
     static isShapeInContainer(s:TShpae|SquareGroup,t: IPosition,panelSize: IContainerSize):boolean{
        if(this.isType<SquareGroup>(s,'shape')){
             s = s.shape
        }
        const allLogicPos = s.map(s=>{
            return TetrisUtil.getLogicPostionByAbsolute(t,s)
        })
        //边界判断
        return allLogicPos.every(p=>TetrisUtil.isPointInContainer(p,panelSize)) 
     }
     

     static isNotkage(shape:SquareGroup,existSquares:Square[]){
       return this.getLogicPostion(shape.center,shape.shape)
        .every(({x,y})=>existSquares.every(e=>!(e.point.x===x && e.point.y === y)))

     }


   

}