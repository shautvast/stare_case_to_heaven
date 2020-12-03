(function () {
    const num_clouds = 200,
        max_cloud_size = 500,
        max_speed_x = 50,
        max_speed_y = 30,
        num_clusters = 5;
    let cluster_x, cluster_y, cluster_size, cloud_counter;


    const sky = document.getElementById("sky");
    sky.width = window.innerWidth;
    sky.height = window.innerHeight;
    sky.onclick = () => {
        sky.requestFullscreen().then();
    };

    let width = window.innerWidth,
        height = window.innerHeight;
    let oldWidth = width, oldHeight = height;

    window.onresize = () => {
        oldWidth = width;
        oldHeight = height;
        width = window.innerWidth;
        height = window.innerHeight;
    };

    let create_clouds = function () {
        for (let i = 0; i < num_clouds; i++) {
            let newCloud = document.createElement("div");
            newCloud.setAttribute("id", "cloud-" + i);
            newCloud.setAttribute("class", "cloud");
            const size = 200 + Math.random() * max_cloud_size;
            newCloud.style.width = size + "px";
            newCloud.style.height = size + "px";
            newCloud.style.background = "radial-gradient(circle " + size / 2 + "px, rgba(255, 255, 255, " + Math.random() / 5 + "), rgba(20, 56, 200, 0.0)) no-repeat";
            newCloud.setAttribute("size", "" + size);
            sky.appendChild(newCloud);
        }
    }

    let arrange_clouds = function () {
        for (let i = 0; i < num_clouds; i++) {
            if (i % (Math.floor(num_clouds / num_clusters)) === 0) {
                cluster_x = Math.random() * width;
                cluster_y = Math.random() * height;
                cluster_size = 400;
            }

            let cloud = get_cloud(i);
            cloud.style.top = cluster_x - cluster_size / 2 + Math.random() * cluster_size + "px";
            cloud.style.left = cluster_y - cluster_size / 2 + Math.random() * cluster_size + "px";
        }
        cluster_size = Math.random() * max_cloud_size;
        cluster_x = width + cluster_size + Math.random() * width;
        cluster_y = height + cluster_size + Math.random() * height;
    }

    let step = function () {
        let cloud = get_cloud(Math.floor(Math.random() * num_clouds));
        let x = parseInt(cloud.style.left), y = parseInt(cloud.style.top);

        x -= Math.random() * max_speed_x;
        y -= Math.random() * max_speed_y;
        if (x < -max_cloud_size && y < -max_cloud_size) {
            cloud_counter += 1;
            if (cloud_counter > (num_clouds / num_clusters)) {
                cluster_size = Math.random() * max_cloud_size;
                cluster_x = width + cluster_size + Math.random() * width;
                cluster_y = height + cluster_size + Math.random() * height;
                cloud_counter = 0;
            }

            cloud.style.transition = "none";

            cloud.style.top = (cluster_x + Math.random() * cluster_size) + "px";
            cloud.style.left = (cluster_y + Math.random() * cluster_size) + "px";

            let size = parseInt(cloud.getAttribute("size")) + Math.random();
            cloud.style.width = size + "px";
            cloud.style.height = size + "px";
            cloud.setAttribute("size", "" + size);
            cloud.style.background = "radial-gradient(circle " + size / 2 + "px, rgba(255, 255, 255, " + Math.random() / 5 + "), rgba(20, 56, 200, 0.0)) no-repeat";
        } else {
            cloud.style.transition = "left 5s, top 5s";
            cloud.style.left = x + "px";
            cloud.style.top = y + "px";
        }
        requestAnimationFrame(step);
    };

    let get_cloud = function (index) {
        return document.getElementById("cloud-" + index);
    }

    create_clouds();
    arrange_clouds();
    requestAnimationFrame(step);
})()