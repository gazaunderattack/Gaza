    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
        import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyA_8I3TTKFl-5KYnhk4K_OrzqzzymzmhqU",
            authDomain: "test-test-313.firebaseapp.com",
            projectId: "test-test-313",
            storageBucket: "test-test-313.appspot.com",
            messagingSenderId: "926344113742",
            appId: "1:926344113742:web:1ace941af9bd92eebedd1f",
            measurementId: "G-NCC8S9Z7NX"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        async function loadTexts() {
            const textContainer = document.getElementById("textContainer");
            textContainer.innerHTML = '<p>جار التحميل...</p>';
            
            const querySnapshot = await getDocs(collection(db, "texts"));
            let textHTML = '';
            
            querySnapshot.forEach((doc) => {
                const textData = doc.data();
                textHTML += `<p class="txt">${textData.text}</p><br>`;
            });

            textContainer.innerHTML = textHTML + textHTML || '<p>لم يتم العثور على نصوص</p>';
        }

        async function loadSpecialties() {
            const photoContainer = document.getElementById("photoContainer");
            photoContainer.innerHTML = '<p>جار التحميل...</p>';
            
            const querySnapshot = await getDocs(collection(db, "image"));
            let photoHTML = '';
            
            querySnapshot.forEach((doc) => {
                const photo = doc.data();
                photoHTML += `
                    <div 
                        data-id="${doc.id}"
                        data-name="${photo.title}"
                        data-image="${photo.source}">
                        <img src="${photo.source}" alt="${photo.title}">
                        <p>${photo.title}</p>
                    </div>
                `;
            });

            photoContainer.innerHTML = photoHTML || '<p>لم يتم العثور على صور</p>';
        }


        async function loadvideos() {
            const videoContainer = document.getElementById("videoContainer");
            videoContainer.innerHTML = '<p>جار التحميل...</p>';
            
            const querySnapshot = await getDocs(collection(db, "video"));
            let videoHTML = '';
            
            querySnapshot.forEach((doc) => {
                const video = doc.data();
                videoHTML += `
                    <div 
                        data-id="${doc.id}"
                        data-name="${video.title}"
                        data-image="${video.source}">
                <video controls>
                    <source src="${video.source}" type="video/mp4">
                </video>
                        <p>${video .title}</p>
                    </div>
                `;
            });

            videoContainer.innerHTML = videoHTML || '<p>لم يتم العثور على صور</p>';
        }


        

        document.getElementById('show-images').addEventListener('click', function() {
            document.getElementById('images').style.display = 'block';
            document.getElementById('videos').style.display = 'none';
        });

        document.getElementById('show-videos').addEventListener('click', function() {
            document.getElementById('images').style.display = 'none';
            document.getElementById('videos').style.display = 'block';
        });

        window.onload = function() {
            loadTexts();
            loadSpecialties();
            loadvideos();
        };
document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch('https://formspree.io/f/xdkepole', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('تم إرسال الرسالة بنجاح!');
                    this.reset();
                } else {
                    alert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقًا.');
            });
        });
