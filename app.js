document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const imagesData = [
        { src: "1st.jpeg", caption: "My 2nd Birthday🎉", sticker: "sparkles", top: "2%", left: "5%", width: "280px" },
        { src: "2nd.jpeg", caption: "Small me at Khaltsi😘", sticker: "heart", top: "5%", right: "8%", width: "250px" },
        { src: "3rd.jpeg", caption: "Mama bathe me and putting my clothes on🥰", sticker: "cat", top: "18%", left: "15%", width: "290px" },
        { src: "4th.jpeg", caption: "Taking pics of small me🤭", sticker: "", top: "22%", right: "20%", width: "310px" },
        { src: "5th.jpeg", caption: "2k16 at Pangong lake😍", sticker: "dog", top: "35%", left: "8%", width: "270px" },
        { src: "6th.jpeg", caption: "Me,Mama,Papa at Changla🥶", sticker: "sparkles", top: "40%", right: "5%", width: "290px" },
        { src: "7th.jpeg", caption: "Mama was busy Skora Gompa so gang took a quick selfie🤪", sticker: "", top: "52%", left: "25%", width: "320px" },
        { src: "8th.jpeg", caption: "Me being ME😎", sticker: "cat", top: "58%", right: "15%", width: "260px" },
        { src: "9th.jpeg", caption: "Me and Idzes’s pic clicked by mama at Ghupuks Zing🤯", sticker: "heart", top: "68%", left: "5%", width: "300px" },
        { src: "10th.jpeg", caption: "Beautiful MAMA😻🫶", sticker: "sparkles", top: "72%", right: "25%", width: "280px" },
        { src: "11th.jpeg", caption: "MUM and ME in traditionals💪", sticker: "", top: "80%", left: "30%", width: "310px" },
        { src: "12th.jpeg", caption: "MAMA ROCKED🎸👨🎤 EVERYON SHOKED😨", sticker: "dog", top: "85%", right: "8%", width: "290px" },
        { src: "13th.jpeg", caption: "Winter MAMA☺️", sticker: "heart", top: "90%", left: "10%", width: "270px" },
        { src: "14th.jpeg", caption: "Family photo time😻🥰🥰", sticker: "sparkles", top: "92%", right: "35%", width: "330px" }
    ];

    const gallery = document.getElementById("gallery");

    const stickerEmojis = {
        "heart": "❤️",
        "sparkles": "✨",
        "cat": "🐱",
        "dog": "🐶"
    };

    imagesData.forEach((data, index) => {
        // --- Create Collage Card ---
        const card = document.createElement("div");
        card.classList.add("photo-card");
        
        // Setup Scrapbook Properties
        const rotation = (Math.random() * 20 - 10).toFixed(2); // More rotation for scrapbook
        card.style.setProperty("--rotation", rotation);
        card.style.setProperty("--width", data.width);
        card.style.zIndex = index + 10;
        
        if (data.top) card.style.top = data.top;
        if (data.left) card.style.left = data.left;
        if (data.right) card.style.right = data.right;

        // Image
        const img = document.createElement("img");
        img.src = data.src;
        img.alt = "Mom";
        img.loading = "lazy";

        // Caption
        const caption = document.createElement("div");
        caption.classList.add("caption");
        caption.textContent = data.caption;

        card.appendChild(img);
        card.appendChild(caption);

        // Add sticker if present
        if (data.sticker && stickerEmojis[data.sticker]) {
            const stickerObj = document.createElement("div");
            stickerObj.classList.add("sticker", data.sticker);
            stickerObj.textContent = stickerEmojis[data.sticker];
            card.appendChild(stickerObj);
        }

        gallery.appendChild(card);
    });

    // --- Overlay Gallery Logic ---
    const scrapbookContainer = document.getElementById("scrapbookContainer");
    const fullGalleryOverlay = document.getElementById("fullGalleryOverlay");
    const closeGalleryBtn = document.getElementById("closeGallery");
    const galleryScrollContainer = document.getElementById("galleryScrollContainer");

    // Populate Overlay Gallery
    imagesData.forEach((data) => {
        const fullCard = document.createElement("div");
        fullCard.classList.add("full-photo-card");

        const fullImg = document.createElement("img");
        fullImg.src = data.src;
        fullImg.loading = "lazy";

        const fullCaption = document.createElement("div");
        fullCaption.classList.add("caption");
        fullCaption.textContent = data.caption;

        fullCard.appendChild(fullImg);
        fullCard.appendChild(fullCaption);

        if (data.sticker && stickerEmojis[data.sticker]) {
            const stickerObj = document.createElement("div");
            stickerObj.classList.add("sticker", data.sticker);
            stickerObj.textContent = stickerEmojis[data.sticker];
            fullCard.appendChild(stickerObj);
        }

        galleryScrollContainer.appendChild(fullCard);
    });

    // Open Overlay
    scrapbookContainer.addEventListener("click", () => {
        fullGalleryOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent body scroll

        // Refresh ScrollTrigger to calculate new positions inside the overlay
        ScrollTrigger.refresh();
    });

    // Close Overlay
    closeGalleryBtn.addEventListener("click", () => {
        fullGalleryOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    });

    // GSAP Animations
    // Animate scrapbook cards on scroll
    gsap.utils.toArray('.photo-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)"
        });
    });

    // Animate overlay full photo cards on scroll
    gsap.utils.toArray('.full-photo-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                scroller: "#fullGalleryOverlay", // Specify the overflow container
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Animate intro text
    gsap.from(".intro-message", {
        scrollTrigger: {
            trigger: ".intro-message",
            start: "top 80%"
        },
        y: 30,
        opacity: 0,
        duration: 1
    });

    // Animate quote box
    gsap.from(".quote-box", {
        scrollTrigger: {
            trigger: ".quote-section",
            start: "top 75%"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });

    // --- Background Music Logic ---
    const bgMusic = document.getElementById("bgMusic");
    
    // Attempt to play on load (may be blocked by browser)
    bgMusic.volume = 0.5; // Set volume to a nice level
    
    // Play on first interaction to bypass mobile autoplay restrictions
    const playMusic = () => {
        if (bgMusic.paused) {
            bgMusic.play().catch((err) => console.log("Audio autoplay blocked until interaction"));
        }
    };

    document.body.addEventListener('click', playMusic, { once: true });
    document.body.addEventListener('touchstart', playMusic, { once: true });
});
