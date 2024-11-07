import { ABTetrisConfig, IABTetrisViewConfigInit, IABTetrisViewConfigReturn, IContainerConfig } from "../types"



export abstract class ABTerisViewConfig{
     protected readonly abstract squareContainer: IContainerConfig
     protected readonly abstract doms :{
         panel: HTMLElement,
         next: HTMLElement
     }
    static isFit(logicConfig: ABTetrisConfig,viewConfig:IABTetrisViewConfigInit){
         const {panelLogicContainer} = logicConfig.config
         const {doms,squareContainer} = viewConfig
         squareContainer.height*panelLogicContainer.height === doms.panel.clientHeight &&
         squareContainer.width*panelLogicContainer.width === doms.panel.clientWidth
     }
     abstract get config(): IABTetrisViewConfigReturn
}