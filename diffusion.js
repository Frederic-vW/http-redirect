// JavaScript source code
//Diffusion. Copyright F. Bezanilla, 2020

//constants
var canvas;
var context
var width = 700;
var height = 500;
var leftOffset = 20;
var topOffset = 20;
var imgData;
var jj;
var pathL = 50;
var markFlag = 0;
var X = [];
var Y = [];
var Xa = [];
var Ya = [];
var out = [];
var Xop = [];
var Yop = [];
var nPart = 2000;
var remPart = 2000;
var nAvailable =2000;
var fieldValue = 0;
var fieldFlag = 0;
var cont = 1;
var part;
var count=nPart;
var outt = 0;
var open = 0;
var openTimes = -1;
var contTimes = -1;
var temp;
var intervalo;
var timer2;
var do_this = null;
//draw the container
window.onload = function () {
    intervalo = 50;
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.fillStyle = 'gray';
    context.fillRect(0, 0, 740, 650);
    context.fillStyle = 'white';
    context.fillRect(leftOffset, topOffset, width, height);
    context.strokeStyle = 'black';
    context.beginPath();
    context.strokeStyle = 'blue';
    context.lineWidth = "4";
    context.rect(leftOffset,topOffset,width, height);
    context.stroke();
    open = 0;

}
function start() {
    for (var i = 0; i < nPart; i++) {
        out[i] = -1;
    }
    nAvailable = nPart;
    remPart = nPart;
    count = nPart;
    context.beginPath();
    context.arc(300, 250, 5, 0, 2 * Math.PI);
    context.stroke();
    imgData = context.getImageData(90, 65, 20, 20);
    do_this = null;

    //this is the infine loop
    do_this = setInterval(function () { animatePart(); }, intervalo);

    for (var i = 0; i < nPart; i++) {
        Xa[i] = 370;
        Ya[i] = 270;
    }

}

