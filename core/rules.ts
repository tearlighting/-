import { sleep } from "@/utils/common";

import { EColors, EControls } from "./gameControls";
import { SquareGroup } from "./squareGroup";
import { TetrisUtil } from "./tetrisUtil";
import { IContainerSize, IPosition, TShpae } from "./types";
import shapes from "./shapes";
import { Square } from "./squrare";


 
// 输出 ObjValues 类型，你会看到它是 'number'[]

/**
 * 控制类的操作能不能进行
 */
export class TertrisRule{
      /**
       * 
       * @param shape 
       * @param targetPostion 中心点想要移动的位置
       * @param existSquares 
       * @returns 
       * 判断SquareGroup是否可以移动
       */
      static canIMove(shape: TShpae,targetPostion: IPosition, existSquares:Square[],panelSize:IContainerSize):boolean
      static canIMove(shape: SquareGroup,targetPostion: IPosition,existSquares:Square[],panelSize:IContainerSize):boolean
      static canIMove(shape: TShpae|SquareGroup,targetPostion: IPosition,existSquares:Square[],panelSize:IContainerSize):boolean
      {
        if(TetrisUtil.isType<SquareGroup>(shape,'shape')){
            shape = shape.shape
        }
        const allLogicPos = shape.map(s=>{
            return TetrisUtil.getLogicPostionByAbsolute(targetPostion,s)
        })
        //边界判断
        return allLogicPos.every(p=>TetrisUtil.isPointInContainer(p,panelSize)) 
        &&
        //碰撞判断
        allLogicPos.every(({x,y})=>existSquares.every(e=>!(e.point.x===x && e.point.y === y)))
        
      }
        /**
         * 
         * @param group 
         * @param postion 移动终点
         * 
         */
        static move(group: SquareGroup,postion: IPosition,existSquares: Square[],panelSize: IContainerSize):boolean
        static move(group: SquareGroup,controls: EControls,existSquares: Square[],panelSize: IContainerSize):boolean
        static move(g: SquareGroup,p: IPosition | EControls,existSquares: Square[],panelSize: IContainerSize):boolean { 
            try{            
                if(TetrisUtil.isType<IPosition>(p,'x','y')){
                    if(this.canIMove(g.shape,p,existSquares,panelSize))
                       g.center = p
                    else
                      return false
                }else{
                    let {x,y} = g.center
                    let position:IPosition;
                    if(p === EControls.right){
                        position = { x:++x,y }
                    }else if(p === EControls.left){
                        position = { x:--x,y }
                    }else{
                        // console.log(p,TetrisUtil.isType<IPosition>(p,'x','y'));
                        position = { x,y:++y }
                    }
                    return this.move(g,position,existSquares,panelSize)
                }
                return true
            }catch{
                return false
            }
        }


        /**
         * 没有判断直接移动
         */
        static moveForce(group: SquareGroup,postion: IPosition)
        static moveForce(group: SquareGroup,controls: EControls)
        static moveForce(g: SquareGroup,p: IPosition| EControls){
                if(TetrisUtil.isType<IPosition>(p,'x','y')){
                       g.center = p
                }else{
                    let {x,y} = g.center
                    let position:IPosition;
                    if(p === EControls.right){
                        position = { x:++x,y }
                    }else if(p === EControls.left){
                        position = { x:--x,y }
                    }else if(p === EControls.down){
                        // console.log(p,TetrisUtil.isType<IPosition>(p,'x','y'));
                        position = { x,y:++y }
                    }else {
                        position = { x,y:--y }
                    }
                    return this.moveForce(g,position)
                }
        }
        
        // /**
        //  * 
        //  * @param group 
        //  * @param controls 
        //  * 想加一个类之类的控制停止下落之类的
        //  * @returns 移动完了就不能移动了，所以返回false
        //  */
        // static async moveToEnd(group: SquareGroup,controls: EControls,existSquares: Square[]):Promise<boolean>{
        //     return sleep(.1).then(()=>this.move(group,controls,existSquares) && this.moveToEnd(group,controls,existSquares))
        // }
        static rotate(group: SquareGroup,panelSize:IContainerSize){  
                      
             group.rotate(panelSize)
        }

        static createRandomGroup(position: IPosition): SquareGroup{
            const allShapes = Object.values(shapes)
            const index = TetrisUtil.getRandom(0,allShapes.length)    
            const colors = Object.values(EColors)        
            const index2 = TetrisUtil.getRandom(0,colors.length)
            return this.createGroup(allShapes[index],position,colors[index2])
        }
        static createGroup(type:ValueOf<typeof shapes>  ,center:IPosition,color: EColors){
            return  new type(center,color)
        }
        /**
         * 
         * @param exists 
         * @returns 
         * 获取所有需要消除的行
         */
        static getClearableRows(exists: Square[],logicWith: number){
            const group = exists.reduce((pre,cur)=>{
                pre[cur.point.y] = pre[cur.point.y]||[]
                pre[cur.point.y].push(cur)
                return pre
            },{} as {[k: number]: Square[]})
            const map = <{[k: number]: Square[]}>{}
            for(let i in group){
                if(group[i].length === logicWith){
                   map[i] = group[i]
                }
            }
            const clearYindex = Object.keys(map)
            const res = {
                clearYindex,
                clearSquares: Object.values(map).reduce((p,n)=>{ p.push(...n); return p },[] as Square[]),
                lessThanY: clearYindex.map(y=>{
                    return exists.filter(s=>s.point.y<Number(y))
                 })
            } 
           

            return res
        }



}