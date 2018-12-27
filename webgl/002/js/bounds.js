export class Bounds {
    constructor (xmin, ymin, xmax, ymax) {
        if (Array.isArray(xmin)) {
            this.xmin = xmin[0];
            this.xmax = ymin[0];
            this.ymin = xmin[1];
            this.ymax = ymin[1];
        } else {
            this.xmin = xmin;
            this.xmax = xmax;
            this.ymin = ymin;
            this.ymax = ymax;
        }
    }
    getWidth() {
        return Math.abs(this.xmax - this.xmin);
    }
    getHeight() {
        return Math.abs(this.ymax - this.ymin);
    }
    getCenter() {
        let tx = (this.xmax - this.xmin) / 2;
        let ty = (this.ymax - this.ymin) / 2;
        return [tx + this.xmin, ty + this.ymin];
    }
    scale(m) {
        this.xmin *= m;
        this.ymin *= m;
        this.xmax *= m;
        this.ymax *= m;
        return this;
    }
}