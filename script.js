document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile_pic');
    const imagePreview = document.getElementById('img-preview');

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
                imagePreview.style.opacity = '0';
                setTimeout(() => {
                    imagePreview.style.transition = 'opacity 0.8s ease';
                    imagePreview.style.opacity = '1';
                }, 50);
            }
            reader.readAsDataURL(file);
        }
    });
});
