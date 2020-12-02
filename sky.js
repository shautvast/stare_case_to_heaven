(function () {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.onclick = () => {
        canvas.requestFullscreen().then();
    };

    window.onresize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    let start_timestamp = 0, angle = 0,
        step = function (timestamp) {
            angle = ((timestamp - start_timestamp) / 100) % 360;

            canvas.style.background = 'linear-gradient(' + angle + 'deg, white , rgb(20,56,200))';

            requestAnimationFrame(step);
        };

    requestAnimationFrame(step);
})()