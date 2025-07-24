const aiGalleryData = [
    {
        id: 1,
        src: "./ai-images/ChatGPT_coffee_05.png",
        "alt": "A breathtakingly detailed, weathered marble sculpture of the Greek god Kronos with wings and a scythe, standing amid a cityscape. From his open head emerges a joyful, cartoonish brain holding a steaming cup of cappuccino. The scene is bathed in soft, cinematic light, evoking an epic, mysterious, yet hopeful and peaceful mood.",
        "prompt": "Hyper-realistic close-up of a massive weathered marble statue of Kronos, the Titan god of time, featuring intricate wings and a scythe. Emerging from his open head is a detailed, smiling brain holding a steaming cappuccino cup. The background shows blurred classical city buildings under soft, moody lighting. The atmosphere is epic, mysterious, melancholic, but also hopeful and peaceful. Style: cinematic, high-resolution, realistic textures, soft warm tones, vertical Instagram story format.",
        "negativePrompt": "low-resolution, distorted anatomy, cluttered background, overexposed highlights, AI artifacts, cartoonish proportions on statue, unrealistic lighting",
        "seed": "auto",
        "model": "ChatGPT + SDXL 1.0",
        "sampler": "DPM++ 2M Karras"
    }, {
        id: 2,
        src: "./ai-images/Flux_Dev_When the Body Speaks.jpg",
        "alt": "An ethereal young woman kneeling in a candlelit corridor, surrounded by rose petals, holding a glowing birdcage with a red rose inside. A raven perches nearby. The soft lighting and arched architecture evoke a melancholic Romantic Gothic mood.",
        "prompt": "Romantic Gothic scene in a dim, candlelit stone corridor with tall arches and stained glass glowing faintly in the distance. A long-haired woman in a flowing pale pink and cream gown kneels on the stone floor, surrounded by scattered red rose petals. She cradles a golden birdcage emitting a soft light, with a red rose held gently between her fingers. A raven sits on a stone pedestal to her left. Deep focus, warm candle glow mixed with cool ambient shadows. Style: Leonardo AI, realistic, emotionally rich, high-res.",
        "negativePrompt": "low-res, distorted anatomy, cluttered background, overexposed highlights, AI artifacts",
        "seed": "auto",
        "model": "Leonardo AI + SDXL 1.0",
        "sampler": "DPM++ 2M Karras"
    },
    {
        id: 3,
        src: "./ai-images/ChatGPT_coffee_01.png",
        alt: "Young woman at a sunlit street-side café holding Silvia Vanda’s novel “Dunkelfeuer – Ich finde dich”, with a second volume and a cappuccino on the table.",
        prompt: "Golden-hour outdoor café scene, pastel old-town street in soft focus, blooming cherry blossoms, elegant woman in a coral wrap dress sits with crossed legs; she lifts Silvia Vanda’s fantasy-romance novel “Dunkelfeuer – Ich finde dich” toward the camera. On the wrought-iron table: a marble-glazed cappuccino cup and the sequel “Dunkelfeuer – Du gehörst mir”. Warm cinematic lighting, shallow depth of field, 50 mm f1.8.",
        negativePrompt: "low-res, watermark, oversharpened, harsh shadows",
        seed: "123456789",
        model: "ChatGPT + SDXL 1.0 (text-to-image)",
        sampler: "DPM++ 2M Karras"
    },
    {
        id: 4,
        src: "./ai-images/Flux_Dev_exquisite_high_fashion_01.jpg",
        alt: "A breathtakingly realistic vertical portrait of a serene Victorian woman in a detailed white dress, seated beside an antique wooden table with a steaming cappuccino. Her peaceful expression, soft wisps of hair, and elegant pearl earrings exude timeless grace. Behind her, faded posters of Foo Fighters, Pearl Jam, Nirvana, and Alice in Chains subtly disrupt the 1874 atmosphere, merging eras in a surreal and cinematic way.",
        prompt: "Ultra-realistic cinematic vertical portrait of a beautiful Victorian woman from 1874, wearing an elaborately detailed white gown. She is seated beside an old carved wooden table holding a vintage-style cappuccino cup. Her hairstyle is period-accurate, pinned up with gentle loose strands, and she wears refined white pearl earrings. The shot is pulled back to showcase the full length of her dress. Behind her, an aged wall displays vintage-styled posters of Foo Fighters, Pearl Jam, Nirvana, and Alice in Chains—printed as if in 19th-century fashion. Soft cinematic lighting highlights her textures, mood, and the harmonious contrast of past and modern rock culture.",
        "negativePrompt": "low-res, overexposed highlights, cartoonish style, distorted features, modern clothing, flat lighting, cluttered composition, unrealistic textures",
        seed: "1300113961",
        model: "Flux Dev",
        sampler: "Fast"
    },
    {
        id: 5,
        src: "./ai-images/ChatGPT_coffee_02.png",
        alt: "Café table with cappuccino latte art beside Silvia Vanda’s book “Dunkelfeuer – Ich finde dich”; warm sunset street blurred in the background.",
        prompt:
            "Golden-hour street café vignette, bokeh blossom-lined alley. Rustic wooden café table holds a marbled ceramic cappuccino cup with perfect tulip latte art. Beside it stands Silvia Vanda's fantasy-romance paperback 'Dunkelfeuer – Ich finde dich'. Woman in a peach dress sits just out of frame, leg crossing into the shot. Soft cinematic lighting, 85 mm f1.8, cozy mood.",
        negativePrompt: "over-sharpened, watermark, neon, sci-fi elements",
        seed: "987654321",
        model: "ChatGPT + SDXL 1.0",
        sampler: "DPM++ 2M Karras"
    },
    {
        id: 6,
        src: "./ai-images/Flux_Dev_LinkinPark.jpg",
        alt: "Back-lit girl throwing up her arms in a sun-drenched bedroom, wearing a Linkin Park T-shirt; colorful confetti floats in the air.",
        prompt:
            "Golden-hour bedroom, cinematic back-light streaming through sheer curtains. Young woman in black Linkin Park TShirt and denim shorts stands barefoot, arms spread in celebration. Confetti pieces catch the light, frozen mid-air. Warm color palette, shallow depth of field, 85 mm f1.8, feel-good vibe.",
        negativePrompt: "overexposed highlights, watermark, cartoonish anatomy, motion blur",
        seed: "456789123",
        model: "Leonardo AI – Flux Dev finetune",
        sampler: "Euler a"
    },
    {
        id: 7,
        src: "./ai-images/ChatGPT_coffee_03.png",
        alt: "Red-haired woman quietly enjoying a cup of coffee on the beach at sunset; warm golden light plays across the waves.",
        prompt:
            "Golden sunset seascape, soft cinematic lighting. Young red-haired woman in a textured brown sweater sits at a rustic café table on the sand, hands wrapped around a white ceramic cappuccino cup. Gentle waves shimmer in the background, sun low on the horizon, bokeh reflections on the water, contemplative mood, 85 mm f1.8.",
        negativePrompt: "overexposed sky, lens flare artifacts, watermark, neon colors",
        seed: "456789123",
        model: "ChatGPT + SDXL 1.0",
        sampler: "Euler a"
    },
    {
        id: 8,
        src: "./ai-images/ChatGPT_coffee_04.png",
        alt: "Fresh cappuccino with frothy crema in a ‘Cappuccino House’ mug beside a laptop screen full of code, morning bokeh light in the window.",
        prompt:
            "Warm morning desk scene, macro 50 mm f1.8. Close-up of a white ‘Cappuccino House 1996’ mug overflowing with velvety foam; tiny steam particles sparkle in sunbeams. MacBook with dark code UI blurred in the background, soft golden bokeh outside the café window, cozy productivity vibe.",
        negativePrompt: "watermark, low-res foam, washed-out colors, exaggerated steam",
        seed: "456789123",
        model: "ChatGPT + SDXL 1.0",
        sampler: "Euler a"
    },
    {
        id: 9,
        src: "./ai-images/ChatGPT_img_01.png",
        alt: "Cowgirl and biker-style man seated close together on hay; Silvia Vanda’s novel ‘Dunkelfeuer – Ich finde dich’ rests against her knee.",
        prompt:
            "Rustic barn interior, warm Rembrandt-style lighting. Cowgirl in plaid shirt and straw hat leans toward a rugged man in black leather jacket; romantic tension in their gaze. They sit on a hay-strewn floor beside two paperbacks of Silvia Vanda’s fantasy-romance ‘Dunkelfeuer’. Cinematic depth of field, 50 mm f1.8, earthy color palette.",
        negativePrompt: "watermark, cartoon anatomy, modern neon lights, motion blur",
        seed: "456789123",
        model: "ChatGPT + SDXL 1.0",
        sampler: "Euler a"
    },
    {
        id: 10,
        src: "./ai-images/Flux_Dev_A_sunsplashed_industrial_loft_studio_awash_in_rich.jpg",
        alt:
            "Young developer wearing studio headphones codes on a laptop in a sunlit industrial loft; neon-pink back-light, cappuccino with latte art in the foreground, glowing music notes rise in the air.",
        prompt:
            "Sunsplashed industrial loft studio awash in rich magenta rim-light and warm sunset beams. Female programmer in over-ear headphones types on a MacBook; terminal code glows on screen. Steaming cappuccino with latte art sits on dark wooden desk, pink reflections on ceramic cup. Stylised floating music notes drift through violet vapor, cinematic cyber-café mood, 35 mm f1.8, soft bokeh brick wall backdrop.",
        negativePrompt: "harsh artifacts, watermark, over-saturated clipping, distorted anatomy, extra limbs",
        seed: "456789123",
        model: "Leonardo AI – Flux Dev finetune",
        sampler: "Euler a"
    },
    {
        id: 11,
        src: "./ai-images/Lucid_Realism_music_01.jpg",
        alt:
            "Three silhouetted rock-buddies dance and riff atop a stone bridge at golden sunset; sandstone cliffs loom, orange-purple clouds glow around a low sun, and a rainbow of musical notes arcs across the bridge with bold ‘MUSIC BUILDS BRIDGES’ text below.",
        prompt:
            "Vertical cinematic illustration, 1080 × 1920 px, warm semi-realistic style. Three silhouetted rock-buddies stand and dance on the stone bridge itself, playfully interacting with an arched staff of colorful musical notes that spans the gap. Sheer sandstone cliffs frame the scene. A low golden sun hangs just above the right cliff edge, soft cumulus clouds catch vivid orange-purple highlights, and gentle rays streak outward. Beneath the bridge’s archway, large hand-lettered text ‘MUSIC BUILDS BRIDGES’ stays centered and unobstructed. Lucid-Realism, cinematic mood.",
        negativePrompt: "harsh artifacts, watermark, over-saturated clipping, distorted anatomy, extra limbs",
        seed: "1050108155",
        model: "Leonardo AI – Flux Dev finetune",
        sampler: "Euler a"
    }
];

export default aiGalleryData; 