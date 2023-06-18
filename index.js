(function () {
  'use strict';

  let gamePattern = [];
  let userClickedPattern = [];
  let level = 1;
  let control = true;
  const buttonColors = ['red', 'green', 'blue', 'yellow'];

  function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColors[randomNumber];

    $('h1').html(`Level ${level}`);
    level++;
    gamePattern.push(randomChosenColour);

      playAudio(randomChosenColour);
      $(`#${randomChosenColour}`).fadeOut(200).fadeIn(200);
  }

  function playAudio(sound) {
    const playSound = new Audio(`sounds/${sound}.mp3`);
    playSound.play();
  }

  function animatePress(pressedBtn) {
    $(`#${pressedBtn}`).addClass('pressed');

    setTimeout(() => {
      $(`#${pressedBtn}`).removeClass('pressed');
    }, 100);
  }

  function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
      }
    } else {
      playAudio('wrong');

      $('h1').html('Game Over, Press Any Key to Restart');

      $('body').addClass('game-over');

      setTimeout(() => {
        $('body').removeClass('game-over');
      }, 300);

      control = true;
      level = 1;
      gamePattern = [];
      userClickedPattern = [];
    }
  }

  $('.btn').on('click', function () {
    const userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playAudio(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

  $(document).on('keydown', function () {
    if (control) {
      nextSequence();

      control = false;
    }
  });
})();
