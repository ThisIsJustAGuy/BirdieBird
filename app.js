document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const grid = document.querySelector("#grid");
  const alert = document.querySelector("#alert");
  const scroe = document.querySelector("#score");
  const background = document.querySelector("#background");
  // console.log(bird.style);

  let position = 300;
  let points = 0;

  let isGameOver = false;
  let isJumping = false;

  function control(event) {
    // console.log(event);
    if (event.keyCode === 38) {
      isJumping = true;
      jump();
    }
  }

  function jump() {
    let count = 0;
    let jumpID = setInterval(() => {
      if (count == 15) {
        clearInterval(jumpID);
        isJumping = false;
      }
      position += 5;
      bird.style.bottom = position + "px";
      count++;
    }, 20);
  }

  function generatePipe() {
    let pipePosition = 1200;
    let height = Math.random() * 400;
    let height2 = document.documentElement.clientHeight - height - 200;
    const pipe = document.createElement("div");
    const pipe2 = document.createElement("div");
    grid.appendChild(pipe);
    grid.appendChild(pipe2);
    if (!isGameOver) {
      pipe.classList.add("pipe");
      pipe2.classList.add("pipe");
      pipe.style.height = height + "px";
      pipe2.style.height = height2 + "px";
    }

    let timerId = setInterval(() => {
      if (isGameOver) {
        clearInterval(timerId);
        alert.innerHTML = `Game Over. \n Final Score: ${points}`;
        scroe.innerHTML = "";
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
        background.style.display = "none";
      }
      pipePosition -= 10;
      pipe.style.left = pipePosition + "px";
      pipe2.style.left = pipePosition + "px";
      pipe2.style.top = 0 + "px";
      if (pipePosition === 0) {
        grid.removeChild(pipe);
        grid.removeChild(pipe2);
        score.innerHTML = ++points;
      }
      if (
        pipePosition >= 0 &&
        pipePosition <= 60 &&
        (parseFloat(bird.style.bottom) <= height ||
          parseFloat(bird.style.bottom) >= height + 140)
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
        position -= 5;
        bird.style.bottom = position + "px";
        if (
          parseInt(bird.style.bottom) <= 0 ||
          parseInt(bird.style.bottom) + 60 >=
            document.documentElement.clientHeight
        ) {
          isGameOver = true;
        }
      }
    }, 20);
  }
  generatePipe();
  fall();
  document.addEventListener("keydown", control);
});
