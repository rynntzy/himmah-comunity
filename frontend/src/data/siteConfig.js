export const DEFAULT_SITE_CONFIG = {
  hero: {
    titlePrefix: 'Himmah NWDI',
    titleSuffix: 'Kom. Teknik',
    subtitle: 'Bersama Mencetak Kader Unggul, Kreatif, dan Berdaya Saing di Era Digital',
    badgeText: 'Penerimaan Komunitas Kader 2025/2026',
    ctaText: 'Daftar Komunitas',
    heroImage: null, // URL atau Data URL gambar custom hero gedung
  },
  classes: [
    {
      id: 'web',
      name: 'Pemrograman Web',
      shortDesc: 'Belajar HTML, CSS, JavaScript, React, dan pengembangan website.',
      type: 'web',
      image: null
    },
    {
      id: 'robotics',
      name: 'Robotik',
      shortDesc: 'Belajar elektronika, mikrokontroler, sensor, dan pembuatan robot.',
      type: 'robotics',
      image: null
    },
    {
      id: 'design',
      name: 'Desain Grafis',
      shortDesc: 'Belajar desain visual, tipografi, ilustrasi, dan desain digital.',
      type: 'design',
      image: null
    }
  ],
  formSection: {
    title: 'Formulir Pendaftaran',
    subtitle: 'Isi data diri Anda untuk mendaftar komunitas yang dipilih.',
    slogan: 'Belajar • Berkarya • Berkhidmat',
    kaderImage: null // URL atau Data URL gambar custom kader/kegiatan
  },
  contact: {
    whatsappNumber: '6281234567890',
    whatsappText: 'Halo Admin Himmah NWDI Kom. Teknik, saya ingin bertanya tentang komunitas.',
    instagramUrl: 'https://instagram.com',
    youtubeUrl: 'https://youtube.com',
    telegramUrl: 'https://t.me',
    footerSlogan: 'Bersama Membangun Kader yang Berilmu dan Berakhlaq Mulia'
  }
};

export function getSavedSiteConfig() {
  const saved = localStorage.getItem('himmah_nwdi_site_config');
  if (saved) {
    try {
      const sanitizedSaved = saved
        .replaceAll('Kelas Khusus', 'Komunitas')
        .replaceAll('kelas khusus', 'komunitas')
        .replaceAll('Kelas khusus', 'Komunitas');
      const parsed = JSON.parse(sanitizedSaved);
      return { ...DEFAULT_SITE_CONFIG, ...parsed };
    } catch (e) {
      console.error('Failed to parse site config from storage', e);
    }
  }
  return DEFAULT_SITE_CONFIG;
}

export function saveSiteConfig(config) {
  localStorage.setItem('himmah_nwdi_site_config', JSON.stringify(config));
}
