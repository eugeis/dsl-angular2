export interface Node {
	branches: Node[],
	data?: any,
	size?: number
}

export function cloneNodeShallow(n: Node) {
	return {
		branches: n.branches,
		data: n.data,
		size: n.size
	}
}
