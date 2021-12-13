song1 ="";
song2 = "";
leftWristX =0;
leftWristY = 0;
leftWristScore = 0;

rightWristX =0;
rightWristY = 0;
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(650, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,650,500)

    stroke("#FF0000");
    fill("FF00000");

    status1=song1.isPlaying();

    if(leftWristScore>0.2){
        circle(leftWristX,leftWristY,20,20)
        song2.stop();
    } 
    if(status1 == false){
        song1.play();
        document.getElementById("name").innerHTML = "Song Playing is Song 1";
    }
}
function modelLoaded(){
    console.log('PoseNet is Initialized');
}
function gotPoses(results){
    if(results.length > 0){
    
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + leftWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX+"leftWristY =" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX+"rightWristY =" + rightWristY);
    }
}