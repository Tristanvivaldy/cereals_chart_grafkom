export var canvas = document.querySelector('#canvas1');
export var ctx = canvas.getContext("2d");

export function gambar_titik(imageData, x, y, warna) {
    var index;
    let [r, g, b] = warna;
    index = 4 * (Math.ceil(x) + (Math.ceil(y) * canvas.width));
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}

export function dda_line(imageData, titik1, titik2, warna) {
    let [x1, y1] = titik1;
    let [x2, y2] = titik2;

    var dx = x2 - x1;
    var dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (x2 > x1) {
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx);
                gambar_titik(imageData, x, y, warna);
            }
        } else {
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx);
                gambar_titik(imageData, x, y, warna);
            }
        }
    } else {
        if (y2 > y1) {
            var x = x1
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                gambar_titik(imageData, x, y, warna);
            }
        } else {
            var x = x1
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                gambar_titik(imageData, x, y, warna);
            }
        }
    }
}

export function lingkaran_polar(imageData, koordinat, rad, warna) {
    let [xc, yc] = koordinat;

    for (var theta = 0; theta < Math.PI * 2; theta += 0.001) {
        let x = xc + rad * Math.cos(theta);
        let y = yc + rad * Math.sin(theta);

        gambar_titik(imageData, x, y, warna);
    }
}

export function bunga(imageData, koordinat, rad, n, warna) {
    let [xc, yc] = koordinat;

    for (var theta = 0; theta < 2 * Math.PI; theta += 0.001) {

        let x = xc + rad * Math.cos(n * theta) * Math.cos(theta);
        let y = yc + rad * Math.cos(n * theta) * Math.sin(theta);

        gambar_titik(imageData, x, y, warna);


    }
}
export function floodFillStacked(imageData, canvas, x0, y0, toFlood, color) {
    var tumpukan = [];
    tumpukan.push({ x: x0, y: y0 });

    while (tumpukan.length > 0) {
        var titik_skrg = tumpukan.pop();
        var index_skrg = 4 * (titik_skrg.x + titik_skrg.y * canvas.width);
        var r1 = imageData.data[index_skrg];
        var g1 = imageData.data[index_skrg + 1];
        var b1 = imageData.data[index_skrg + 2];
        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[index_skrg] = color.r;
            imageData.data[index_skrg + 1] = color.g;
            imageData.data[index_skrg + 2] = color.b;
            imageData.data[index_skrg + 3] = 255.

            tumpukan.push({ x: titik_skrg.x + 1, y: titik_skrg.y });
            tumpukan.push({ x: titik_skrg.x - 1, y: titik_skrg.y });
            tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y + 1 });
            tumpukan.push({ x: titik_skrg.x, y: titik_skrg.y - 1 });
        }
    }

}
export function polygon(imageData, arrayPoint, warna) {
    var point = arrayPoint[0];

    for (var i = 1; i < arrayPoint.length; i++) {
        var point2 = arrayPoint[i];
        dda_line(imageData, [point.x, point.y], [point2.x, point2.y], warna);
        point = point2;
    }
    dda_line(imageData, [point.x, point.y], [arrayPoint[0].x, arrayPoint[0].y], warna);
}

var angka = 0
export function segi(imageData, koordinat, rad, n, warna, jumlahPersen) {
    let [xc, yc] = koordinat;
    var temp = (Math.PI * 2) / n;
    let [r, g, b] = warna;
    for (var theta = 0; theta <= 1; theta += 1) {
        let x = xc + rad * Math.cos((angka / 100)*(Math.PI*2));
        let y = yc + rad * Math.sin((angka / 100)*(Math.PI*2));
        dda_line(imageData, [x,y], [canvas.width/2,canvas.height/2], warna)
        if (theta != 1){
            angka += jumlahPersen;
        }
        // floodFillStacked(imageData,canvas,Math.ceil(x),Math.ceil(y),{r:0,g:0,b:0},{r:r,g:g,b:b}); 
    }
}

