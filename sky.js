(function () {
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.onclick = () => {
        canvas.requestFullscreen().then();
    };

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    let i = 0, di = 1,
        step = function () {
            if ((i < 1000 && di > 0) || (i > 0 && di < 0)) {
                i += di;
                canvas.style.background = 'linear-gradient(' + i + 'deg, white , rgb(20,56,200))';
            } else {
                di = -di;
            }
            setTimeout(step, 150);
        };

    step();
})()