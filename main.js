saveImageButton = document.querySelector(".save-image");
previewCanvas = document.querySelector(".preview-canvas");
userIDInput = document.querySelector(".roblox-userid");
previewContext = previewCanvas.getContext("2d");

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

let base_image = document.createElement("img");
base_image.setAttribute("crossorigin", "anonymous");
base_image.onload = function() {
    previewCanvas.width = base_image.naturalWidth;
    previewCanvas.height = base_image.naturalHeight;

    let avatar_image = document.createElement("img");
    avatar_image.setAttribute("crossorigin", "anonymous");
    avatar_image.onload = function() {
        console.log("loaded");
        previewContext.drawImage(base_image, 0, 0);
        previewContext.drawImage(avatar_image, 0, 155, 320, 160);
        previewContext.drawImage(avatar_image, 0, 455, 320, 160);
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = previewCanvas.toDataURL();
        link.click();
    }
    saveImageButton.addEventListener("click", () => {
        fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + userIDInput.value + "&size=420x420&format=Png")).then(function(response) {
            console.log(response.data[0].imageUrl);
            avatar_image.src = response.data[0].imageUrl;
        })
    });
}
base_image.src = "background.png";