export function translansi(titik_lama, T) {
    var x_baru = titik_lama.x + T.x;
    var y_baru = titik_lama.y + T.y;

    return { x: x_baru, y: y_baru };
}
export function skala(titik_lama, S) {
    var x_baru = titik_lama.x + S.x;
    var y_baru = titik_lama.y + S.y;

    return { x: x_baru, y: y_baru };
}

export function rotasi(titik_lama, sudut) {
    var x_baru = titik_lama.x + Math.cos(sudut) - titik_lama.y * Math.sin(sudut);
    var y_baru = titik_lama.y + Math.sin(sudut) + titik_lama.y * Math.cos(sudut);

    return { x: x_baru, y: y_baru };
}

export function rotasi_fp(titik_lama, titik_putar, sudut) {
    var p1 = translansi(titik_lama, { x: -titik_putar.x, y: -titik_putar.y });
    var p2 = rotasi(p1, sudut);
    var p3 = translansi(p2, titik_putar);

    return p3;
}

export function skala_fp(titik_lama, titik_pusat, S) {
    var p1 = translansi(titik_lama, { x: -titik_pusat.x, y: -titik_pusat.y });
    var p2 = rotasi(p1, S);
    var p3 = translansi(p2, titik_pusat);

    return p3;
}

export function translansi_array(array_titik, T) {
    var array_hasil = [];

    for (var i = 0; i < array_titik.length; i++) {
        var temp = translansi(array_titik[i], T);
        array_hasil.push(temp);
    }
    return array_hasil;
}

export function rotasi_array(array_titik, titik_pusat, sudut) {
    var array_hasil = [];

    for (var i = 0; i < array_titik.length; i++) {
        var temp = rotasi_fp(array_titik[i], titik_pusat, sudut);
        array_hasil.push(temp);
    }
    return array_hasil;
}

export function skala_array(array_titik, titik_pusat, S) {
    var array_hasil = [];

    for (var i = 0; i < array_titik.length; i++) {
        var temp = skala_fp(array_titik[i], titik_pusat, S);
        array_hasil.push(temp);
    }
    return array_hasil;
}

export function createIdentity() {
    var identitas =
        [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]

        ]
    return identitas;
}

export function multiplyMatrix(m1, m2) {
    var hasil = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                hasil[i][k] += (m1[i][j] * m2[j][k]);
            }
        }
    }
}

export function createTranslation(Tx, Ty) {
    var translansi = [
        [1, 0, Tx],
        [0, 1, Ty],
        [0, 0, 1]
    ]
    return translansi;
}

export function createScale(Sx, Sy) {
    var scale = [
        [Sx, 0, 0],
        [0, Sy, 0],
        [0, 0, 1]
    ]
    return scale;
}

export function createRotation(theta) {
    var rotation = [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ]
    return rotation;
}

export function arrayRotationFp(xc, yc, theta) {
    var m1 = createTranslation(-xc, -yc);
    var m2 = createRotation(theta);
    var m3 = createTranslation(xc, yc);

    var hasil;
    hasil = multiplyMatrix(m3, m2);
    hasil = multiplyMatrix(hasil, m1);
    return hasil;
}

export function arrayScaleFp(xc, yc, Sx,Sy) {
    var m1 = createTranslation(-xc, -yc);
    var m2 = createScale(Sx,Sy);
    var m3 = createTranslation(xc, yc);

    var hasil;
    hasil = multiplyMatrix(m3, m2);
    hasil = multiplyMatrix(hasil, m1);
    return hasil;
}

export function transform_titik(titik_lama,m){
    var x_baru = m[0][0]*titik_lama.x + m[0][1]*titik_lama.y + m[0][2]*1;
    var Y_baru = m[1][0]*titik_lama.x + m[1][1]*titik_lama.y + m[1][2]*1;

    return{x:x_baru,y:Y_baru};

}

export function transformArray(array_titik,m){
    var hasil = [];
    for(var i=0;i<array_titik.length;i){
        var titik_hasil;
        titik_hasil = transform_titik(array_titik[i],m);
        hasil.push(titik_hasil);

    }
    return hasil;
}