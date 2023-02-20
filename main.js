scoreleftWrist=0;
scorerightWrist=0;
var statusleft ="";
var statusright ="";
song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song1= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}

function setup(){
    
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    var statusleft = song1.isPlaying();
    var statusright = song2.isPlaying();

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(statusleft = false)
        {
        song1.play();
        document.getElementById("song_name").innerHTML="song_name = "+ song1;

        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(statusright = false)
        {
        song2.play();
        document.getElementById("song_name").innerHTML="song_name = "+ song2;

        }
    }

}


function modelLoaded(){
    console.log('Posenet is initialized');
}

function gotPoses(results){
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist = "+ scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightWrist = "+ scorerightWrist);

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY);

        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightWristX + "rightWristY = "+ rightWristY);
    }
}