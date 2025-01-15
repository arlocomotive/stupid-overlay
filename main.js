previewImg = document.querySelector(".preview-img img");
saveImgBtn = document.querySelector(".save-img");

console.log("nananana")
let base_image = document.createElement("img");
base_image.setAttribute("crossorigin", "anonymous")

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = base_image.naturalWidth;
    canvas.height = base_image.naturalHeight;

    context.drawImage(base_image, 0, 0);
    context.drawImage(previewImg, 0, 155, 320, 160);
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
}

base_image.onload = function() {
    saveImgBtn.addEventListener("click", saveImage);
}
base_image.src = "thy start.png";
