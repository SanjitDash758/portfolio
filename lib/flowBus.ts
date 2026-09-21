// Tiny pub/sub so HeroFlow can tell SystemFlow which node to open.
type Handler = (nodeId: string) => void;

const listeners = new Set<Handler>();

export function openFlowNode(nodeId: string) {
  listeners.forEach((fn) => fn(nodeId));
}

export function onOpenFlowNode(fn: Handler) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
