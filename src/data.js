// ═══════════════════════════════════════════════
// IMAGE ASSETS FROM BEHANCE CDN
// ═══════════════════════════════════════════════
export const IMAGES = {
  raw: [
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/2e596b244698951.699d806ec5a21.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/da84b7244698951.699d806ec773b.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/7ec653244698951.699d806ec71fb.jpg',
  ],
  borcelle: [
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/507470222340111.67e41656e1d5b.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4c8f73222340111.67e41656e185e.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/5ed1e6222340111.67e41656e112e.png',
  ],
  rebellion: [
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/c47792222318883.67e3d454b1fec.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/fc0603222318883.67e3d456358f0.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/13bb7d222318883.67e3d4583116c.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/1c4f81222318883.67e3d45a38c4e.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/693847222318883.67e3d45c9d0e6.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840_webp/125c25222318883.67e3d45e107a3.png',
  ],
}

// ═══════════════════════════════════════════════
// WORKS DATA
// ═══════════════════════════════════════════════
export const WORKS = [
  { id: '01', name: 'Seedhe Maut', type: 'Music Video', year: '2024', img: IMAGES.raw[0], desc: 'A chaotic, raw music video capturing the energetic underground hip-hop scene in Delhi, featuring the powerhouse duo Seedhe Maut. Shot on Sony A7S III.' },
  { id: '02', name: 'Krsna', type: 'Concert Photography', year: '2024', img: IMAGES.rebellion[0], desc: 'Front-row concert coverage of KRSNA’s stadium tour. The visual theme revolves around high-contrast brutalism and neon accents.' },
  { id: '03', name: 'Redbull × Karma', type: 'Brand Campaign', year: '2024', img: IMAGES.borcelle[0], desc: 'An adrenaline-fueled visual campaign for RedBull, blending urban street culture with high-stakes action sports cinematography.' },
  { id: '04', name: 'Bali', type: 'Travel Photography', year: '2024', img: IMAGES.rebellion[1], desc: 'A documentary photography series capturing the unseen, unpolished brutalist architecture hidden within the tropical landscape of Bali.' },
  { id: '05', name: 'Ravator Music', type: 'Music Photography', year: '2025', img: IMAGES.raw[1], desc: 'Main stage festival coverage for the electronic duo Ravator. Intensive strobe lighting required precise shutter timing and custom color grading.' },
  { id: '06', name: '1st Goth Rock Event', type: 'Event Photography', year: '2025', img: IMAGES.rebellion[2], desc: 'Gritty, obscure event coverage of the underground Goth Rock scene in India. High ISO black and white grain was emphasized.' },
  { id: '07', name: 'Phobia', type: 'Cinematography', year: '2025', img: IMAGES.rebellion[3], desc: 'A psychological thriller short film. Served as Director of Photography, utilizing dim lighting, anamorphic lenses, and eerie framing.' },
  { id: '08', name: 'Spectrum 2025', type: 'Event Coverage', year: '2025', img: IMAGES.borcelle[1], desc: 'Official aftermovie and photo coverage for the Spectrum Arts & Music Festival, handling a crew of three and directing the final edit.' },
]

export const SERVICES = [
  {
    id: 'cinematography',
    title: 'Cinematography',
    desc: 'Music videos, brand films, short films, and event coverage with a cinematic eye. Equipment: Sony A7 series, anamorphic lenses, gimbal systems.',
    tag: 'Video Production',
    details: 'I approach cinematography not just as pointing a camera, but as crafting a visual language. Whether it is a gritty music video requiring handheld chaos or a sleek, stabilized commercial for a luxury brand, the lighting, lens choice, and camera movement are meticulously planned.'
  },
  {
    id: 'photography',
    title: 'Photography',
    desc: 'Concert photography, fashion editorials, portrait sessions, and product shoots. High-end retouching and color grading included.',
    tag: 'Visual Arts',
    details: 'From the mosh pit at a hip-hop concert to the controlled environment of a fashion studio, I capture freezing moments that tell a larger story. My editing style leans heavily into film emulation, deep contrast, and rich textures.'
  },
  {
    id: 'freelance',
    title: 'Freelance — Available',
    desc: 'Open for freelance collaborations, artist partnerships, brand campaigns, and one-off shoots across India and internationally.',
    tag: 'Hire Me',
    details: 'I operate as an independent contractor available for hire worldwide. Im extremely adaptable, able to integrate into existing production crews or lead a small, agile team from pre-production to final delivery.'
  },
  {
    id: 'post-production',
    title: 'Post Production',
    desc: 'Color grading, video editing, photo retouching, and full creative direction from concept to delivery.',
    tag: 'Editing & Grading',
    details: 'The magic happens in the edit. Im proficient in DaVinci Resolve strictly for color grading, and Premiere Pro/Final Cut for narrative sequencing. I treat every frame like a painting, ensuring the final deliverable matches the original vision.'
  },
]
