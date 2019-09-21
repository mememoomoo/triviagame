$(document).ready(function () {
    //variables with questions, choices, answer position, picture

    var trivia = [
        //Question One
        {
            question: "Which US state is named on the label of a Jack Daniels bottle?",
            choices: ["Virginia", "California", "Tennessee", "Maryland"],
            correct: 2,
            image: "assets/images/jack-daniels-480x320.gif",
        },
        //Question Two
        {
            question: "A phlebotomist extracts what from the human body?",
            choices: ["Oil", "Blood", "Bone Marrow", "Tears"],
            correct: 1,
            image: "assets/images/blood-draw.gif",
        },
        //Question Three
        {
            question: "In which year did Henry VIII become King of England?",
            choices: ["1601", "1782", "1498", "1509"],
            correct: 3,
            image: "assets/images/henry-viii.gif",
        },
        //Question Four
        {
            question: "The 1999 film Tea with Mussolini is based on whose autobiography?",
            choices: ["Franco Zeffirelli", "Baird Wallace", "John Mortimer", "Lily Tomlin"],
            correct: 0,
            image: "assets/images/franco-zeffirelli.gif",
        },
        //Question Five
        {
            question: "Which singer’s real name is Stefani Joanne Angelina Germanotta?",
            choices: ["Gwen Stefani", "Pink", "Lady Gaga", "Stefanie Martini"],
            correct: 2,
            image: "assets/images/lady-gaga.gif",
        },
        //Question Six
        {
            question: "How many players are there in a baseball team?",
            choices: ["Twelve", "Six", "Nine", "Eight"],
            correct: 2,
            image: "assets/images/baseball.gif",
        },
        //Question Seven
        {
            question: "The song Luck be a Lady features in which musical?",
            choices: ["Guys and Dolls", "Daddy Long Legs", "Love Me or Leave Me", "The Glass Slipper"],
            correct: 0,
            image: "assets/images/guys-and-dolls.gif",
        },
        //Question Eight
        {
            question: "Kodiak Island is in which US state?",
            choices: ["Alaska", "Maine", "Florida", "New York"],
            correct: 0,
            image: "assets/images/alaska-flag.gif",
        },
        //Question Nine
        {
            question: "In the human body what is the hallux?",
            choices: ["Elbow", "Knee", "Shoulder", "Big Toe"],
            correct: 3,
            image: "assets/images/big-toe.gif",
        },
        //Question Ten
        {
            question: "The beaver is the national emblem of which country?",
            choices: ["Germany", "Canada", "Russia", "Poland",],
            correct: 1,
            image: "assets/images/canada.gif",
        },
    ];

    //variables with question count, timer, user guess
    var timer = false;
    var correct = 0;
    var wrong = 0;
    var timeLeft = 25;
    var countDown;
    var unanswered = 0;
    var select;
    var questionHolder = [];
    var random;
    var playerGuess = "";
    var questionCount = trivia.length;
    var emptyArray = [];
    var hide;

    //Reset game
    // function resetGame() {
    //     $("#timer").empty();
    //     $("#question").empty();
    //     $("#answers").empty();
    //     $("#gif").empty();
    // };

    //Hide Play Again Button
    $("#reset").hide();

    //Start game
    $("#start").on("click", function () {
        event.preventDefault();
        $("#start").hide();
        showQuestion();
        timerStart();
        timerCountDown();
        for (var i = 0; i < trivia.length; i++) {
            questionHolder.push(trivia[i]);
        }

    });

    //Timer Start
    function timerStart() {
        if (!timer) {
            timer = true;
            countDown = setInterval(timerCountDown, 1000);
        }

    }

    //timer stop
    function timerStop() {
        timer = false;
        clearInterval(countDown);
    }

    //timer count down
    function timerCountDown() {
        $("#timer").html("<h2>Time Left: " + timeLeft + "</h2>");
        timeLeft--;

        if (timeLeft === 0) {
            unanswered++;
            timerStop();
            $("#answers").html("<h2>Beep Beep! Times up! The answer is " + select.choices[select.correct] + "</h2>");
            hideGif();
        }

    }

    //Show question
    function showQuestion() {
        random = Math.floor(Math.random() * trivia.length);
        select = trivia[random];

        $("#question").html("<h2>" + select.question + "</h2>");
        $("#answers").empty()
        for (var i = 0; i < select.choices.length; i++) {
            var userSelection = $("<button>");

            userSelection.addClass("answerselect");
            userSelection.addClass("btn btn-outline-dark");
            userSelection.html(select.choices[i]);
            userSelection.attr("guessvalue", i);

            $("#answers").append(userSelection);
        }

    }

    //select answer
    $(".answerselect").on("click", function () {

        playerGuess = parseInt($(this).attr("guessvalue"));

        if (playerGuess === select.answer) {
            timerStop();
            correct++;
            playerGuess = "";
            $("#answers").html("<h2>Well I'll be... That's Correct!</h2>");
            hideGif();
        } else {
            timerStop();
            wrong++;
            playerGuess = "";
            $("#answers").html("<h2>You Fool! The answer is " + select.choices[select.correct] + "</h2>");
            hideGif();
        }
    });

    //Hide selected Picture/Gif
    function hideGif() {
        $("#answer").append("<img src=" + trivia.image + "/>");
        emptyArray.push(select);
        trivia.splice(random, 1);

        hide = setTimeout(function () {
            $("#answer").empty();
            $("#gif").empty();
            timeLeft = 25;

            //Check if game over
            if ((correct + wrong + unanswered) === questionCount) {

                $("#question").empty();
                $("#question").html("<h2>Game Over! Here is how you did!</h2>");

                $("#answers").empty();
                $("#answers").html("<p>Correct - " + correct + "</p>");
                $("#answers").append("<p>Incorrect - " + wrong + "</p>");
                $("#answers").append("<p>Unanswered - " + unanswered + "</p");

                $("#reset").show();

                correct = 0;
                wrong = 0;
                unanswered = 0;
            } else {
                timerStart();
                showQuestion();
            }
        }, 4000);

    }

    //reset button
    $("#reset").on("click", function () {
        event.preventDefault();
        $("#reset").hide();
        $("#answers").empty();
        $("#question").empty();

        for (var i = 0; i < questionHolder.length; i++) {
            trivia.push(questionHolder[i]);
        }

        timerStart();
        showQuestion();
    });

});