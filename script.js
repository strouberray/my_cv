document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile_pic');
    const imagePreview = document.getElementById('img-preview');
    const cvForm = document.getElementById('cvForm');

    // 1. Photo Preview
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. THE FIX: Handle everything without PHP
    cvForm.addEventListener('submit', (e) => {
        e.preventDefault(); // STOPS the 405 error by not leaving the page

        // Transfer data to the CV display
        document.getElementById('out-fn').textContent = document.getElementById('fn').value;
        document.getElementById('out-em').textContent = document.getElementById('em').value;
        document.getElementById('out-ph').textContent = document.getElementById('ph').value;
        document.getElementById('out-ad').textContent = document.getElementById('ad').value;
        document.getElementById('out-sm').textContent = document.getElementById('sm').value;
        document.getElementById('out-ed').textContent = document.getElementById('ed').value;

        // Handle Image
        const outImg = document.getElementById('out-img');
        if (imagePreview.src && imagePreview.src !== window.location.href + '#') {
            outImg.src = imagePreview.src;
        } else {
            outImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(document.getElementById('fn').value)}&background=7fb069&color=fff`;
        }

        // Handle Skills
        const skCont = document.getElementById('out-sk');
        skCont.innerHTML = '';
        document.getElementById('sk').value.split(',').forEach(s => {
            if(s.trim()){
                const span = document.createElement('span');
                span.className = 'skill-tag';
                span.textContent = s.trim();
                skCont.appendChild(span);
            }
        });

        // Toggle UI
        document.getElementById('form-ui').style.display = 'none';
        document.getElementById('cv-ui').style.display = 'block';
        window.scrollTo(0, 0);
    });
});
