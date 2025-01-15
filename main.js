saveImageButton = document.querySelector(".save-image");
previewImage = document.querySelector(".preview-image");
userIDInput = document.querySelector(".roblox-userid");

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

let base_image = document.createElement("img");
base_image.setAttribute("crossorigin", "anonymous");
base_image.onload = function() {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = base_image.naturalWidth;
    canvas.height = base_image.naturalHeight;
    previewImage.width = base_image.naturalWidth;
    previewImage.height = base_image.naturalHeight;

    const avatar_image = document.createElement("img");
    avatar_image.setAttribute("crossorigin", "anonymous");

    const render = () => {
        fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + userIDInput.value + "&size=420x420&format=Png")).then(function(response) {
            avatar_image.src = response.data[0].imageUrl;
        })
        context.drawImage(base_image, 0, 0);
        context.drawImage(avatar_image, 0, 155, 320, 160);
        context.drawImage(avatar_image, 0, 455, 320, 160);
        const dataURL = canvas.toDataURL();
        previewImage.src = dataURL;
        return dataURL;
    }
    saveImageButton.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = render();
        link.click();
    });
    userIDInput.addEventListener("input", render);
}
base_image.src = "background.png";
