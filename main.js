saveImageButton = document.querySelector(".save-image");
userIDInput = document.querySelector(".roblox-userid");

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function createImage() {
    let new_image = document.createElement("img");
    new_image.setAttribute("crossorigin", "anonymous");
    return new_image;
}

let avatar_image = createImage();
let base_image = createImage();

const saveImage = () => {
    let data = fetchAsync(("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + userIDInput.value + "&size=420x420&format=Png"))
    console.log(data)
    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");
    // canvas.width = base_image.naturalWidth;
    // canvas.height = base_image.naturalHeight;

    // context.drawImage(base_image, 0, 0);
    // context.drawImage(avatar_image, 0, 155, 320, 160);
    // context.drawImage(avatar_image, 0, 455, 320, 160);
    // const link = document.createElement("a");
    // link.download = "image.png";
    // link.href = canvas.toDataURL();
    // link.click();
}

base_image.onload = function() {
    saveImageButton.addEventListener("click", saveImage)
}
base_image.src = "thy start.png";
