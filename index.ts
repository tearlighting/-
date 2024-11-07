import { ABTetrisConfig, IABTetrisViewConfigInit } from "./core/types";
import {
  IContainerConfig,
  IABTetrisConfigInit,
  IABTetrisConfigReturn,
} from "./core/types";
import { ABTerisViewConfig } from "./core/viewer/viewConfig";
import "./test";

class TetrisLogicConfig extends ABTetrisConfig {
  get config(): IABTetrisConfigReturn {
    return {
      panelLogicContainer: this.panelLogicContainer,
      // squareContainer:this.squareContainer,
      nextLoginContainer: this.nextLoginContainer,
    };
  }
  private constructor(
    protected readonly panelLogicContainer: IContainerConfig,
    // protected readonly squareContainer: IContainerConfig,
    protected readonly nextLoginContainer: IContainerConfig
  ) {
    super();
  }
  private static _instance: TetrisLogicConfig;

  static getInstance({
    panelLogicContainer,
    nextLoginContainer,
  }: IABTetrisConfigInit): ABTetrisConfig {
    if (this._instance) return this._instance;
    else {
      this._instance = new TetrisLogicConfig(
        panelLogicContainer,
        nextLoginContainer
      );
      return this.getInstance({ panelLogicContainer, nextLoginContainer });
    }
  }
}

class TerisViewConfig extends ABTerisViewConfig {
  get config() {
    return {
      squareContainer: this.squareContainer,
      doms: this.doms,
    };
  }
  private constructor(
    protected squareContainer: IContainerConfig,
    protected doms: { panel: HTMLElement; next: HTMLElement }
  ) {
    super();
  }
  private static _instance: TerisViewConfig;
  static getInstancen({
    squareContainer,
    doms,
    logicConfig,
  }: IABTetrisViewConfigInit & {
    logicConfig: ABTetrisConfig;
  }): ABTerisViewConfig {
    if (this._instance) {
      return this._instance;
    } else {
      if (this.isFit) {
        this._instance = new TerisViewConfig(squareContainer, doms);
        return this.getInstancen({ squareContainer, doms, logicConfig });
      } else {
        throw new Error("初始化逻辑值与实际值不匹配");
      }
    }
  }
}

const getConfigInstance = () => {
  const logicConfig = TetrisLogicConfig.getInstance({
    panelLogicContainer: {
      height: 15,
      width: 10,
    },
    nextLoginContainer: {
      width: 6,
      height: 6,
    },
  });
  const viewConfig = TerisViewConfig.getInstancen({
    squareContainer: {
      height: 30,
      width: 30,
    },
    doms: {
      panel: document.getElementById("container"),
      next: document.getElementById("next"),
    },
    logicConfig,
  });

  return {
    logicConfig,
    viewConfig,
  };
};

export { getConfigInstance };
