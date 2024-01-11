import { encode } from "blurhash";

export default async function createBlurhash(imageFile) {
    const image = new Image();
    const canvas = new OffscreenCanvas(1, 1);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0);

    return new Promise((resolve, reject) => {
        const image = new Image();

        // Image has loaded
        image.onload = () => {
            const pixels = ctx.getImageData(
                0,
                0,
                image.width,
                image.height,
            ).data;
            const blurhash = encode(pixels, image.width, image.height, 4, 3);
            resolve(blurhash);
        };

        image.onerror = (error) => {
            // Error loading the image
            reject(error);
        };

        image.src = URL.createObjectURL(
            new Blob([imageFile], { type: imageFile.type }),
        );
    });

    image.onload = () => {};
}
