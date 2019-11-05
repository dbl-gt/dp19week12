
function setup() {
    canvas=createCanvas(500, 500);
    canvas.parent('p5sketch');
    loaddata();
}

function draw() {
    background("#fff");
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(0, 0, 500, 500);
    if (bldg.length > 0) {
        for (var i = 0; i < bldg.length; i++) {
            var b = bldg[i];
            fill(b.re, b.gr, b.bl);
            rect(b.x, b.y, b.l, b.w);
        }
    }
}

function mousePressed() {
    if (bldg.length > 0) {
        for (var i = 0; i < bldg.length; i++) {
            var b = bldg[i];
            m = { x: mouseX, y: mouseY };
            if (m.x > b.x && m.x < b.x + b.l && m.y > b.y && m.y < b.y + b.w) {
                b.active = true;
                b.color = '#0f0';
            } else {
                b.active = false;
                b.color = '#ddd';
            }
        }
    }
    return false;
}

function mouseDragged() {
    if (bldg.length > 0) {
        for (var i = 0; i < bldg.length; i++) {
            var x = bldg[i].x;
            var y = bldg[i].y;
            if (bldg[i].active) {
                bldg[i].x = mouseX;
                bldg[i].y = mouseY;
                break;
            }
        }
    }
    loaddata();
    return false;
}

function loaddata(){
    var arr = [];
    for (var i = 0; i < bldg.length; i++) {
        var json = {
            "id":bldg[i].id,
            "name":bldg[i].name,
            "x": bldg[i].x,
            "y": bldg[i].y,
            "l":bldg[i].l,
            "w":bldg[i].w,
            "h":bldg[i].h,
            "re":bldg[i].re,
            "gr":bldg[i].gr,
            "bl":bldg[i].bl,
            "active":bldg[i].active
        };
        var str=JSON.stringify(json);
        arr.push(str);
    }
    document.getElementById("update").value = arr;
}