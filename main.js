previewImg = document.querySelector(".preview-img img");
saveImgBtn = document.querySelector(".save-img");

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    let img = document.createElement("img");
    img.setAttribute("crossorigin", "anonymous")
    img.onload = function() {
        context.drawImage(previewImg, 0, 0);
        context.drawImage(img, 0, 0, canvas.width, canvas.height * .5);
        const link = document.createElement("a");
        link.download = "image.png";
        link.href = canvas.toDataURL();
        link.click();
    }
    img.src = "thy start.png";
}

saveImgBtn.addEventListener("click", saveImage);