function animatePart() {
    

        document.getElementById('particles').value = remPart.toString();
        //remPart = nAvailable;
        context.fillStyle = 'gray';
        context.fillRect(0, 0, 740, 650);
        context.fillStyle = 'white';
        context.fillRect(leftOffset, topOffset, width, height);

        context.beginPath();
        context.lineWidth = "3";
        context.strokeStyle = 'blue';
        if (cont == 1) {
            context.rect(leftOffset, topOffset, width, height);
            context.stroke();
        }
        else {
            context.fillStyle = 'white';
            context.fillRect(0, 0, 740, 650);
        }
        if (open == 1) {
            context.fillRect(270, height + 17, 200, 650 - height);
            context.beginPath();
            context.lineWidth = "4";
            context.strokeStyle = 'blue';
            context.moveTo(270, height + 20);
            context.lineTo(270, 650);
            context.stroke();
            context.beginPath(470, height);
            context.moveTo(470, height + 20);
            context.lineTo(470, 650);
            context.stroke();
        }
        //main for loop
        for (var i = 0; i < remPart; i++) {

            X[i] = Xa[i] + pathL * (Math.random() - 0.5);
            Y[i] = Ya[i] + pathL * (Math.random() - 0.5 + fieldValue);

            Xop[i] = X[i];
            Yop[i] = Y[i];


            //out = -1;
            //these are all the cases where particles go outside the container  
            //case when NO container
            if (cont == 0) {
                if (X[i] >= 740) { outt = i; out[i] = i; remPart = remPart - 1; }
                if (X[i] <= 0) {
                    if (outt != i) { outt = i; out[i] = i; remPart = remPart - 1; } else { outt = i; }
                }
                if (Y[i] >= 650) {
                    if (outt != i) { outt = i; out[i] = i; remPart = remPart - 1; } else { outt = i; }
                }
                if (Y[i] <= 0) {
                    if (outt != i) { outt = i; out[i] = i; remPart = remPart - 1; } else { outt = i; }
                }
            }
            //case with container
            else {
                if (X[i] >= leftOffset + width - 20)
                    X[i] = 2 * (leftOffset + width) - X[i] - 25;

                if (X[i] <= leftOffset + 10)
                    X[i] = 2 * leftOffset - X[i] + 15;

                if (Y[i] <= topOffset + 10)
                    Y[i] = 2 * topOffset - Y[i] + 15;
                //here consider the channel open
                if (open == 0) {
                    if ((Y[i] >= topOffset + height - 20))
                        Y[i] = 2 * (topOffset + height) - Y[i] - 25;
                }
                else {
                    if ((Y[i] >= topOffset + height - 20) && ((X[i] <= 270) || (X[i] >= 470)))
                        Y[i] = 2 * (topOffset + height) - Y[i] - 25;
                    else if ((Y[i] >= topOffset + height - 20 + 90) && ((X[i] > 270) && (X[i] < 470))) { outt = i; out[i] = i; remPart = remPart - 1; }
                    //  if ((Y[i] >= topOffset + height - 20 + 100) && (X[i] > 270) && (X[i] < 470)) {

                    // else if ((Y[i] >= topOffset + height - 20)&&(X[i]>470)) { outt = i; out[i] = i; remPart = remPart - 1; }
                    // }

                }
            }

            //here is the end of the group outside    


            if ((i == 199) && (markFlag != 1)) {
                context.beginPath();
                context.strokeStyle = 'black';
                // if(i==outt) context.strokeStyle='gray'
                context.arc(X[i], Y[i], 5, 0, 2 * Math.PI);
                context.stroke();
            }
            else if ((i == 199) && (markFlag == 1)) {
                context.fillStyle = "red";
                //  if(outt==i) context.fillStyle='gray'
                context.beginPath();
                context.arc(X[i], Y[i], 8, 0, 2 * Math.PI);
                context.fill();
            }
            else {
                context.beginPath();
                context.strokeStyle = 'black';
                // if(outt==i) context.strokeStyle = 'gray';
                context.arc(X[i], Y[i], 5, 0, 2 * Math.PI);
                context.stroke();
            }
        }
        //end of main for loop

        count = nPart;
        for (var i = 0; i < nPart; i++) {
            if (((Xop[i] > width + leftOffset) || (Xop[i] < leftOffset) || (Yop[i] < topOffset) || (Yop[i] > topOffset + height))) {
                count--;
            }
        }

        for (var i = 0; i < nPart; i++) {
            Ya[i] = Y[i];
            Xa[i] = X[i];

        }

    
}

function freeze() {
    do_this = clearInterval(do_this);
}
function resume() {

    do_this = setInterval(function () { animatePart(); }, intervalo);
}

function mark() {//alert(markFlag.toString());
    if (markFlag == 0) {
       document.getElementById("mark").value = "NO mark";
       markFlag = 1;
    }
    else {
        document.getElementById("mark").value = "mark";
        markFlag = 0;
        }
    }

function field() {
    if (fieldFlag == 0) {
        fieldFlag = 1;
        fieldValue = 0.02;
        document.getElementById("field").value = "remove field";
    }
    else {
        fieldFlag = 0;
        fieldValue = 0;
        document.getElementById("field").value = "Impose field";
    }
}
function container() {
    if (cont == 1) {
        cont = 0;
        contTimes++;
       // nAvailable = remPart;
        document.getElementById("container").value = "restore container";
        document.getElementById("channel").style.visibility = 'hidden';
    }
    else {
        cont = 1;
      //  nAvailable = remPart;
        document.getElementById("container").value = "remove container";
        document.getElementById("channel").style.visibility = 'visible';
    }
}
function openChannel() {
    if (open == 0) {
        openTimes++;
        
      //  nAvailable = remPart;
        open = 1;
        document.getElementById("channel").value = "close channel";
        document.getElementById("container").style.visibility = 'hidden';
    }
    else {
        
       // nAvailable = remPart;
        document.getElementById("channel").value = "open channel";
        document.getElementById("container").style.visibility = 'visible';
        open = 0;
    }
}

function temperature  () {
    temp = document.getElementById("temperature").value;
    if ((temp < 2) || (temp > 100)) document.getElementById("temperature").value = 20;
    clearInterval(timer2);
    //alert(temp.toString());
    intervalo = 200 / (0.7*temp);
    //alert(intervalo.toString());
    
    start();
}
