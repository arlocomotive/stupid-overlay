
async function fetchAsync (url) {
    return (await (await fetch(url)).json());
}

const baseImage = document.createElement("img");
baseImage.setAttribute("crossorigin", "anonymous");
baseImage.onload = function() {
    const saveButton = document.querySelector(".save-button");
    const previewButton = document.querySelector(".preview-button");
    const previewImage = document.querySelector(".preview-image");
    const userIDInput = document.querySelector(".roblox-userid");
    const avatarZoom = document.querySelector(".avatar-zoom")
    let zoom = avatarZoom.value;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = baseImage.naturalWidth;
    canvas.height = baseImage.naturalHeight;

    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("crossorigin", "anonymous");

    const render = () => {
        const input = userIDInput.value.replace(/\D/g, "")
        if (input) {
            fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + input + "&size=420x420&format=Png")).then(function(response) {
                console.log(input);
                const data = response.data;
                if (data && data[0]) {
                    avatarImage.src = data[0].imageUrl;
                }
            })
            context.drawImage(baseImage, 0, 0);
            context.drawImage(avatarImage, (420 * (zoom / 100)), (420 * (zoom / 100)), 420, 420, 0, 155, 320, 160);
            context.drawImage(avatarImage, (420 * (zoom / 100)), (420 * (zoom / 100)), 420, 420, 0, 455, 320, 160);
            const dataURL = canvas.toDataURL();
            previewImage.src = dataURL;
            return dataURL;
        }
    }
    render();
    avatarZoom.addEventListener("input", () => {
        zoom = avatarZoom.value;
    })
    saveButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = render();
        link.click();
    });
    previewButton.addEventListener("click", render);
}
baseImage.src = "background.png";
