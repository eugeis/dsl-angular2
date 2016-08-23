export enum NodeOrientation {
	Horizontal = 1,
	Vertical = 2
}

export function inv(orientation: NodeOrientation) {
	return (orientation == NodeOrientation.Horizontal) ? NodeOrientation.Vertical : NodeOrientation.Horizontal;
}

export function getClass(orientation: NodeOrientation) {
	return (orientation == NodeOrientation.Horizontal) ? "hor" : "vert";
}
