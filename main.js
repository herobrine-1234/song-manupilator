song1="";
song2="";
scoreRightWrist=0;
scoreLeftWrist=0;
LeftWristX=0;
RightWristX=0;
RightWristY=0;
LefttWristY=0;
song1status="";
song2status="";
function preload()
    {
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
    }
function setup()

{
canvas=createCanvas(550,550);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
console.log("poseNet is working!");
}
function draw()
{
image(video,0,0,550,550);
fill("#FF0000");
stroke("#FF0000");
song1status=song1.isPlaying();
song2status=song2.isPlaying();

if(scoreLeftWrist>0.2)
{
circle(LeftWristX,LeftWristY,20);
song1.stop();
if(song2status==false)
{song2.play();
document.getElementById("song").innerHTML="peter pan";
}
}
if(scoreRightWrist>0.2)
{
circle(RightWristX,RightWristY,20);
song2.stop();
if(song1status==false)
{song1.play();
document.getElementById("song").innerHTML="harry potter";
}
}
}
function play()
{
song1.play();
song2.play();
song1.rate(1);
song2.rate(1);
song1.setVolume(1);
song2.setVolume(1);
}
function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
RightWristX=results[0].pose.rightWrist.x;
LeftWristX=results[0].pose.leftWrist.x;
RightWristY=results[0].pose.rightWrist.y;
LeftWristY=results[0].pose.leftWrist.y;
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
console.log("scoreRightWrist= "+scoreRightWrist+"scoreLeftWrist= "+scoreLeftWrist);
}
}













