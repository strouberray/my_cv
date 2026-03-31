document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile_pic');
    const imagePreview = document.getElementById('img-preview');
    const cvForm = document.getElementById('cvForm');

    // 1. Image Preview Logic
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });

    // 2. The GitHub "Fix"
    cvForm.addEventListener('submit', function(e) {
        // This prevents the page from trying to find generate.php
        e.preventDefault();

        // Fill the CV section with form data
        document.getElementById('view-name').textContent = document.getElementById('fullname').value;
        document.getElementById('view-email').textContent = document.getElementById('email').value;
        document.getElementById('view-phone').textContent = document.getElementById('phone').value;
        document.getElementById('view-address').textContent = document.getElementById('address').value;
        document.getElementById('view-summary').textContent = document.getElementById('summary').value;
        document.getElementById('view-education').textContent = document.getElementById('education').value;

        // Handle Image
        const viewPhoto = document.getElementById('view-photo');
        if (imagePreview.src !== window.location.href && imagePreview.src !== '#') {
            viewPhoto.src = imagePreview.src;
        } else {
            viewPhoto.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(document.getElementById('fullname').value)}&background=7fb069&color=fff`;
        }

        // Handle Skills
        const skillsContainer = document.getElementById('view-skills');
        skillsContainer.innerHTML = ''; // Clear old ones
        const skillsArray = document.getElementById('skills').value.split(',');
        skillsArray.forEach(skill => {
            if(skill.trim() !== "") {
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = skill.trim();
                skillsContainer.appendChild(span);
            }
        });

        // HIDE the form and SHOW the CV
        document.getElementById('main-form-container').style.display = 'none';
        document.getElementById('cv-display-container').style.display = 'block';
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});
