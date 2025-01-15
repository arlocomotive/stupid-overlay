saveImageButton = document.querySelector(".save-image");
userIDInput = document.querySelector(".roblox-userid");

async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

let avatar_image = document.createElement("img");
avatar_image.setAttribute("crossorigin", "anonymous");
let base_image = document.createElement("img");
base_image.setAttribute("crossorigin", "anonymous");

avatar_image.onload = function() {
    console.log("loaded");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = base_image.naturalWidth;
    canvas.height = base_image.naturalHeight;

    context.drawImage(base_image, 0, 0);
    context.drawImage(avatar_image, 0, 155, 320, 160);
    context.drawImage(avatar_image, 0, 455, 320, 160);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
}
base_image.onload = function() {
    saveImageButton.addEventListener("click", () => {
        fetchAsync(("https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=" + userIDInput.value + "&size=420x420&format=Png")).then(function(response) {
            console.log(response.data[0].imageUrl);
            avatar_image.src = response.data[0].imageUrl;
        })
    });
}
base_image.src = "background.png";
