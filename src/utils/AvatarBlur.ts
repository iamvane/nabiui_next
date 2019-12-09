export default blur;

function blur (imagedata: any, opts: any): any {
    var i, j;
    var data = imagedata.data;
    var width = imagedata.width;
    var height = imagedata.height;
    var opts = opts || {amount: 0};
    var amount = Math.round(opts.amount) || 0;
    var dotIndex;
    var gaussianDot;

    if (!amount) {
        return imagedata;
    }

    var weights = getWeights(amount);

    for (j = 0; j < height; j++) {
        for (i = 0; i < width; i++) {
            dotIndex = i * 4 + j * 4 * width;
            gaussianDot = getGaussianDot(i, j, weights, imagedata, amount);

            data[dotIndex] = gaussianDot.r;
            data[dotIndex + 1] = gaussianDot.g;
            data[dotIndex + 2] = gaussianDot.b;
            data[dotIndex + 3] = gaussianDot.a;
        }
    }

    return imagedata;
}

function getGaussianDot (x: number , y: number , weights: object , imagedata: any, amount: number) {
    var w = imagedata.width;

    var dotIndex = x * 4 + y * 4 * w;
    var tempDotIndex;

    var matrixObj = getDotMatrix(x, y, imagedata, amount, weights);
    var dotMatrix: any = matrixObj.list;
    var allWeights = matrixObj.allweights;

    var ret = {
        r: 0,
        g: 0,
        b: 0,
        a: 0
    };

    for (var i = 0; i < dotMatrix.length; i++) {
        tempDotIndex = dotIndex + dotMatrix[i].x * 4 + dotMatrix[i].y * w * 4;

        ret.r += imagedata.data[tempDotIndex] * dotMatrix[i].weight / allWeights;
        ret.g += imagedata.data[tempDotIndex + 1] * dotMatrix[i].weight / allWeights;
        ret.b += imagedata.data[tempDotIndex + 2] * dotMatrix[i].weight / allWeights;
        ret.a += imagedata.data[tempDotIndex + 3] * dotMatrix[i].weight / allWeights;

    }

    return ret;
}

function getDotMatrix (x: number, y: number , imagedata: any , amount: number, weights: any): any {
    var i, j;
    var ret = [];
    var allweights = 0;

    for (i = -amount; i <= amount; i++) {
        for (j = -amount; j <= amount; j++) {
            if ((x + i) >= 0 && (x + i) < imagedata.width && (y + j) >= 0 && (y + j) < imagedata.height) {
                ret.push({x: i, y: j, weight: weights[i][j]});
                allweights += weights[i][j];
            }
        }
    }

    return {list: ret, allweights: allweights};
}

function getWeights (amount: number): object {
    var i, j;
    var ret: any  = {};
    for (i = -amount ; i <= amount; i++) {
        ret[i] = {};

        for (j = -amount; j <= amount; j++) {
            ret[i][j] = gaussian(i, j, amount);
        }
    }
    return ret;
}

function gaussian (x: number, y: number, deviation: number ): number {
    var ret = Math.exp(
        - (x * x + y * y) / (2 * deviation * deviation)
    ) /
    (2 * Math.PI * deviation * deviation);
    return ret;
}
