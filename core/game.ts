import { sleep } from '@/utils/common'
import {EControls, EGameStatus} from './gameControls'
import { TertrisRule } from './rules'
import { SquareGroup } from './squareGroup'
import { TetrisUtil } from './tetrisUtil'
import { ABTetrisConfig, IGameViewer } from './types'

import { Square } from './squrare'
/**
 * game类不知道如何显示
 */
export class Game{
    private _status: EGameStatus = EGameStatus.pending
    /**
     * 当前操作图形
     */
    private _curentTeris?: SquareGroup
    /**
     * 下一个，显示在tip中
     */
    private _nextTeris: SquareGroup = TertrisRule.createRandomGroup(TetrisUtil.g(2,2))
    
    private _dropSpeed: number = .5

    private _clearRows = 0
   
    
    /**
     * 为什么用Square,因为判断碰撞就是用的小方块
     * 
     */
    private _existSquares: Square[] = []
    
    constructor(private _viewer: IGameViewer,private _config: ABTetrisConfig){
        this.viewShowNext()
        this._viewer.init(this)
    }
    get config (){
        return this._config
    }
    get status(){
        return this._status
    }
    private get panelSize(){
        return this.config.config.panelLogicContainer
    }
    private init(){
         this._existSquares.forEach(s=>{
            s.viewer.remove()
         })
         this._existSquares = []
         this.clearRowsNum = 0
         this.viewShowNext()
         this._curentTeris = null
    }
    start(){
        console.log('start');
        
        if(this._status === EGameStatus.palying)
           return
        if(this._status === EGameStatus.over){
            this.init()
        }
        this._status = EGameStatus.palying
        if(!this._curentTeris){
            this.switchTeris()
        }
        this.autoPlay()
    }
    pause(){        
        this._status = EGameStatus.pasuse     
    }
    controls(type: EControls){
       const stratege:Partial<Record<keyof typeof EControls,()=>any>> = {
            [EControls.down]:()=>{
                 TertrisRule.move(this._curentTeris,type,this._existSquares,this.panelSize)
            },
            [EControls.left]:()=>{
                 TertrisRule.move(this._curentTeris,type,this._existSquares,this.panelSize)
            },
            [EControls.right]:()=>{
                 TertrisRule.move(this._curentTeris,type,this._existSquares,this.panelSize)
            },
            [EControls.rotate]:()=>{
                TertrisRule.rotate(this._curentTeris,this.panelSize)
            }
       }
       this._status===EGameStatus.palying && stratege[type]()
    }
    get clearRowsNum(){
        return this._clearRows
    }
    set clearRowsNum(n){
        this._clearRows = n
        this._viewer.changePoint(n)
    }
    /**
     * 触底
     * 发生在下落的时候
     * 
     * 记录所有点
     * 移除
     * 切换视图
     */
   private hitBottom(){
        // console.log(this._curentTeris)
        this._existSquares.push(...this._curentTeris.squares)    
        this.clearRows()   
        this.switchTeris()
    }
   private clearRows(){
      const clearableRows = TertrisRule.getClearableRows(this._existSquares,this.config.config.panelLogicContainer.width)
      
      clearableRows.clearSquares.forEach(s=>{
         s.viewer.remove()
         this._existSquares.splice(this._existSquares.indexOf(s),1)
      })
      clearableRows.lessThanY.forEach(ss=>{
         ss.forEach(s=>{
             const {x,y} = s.point
             s.point = {x,y:y+1}
         })
      })
      this.clearRowsNum += clearableRows.lessThanY.length*100
    }
   private  autoPlay(){
        this._status && this.autoDrop().then(res=>{            
            //一次结束
            if(!res){
                this.hitBottom()
                this.autoPlay()
            }
        }).catch(e=>{})
    }
    private async autoDrop():Promise<false>{
         return sleep(this._dropSpeed).then(()=>{
            if(this._status !== EGameStatus.palying){
                throw '停止autoDrop'
            }
            return this._status === EGameStatus.palying && TertrisRule.move(this._curentTeris,EControls.down,this._existSquares,this.panelSize) && this.autoDrop()
        })
    }
    private viewShowNext(){

        // console.log('next');
        if(this._status === EGameStatus.over){
            this._nextTeris.remove()
            return
        }
        this._nextTeris = TertrisRule.createRandomGroup(TetrisUtil.g(2,0))
        TetrisUtil.resetCenterPosition(this.config.config.panelLogicContainer.width,this._nextTeris,this.panelSize)
        this._viewer.showNext(this._nextTeris)
    }
    private viewSwith(){
        TetrisUtil.resetCenterPosition(this.config.config.panelLogicContainer.width,this._curentTeris,this.panelSize)
        if(!TertrisRule.canIMove(this._curentTeris,this._curentTeris.center,this._existSquares,this.config.config.panelLogicContainer)){
            //如果最上面一行没有，但是放不下    
            if(this._existSquares.every(s=>s.point.y)){         
                do{
                    TertrisRule.moveForce(this._curentTeris,EControls.up)
                }while(!TetrisUtil.isNotkage(this._curentTeris,this._existSquares))            
            }else{
                this._status = EGameStatus.over
                return
            }
            
        }
        this._viewer.switch(this._curentTeris)
    }
    private switchTeris(){
        this._curentTeris = this._nextTeris
        this.viewSwith()
        this.viewShowNext()
    
    }
}