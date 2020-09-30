document.addEventListener("DOMContentLoaded", () => {
  const bird = document.querySelector(".bird");
  const grid = document.querySelector("#grid");
  const alert = document.querySelector("#alert");
  const score = document.querySelector("#score");
  // console.log(bird.style);

  let position = bird.style.bottom;
  let gravity = 0.9;
  let points = 0;

  let isGameOver = false;

  function control(event) {
    // console.log(event);
    if (event.keyCode === 38) {
        jump();
    }
  }

  function jump() {
    console.log("jump");
    let count = 0;
    // let jumpId = setInterval(() => {
    //     if (count == 15) {
    //         clearInterval(jumpId);
    //         let downTimerId = setInterval(() => {
    //             position -= 5;
    //             count--;
    //             position = position * gravity;
    //             bird.style.bottom = position + 'px';
    //         }, 20);
    //     }
    //     count++;
    //     position += 10;
    //     position = position * gravity;
    //     bird.style.bottom = position + 'px';
    //     // console.log(position);
    // }, 20);
    let jumpID = setInterval(() => {
      if (count == 15) {
        clearInterval(jumpID);
      }
      position += 10;
      position *= gravity;
      bird.style.bottom = position + "px";
      count++;
    }, 20)
  }

  function generatePipe() {
    let pipePosition = 1200;
    let height = Math.random() * 400;
    const pipe = document.createElement("div");
    const pipe2 = document.createElement("div");
    if (!isGameOver) {
      pipe.classList.add("pipe");
      pipe2.classList.add("pipe");
      grid.appendChild(pipe);
      grid.appendChild(pipe2);
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
        console.log("removing");
        grid.removeChild(pipe);
        grid.removeChild(pipe2);
        console.log("removed");
        score.innerHTML = ++points;
      }
    }, 30);
    if (!isGameOver) {
      setTimeout(generatePipe, 1500);
      setInterval(lowerBird, 1000);
    }
  }
  function lowerBird() {
    bird.style.marginBottom = bird.style.marginBottom - 1 + "px";
    if (bird.style.marginBottom <= 0) {
      isGameOver = true;
    }
  }
  generatePipe();
  document.addEventListener("keydown", control);
});
