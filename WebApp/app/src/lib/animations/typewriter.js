export function typewriter(node, { speed = 1, delay = 0, duration }) {

    let valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;
    // This is a get-around for the <li> elements in {#each} blocks having 2 childNodes for some reason. Haven't got the time to learn why, so this will do for now until it causes an issue later on (its a hobby project, im allowed to do this)
    if (node.childNodes.length === 2) {
        valid = true;
    }
    if (!valid) {
        throw new Error(`This transition only works on elements with a single text node child`);
    }

    const text = node.textContent;

    if (!duration) {
        duration = text.length / (speed * 0.01);
    }

    return {
        duration,
        delay,
        tick: (t) => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        }
    };
}