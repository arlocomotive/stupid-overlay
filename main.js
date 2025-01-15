const saveImageButton = document.querySelector(".save-image");
const previewImage = document.querySelector(".preview-image");
const userIDInput = document.querySelector(".roblox-userid");
let lastInput = ""

async function fetchAsync (url) {
    return (await (await fetch(url)).json());
}

const baseImage = document.createElement("img");
baseImage.setAttribute("crossorigin", "anonymous");
baseImage.onload = function() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = baseImage.naturalWidth;
    canvas.height = baseImage.naturalHeight;

    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("crossorigin", "anonymous");

    const render = () => {
        const input = userIDInput.value.replace(/\D/g, "")
        if (input != lastInput) {
            lastInput = input;
            if (input) {
                fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + input + "&size=420x420&format=Png")).then(function(response) {
                    const data = response.data;
                    if (data && data[0]) {
                        avatarImage.src = data[0].imageUrl;
                    }
                })
                context.drawImage(baseImage, 0, 0);
                context.drawImage(avatarImage, 0, 155, 320, 160);
                context.drawImage(avatarImage, 0, 455, 320, 160);
                const dataURL = canvas.toDataURL();
                previewImage.src = dataURL;
                return dataURL;
            }
        }
    }
    saveImageButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = render();
        link.click();
    });
    setInterval(render, 100)
}
baseImage.src = "background.png";
