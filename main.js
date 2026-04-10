/**
 * @type {Array<Fetch>}
 */
const fetchQueue = [];

class Fetch {
	/**
	 * @template T
	 * @param {RequestInfo | URL} input
	 * @param {RequestInit | null} init
	 * @param {function(T | PromiseLike<T>)} resolve
	 * @param {function(object | null)} reject
	 */
	constructor(input, init, resolve, reject) {
		this.input = input;
		this.init = init;
		this.resolve = resolve;
		this.reject = reject;
	}
}

/**
 * @param {RequestInfo | URL} input
 * @param {RequestInit | null} init
 * @returns {Promise<Response>}
 */
function fetchRateLimited(input, init) {
	return new Promise((resolve, reject) => {
		fetchQueue.push(new Fetch(input, init, resolve, reject));
	});
}

/**
 * @param {number} start
 * @param {number} end
 * @param {number} weight
 * @returns {number}
 */
function lerp(start, end, weight) {
	return (1 - weight) * start + weight * end;
}

function randomId(length = 10) {
	return Math.random().toString(36).substring(2, length + 2);
}

const cardBackSVG = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" id="svg1" width="100%" height="auto" viewBox="0 0 635 889"><defs id="defs1"><clipPath id="clipPath66" clipPathUnits="userSpaceOnUse"><rect id="rect66" width="3221" height="4550" x="-73" y="-720" ry="223" style="fill:#4e3341;fill-opacity:1;stroke:#674457;stroke-width:101.958;stroke-linejoin:round;stroke-miterlimit:7.6;stroke-dasharray:none;stroke-opacity:1"/></clipPath></defs><g id="layer1"><rect id="rect1" width="616" height="870" x="10" y="10" ry="43" style="fill:#4e3341;fill-opacity:1;stroke:#674457;stroke-width:19.484;stroke-linejoin:round;stroke-miterlimit:7.6;stroke-dasharray:none;stroke-opacity:1"/><g id="g2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="7" clip-path="url(#clipPath66)" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1" transform="translate(24 147)scale(.1911)"><path id="path1-2" d="m1508 1620-1 1h-2l-1 1-2 1-1 1-2 1-1 1h-2l-1 1-2 1-2 1h-1l-2 1-2 1h-2l-1 1-2 1h-2l-2 1h-2l-2 1h-1l-2 1h-2l-2 1h-2l-2 1h-2l-2 1h-4l-2 1h-6l-3 1h-31l-2-1h-7l-3-1h-5l-2-1h-2l-3-1h-2l-3-1-2-1h-3l-2-1-3-1h-2l-3-1-2-1-3-1-2-1-3-1-2-1-3-1-2-1-3-1-3-1-2-1-3-1-2-1-3-2-2-1-3-1-2-2-3-1-2-2-3-1-3-2-2-1-3-2-2-2-3-2-2-1-3-2-2-2-3-2-2-2-3-2-2-2-3-2-2-2-3-2-2-3-2-2-3-2-2-3-3-2-2-2-2-3-3-2-2-3-2-3-2-2-3-3-2-3-2-3-2-3-3-3-2-2-2-3-2-4-2-3-2-3-2-3-2-3-2-3-2-4-2-3-2-4-2-3-1-4-2-3-2-4-2-3-1-4-2-4-1-4-2-3-2-4-1-4-2-4-1-4-1-4-2-4-1-4-1-5-1-4-1-4-2-4-1-5-1-4-1-5-1-4v-4l-1-5-1-5-1-4v-5l-1-5v-4l-1-5v-5l-1-5v-19l-1-6v-5l1-5v-20l1-6v-5l1-5v-5l1-6 1-5 1-6 1-5 1-5 1-6 1-5 1-6 1-5 2-6 1-6 2-5 1-6 2-5 2-6 1-6 2-5 2-6 2-6 3-5 2-6 2-6 3-6 2-5 3-6 3-6 2-5 3-6 3-6 3-6 3-5 4-6 3-6 3-6 4-5 4-6 3-6 4-5 4-6 4-6 4-5 4-6 5-6 4-5 5-6 4-5 5-6 5-5 5-6 5-5 5-6 5-5 5-5 6-6 5-5 6-5 6-6 5-5 6-5 6-5 6-5 7-5 6-5 6-5 7-5 7-5 6-5 7-4 7-5 7-4 7-5 8-4 7-5 8-4 7-5 8-4 8-4 8-4 8-4 8-4 8-4 8-4 8-3 9-4 9-3 8-4 9-3 9-3 9-4 9-3 9-3 10-2 9-3 9-3 10-2 10-3 9-2 10-3 10-2 10-2 10-2 11-1 10-2 10-2 11-1 10-2 11-1 11-1 10-1 11-1h11l11-1h23l11-1h11l12 1h23l11 1 12 1 12 1 12 1 12 1 12 1 12 2 12 1 12 2 12 2 12 2 13 3 12 2 12 3 13 3 12 3 13 3 12 4 13 3 12 4 13 4 13 4 13 4 12 5 13 5 13 4 13 6 13 5 12 5 13 6 13 6 13 6 13 6 13 7 13 6 13 7 12 7 13 8 13 7 13 8 13 8 13 8 13 8 12 9 13 9 13 9 13 9 12 10 13 9 12 10 13 10 12 11 13 10 12 11 13 11 12 11 12 12 12 11 12 12 12 12 12 13 12 13 12 12 11 13 12 14 11 13 12 14 11 14 11 14 11 15 11 15 11 14 11 16 10 15 11 16 10 16 10 16 10 16 10 17 10 16 10 17 9 18 10 17 9 18 9 18 8 18 9 18 9 19 8 19 8 19 8 19 8 20 7 20 7 20 8 20 6 20 7 21 7 21 6 21 6 21 6 22 5 21 6 22 5 22 4 23 5 22 4 23 4 23 4 23 4 24 3 23 3 24 3 24 2 24 2 24 2 25 1 24 2 25 1 25v25l1 26v25l-1 26v26l-1 26-2 26-2 26-2 27-2 26-3 27-3 27-3 27-4 27-4 27-5 28-5 27-5 28-6 27-6 28-6 28-7 28-7 28-8 29-8 28-8 28-9 29-9 28-10 29-10 28-11 29-11 29-11 29-12 29-13 28-12 29-13 29-14 29-14 29-15 29-15 29-15 29-16 29-17 29-17 29-17 29-18 29-18 29-19 28-19 29-20 29-20 28-21 29-21 28-22 29-22 28-23 28-23 28-24 28-24 28-25 28-25 27-26 28-26 27-27 27-28 27-27 27-29 26-29 27-29 26-30 26-30 26-31 25-32 25-32 26-32 24-34 25-33 24-34 24-35 24-35 24-36 23-36 23-37 23" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path2" d="M1429 1597h-3l-2-1h-3l-2-1h-1l-2-1h-2l-2-1h-1l-2-1h-2l-2-1h-1l-2-1-2-1h-2l-1-1-2-1-2-1-2-1h-2l-1-1-2-1-2-1-2-1-1-1-2-1-2-1-2-1-2-1-1-1-2-1-2-1-2-2-1-1-2-1-2-1-2-2-1-1-2-2-2-1-2-1-1-2-2-1-2-2-1-2-2-1-2-2-1-1-2-2-2-2-1-2-2-1-2-2-1-2-2-2-1-2-2-2-1-2-2-2-1-2-2-2-1-2-2-2-1-2-2-3-1-2-1-2-2-2-1-3-1-2-2-3-1-2-1-2-2-3-1-3-1-2-1-3-1-2-1-3-1-3-1-2-1-3-1-3-1-3-1-3-1-2-1-3-1-3-1-3-1-3v-3l-1-3-1-3v-3l-1-4-1-3v-3l-1-3v-3l-1-4v-6l-1-4v-13l-1-4v-10l1-4v-14l1-4v-7l1-4v-4l1-4v-3l1-4 1-4 1-4v-4l1-3 1-4 1-4 1-4 1-4 1-4 2-4 1-4 1-4 2-4 1-4 1-4 2-4 2-4 1-4 2-4 2-4 2-4 2-4 2-4 2-4 2-4 2-4 2-4 3-4 2-4 2-4 3-3 2-4 3-4 3-4 3-4 2-4 3-4 3-4 3-4 3-4 4-4 3-4 3-4 4-3 3-4 4-4 3-4 4-4 4-3 3-4 4-4 4-3 4-4 4-4 5-3 4-4 4-3 4-4 5-3 4-4 5-3 5-3 5-4 4-3 5-3 5-3 5-3 5-4 6-3 5-3 5-3 6-2 5-3 6-3 5-3 6-3 6-2 5-3 6-2 6-3 6-2 6-3 7-2 6-2 6-2 7-2 6-3 7-2 6-1 7-2 6-2 7-2 7-1 7-2 7-1 7-2 7-1 7-1 7-1 8-1 7-1 8-1 7-1 7-1h8l8-1h7l8-1h40l8 1h16l8 1 8 1h9l8 1 8 1 9 2 8 1 9 1 8 2 9 1 8 2 9 2 9 2 8 2 9 2 9 2 9 3 8 2 9 3 9 3 9 3 9 3 9 3 9 3 9 4 9 4 8 3 9 4 9 4 9 4 9 5 9 4 9 5 9 5 9 4 9 5 9 6 9 5 9 5 9 6 9 6 9 6 9 6 9 6 9 6 9 7 8 7 9 7 9 7 9 7 8 7 9 7 9 8 8 8 9 8 8 8 9 8 8 9 8 8 9 9 8 9 8 9 8 9 8 9 8 10 8 10 8 10 8 10 7 10 8 10 7 11 8 10 7 11 8 11 7 11 7 12 7 11 7 12 6 12 7 12 7 12 6 12 6 12 7 13 6 13 6 13 5 13 6 13 6 14 5 13 5 14 6 14 5 14 5 14 4 14 5 15 4 14 5 15 4 15 4 15 3 15 4 16 3 15 4 16 3 16 3 16 2 16 3 16 2 16 3 17 1 17 2 16 2 17 1 17 1 17 1 18 1 17 1 18v53l-1 18v18l-1 18-1 18-1 19-2 18-2 19-2 19-2 19-3 18-2 19-3 19-4 20-3 19-4 19-4 20-5 19-4 20-5 19-5 20-6 20-6 19-6 20-6 20-7 20-7 20-7 20-8 20-7 20-9 20-8 20-9 20-9 21-9 20-10 20-10 20-10 21-11 20-11 20-11 20-12 20-12 21-12 20-13 20-13 20-13 20-14 20-14 20-14 20-15 20-15 20-15 19-16 20-16 20-16 19-17 20-17 19-18 19-18 19-18 19-18 19-19 19-19 19-20 19-20 18-20 18-21 19-21 18-22 18-21 17-23 18-22 17-23 18-23 17-24 17-24 16-24 17-25 16-25 16-26 16-25 16-27 15-26 15-27 15-27 15-28 14-28 15-28 14-29 13-29 14-30 13-29 13-30 12-31 12-31 12-31 12-32 11-31 11-33 11-32 10-33 10-33 10-34 9-34 9-34 8-35 8-34 8-36 8-35 6-36 7-36 6-37 6-36 5-38 5-37 4-38 4-38 4-38 3-38 3-39 2-39 1-40 2H159l-41-1-40-1-41-2-41-2-42-3-41-4-42-4-42-4-43-5-42-6-43-6" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path3" d="m1384 1529-2-1-1-2-1-1-1-1-1-2-1-1-1-1-1-2-1-1-1-2-1-1-1-2-1-1-1-2-1-2-1-1-1-2-1-2-1-1-1-2v-2l-1-1-1-2-1-2-1-2-1-2v-2l-1-1-1-2v-2l-1-2-1-2v-2l-1-2-1-2v-2l-1-2v-2l-1-3v-2l-1-2v-2l-1-2v-5l-1-2v-5l-1-2v-12l-1-2v-10l1-2v-13l1-3v-5l1-2v-6l1-2v-3l1-3 1-2v-3l1-3 1-2v-3l1-3 1-3 1-2 1-3 1-3 1-3 1-2 1-3 1-3 1-3 1-3 1-2 2-3 1-3 1-3 2-3 1-2 2-3 1-3 2-3 1-2 2-3 2-3 2-3 1-3 2-2 2-3 2-3 2-3 2-2 2-3 3-3 2-3 2-2 2-3 3-3 2-2 2-3 3-3 2-2 3-3 3-2 2-3 3-3 3-2 3-3 3-2 3-3 3-2 3-3 3-2 3-2 3-3 3-2 4-2 3-3 3-2 4-2 3-2 4-3 3-2 4-2 4-2 4-2 3-2 4-2 4-2 4-2 4-2 4-1 4-2 4-2 4-2 5-1 4-2 4-2 5-1 4-2 5-1 4-1 5-2 4-1 5-1 5-2 4-1 5-1 5-1 5-1 5-1 5-1h5l5-1 5-1 5-1h5l6-1h10l6-1h49l6 1h6l6 1h5l6 1 6 1 6 1h6l6 1 6 2 6 1 6 1 6 1 6 2 6 1 6 2 6 1 6 2 6 2 7 2 6 2 6 2 6 2 6 3 7 2 6 2 6 3 6 3 7 2 6 3 6 3 6 3 7 4 6 3 6 3 7 4 6 3 6 4 6 4 7 4 6 4 6 4 6 4 6 4 7 5 6 4 6 5 6 4 6 5 6 5 6 5 7 5 6 6 6 5 5 5 6 6 6 6 6 6 6 6 6 6 6 6 5 6 6 6 6 7 5 7 6 6 5 7 6 7 5 7 5 7 6 8 5 7 5 7 5 8 5 8 5 8 5 8 5 8 5 8 4 8 5 9 4 8 5 9 4 9 4 8 5 9 4 10 4 9 4 9 4 9 3 10 4 10 3 9 4 10 3 10 4 10 3 10 3 11 3 10 2 11 3 10 3 11 2 11 2 10 3 11 2 12 2 11 2 11 1 11 2 12 1 11 2 12 1 12 1 12 1 12v12l1 12v12l1 12v37l-1 13v13l-1 12-1 13-1 13-1 13-1 13-2 13-2 13-1 14-2 13-3 13-2 14-3 13-2 14-3 13-4 14-3 13-4 14-3 14-4 14-4 13-5 14-4 14-5 14-5 14-5 14-6 14-5 14-6 14-6 14-6 14-7 14-6 14-7 15-7 14-8 14-7 14-8 14-8 14-8 14-9 14-8 14-9 14-10 14-9 14-10 14-10 14-10 14-10 14-11 14-11 13-11 14-11 14-12 13-11 14-13 13-12 14-12 13-13 13-13 14-14 13-13 13-14 13-14 13-15 12-14 13-15 12-15 13-15 12-16 12-16 13-16 11-16 12-17 12-17 12-17 11-18 11-17 11-18 11-18 11-19 11-18 11-19 10-19 10-20 10-19 10-20 9-21 10-20 9-21 9-21 9-21 9-21 8-22 8-22 8-22 8-22 8-23 7-23 7-23 7-23 6-24 7-23 6-24 5-25 6-24 5-25 5-25 5-25 4-25 4-26 4-26 4-26 3-26 3-26 2-27 3-27 2-27 1-27 2-27 1h-28l-28 1-27-1h-29l-28-1-28-1-29-1-29-2-29-3-29-2-29-3-30-4-29-3-30-5-30-4-30-5-30-6-30-5-30-7-31-6-30-8-31-7-31-8-31-8-31-9-31-10-31-9-31-11-31-10-32-11-31-12-32-12-31-13-32-13-31-13-32-14-32-15-31-15-32-15-32-16-31-17-32-17-32-17-31-18-32-19-32-19-31-20-32-20-31-20-32-21-31-22-31-22-31-23-32-23-31-24-31-25-30-25-31-25-31-26-30-27-30-27-30-28-30-28-30-29-30-29-29-30-30-31-29-31-28-31-29-33" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path4" d="M1392 1447v-12l1-2v-7l1-2v-5l1-2v-2l1-2v-3l1-2v-2l1-2 1-2v-2l1-2v-2l1-2 1-2v-2l1-1 1-2 1-2 1-2 1-2v-2l1-2 1-2 1-2 1-2 1-2 2-2 1-2 1-2 1-2 1-2 2-2 1-2 1-1 1-2 2-2 1-2 2-2 1-2 2-2 1-2 2-2 1-2 2-1 2-2 2-2 1-2 2-2 2-2 2-1 2-2 2-2 2-2 2-2 2-1 2-2 2-2 2-1 2-2 2-2 3-1 2-2 2-2 3-1 2-2 2-1 3-2 2-1 3-2 2-1 3-2 3-1 2-2 3-1 3-1 3-2 2-1 3-1 3-1 3-2 3-1 3-1 3-1 3-1 3-1 3-1 3-1 3-1 4-1 3-1 3-1 3-1h4l3-1 4-1 3-1h3l4-1h3l4-1h4l3-1h7l4-1h43l3 1h9l4 1h4l4 1h4l4 1 4 1 4 1h5l4 1 4 1 4 1 4 1 5 1 4 2 4 1 5 1 4 2 4 1 5 2 4 1 4 2 5 2 4 1 4 2 5 2 4 2 4 2 5 2 4 2 5 3 4 2 4 2 5 3 4 2 4 3 5 3 4 2 4 3 5 3 4 3 4 3 5 3 4 3 4 4 5 3 4 3 4 4 4 3 5 4 4 4 4 4 4 3 4 4 4 4 4 5 5 4 4 4 4 4 4 5 3 4 4 5 4 4 4 5 4 5 4 5 3 5 4 5 4 5 3 5 4 6 3 5 4 5 3 6 4 5 3 6 3 6 4 6 3 6 3 6 3 6 3 6 3 6 3 6 3 7 2 6 3 7 3 6 2 7 3 7 2 7 3 7 2 7 2 7 2 7 2 7 2 7 2 8 2 7 2 8 2 7 1 8 2 8 1 7 1 8 2 8 1 8 1 8 1 8 1 8v9l1 8 1 8v17l1 9v34l-1 9v9l-1 9v9l-1 9-1 9-1 9-1 9-1 9-2 10-1 9-2 9-2 10-2 9-2 10-2 9-2 10-2 9-3 10-3 9-2 10-3 10-4 9-3 10-3 10-4 9-3 10-4 10-4 10-4 10-5 9-4 10-5 10-4 10-5 10-5 10-6 9-5 10-6 10-5 10-6 10-6 10-6 9-7 10-6 10-7 10-7 9-7 10-7 10-7 9-8 10-7 10-8 9-8 10-8 9-9 10-8 9-9 9-9 10-9 9-9 9-9 9-10 9-10 9-10 9-10 9-10 9-11 8-10 9-11 9-11 8-11 8-11 9-12 8-12 8-12 8-12 8-12 8-12 8-13 7-13 8-13 7-13 7-13 7-14 7-13 7-14 7-14 7-14 6-15 7-14 6-15 6-15 6-15 6-15 5-15 6-16 5-15 5-16 5-16 5-17 5-16 4-16 5-17 4-17 4-17 3-17 4-17 3-18 3-18 3-17 3-18 3-18 2-19 2-18 2-18 2-19 1-19 2-19 1h-19l-19 1h-78l-20-1-20-1-20-1-20-2-20-1-21-2-20-3-21-2-20-3-21-3-21-3-21-4-21-4-21-4-21-5-22-5-21-5-21-5-22-6-22-6-21-6-22-7-22-7-21-7-22-8-22-8-22-8-22-9-22-9-22-9-22-10-22-10-22-10-23-11-22-11-22-11-22-12-22-12-22-12-22-13-22-13-22-14-22-13-22-15-22-14-22-15-22-16-22-15-22-16-21-17-22-17-21-17-22-18-21-18-21-18-22-19-21-19-21-19-20-20-21-21-21-21-20-21-21-21-20-22-20-22-20-23-20-23-19-24-20-24-19-24-19-25-19-25-18-25-19-26-18-26-18-27-18-27-17-28-18-28-17-28-17-29-16-29-17-29-16-30-16-30-15-31-15-31-15-32-15-31-14-33-14-32-14-33-13-34-13-33-13-35-12-34-12-35-12-35-11-36-11-36-10-37-10-36-10-37-9-38-9-38-9-38-8-39-7-38-7-40-7-39-6-40-6-41-5-40-5-41-4-41-4-42-3-42-3-42-2-43-2-42-1-43" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path5" d="m1451 1390 1-1 1-1 1-2 2-1 1-1 1-1 1-2 1-1 2-1 1-2 1-1 2-1 1-1 1-2 2-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-1 2-1 1-1 2-1 2-1 1-2 2-1 2-1 2-1 2-1 1-1 2-1h2l2-1 2-1 2-1 2-1 2-1 2-1 2-1h2l2-1 2-1 3-1h2l2-1 2-1h2l3-1h2l2-1 3-1h2l2-1h5l3-1h5l2-1h5l3-1h32l3 1h5l3 1h6l3 1h3l3 1h3l3 1 3 1h2l3 1 3 1 3 1h3l3 1 3 1 3 1 3 1 3 1 3 2 3 1 4 1 3 1 3 2 3 1 3 1 3 2 3 1 3 2 3 1 3 2 3 2 3 1 3 2 3 2 3 2 3 2 3 2 3 2 3 2 3 2 3 2 3 3 3 2 3 2 3 3 3 2 3 3 3 2 3 3 3 3 3 2 3 3 3 3 2 3 3 3 3 3 3 3 3 3 2 3 3 3 3 4 2 3 3 3 3 4 2 3 3 4 2 3 3 4 2 4 3 4 2 3 3 4 2 4 2 4 2 4 3 4 2 5 2 4 2 4 2 4 2 5 2 4 2 5 2 4 2 5 2 4 2 5 1 5 2 5 2 5 1 4 2 5 1 5 2 6 1 5 1 5 2 5 1 5 1 6 1 5 1 5 1 6 1 5 1 6v5l1 6 1 6v5l1 6v12l1 6v42l-1 6v7l-1 6v6l-1 7-1 6v6l-1 7-1 6-2 7-1 6-1 7-1 6-2 7-1 7-2 6-2 7-2 7-1 6-3 7-2 7-2 7-2 6-3 7-2 7-3 7-3 7-2 6-3 7-3 7-3 7-4 7-3 7-4 7-3 7-4 6-4 7-4 7-4 7-4 7-4 7-4 6-5 7-4 7-5 7-5 7-5 6-5 7-5 7-6 7-5 6-5 7-6 7-6 6-6 7-6 6-6 7-6 6-7 7-6 6-7 6-7 7-6 6-7 6-8 6-7 6-7 6-8 6-7 6-8 6-8 6-8 6-8 5-8 6-9 6-8 5-9 5-8 6-9 5-9 5-9 5-10 5-9 5-9 5-10 5-10 5-9 4-10 5-10 4-11 4-10 5-10 4-11 4-11 4-10 3-11 4-11 4-12 3-11 3-11 3-12 3-11 3-12 3-12 3-12 2-12 3-12 2-12 2-12 2-13 2-12 2-13 1-13 2-13 1-13 1-13 1-13 1h-13l-14 1h-68l-13-1-14-1-14-1-15-1-14-1-14-2-14-1-15-2-14-2-15-2-14-3-15-3-15-2-15-4-14-3-15-3-15-4-15-4-15-4-15-4-15-5-16-5-15-5-15-5-15-5-16-6-15-6-15-6-16-6-15-7-15-7-16-7-15-7-16-8-15-8-16-8-15-8-15-9-16-8-15-10-16-9-15-9-15-10-16-10-15-11-15-10-16-11-15-11-15-12-15-11-15-12-15-12-15-13-15-12-15-13-14-14-15-13-15-14-14-14-14-14-15-15-14-15-14-15-14-16-14-15-14-16-14-17-13-16-14-17-13-17-13-18-13-17-13-18-13-18-13-19-12-19-13-19-12-19-12-20-12-20-11-20-12-20-11-21-11-21-11-21-11-22-10-22-11-22-10-22-10-23-9-23-10-23-9-23-9-24-9-24-8-24-8-25-8-25-8-25-7-25-7-25-7-26-7-26-6-27-6-26-6-27-5-27-5-27-5-28-5-28-4-28-4-28-3-28-3-29-3-29-3-29-2-29-1-30-2-30-1-30v-30l-1-30v-31l1-31 1-31 1-31 2-31 2-32 2-31 3-32 4-32 3-32 5-33 4-32 5-33 6-33 6-33 6-33 7-33 8-33 7-34 9-33 9-34 9-34 10-34 10-34 11-34 11-34 12-34 12-35 13-34 13-34 14-35 14-35 15-34 15-35 16-34 17-35 17-35 17-34 18-35 19-35 19-34 20-35 20-35 21-34 22-35 22-34 22-35 24-34 23-34 25-35 25-34 25-34 27-34 26-33" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path6" d="m1533 1385 2-1h3l2-1h7l2-1h24l2 1h6l2 1h4l2 1h4l2 1h2l2 1h2l2 1h2l2 1 3 1h2l2 1 2 1 2 1h2l2 1 2 1 2 1 3 1 2 1 2 1 2 1 2 1 2 1 2 1 3 1 2 2 2 1 2 1 2 1 2 2 2 1 2 2 2 1 3 1 2 2 2 2 2 1 2 2 2 1 2 2 2 2 2 2 2 1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3 2 2 2 2 2 2 2 3 1 2 2 3 2 2 2 3 2 2 1 3 2 2 2 3 1 3 2 2 2 3 1 3 2 3 1 3 2 3 1 3 2 3 1 3 2 3 1 3 1 3 2 3 1 3 1 4 1 3 2 3 1 4 1 3 1 4 1 3 1 4 1 3 1 4 1 3 1 4v4l1 3 1 4 1 4v4l1 4v3l1 4v4l1 4v8l1 4v38l-1 5v8l-1 5v4l-1 5v4l-1 5-1 4-1 5v4l-1 5-1 5-1 4-1 5-2 4-1 5-1 5-2 5-1 4-2 5-1 5-2 4-2 5-1 5-2 5-2 4-2 5-2 5-2 5-3 5-2 4-2 5-3 5-2 5-3 5-3 4-3 5-2 5-3 5-3 4-3 5-4 5-3 5-3 4-4 5-3 5-4 5-3 4-4 5-4 5-4 4-4 5-4 4-4 5-4 4-5 5-4 4-5 5-4 4-5 5-5 4-4 4-5 5-5 4-5 4-6 4-5 5-5 4-6 4-5 4-6 4-6 4-5 4-6 4-6 3-6 4-6 4-7 3-6 4-6 4-7 3-6 3-7 4-7 3-7 3-7 4-7 3-7 3-7 3-7 2-7 3-8 3-7 3-8 2-8 3-7 2-8 3-8 2-8 2-8 2-8 2-8 2-9 2-8 1-8 2-9 2-9 1-8 1-9 2-9 1-9 1-9 1-9 1h-9l-9 1h-9l-9 1h-48l-9-1h-10l-10-1h-10l-10-1-9-1-10-1-10-2-11-1-10-1-10-2-10-2-10-2-11-2-10-2-10-3-11-2-10-3-11-3-10-2-11-4-10-3-11-3-10-4-11-4-11-3-10-5-11-4-11-4-11-5-10-4-11-5-11-5-11-5-10-6-11-5-11-6-11-6-11-6-10-6-11-7-11-6-10-7-11-7-11-7-10-8-11-7-11-8-10-8-11-8-10-8-11-8-10-9-11-9-10-9-10-9-11-9-10-10-10-9-10-10-10-10-10-11-10-10-10-11-10-11-9-11-10-11-9-12-10-11-9-12-9-12-10-12-9-13-9-13-8-12-9-13-9-14-8-13-9-14-8-13-8-14-8-15-8-14-8-15-8-14-7-15-8-15-7-16-7-15-7-16-7-16-7-16-6-16-6-17-7-16-5-17-6-17-6-17-5-18-6-17-5-18-5-18-4-18-5-18-4-19-4-19-4-18-4-19-3-19-3-20-3-19-3-20-3-20-2-20-2-20-2-20-1-20-2-21-1-21-1-20v-43l-1-21 1-21v-22l1-22 1-21 1-22 2-22 2-23 2-22 3-22 2-23 4-22 3-23 4-23 4-23 4-23 5-23 5-23 5-24 6-23 6-24 6-23 7-24 7-24 7-23 8-24 8-24 8-24 9-24 9-24 9-24 10-24 10-24 11-24 11-24 11-25 12-24 12-24 13-24 12-24 14-25 13-24 14-24 15-24 15-24 15-24 15-24 16-24 17-24 17-24 17-24 18-24 18-24 18-23 19-24 19-23 20-23 20-24 21-23 21-23 21-23 22-23 23-22 22-23 23-22 24-23 24-22 25-22 24-21 26-22 26-21 26-21 26-21 27-21 28-21 28-20 28-20 29-20 29-20 30-20 30-19 31-19 31-18 31-19 32-18 32-18 33-17 33-18 34-17 34-16 35-16 34-16 36-16 35-15 37-15 36-15 37-14 38-14 38-13 38-13 38-13 40-12 39-12 40-11 40-11 41-11 41-10 41-10 42-9 42-8" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path7" d="m1599 1433 2 1 1 1h2l1 1 2 1 1 1 2 1 1 1 2 1 1 1 2 1 1 1 2 2 1 1 2 1 1 1 1 1 2 2 1 1 2 1 1 2 1 1 2 1 1 2 2 1 1 2 1 1 2 2 1 1 1 2 2 1 1 2 1 2 2 1 1 2 1 2 1 1 1 2 2 2 1 2 1 2 1 2 1 2 1 2 2 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 3v2l1 2 1 3 1 2 1 2v3l1 2 1 3 1 2v2l1 3 1 3v2l1 3v2l1 3v3l1 2v6l1 2v9l1 3v29l-1 3v9l-1 3v4l-1 3v3l-1 3v3l-1 3-1 4v3l-1 3-1 3-1 4-1 3-1 3-1 3-1 4-1 3-1 3-1 4-1 3-2 3-1 4-1 3-2 3-1 3-2 4-1 3-2 4-2 3-1 3-2 4-2 3-2 3-2 4-2 3-2 3-2 4-2 3-3 3-2 3-2 4-3 3-2 3-3 4-2 3-3 3-3 3-2 4-3 3-3 3-3 3-3 3-3 3-3 4-3 3-4 3-3 3-3 3-4 3-3 3-4 3-3 3-4 3-4 3-3 2-4 3-4 3-4 3-4 3-4 2-4 3-5 3-4 2-4 3-4 2-5 3-4 2-5 3-5 2-4 2-5 3-5 2-5 2-5 2-5 2-5 2-5 2-5 2-5 2-5 2-6 2-5 1-5 2-6 2-5 1-6 2-6 1-5 1-6 2-6 1-6 1-6 1-6 1-6 1-6 1-6 1-6 1h-6l-7 1h-6l-6 1h-7l-6 1h-40l-7-1h-6l-7-1h-7l-7-1h-7l-7-1-7-1-7-1-7-1-7-2-7-1-7-1-8-2-7-1-7-2-7-2-8-2-7-2-7-2-8-2-7-3-8-2-7-3-7-2-8-3-7-3-8-3-7-3-8-3-7-4-8-3-7-4-8-3-7-4-8-4-7-4-8-4-7-5-8-4-7-5-8-4-7-5-8-5-7-5-8-5-7-6-7-5-8-5-7-6-7-6-8-6-7-6-7-6-8-7-7-6-7-7-7-6-7-7-7-7-7-7-7-8-7-7-7-8-6-7-7-8-7-8-6-8-7-8-6-9-7-8-6-9-7-8-6-9-6-9-6-10-6-9-6-9-6-10-5-10-6-9-6-10-5-10-6-11-5-10-5-11-5-10-5-11-5-11-5-11-5-11-4-11-5-12-4-11-4-12-4-12-4-12-4-12-4-12-3-13-4-12-3-13-3-12-4-13-2-13-3-13-3-13-2-14-3-13-2-13-2-14-2-14-1-14-2-14-1-14-1-14-1-14-1-15-1-14v-15l-1-15v-29l1-15v-15l1-16 1-15 1-15 1-16 1-15 2-16 2-15 2-16 2-16 3-16 2-16 3-16 4-16 3-16 4-17 3-16 4-16 5-17 4-16 5-17 5-16 5-17 6-16 6-17 6-17 6-17 6-16 7-17 7-17 7-17 8-17 8-16 8-17 8-17 9-17 8-17 10-17 9-17 10-17 10-17 10-16 10-17 11-17 11-17 11-16 12-17 12-17 12-16 13-17 12-16 13-17 14-16 13-17 14-16 15-16 14-16 15-16 15-16 16-16 15-16 16-15 17-16 16-16 17-15 17-15 18-15 18-15 18-15 18-15 19-14 19-15 20-14 19-14 20-14 21-14 20-14 21-13 21-13 22-14 22-13 22-12 22-13 23-12 23-12 23-12 24-12 24-11 24-12 24-11 25-10 25-11 26-10 25-10 26-10 27-9 26-10 27-9 27-8 28-9 27-8 28-8 29-7 28-7 29-7 29-7 29-6 30-6 30-5 30-5 30-5 31-5 31-4 31-4 32-3 31-3 32-3 32-2 33-2 32-1 33-1 33-1h101l34 1 34 2 34 2 35 2 34 3 35 3 35 4 35 4 36 5 36 5 35 5 36 7 36 6 37 7 36 8 36 8 37 9 37 9 37 9 37 11 37 10 37 12 37 11 38 13 37 13 38 13 37 14 38 15 38 15 38 16 37 16 38 17 38 17 38 19 38 18 38 19 38 20 38 21" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path8" d="m1619 1513 1 1 1 2v1l1 2v2l1 1v2l1 2v1l1 2v4l1 2v1l1 2v4l1 2v7l1 2v27l-1 2v7l-1 2v4l-1 3v2l-1 2v2l-1 2v3l-1 2v2l-1 3-1 2v2l-1 2-1 3-1 2-1 2v3l-1 2-1 2-1 3-1 2-1 2-1 3-2 2-1 2-1 3-1 2-2 2-1 3-1 2-2 2-1 3-1 2-2 2-2 3-1 2-2 2-1 2-2 3-2 2-2 2-1 3-2 2-2 2-2 2-2 3-2 2-2 2-2 2-3 2-2 3-2 2-2 2-3 2-2 2-2 2-3 2-2 2-3 2-2 2-3 2-3 2-2 2-3 2-3 2-3 2-3 2-3 2-2 2-3 1-4 2-3 2-3 2-3 1-3 2-3 2-4 1-3 2-3 1-4 2-3 1-4 2-3 1-4 2-3 1-4 1-4 1-3 2-4 1-4 1-4 1-4 1-4 1-4 1-4 1-4 1-4 1h-4l-4 1-4 1-4 1h-5l-4 1h-4l-5 1h-8l-5 1h-41l-5-1h-10l-5-1h-5l-4-1-5-1-5-1h-5l-5-1-5-1-5-1-5-1-5-1-5-2-5-1-6-1-5-2-5-1-5-2-5-2-5-1-5-2-6-2-5-2-5-2-5-2-6-2-5-3-5-2-5-3-5-2-6-3-5-2-5-3-5-3-6-3-5-3-5-3-5-4-6-3-5-3-5-4-5-3-5-4-6-4-5-4-5-3-5-4-5-5-5-4-5-4-5-4-5-5-5-4-5-5-5-5-5-5-5-5-5-5-5-5-4-5-5-5-5-6-4-5-5-6-5-6-4-5-5-6-4-6-5-6-4-6-4-7-5-6-4-6-4-7-4-7-4-6-4-7-4-7-4-7-4-7-3-7-4-8-4-7-3-8-4-7-3-8-3-8-4-7-3-8-3-8-3-8-3-9-2-8-3-8-3-9-2-8-3-9-2-9-2-9-3-9-2-9-2-9-2-9-1-9-2-9-2-10-1-9-1-10-2-9-1-10-1-10-1-10v-10l-1-10v-10l-1-10v-52l1-10v-11l1-11 1-11 1-10 1-11 1-11 1-11 2-11 1-11 2-11 2-12 2-11 3-11 2-11 3-12 3-11 2-12 4-11 3-12 3-11 4-12 4-11 4-12 4-12 4-11 4-12 5-12 5-11 5-12 5-12 5-12 6-11 6-12 5-12 7-12 6-12 6-11 7-12 7-12 7-12 7-11 7-12 8-12 8-11 8-12 8-12 9-11 8-12 9-11 9-12 9-11 10-12 9-11 10-11 10-12 11-11 10-11 11-11 11-11 11-11 11-11 11-11 12-11 12-10 12-11 13-10 12-11 13-10 13-10 13-10 14-11 13-9 14-10 14-10 14-10 15-9 15-9 15-10 15-9 15-9 16-8 15-9 16-9 16-8 17-8 16-8 17-8 17-8 17-8 18-7 17-7 18-7 18-7 19-7 18-6 19-7 19-6 19-6 19-6 19-5 20-5 20-5 20-5 20-5 20-4 21-5 21-4 21-3 21-4 21-3 22-3 21-3 22-2 22-3 22-2 23-1 22-2 23-1 23-1h23l23-1h23l24 1h23l24 1 24 1 24 2 24 2 24 2 25 2 24 3 25 3 25 4 25 3 25 4 25 5 25 5 25 5 26 5 25 6 26 6 26 7 25 7 26 7 26 8 26 8 26 9 26 8 27 10 26 9 26 10 26 11 27 10 26 12 27 11 26 12 26 13 27 13 26 13 27 13 26 15 27 14 26 15 27 15 26 16 27 17 26 16 26 17 26 18 27 18 26 19 26 18 26 20 26 20 26 20 25 21 26 21 26 22 25 22 25 22 26 23 25 24 25 24 24 24 25 25 24 26 25 25 24 27 24 27 24 27 23 28 24 28 23 29 23 29 23 30 22 30 22 30 22 31 22 32 22 32 21 33 21 33 21 33 20 34 20 35 20 35 19 35 20 36 18 36 19 37 18 37 18 38 17 38 17 39 17 39 16 40 16 40" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/><path id="path9" d="M1583 1586v2l-1 2v1l-1 2-1 1v2l-1 2-1 1-1 2v2l-1 1-1 2-1 1-1 2-1 2-1 1v2l-1 2-1 1-2 2-1 1-1 2-1 2-1 1-1 2-1 1-2 2-1 2-1 1-1 2-2 1-1 2-2 1-1 2-1 1-2 2-2 2-1 1-2 2-1 1-2 2-2 1-1 1-2 2-2 1-1 2-2 1-2 2-2 1-2 1-2 2-2 1-2 1-2 2-2 1-2 1-2 1-2 2-2 1-3 1-2 1-2 1-2 1-3 2-2 1-2 1-3 1-2 1-3 1-2 1-3 1-2 1h-3l-2 1-3 1-3 1-2 1h-3l-3 1-2 1h-3l-3 1-3 1h-3l-3 1h-2l-3 1h-3l-3 1h-6l-3 1h-19l-3 1-4-1h-16l-3-1h-7l-4-1h-3l-3-1h-4l-3-1h-4l-3-1-4-1-3-1h-4l-3-1-4-1-4-1-3-1-4-1-3-1-4-2-4-1-3-1-4-2-3-1-4-1-4-2-3-2-4-1-4-2-3-2-4-1-4-2-3-2-4-2-4-2-3-2-4-3-4-2-3-2-4-2-4-3-3-2-4-3-3-2-4-3-4-3-3-3-4-2-3-3-4-3-3-3-4-3-3-3-4-4-3-3-4-3-3-4-3-3-4-4-3-3-4-4-3-4-3-4-3-3-4-4-3-4-3-5-3-4-3-4-3-4-3-4-3-5-3-4-3-5-3-4-3-5-3-5-2-5-3-5-3-4-2-5-3-6-2-5-3-5-2-5-3-5-2-6-2-5-3-6-2-5-2-6-2-6-2-5-2-6-2-6-1-6-2-6-2-6-2-6-1-6-2-7-1-6-1-6-2-7-1-6-1-7-1-6-1-7-1-7-1-7v-6l-1-7-1-7v-14l-1-7v-44l1-7v-7l1-8v-7l1-8 1-8 1-7 1-8 1-8 1-7 1-8 2-8 1-8 2-8 2-8 2-8 2-8 2-8 2-8 2-8 3-8 2-8 3-8 3-8 3-8 3-8 3-8 3-9 4-8 3-8 4-8 4-8 4-9 4-8 4-8 4-8 5-9 4-8 5-8 5-8 5-8 5-9 5-8 6-8 5-8 6-8 6-8 6-8 6-8 6-8 6-8 7-8 7-8 6-8 7-8 7-8 8-8 7-8 8-7 7-8 8-8 8-7 8-8 8-7 9-8 8-7 9-7 9-7 9-8 9-7 9-7 10-7 9-7 10-6 10-7 10-7 10-6 11-7 10-6 11-6 11-7 10-6 12-6 11-6 11-5 12-6 11-6 12-5 12-5 12-6 12-5 13-5 12-5 13-4 13-5 13-4 13-5 13-4 13-4 14-4 14-4 13-3 14-4 14-3 14-3 15-3 14-3 15-3 14-2 15-3 15-2 15-2 15-2 16-1 15-2 16-1 15-1 16-1 16-1h16l16-1h33l16 1h17l16 1 17 1 17 1 17 1 17 2 17 2 17 2 17 2 18 3 17 3 18 3 17 3 18 3 17 4 18 4 18 4 18 5 18 4 18 5 18 6 18 5 18 6 19 6 18 6 18 7 18 7 19 7 18 7 19 8 18 8 18 8 19 9 18 9 19 9 18 9 19 10 18 10 19 10 18 11 19 11 18 11 18 12 19 11 18 12 18 13 19 13 18 13 18 13 18 14 18 14 18 14 18 15 18 15 18 15 17 16 18 16 18 16 17 16 17 17 18 18 17 17 17 18 17 18 17 19 16 19 17 19 16 20 16 20 16 20 16 20 16 21 16 21 15 22 15 22 16 22 14 23 15 23 15 23 14 23 14 24 14 25 14 24 13 25 14 25 13 26 12 26 13 26 12 26 12 27 12 27 11 28 12 28 11 28 10 28 11 29 10 29 9 30 10 29 9 30 9 31 8 30 8 31 8 32 8 31 7 32 7 32 6 33 6 32 6 33 5 34 5 33 4 34 4 34 4 35 3 34 3 35 3 35 2 36 1 36 1 35 1 37v73l-1 37-1 37-2 37-2 38-2 38-4 38-3 38-4 38-5 39-5 39-6 39-6 39-7 39-7 39-8 40-8 40-9 40-10 40-10 40-10 41-12 40-11 41-13 40-13 41-13 41" style="stroke:#2f1f27;stroke-width:63.8734;stroke-dasharray:none;stroke-opacity:1"/></g><rect id="rect1-9" width="616" height="870" x="10" y="10" ry="43" style="fill:none;fill-opacity:1;stroke:#674457;stroke-width:19.484;stroke-linejoin:round;stroke-miterlimit:7.6;stroke-dasharray:none;stroke-opacity:1"/><circle id="path1" cx="318" cy="445" r="198" style="fill:#1e1e1e;fill-opacity:1;stroke:#674457;stroke-width:24.2438;stroke-linejoin:round;stroke-miterlimit:7.6;stroke-dasharray:none;stroke-opacity:1"/><rect id="rect2" width="390" height="32" x="122" y="429" ry="16" style="fill:#1e1e1e;fill-opacity:1;stroke:#674457;stroke-width:17.3916;stroke-linejoin:round;stroke-miterlimit:7.6;stroke-dasharray:none;stroke-opacity:1"/></g></svg>
`;

const cardBackSVGURIEncoded = 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(cardBackSVG).trim() + '")';

class CardData {
	/**
	 * @param {number} targetXAngle
	 * @param {number} targetYAngle
	 * @param {number} currentXPosition
	 * @param {number} currentYPosition
	 * @param {FetchedCardData} fetchedCardData
	 */
	constructor(targetXAngle, targetYAngle, currentXPosition, currentYPosition, fetchedCardData) {
		this.targetXAngle = targetXAngle;
		this.targetYAngle = targetYAngle;
		this.currentXPosition = currentXPosition;
		this.currentYPosition = currentYPosition;
		this.fetchedCardData = fetchedCardData;
	}
}

class FetchedCardData {
	/**
	 * @param {string} game
	 * @param {string} cardImage
	 * @param {string} cardName
	 * @param {string} cardDetailsLink
	 * @param {object} rawData
	 */
	constructor(game, cardImage, cardName, cardDetailsLink, rawData) {
		this.game = game;
		this.cardImage = cardImage;
		this.cardName = cardName;
		this.cardDetailsLink = cardDetailsLink;
		this.rawData = rawData;
	}
}

class CardExportData {
	/**
	 * @param {CardData} cardData
	 * @param {number} quantity
	 */
	constructor(cardData, quantity = 0) {
		this.cardData = cardData;
		this.quantity = quantity;
	}
}

const Games = {
	MTG: "Magic: The Gathering",
	POKEMON: "\u0050\u006F\u006B\u00E9\u006D\u006F\u006E",
	YUGIOH: "Yu-Gi-Oh!",
}

function getAspectRatio() {
	return window.innerWidth / window.innerHeight;
}

function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @param {number} min
 * @param {number} max
 * @returns number
 */
function getRandomRange(min, max) {
	return Math.random() * (max - min) + min;
}

document.addEventListener("DOMContentLoaded", function (event) {
	const gameSelectElement = document.getElementById("game-select");

	/**
	 * @type {Map<string, Array<FetchedCardData>>}
	 */
	const customGameNameToFetchedCardDataListMap = new Map();

	function renderSelect() {
		let skipFirst = true;
		for (const optionElement of Array.from(gameSelectElement.getElementsByTagName("option"))) {
			if (skipFirst) {
				skipFirst = false;
				continue;
			}

			optionElement.remove();
		}

		for (const [key, value] of Object.entries(Games)) {
			gameSelectElement.insertAdjacentHTML("beforeend", `
