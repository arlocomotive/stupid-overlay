
const baseImage = document.createElement("img");
baseImage.setAttribute("crossorigin", "anonymous");
baseImage.onload = function() {
    const saveButton = document.querySelector(".save-button");
    const previewButton = document.querySelector(".preview-button");
    const previewImage = document.querySelector(".preview-image");
    const userIDInput = document.querySelector(".roblox-userid");
    const avatarZoom = document.querySelector(".avatar-zoom")
    const zoomFactor = .02;
    const size = 420
    let zoom = avatarZoom.value;
    let save = false;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = baseImage.naturalWidth;
    canvas.height = baseImage.naturalHeight;

    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("crossorigin", "anonymous");

    async function fetchAsync (url) {
        return (await (await fetch(url)).json());
    }

    const render = () => {
        const input = userIDInput.value.replace(/\D/g, "")
        if (input) {
            fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + input + "&size=420x420&format=Png")).then(function(response) {
                const data = response.data;
                if (data && data[0]) {
                    save = false;
                    avatarImage.src = data[0].imageUrl;
                }
            })
        }
    }
    render();
    avatarImage.onload = () => {
        context.drawImage(baseImage, 0, 0);
        const zoom_size = (size * (1 - zoom));
        const offset = ((size - zoom_size) * .5);
        context.drawImage(avatarImage, offset, offset, zoom_size, zoom_size, 0, 155, 320, 160);
        context.drawImage(avatarImage, offset, offset, zoom_size, zoom_size, 0, 455, 320, 160);
        const dataURL = canvas.toDataURL()
        previewImage.src = dataURL;
        if (save) {
            save = false;
            const link = document.createElement("a");
            link.download = "image.png";
            link.href = dataURL;
            link.click();
        }
    }
    avatarZoom.addEventListener("input", () => {
        zoom = (avatarZoom.value * zoomFactor);
    })
    saveButton.addEventListener("click", () => {
        save = true;
        render();
    });
    previewButton.addEventListener("click", render);
}
baseImage.src = "background.png";
