song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftwristyX = 0;
leftwristyY = 0;

rightwristyX = 0;
rightwristyY = 0;

function preload()
{
    song = loadSound("893359_Lavender-Town.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keyPoints[10].score;
        scoreLeftWrist = results[0].pose.keyPoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
        
        leftwristyX = results[0].pose.leftwristy.x;
        leftwristyY = results[0].pose.leftwristy.y;
        console.log("leftwristyX = " + leftwristyX + "leftwristyY" + leftwristyY);
        
        rightwristyX = results[0].pose.rightwristy.x;
        rightwristyY = results[0].pose.rightwristy.y;
        console.log("rightwristyX = " + rightwristyX + "rightwristyY" + rightwristyY);
    }
}

function modelLoaded()
{
    console.log("poseNet instalizated");
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightwristyX, rightwristyY, 20);
    if(scoreLeftWrist > 0.2)
    {
    circle(rightwristyX, rightwristyY, 20);
    if(rightwristyY >0 && rightwristyY <= 100)
    {
        document.getElementById("speed").innerHTML = "velocidade = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristyY > 100 && rightwristyY <= 200)
    {
        document.getElementById("speed").innerHTML = "velocidade = 1x";
        song.rate(1);
    }
    else if(rightwristyY > 200 && rightwristyY <= 300)
    {
        document.getElementById("speed").innerHTML = "velocidade = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristyY > 300 && rightwristyY <= 400)
    {
        document.getElementById("speed").innerHTML = "velocidade = 2x";
        song.rate(2);
    }
    else if(rightwristyY > 400 && rightwristyY <= 500)
    {
        document.getElementById("speed").innerHTML = "velocidade = 2.5x";
        song.rate(2.5);
    }

    circle(leftwristyX, leftwristyY, 20);
    InNumberLeftWristY = Number(leftwristyY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "VOLUME =" + volume;
    song.setVolume("volume");
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}