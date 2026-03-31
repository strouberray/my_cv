document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile_pic');
    const imagePreview = document.getElementById('img-preview');
    const cvForm = document.getElementById('cvForm');

    // 1. Image Preview Logic
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Form Submission Logic
    cvForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the page from refreshing

        const cvData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            summary: document.getElementById('summary').value,
            education: document.getElementById('education').value,
            skills: document.getElementById('skills').value,
            profile_pic: imagePreview.src !== '#' ? imagePreview.src : null
        };

        // Save data to browser memory
        localStorage.setItem('userCV', JSON.stringify(cvData));

        // Go to the display page
        window.location.href = 'cv.html';
    });
});
