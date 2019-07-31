var playing = false;
var score;
var trailsleft;
var fruits = ['apple', 'banana', 'cherry', 'grapes', 'lemon', 'melon', 'passionfruit', 'strawberry', 'watermelon'];
var step;
var action;

$(function(){
    //click on start/ reset button
    $("#startreset").click(function(){
        
        //we are playing
        
        if(playing){
            
                //reload the page
                location.reload();
            
           }else{
               $("#gameover").hide();
               //we are not playing
               playing = true;   //game initiated
               score = 0;
               $("#scorevalue").html(score);
               
               //show trails left
               $("#trailsleft").show();
               trailsleft = 3;
               addHearts();
               
               //change button text to reset game
               $("#startreset").html("Reset Game");
               
               startAction();
           }
    });
    
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play();     //play sound
        
        //stop fruit
        clearInterval(action);
        
        //hide fruit using animation
        $("#fruit1").hide("explode", 500);
        
        //send a new fruit
        setTimeout(startAction, 500);
    });

        //slice a fruit
        //play explode sound
        //explode fruit
        //increase score by one


    function startAction(){
        $("#fruit1").show();
        chooseFruit();      //choose a random fruit

        //create fruit in a random position
        $("#fruit1").css({'left' : Math.round(550* Math.random()), 'top': -50});

        //generate a random step/ speed of the fruit
        step = 1 + Math.round(5 * Math.random());

        //move fruit down by one pixel every 10ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);

            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitcontainer").height()){
                    //check if we have lives left
                    if(trailsleft > 1){
                        $("#fruit1").show();
                        chooseFruit();      //choose a random fruit

                        //create fruit in a random position
                        $("#fruit1").css({'left' : Math.round(550* Math.random()), 'top': -50});

                        //generate a random step/ speed of the fruit
                        step = 1 + Math.round(5 * Math.random());

                        //reduce lives by one
                        trailsleft--;
                        addHearts();
                    }else{
                        //game over
                        playing = false;
                        $("#startreset").html("Start Game");
                        $("#gameover").show();
                        $("#gameover").html('<p>Game Over!</p><p>Your Score is ' + score + '.</p>');
                        $("#trailsleft").hide();
                        stopAction();
                    }
               }
        }, 10);
    }

    function addHearts(){
        $("#trailsleft").empty();
        for(i = 0; i < trailsleft; i++){
                       $("#trailsleft").append('<img src= "Images/heart.png" class="life">');
                   }
    }

    function chooseFruit(){
        $("#fruit1").attr('src', 'Images/' + fruits[Math.round(8* Math.random())] + '.png');
    }

    function stopAction(){
        //stop dropping fruit
        clearInterval(action);
        $("#fruit1").hide();
    }
});    