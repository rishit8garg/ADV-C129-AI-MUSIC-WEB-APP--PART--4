scoreLeftWrist = 0;
scoreRightWrist = 0;
song ="";
leftWristX = 0;
leftWristy = 0;
rightWristX = 0;
rightWristy = 0;
function preload()
{
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on ('pose',gotPoses);

}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video,0,0,600,500);
    Fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2)
{


    
    circle(rightWristX,rightWristy,20);

    if(rightWristy >0 && rightWristy<= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristy >100 && rightWristy <=200)
     {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
     }
     else if(rightWristy >200 && rightWristy <= 300)
     {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
     }
     else if(rightWristy >300 && rightWristy <=400)
     {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
     }
     else if (rightWristy >400 && rightWristy <= 500)
     {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2.5);
     }
    }
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristy,20);
        InNumberleftWristy = Number(leftWristy);
        remove_decimals = floor(InNumberleftWristy);
        Volume = remove_decimals/500;
        document.getElementById("volume").innerHTML= "volume = " +volume;
        song.setVolume(volume);
    }

   
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log( result );
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        console.log("scoreRightWrist =" + scoreRightWrist +"scoreLeftWrist =" + scoreLeftWrist);

        leftWristX = result[0].pose.leftWrist.x;
        leftWristy = result[0].pose.leftWrist.y;
        console.log("leftWristX ="+ leftWristX +"leftWristy = "+ leftWristy);

        rightWristX = result[0].pose.rightWrist.x;
        rightWristy = result[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWristX +"rightWristY =" + rightWristy);
    }
}