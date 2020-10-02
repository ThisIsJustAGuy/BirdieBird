document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const grid = document.querySelector("#grid");
  const alert = document.querySelector("#alert");
  const score = document.querySelector("#score");
  // console.log(bird.style);

  let position = 200;
  let points = 0;
  let height = window.innerHeight + "px";

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
    const pipe = document.createElement("div");
    const pipe2 = document.createElement("div");
    grid.appendChild(pipe);
    grid.appendChild(pipe2);
    if (!isGameOver) {
      pipe.classList.add("pipe");
      pipe2.classList.add("pipe");
      pipe.style.height = height + "px";
      pipe2.style.height = window.innerHeight - height - 200 + "px";
    }

    let timerId = setInterval(() => {
      if (isGameOver) {
        clearInterval(timerId);
        alert.innerHTML = "Game Over";
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild);
        }
      }
      pipePosition -= 10;
      pipe.style.left = pipePosition + "px";
      pipe2.style.left = pipePosition + "px";
      pipe2.style.top = 0 + "px";
      if (pipePosition < 0) {
        grid.removeChild(pipe);
        grid.removeChild(pipe2);
        score.innerHTML = ++points;
      }
    }, 30);
    if (!isGameOver) {
      setTimeout(generatePipe, 1500);
    }
  }
  function fall() {
      let fallID = setInterval(() => {
        if (!isJumping) {
        position -= 5;
        bird.style.bottom = position + "px";
        if (
          bird.style.bottom === "0px" ||
          bird.style.bottom === height
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
