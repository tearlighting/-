<script lang="ts" setup>
import { SquareGroup } from "./core/squareGroup";
import { Square } from "./core/squrare";
import { SquarePageViewer } from "./core/viewer/squarePageViewer";
import { Ref, computed, onMounted, ref, watch } from "vue";
import shapes from "./core/shapes";
import { TetrisUtil } from "./core/tetrisUtil";
import { EControls } from "./core/gameControls";
import { TertrisRule } from "./core/rules";
import { IPosition } from "./core/types";
import { Game } from "./core/game";
import { gameViewer } from "./core/viewer/gameViewer";
import { getConfigInstance } from ".";

// window.onkeypress = (e)=>{
//     console.log(e.code);

// }
const point = ref(0);
// const game = ref<Game>(null)
onMounted(() => {
	const { viewConfig, logicConfig } = getConfigInstance();
	const game = new Game(new gameViewer(viewConfig, point), logicConfig);
});


</script>

<template>
	<div class="app-container">
		<div class="game">
			<div id="container"></div>
			<div id="tip">
				<div id="next"></div>
				<span>{{ point }}</span>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
@import "./core/viewer/style/index.less";

.app-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;

	.game {
		display: flex;
		justify-content: center;
	}

	.control {
		display: flex;
		width: 100%;
		justify-content: center;
	}
}
</style>
