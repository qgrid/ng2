import { Model } from '../model/model';
import { PipeFolder } from '../pipe/pipe.types';
import { SceneStateColumnRows, SceneStateColumnLine, SceneStateColumnArea } from './scene.state';

export declare class Scene {
	constructor(model: Model);

	rows(memo: PipeFolder): any[];
	columnRows(items: SceneStateColumnRows): SceneStateColumnRows;
	columnLine(items: SceneStateColumnRows): SceneStateColumnLine;
	columnArea(items: SceneStateColumnRows): SceneStateColumnArea;
}
