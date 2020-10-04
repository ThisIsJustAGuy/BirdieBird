document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const grid = document.querySelector("#grid");
  const alert = document.querySelector("#alert");
  const score = document.querySelector("#score");
  const background = document.querySelector("#background");
  const container = document.querySelector("#container");
  const ground = document.querySelector("#ground");
  const containerGround = document.querySelector("#containerGround");

  let startTime = 0;
  let endTime = 0
  let timeDiff = 0;
  let position = 300;
  let points = 0;
  let isGameOver = false;
  let isJumping = false;

  function control(event) {
    if (event.keyCode === 32) {
      endTime = new Date();
      timeDiff = endTime - startTime;
      if (timeDiff > 80) {
        isJumping = true;
        jump();
      }
      startTime = new Date();
    }
  }

  function jump() {
    let count = 0;
    let jumpID = setInterval(() => {
      if (count == 30) {
        clearInterval(jumpID);
        isJumping = false;
      }
      position += 2.5;
      bird.style.bottom = position + "px";
      count++;
    }, 10);
  }

  function generatePipe() {
    let pipePosition = 1300;
    let height = Math.random() * (document.documentElement.clientHeight - 200);
    let height2 = document.documentElement.clientHeight - height - 200;
    const pipe = document.createElement("div");
    const pipe2 = document.createElement("div");
    grid.appendChild(pipe);
    grid.appendChild(pipe2);
    if (!isGameOver) {
      pipe.classList.add("pipe");
      pipe2.classList.add("pipe2");
      pipe.style.height = height + "px";
      pipe2.style.height = height2 + "px";
    }

    let timerId = setInterval(() => {
      if (isGameOver) {
        clearInterval(timerId);
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
        gameOver();
      }
      pipePosition -= 10;
      pipe.style.left = pipePosition + "px";
      pipe2.style.left = pipePosition + "px";
      pipe2.style.top = 0 + "px";
      if (pipePosition === -60) {
        grid.removeChild(pipe);
        grid.removeChild(pipe2);
        score.innerHTML = ++points;
      }
      if (
        pipePosition >= -60 &&
        pipePosition <= 60 &&
        (parseFloat(bird.style.bottom) <= height ||
          parseFloat(bird.style.bottom) >= height + 110)
      ) {
        isGameOver = true;
      }
    }, 30);
    if (!isGameOver) {
      setTimeout(generatePipe, 1500);
    }
  }

  function fall() {
    setInterval(() => {
      if (!isJumping) {
        position -= 2.5;
        bird.style.bottom = position + "px";
        if (
          parseInt(bird.style.bottom) <= 0 ||
          parseInt(bird.style.bottom) + 45 >=
            document.documentElement.clientHeight
        ) {
          isGameOver = true;
        }
      }
    }, 10);
  }

  function gameOver() {
    alert.innerHTML = `Game Over <br> Final Score: ${points}`;
    score.innerHTML = "";
    background.style.display = "none";
    ground.style.display = "none";
    container.style.display = "block";
    containerGround.style.display = "block";
  }

  generatePipe();
  fall();
  document.addEventListener("keydown", control);
});
