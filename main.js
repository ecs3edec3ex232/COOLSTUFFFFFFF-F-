img=""
status =""; 
objects ={};

function preload(){
img=loadImage('dog_cat.jpg');
}

function setup(){
    canvas =createCanvas(380,380);
    canvas.center();
    video =createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}  

function start(){
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects"; 
}

function modelLoaded(){
    console.log("Model loaded!");
    status = true; 
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
        console.log(results); 
        objects = results; 
}

function draw(){
    image(video,0,0,380,380);
    if (status != ""){
r = random(255);
g = random(255);
b = random(255);

        for (i = 0; i < objects.length; i++){ 
            objectDetector.detect(video, gotResult); 
            document.getElementById("status").innerHTML = "Status : Objects detected"; 
            document.getElementById("num_objects").innerHTML = "Number of objects detected : "+ objects.length; 

            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent +"%", objects[i].x, objects[i].y);
            noFill(); 
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
