import Array_max from '/utils/Array/max';
import Document_createCanvas from '/utils/Document/createCanvas';

export default function(textLines, font) {
	if (textLines.length) {
		let ctx = Document_createCanvas().getContext('2d');
		ctx.font = font;
		return Array_max(textLines.map(text => ctx.measureText(text).width));
	}
	return 0;
}