<option value="${key}">${value}</option>
			`);
		}

		for (const key of customGameNameToFetchedCardDataListMap.keys()) {
			// TODO: Slugify value.
			gameSelectElement.insertAdjacentHTML("beforeend", `
<option value="${key}">${key}</option>
			`);
		}

		gameSelectElement.insertAdjacentHTML("beforeend", `
<option value="import-game">--Import Game--</option>
		`);
	}

	renderSelect();

	gameSelectElement.addEventListener("change", () => {
		if (gameSelectElement.options[gameSelectElement.selectedIndex].value == "import-game") {
			const input = document.createElement("input");
			input.type = "file";
			input.accept = ".xml";
			input.multiple = false;

			input.addEventListener("change", (event) => {
				/**
				 * @type {File}
				 */
				const file = event.target.files[0];

				const fileReader = new FileReader();
				fileReader.readAsText(file, "UTF-8");

				fileReader.addEventListener("loadend", (event) => {
					const domParser = new DOMParser();
					const xmlDocument = domParser.parseFromString(event.target.result, "application/xml");

					const gameName = file.name;
					const gameFetchedCardList = [];

					const cards = xmlDocument.children[0].children[1];
					for (const card of cards.children) {
						let dataUrl = null;

						const additionalDataElements = card.getElementsByTagName("_additional_data");
						if (additionalDataElements != null) {
							for (const additionalDataElement of additionalDataElements) {
								const key = additionalDataElement.getAttribute("key");
								if (key == "card-info" || key == "data-url") {
									dataUrl = additionalDataElement.getAttribute("value");
									break;
								}
							}
						}

						const cardFetchedCardData = new FetchedCardData(
							gameName,
							card.getElementsByTagName("set")[0].getAttribute("picurl"),
							card.getElementsByTagName("name")[0].textContent,
							dataUrl,
							card
						);

						gameFetchedCardList.push(cardFetchedCardData);
					}

					customGameNameToFetchedCardDataListMap.set(gameName, gameFetchedCardList);
					renderSelect();
				});
			});

			input.click();
		}
	});

	function getSelectedGame() {
		const gameSelectValue = gameSelectElement.options[gameSelectElement.selectedIndex].value;
		const gameSelectText = gameSelectElement.options[gameSelectElement.selectedIndex].text;
		return gameSelectValue.length > 0 ? gameSelectText : null;
	}

	let getCardDelayedLastTimestamp = 0;
	function getCard(doDummy = false, fromFetchedCardDataList = null) {
		return new Promise((resolve, reject) => {
			const selectedGame = getSelectedGame();

			if (doDummy || (fromFetchedCardDataList !== null && fromFetchedCardDataList !== undefined)) {
				const lastCardDelayDelta = Math.max(getCardDelayedLastTimestamp - Date.now(), 0);
				setTimeout(() => {
					if (!doDummy) {
						resolve(fromFetchedCardDataList[Math.floor(Math.random() * fromFetchedCardDataList.length)]);
					} else {
						// resolve(new FetchedCardData(
						// 	Games.MTG,
						// 	"https://cards.scryfall.io/png/front/e/3/e3285e6b-3e79-4d7c-bf96-d920f973b122.png",
						// 	"Lightning Bolt",
						// 	"https://scryfall.com/card/clu/141/lightning-bolt",
						// 	{}
						// ));

						resolve(new FetchedCardData(
							Games.POKEMON,
							"https://assets.pokemon.com/static-assets/content-assets/cms2/img/cards/web/SM9/SM9_EN_155.png",
							"Unidentified Fossil",
							"https://www.pokemon.com/us/pokemon-tcg/pokemon-cards/series/sm9/155/",
							{
								set: {
									id: "sm9"
								}
							}
						));
					}
				}, lastCardDelayDelta + 1000);

				if (lastCardDelayDelta > 0) {
					getCardDelayedLastTimestamp = getCardDelayedLastTimestamp + 1000;
				} else {
					getCardDelayedLastTimestamp = Date.now() + 1000;
				}
			} else {
				if (selectedGame == Games.MTG) {
					fetchRateLimited("https://api.scryfall.com/cards/random", {
						method: "GET"
					}).then((response) => response.json().then(json => {
						// {"object":"card","id":"c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45","oracle_id":"a215e813-df7e-4f21-9718-eb264eb62813","multiverse_ids":[4578],"mtgo_id":9247,"tcgplayer_id":6041,"cardmarket_id":8700,"name":"Guided Strike","lang":"en","released_at":"1997-06-09","uri":"https://api.scryfall.com/cards/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45","scryfall_uri":"https://scryfall.com/card/wth/16/guided-strike?utm_source=api","layout":"normal","highres_image":true,"image_status":"highres_scan","image_uris":{"small":"https://cards.scryfall.io/small/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.jpg?1562803288","normal":"https://cards.scryfall.io/normal/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.jpg?1562803288","large":"https://cards.scryfall.io/large/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.jpg?1562803288","png":"https://cards.scryfall.io/png/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.png?1562803288","art_crop":"https://cards.scryfall.io/art_crop/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.jpg?1562803288","border_crop":"https://cards.scryfall.io/border_crop/front/c/6/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45.jpg?1562803288"},"mana_cost":"{1}{W}","cmc":2,"type_line":"Instant","oracle_text":"Target creature gets +1/+0 and gains first strike until end of turn.\nDraw a card.","colors":["W"],"color_identity":["W"],"keywords":[],"legalities":{"standard":"not_legal","future":"not_legal","historic":"not_legal","timeless":"not_legal","gladiator":"not_legal","pioneer":"not_legal","modern":"not_legal","legacy":"legal","pauper":"legal","vintage":"legal","penny":"legal","commander":"legal","oathbreaker":"legal","standardbrawl":"not_legal","brawl":"not_legal","alchemy":"not_legal","paupercommander":"legal","duel":"legal","oldschool":"not_legal","premodern":"legal","predh":"legal"},"games":["paper","mtgo"],"reserved":false,"game_changer":false,"foil":false,"nonfoil":true,"finishes":["nonfoil"],"oversized":false,"promo":false,"reprint":false,"variation":false,"set_id":"700997ac-add2-4ce2-992e-5efa0fdfc0e9","set":"wth","set_name":"Weatherlight","set_type":"expansion","set_uri":"https://api.scryfall.com/sets/700997ac-add2-4ce2-992e-5efa0fdfc0e9","set_search_uri":"https://api.scryfall.com/cards/search?order=set&q=e%3Awth&unique=prints","scryfall_set_uri":"https://scryfall.com/sets/wth?utm_source=api","rulings_uri":"https://api.scryfall.com/cards/c6e8ec37-abe8-45a9-a1a0-6d4e37c74c45/rulings","prints_search_uri":"https://api.scryfall.com/cards/search?order=released&q=oracleid%3Aa215e813-df7e-4f21-9718-eb264eb62813&unique=prints","collector_number":"16","digital":false,"rarity":"common","flavor_text":"\"If you can kill your enemy with the first stroke, you save yourself the labor of the second.\"\n—Gerrard of the *Weatherlight*","card_back_id":"0aeebaf5-8c7d-4636-9e82-8c27447861f7","artist":"Gary Leach","artist_ids":["fb608209-fd37-435a-b2fb-a158aeb3f927"],"illustration_id":"b6bada65-1514-4958-9abf-d220d85457ee","border_color":"black","frame":"1997","full_art":false,"textless":false,"booster":true,"story_spotlight":false,"edhrec_rank":11470,"penny_rank":10561,"prices":{"usd":"0.11","usd_foil":null,"usd_etched":null,"eur":"0.08","eur_foil":null,"tix":"0.09"},"related_uris":{"gatherer":"https://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=4578&printed=false","tcgplayer_infinite_articles":"https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Farticles&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Farticles%3FproductLineName%3Dmagic%26q%3DGuided%2BStrike","tcgplayer_infinite_decks":"https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&trafcat=tcgplayer.com%2Fsearch%2Fdecks&u=https%3A%2F%2Fwww.tcgplayer.com%2Fsearch%2Fdecks%3FproductLineName%3Dmagic%26q%3DGuided%2BStrike","edhrec":"https://edhrec.com/route/?cc=Guided+Strike"},"purchase_uris":{"tcgplayer":"https://partner.tcgplayer.com/c/4931599/1830156/21018?subId1=api&u=https%3A%2F%2Fwww.tcgplayer.com%2Fproduct%2F6041%3Fpage%3D1","cardmarket":"https://www.cardmarket.com/en/Magic/Products?idProduct=8700&referrer=scryfall&utm_campaign=card_prices&utm_medium=text&utm_source=scryfall","cardhoarder":"https://www.cardhoarder.com/cards/9247?affiliate_id=scryfall&ref=card-profile&utm_campaign=affiliate&utm_medium=card&utm_source=scryfall"}}
						resolve(new FetchedCardData(
							selectedGame,
							json["image_uris"]["normal"],
							json["name"],
							json["scryfall_uri"],
							json
						));
					}), (response) => {
						reject([null, response]);
					});
				} else if (selectedGame == Games.POKEMON) {
					fetchRateLimited("https://api.tcgdex.net/v2/en/random/card", {
						method: "GET"
					}).then((response) => response.json().then(json => {
						// {"category":"Trainer","id":"sm9-155","illustrator":"Toyste Beach","image":"https://assets.tcgdex.net/en/sm/sm9/155","localId":"155","name":"Unidentified Fossil","rarity":"Uncommon","set":{"cardCount":{"official":181,"total":196},"id":"sm9","logo":"https://assets.tcgdex.net/en/sm/sm9/logo","name":"Team Up","symbol":"https://assets.tcgdex.net/univ/sm/sm9/symbol"},"variants":{"firstEdition":false,"holo":false,"normal":true,"reverse":false,"wPromo":false},"variants_detailed":[{"type":"normal","size":"standard"}],"effect":"Play this card as if it were a 60-HP Colorless Basic Pokémon. At any time during your turn (before your attack), you may discard this card from play.\n\nThis card can’t retreat.","trainerType":"Item","legal":{"standard":false,"expanded":true},"updated":"2025-08-16T20:39:55Z","pricing":{"cardmarket":{"updated":"2026-04-08T00:45:27.000Z","unit":"EUR","idProduct":369080,"avg":0.12,"low":0.02,"trend":0.15,"avg1":0.1,"avg7":0.12,"avg30":0.12,"avg-holo":0.5,"low-holo":0.04,"trend-holo":0.56,"avg1-holo":0.28,"avg7-holo":0.39,"avg30-holo":0.36},"tcgplayer":null}}
						resolve(new FetchedCardData(
							selectedGame,
							json["image"] + '/high.jpg',
							json["name"],
							`https://www.pokemon.com/us/pokemon-tcg/pokemon-cards/series/${json["set"]["id"]}/${json["localId"]}/`,
							json
						));
					}), (response) => {
						reject([null, response]);
					});
				} else if (selectedGame == Games.YUGIOH) {
					// NOTE: The URL listed in the API documentation points to https://db.ygoprodeck.com/api/v7/randomcard.php, which redirects to the link below. The randomcard one is explicitly avoided due to CORS redirect issues.
					fetchRateLimited("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=0&sort=random&cachebust", {
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						}
					}).then((response) => response.json().then(json => {
						// {"data":[{"id":50554729,"name":"Amorphage Infection","type":"Spell Card","humanReadableCardType":"Continuous Spell","frameType":"spell","desc":"All \"Amorphage\" monsters on the field gain 100 ATK and DEF for each \"Amorphage\" card on the field. If a monster(s) in your hand or you control is Tributed, or destroyed by battle or card effect: You can add 1 \"Amorphage\" card from your Deck to your hand. You can only use this effect of \"Amorphage Infection\" once per turn.","race":"Continuous","archetype":"Amorphage","ygoprodeck_url":"https://ygoprodeck.com/card/amorphage-infection-4307","card_sets":[{"set_name":"Shining Victories","set_code":"SHVI-EN063","set_rarity":"Super Rare","set_rarity_code":"(SR)","set_price":"0"}],"card_images":[{"id":50554729,"image_url":"https://images.ygoprodeck.com/images/cards/50554729.jpg","image_url_small":"https://images.ygoprodeck.com/images/cards_small/50554729.jpg","image_url_cropped":"https://images.ygoprodeck.com/images/cards_cropped/50554729.jpg"}],"card_prices":[{"cardmarket_price":"0.23","tcgplayer_price":"0.11","ebay_price":"0.99","amazon_price":"0.75","coolstuffinc_price":"0.49"}]}],"meta":{"generated":"2026-04-08T23:36:55+00:00","current_rows":1,"total_rows":14283,"rows_remaining":14282,"total_pages":14283,"pages_remaining":14282,"next_page":"https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1&offset=1&sort=random&cachebust=","next_page_offset":1}}
						resolve(new FetchedCardData(
							selectedGame,
							json["data"][0]["card_images"][0]["image_url"],
							json["data"][0]["name"],
							json["data"][0]["ygoprodeck_url"],
							json
						));
					}), (response) => {
						reject([null, response]);
					});
				} else {
					console.error("Unhandled game: " + selectedGame);
				}
			}
		});
	}

	setInterval(() => {
		const currentFetch = fetchQueue.pop();
		if (currentFetch !== null && currentFetch !== undefined) {
			fetch(currentFetch.input, currentFetch.init).then(currentFetch.resolve, currentFetch.reject)
		}
	}, 1000);

	/**
	 * @type {Array<CardData>}
	 */
	const deckCardDataList = [];

	/**
	 * @type {Array<CardData>}
	 */
	let newDeckCardDataList = [];

	function getCombinedCardDataList() {
		return [deckCardDataList, newDeckCardDataList].flat();
	}

	const cardOrbitContainer = document.getElementById("card-orbit-container");

	const cardCountInputElement = document.getElementById("card-count");

	const cardElementParentToCardDataMap = new Map();

	const getCardsButtonElement = document.getElementById("get-cards");
	getCardsButtonElement.addEventListener("click", () => {
		const customGameCardList = customGameNameToFetchedCardDataListMap.get(gameSelectElement.options[gameSelectElement.selectedIndex].value);
		if (getSelectedGame() == null && (customGameCardList === null || customGameCardList === undefined)) {
			console.warn("Please select a game.");
			return;
		}

		const cardCount = parseInt(cardCountInputElement.value);
		for (let i = 0; i < cardCount; i++) {
			getCard(false, customGameCardList).then((fetchedCardData) => {
				const cardParentElementId = randomId();

				cardOrbitContainer.insertAdjacentHTML("beforeend", `
<div id="${cardParentElementId}" class="card-parent">
	<div class="card" aria-label="Flip Card" title="Flip Card" style="display: flex; justify-content: center;">
		<div class="card-front"></div>
		<div class="card-back"></div>
		<svg style="width: 50%; height: 100%; z-index: -1;" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 200 200"><rect width="100%" height="100%" x="50" y="50" fill="#400080" rx="0" ry="0"/></svg>
	</div>
</div>
				`);

				const cardParentElement = document.getElementById(cardParentElementId);

				const cardElement = cardParentElement.children[0];

				const cardData = new CardData(
					i,
					i,
					0,
					0,
					fetchedCardData
				);

				cardElementParentToCardDataMap.set(cardParentElement, cardData);

				if (prefersReducedMotion()) {
					const maxX = getAspectRatio() >= 1 ? 60 : 18;
					const maxY = getAspectRatio() >= 1 ? 40 : 40;

					let randomX = (getRandomRange(0, maxX)) * (Math.random() > 0.5 ? 1 : -1);
					let randomY = 0;
					if (getAspectRatio() >= 1) {
						randomY = (getRandomRange(Math.abs(randomX) <= 25 ? 25 : 0, maxY)) * (Math.random() > 0.5 ? 1 : -1);
					} else {
						randomY = (getRandomRange(Math.abs(randomX) <= 15 ? 18 : 0, maxY)) * (Math.random() > 0.5 ? 1 : -1);
						if (randomY >= 25) {
							randomY -= getRandomRange(7, 10);
						}
					}

					cardParentElement.style.transform = `translate(${randomX}vh, ${randomY}vh)`;
				}

				cardElement.addEventListener("click", () => {
					if (cardElement.classList.contains("flipped") && cardElementParentToCardDataMap.has(cardParentElement)) {
						const cardData = cardElementParentToCardDataMap.get(cardParentElement);
						cardElementParentToCardDataMap.delete(cardParentElement);

						newDeckCardDataList.push(cardData);

						let targetPositionX = -80;
						let targetPositionY = 30;
						if (getAspectRatio() < 1) {
							targetPositionX = -12.5;
							targetPositionY = 40;
						}

						let currentScale = 1;
						const cardToDeckAnimationIntervalId = setInterval(() => {
							const newX = lerp(cardData.currentXPosition, targetPositionX, 0.075);
							const newY = lerp(cardData.currentYPosition, targetPositionY, 0.075);

							if (!prefersReducedMotion()) {
								cardParentElement.style.transform = `translate(${newX}vh, ${newY}vh) scale(${currentScale})`;
							} else {
								cardParentElement.style.opacity = currentScale.toString();
							}

							cardData.currentXPosition = newX;
							cardData.currentYPosition = newY;

							if (currentScale >= 0) {
								if (!prefersReducedMotion()) {
									currentScale -= 0.015;
								} else {
									currentScale -= 0.1;
								}
							} else {
								cardParentElement.remove();
								clearInterval(cardToDeckAnimationIntervalId);
							}
						}, 10);
					} else {
						cardElement.classList.add("flipped");
					}
				});

				const cardFront = cardElement.getElementsByClassName("card-front")[0];
				cardFront.style.backgroundImage = cardBackSVGURIEncoded;
				cardFront.role = "img";
				cardFront.ariaLabel = "Card Back";

				/**
				 * @type {HTMLElement}
				 */
				const cardBack = cardElement.getElementsByClassName("card-back")[0];
				cardBack.style.backgroundImage = `url(${cardData.fetchedCardData.cardImage})`;
				// Would have been used as fallback if image fails to load ( https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background-image#description ), except that it always has it on since backgrounds are stacked together, which is a problem for centered transparent backgrounds.
				// cardBack.style.backgroundColor = "rgba(128, 64, 200, 0.7)";
				cardBack.role = "img";
				cardBack.ariaLabel = `${cardData.fetchedCardData.cardName} Card Front`;

				cardOrbitContainer.appendChild(cardParentElement);
			});
		}
	});

	let cardOrbitRadius = 30;
	if (getAspectRatio() < 1) {
		cardOrbitRadius = 20;
	}

	const cardAngleOffset = 0.0015;
	setInterval(() => {
		for (const [cardElement, cardData] of cardElementParentToCardDataMap.entries()) {
			cardData.targetXAngle += cardAngleOffset;
			cardData.targetYAngle += cardAngleOffset;

			// TODO: Wrap angle at high values.

			const targetCardOrbitPositionX = cardOrbitRadius * Math.cos((2 * cardData.targetXAngle * Math.PI));
			const targetCardOrbitPositionY = cardOrbitRadius * Math.sin((2 * cardData.targetYAngle * Math.PI));

			const newX = lerp(cardData.currentXPosition, targetCardOrbitPositionX, 0.075);
			const newY = lerp(cardData.currentYPosition, targetCardOrbitPositionY, 0.075);

			if (!prefersReducedMotion()) {
				cardElement.style.transform = `translate(${newX}vh, ${newY}vh)`;
			}

			cardData.currentXPosition = newX;
			cardData.currentYPosition = newY;
		}
	}, 10);

	const deckScreenElement = document.getElementById("deck-overlay");
	const deckScreenCardContainerElement = document.getElementById("deck-overlay-card-container");

	for (const deckStackElement of document.getElementsByClassName("deck-stack")) {
		deckStackElement.style.backgroundImage = cardBackSVGURIEncoded;
		deckStackElement.addEventListener("click", () => {
			for (const cardData of newDeckCardDataList) {
				deckScreenCardContainerElement.insertAdjacentHTML("beforeend", `
<div class="deck-card">
	<a href="${cardData.fetchedCardData.cardDetailsLink}">
		<img src="${cardData.fetchedCardData.cardImage}" alt="${cardData.fetchedCardData.cardName}" style="max-width: 100%; max-height: 100%;" />
	</a>
</div>
			`);
			}

			for (const cardData of newDeckCardDataList) {
				deckCardDataList.push(cardData);
			}
			newDeckCardDataList = [];

			deckScreenElement.classList.remove("fade-out");
			deckScreenElement.classList.add("fade-in");
		});
	}

	const helpOverlayElement = document.getElementById("help-overlay");

	const showHelpButtonElement = document.getElementById("show-help");
	showHelpButtonElement.addEventListener("click", () => {
		helpOverlayElement.classList.remove("fade-out");
		helpOverlayElement.classList.add("fade-in");
	});

	const closeHelpButtonElement = document.getElementById("close-help");
	closeHelpButtonElement.addEventListener("click", () => {
		helpOverlayElement.classList.remove("fade-in");
		helpOverlayElement.classList.add("fade-out");
	});

	const deckCloseButtonElement = document.getElementById("deck-close-button");
	deckCloseButtonElement.addEventListener("click", () => {
		deckScreenElement.classList.remove("fade-in");
		deckScreenElement.classList.add("fade-out");
	});

	const deckExportClipboardButtonElement = document.getElementById("deck-export-clipboard-button");
	const deckExportFileButtonElement = document.getElementById("deck-export-file-button");
	for (const deckExportButtonElement of [deckExportClipboardButtonElement, deckExportFileButtonElement]) {
		deckExportButtonElement.addEventListener("click", () => {
			/**
			 * @type {Map<string, CardExportData>}
			 */
			const cardNameToCardExportDataMap = new Map();

			for (const cardData of getCombinedCardDataList()) {
				let cardExportData = cardNameToCardExportDataMap.get(cardData.fetchedCardData.cardName);
				if (cardExportData === undefined) {
					cardExportData = new CardExportData(cardData, 0);
					cardNameToCardExportDataMap.set(cardData.fetchedCardData.cardName, cardExportData);
				}

				cardExportData.quantity += 1;
			}

			const outputStringList = [];
			for (const cardExportData of cardNameToCardExportDataMap.values()) {
				if (cardExportData.cardData.fetchedCardData.game == Games.POKEMON) {
					outputStringList.push(`${cardExportData.quantity}x ${cardExportData.cardData.fetchedCardData.cardName} (${cardExportData.cardData.fetchedCardData.rawData["set"]["id"].toUpperCase()})`);
				} else {
					outputStringList.push(`${cardExportData.quantity}x ${cardExportData.cardData.fetchedCardData.cardName}`);
				}
			}

			const outputString = outputStringList.join('\n');

			if (deckExportButtonElement == deckExportClipboardButtonElement) {
				navigator.clipboard.writeText(outputString);
			} else if (deckExportButtonElement == deckExportFileButtonElement) {
				const downloadLink = window.document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(new Blob([outputString], { type: 'text/plain' }));
				downloadLink.download = `deck-${new Date().toISOString().replaceAll(':', '-').replaceAll('.', '-')}.txt`;

				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			}
		});
	}
});