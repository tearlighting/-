import { UnwrapNestedRefs } from "vue";
import { Game } from "../game";
import { EControls, EGameStatus } from "../gameControls";
import { SquareGroup } from "../squareGroup";
import { IGameViewer } from "../types";
import { SquarePageViewer } from "./squarePageViewer";
import { ABTerisViewConfig } from "./viewConfig";

export class gameViewer implements IGameViewer{
    constructor(private _config: ABTerisViewConfig,
        private vuedata: UnwrapNestedRefs<any> 
    ){

    }
    changePoint(n: number): void {
        this.vuedata.value = n
    }
    get config(){
        return this._config
    }
    init(game: Game): void {
        // throw new Error("Method not implemented.");
        window.onkeydown = (e: KeyboardEvent)=>{
            // console.log(e.code);
            let control:EControls
            if(e.code === 'ArrowLeft'){
                control = EControls.left
            }else if(e.code === 'ArrowRight'){
                control = EControls.right
            }else if(e.code === 'ArrowDown'){
                control = EControls.down
            }else if(e.code === 'ArrowUp'){
                control = EControls.rotate
            }else if(e.code === "Space"){              
                if(game.status===EGameStatus.pasuse||game.status===EGameStatus.over){
                    game.start()
                }else {
                    game.pause()
                }

            }
            control && game.controls(control)
        }
        console.log('init');
        
        game.start()
    }
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(s=>{
            // s.viewer.show()
            s.viewer = new SquarePageViewer(s,this.config.config.doms.next,this.config.config.squareContainer)
        })
    }
    switch(teris: SquareGroup): void {
        teris.squares.forEach(s=>{
            s.viewer.remove()
            s.viewer = new SquarePageViewer(s,this._config.config.doms.panel,this.config.config.squareContainer)
        })
    }
}