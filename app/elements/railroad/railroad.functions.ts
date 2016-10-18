/*
 * Copyright Siemens AG, 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *
 * @author Jonas Möller
 */
export function fromSVGScale(p: number, tp: number, z: number): number {
	return (p - tp) / z;
}

export function toSVGScale(p: number, tp: number, z: number): number {
	return (p * z) + tp;
}

export function calcTranslate(m: SVGPoint, z1: number, z2: number, tx: number, ty: number): [number, number] {
	return [
		-(fromSVGScale(m.x, tx, z1) * z2 - m.x),
		-(fromSVGScale(m.y, ty, z1) * z2 - m.y)
	];
}

export function calcZoom(delta: number, zoomlevel: number, min: number, max: number): number {
	return Math.min(Math.max(min, zoomlevel + (delta / 500)), max);
}

export function cursorPoint(svg: SVGLocatable, pt: SVGPoint, evt: MouseEvent){
	pt.x = evt.clientX;
	pt.y = evt.clientY;
	return pt.matrixTransform(svg.getScreenCTM().inverse());
}
