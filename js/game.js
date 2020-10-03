const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME - DONE: надо бы убрать "target" прежде чем искать новый
  let divSelector = randomDivId();
  console.log(divSelector);
  $(".target").removeClass("target");

  $(divSelector).addClass("target");
  // TODO - DONE: помечать target текущим номером
  $(divSelector).text(hits+1);  

  // FIXME - DONE: тут надо определять при первом клике firstHitTime
  // Проверка на firstHitTime здесь вроде не нужна, оставил на всякий случай :)
  if (firstHitTime === 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function countScore() {
  return 10 * 10 - 20 * $(".miss").length;
}

function endGame() {
  // FIXME - DONE: спрятать игровое поле сначала
  $(".game-field").hide();
  $("#button-start").hide();
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score").text(countScore);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME - DONE: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(event.target).text('');
    round();
  } else {
    $(event.target).addClass("miss");
  }
  // TODO - DONE: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  
  $("#button-start").click(() => {
    $(".miss").removeClass("miss");
    round();
    firstHitTime = getTimestamp();
    console.log(firstHitTime);
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
