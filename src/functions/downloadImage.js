const downloadImage = async (imageUrl) => {
    if (imageUrl) {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const image = new Image();
            image.src = URL.createObjectURL(blob);

            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, image.width, image.height);

                canvas.toBlob((blob) => {
                    const downloadLink = document.createElement('a');
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = 'downloaded_image.jpg';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }, 'image/jpeg', 1);
            };
        } catch (error) {
            console.error('Error downloading the image:', error);
            alert('Error downloading the image');
        }
    } else {
        alert('Please enter a valid image URL.');
    }
};
export default downloadImage
