
import {Square} from '../squrare'
import { IPosition, IViewer } from '../types';
import { TetrisUtil } from '../tetrisUtil';


export class SquarePageViewer implements IViewer{
    private domInstance?: HTMLElement
    private isRemoved = false
    constructor(
        private square: Square,
        private container: HTMLElement,
        private squareRealSize:Record<'width'|'height',number>

    ){
        this.show()
    }
    show(): void {
        if(this.isRemoved)
           return
        if(!this.domInstance){
            const div = document.createElement('div')
            div.classList.add("squraInstanceClass")
            this.domInstance = div
            this.container.appendChild(this.domInstance)
        }
        const realpos = TetrisUtil.getRealPosition(this.square.point,{x:this.squareRealSize.width,y:this.squareRealSize.height})
        const style:Partial<CSSStyleDeclaration> = {
            left:realpos.x,
            top:realpos.y,
            background: this.square.color
        }
        for(let i in style){
            this.domInstance.style[i!] = style[i]
        }
        // console.log(this.domInstance);
        

    }
    move(p:IPosition){
        this.square.point = p
    }
    remove(): void {
        // throw new Error('Method not implemented.');
        if(this.isRemoved){
             console.log(this.domInstance);
             return
             
        }
        this.domInstance?.remove()
        this.isRemoved = true
    }
}