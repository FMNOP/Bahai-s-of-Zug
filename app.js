/* ==========================================================================
   BAHÁ'Í ZUG COMMUNITY WEBSITE - JAVASCRIPT
   Bilingual English/German, Event Calendar CRUD, and Virtues Generator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  // ==========================================================================
  // 1. Navigation Scroll Tracker & Sticky Effects
  // ==========================================================================
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  let lastScrollTop = 0;
  const headerThreshold = 50;

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Page Scroll Progress bar calculation
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (documentHeight > 0) {
      const scrollPercent = (scrollTop / documentHeight) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Scroll Down / Up header toggling
    if (scrollTop > headerThreshold) {
      if (scrollTop > lastScrollTop) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
      }
    } else {
      header.classList.remove('scroll-down', 'scroll-up');
    }
    
    lastScrollTop = scrollTop;
  });

  // ==========================================================================
  // 2. Mobile Menu Toggle Drawer
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('open');
    if (isOpen) {
      navMenu.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    } else {
      navMenu.classList.add('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) {
        toggleMobileMenu();
      }
    });
  });

  // ==========================================================================
  // 3. Hero Quotes Rotator / Auto Slider
  // ==========================================================================
  const quoteSlides = document.querySelectorAll('.quote-slide');
  let currentQuoteIndex = 0;
  const quoteIntervalTime = 6000; // Rotate quotes every 6 seconds

  function rotateQuotes() {
    if (quoteSlides.length === 0) return;
    // Fade out current slide
    quoteSlides[currentQuoteIndex].classList.remove('active');
    // Calculate next slide index
    currentQuoteIndex = (currentQuoteIndex + 1) % quoteSlides.length;
    // Fade in next slide
    quoteSlides[currentQuoteIndex].classList.add('active');
  }

  if (quoteSlides.length > 1) {
    setInterval(rotateQuotes, quoteIntervalTime);
  }

  // ==========================================================================
  // 4. Scroll Reveal Intersection Observer
  // ==========================================================================
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  scrollElements.forEach(el => {
    revealObserver.observe(el);
  });


  // ==========================================================================
  // 5. Bilingual Translation Dictionary Mappings
  // ==========================================================================
  let currentLang = localStorage.getItem('bahai_zug_lang') || 'en';

  const translations = {
    en: {
      page_title: "Bahá'ís of Zug | Building Unity & Community",
      admin_logged_banner: "Logged in as Admin (Canton Zug Portal)",
      logout_btn: "Logout",
      logo_text: "BAHÁ'ÍS OF ZUG",
      nav_beliefs: "Beliefs",
      nav_activities: "Activities",
      nav_calendar: "Calendar",
      nav_virtues: "Virtues Card",
      nav_history: "History",
      nav_contact: "Get in Touch",
      nav_contact_mobile: "Get in Touch",
      hero_pretitle: "Welcome to the Zug Bahá'í Community",
      hero_quote_1: '"The Earth is but one country, and mankind its citizens."',
      hero_quote_author_1: "— Bahá'u'lláh",
      hero_quote_2: '"Regard man as a mine rich in gems of inestimable value. Education can, alone, cause it to reveal its treasures..."',
      hero_quote_author_2: "— Bahá'u'lláh",
      hero_quote_3: '"Lay the foundation of love and unity, for this is the source of all spiritual growth."',
      hero_quote_author_3: "— 'Abdu'l-Bahá",
      hero_btn_explore: "Explore Activities",
      hero_btn_calendar: "Community Calendar",
      hero_img_caption: "Mural created by a children's class in Canton Zug",
      beliefs_badge: "Core Principles",
      beliefs_title: "Inspiring the build of a better world.",
      beliefs_subtitle: "The teachings of the Bahá'í Faith inspire individuals and families in Zug to contribute to the spiritual and material progress of society.",
      principle_title_1: "Unity in Diversity",
      principle_desc_1: "Just as flowers of different colors make a garden beautiful, the diversity of the human family makes our world richer. We believe in overcoming prejudices of all kinds.",
      principle_title_2: "Search for Truth",
      principle_desc_2: "We believe in the harmony of science and religion. Science helps us understand how things work, while religion guides us on how to act with love, kindness, and justice.",
      principle_title_3: "Inherent Nobility",
      principle_desc_3: "Every human being is born with beautiful qualities inside—like kindness, courage, and truthfulness. Education is the key that unlocks these hidden gems.",
      callout_title: '"The earth is but one country..."',
      callout_desc: "Bahá'í beliefs address essential themes such as the oneness of God and religion, the oneness of humanity, the progressive unfolding of religious truth, the equality of women and men, the centrality of justice, and the importance of education for children worldwide.",
      act_section_badge: "What we do",
      act_section_title: "Engaged in building vibrant local communities.",
      act_section_subtitle: "We work together with neighbors, friends, and families to create welcoming spaces for spiritual growth and community service.",
      act_badge_1: "Kids (Ages 5-10)",
      act_title_1: "Children's Classes",
      act_desc_1: "Fun and creative classes focused on developing spiritual virtues like kindness, sharing, and honesty. Children learn through stories, cooperative games, songs, and arts.",
      act_details_1: "Classes help children understand their nobility and build moral strength. In the Canton of Zug, kids from all backgrounds join these classes, fostering early habits of mutual respect.",
      btn_read_more: "Read more ▾",
      act_badge_2: "Youth (Ages 11-15)",
      act_title_2: "Junior Youth Groups",
      act_desc_2: "A space for adolescents to hang out, discuss meaningful topics (like media, peer pressure, and justice), develop their skills, and design local community service projects.",
      act_details_2: "The Junior Youth Spiritual Empowerment Program supports youth during a crucial stage of growth. They learn to analyze their environment and apply spiritual principles to solve real-world problems.",
      act_badge_3: "Adults & Families",
      act_title_3: "Devotional Gatherings",
      act_desc_3: "Simple gatherings of friends and neighbors to share prayers, read uplifting passages, and enjoy spiritual music. It's a peaceful space to reflect and bind hearts together.",
      act_details_3: "Devotionals have no formal ritual. Guests are welcome to share prayers from their own faith, scriptures, or simply enjoy the peaceful environment, reinforcing spiritual ties.",
      act_badge_4: "Youth & Adults",
      act_title_4: "Study Circles",
      act_desc_4: "Small group circles studying spiritual writings and translating themes directly into action. Participants learn how to lead children's classes or organize service events.",
      act_details_4: "Study circles combine study and active service. Using curricula from the Ruhi Institute, they build capacity in participants to serve their local communities effectively.",
      virtue_badge: "Interactive Widget",
      virtue_title: "Discover your virtue of the day.",
      virtue_subtitle: "Character education is central to the Bahá'í community. Our virtues card generator is a fun way for kids, parents, and teachers to reflect on positive qualities together.",
      virtue_tip_label: "Family Idea:",
      virtue_tip_text: "Click to reveal a virtue and discuss how you can practice it together at dinner or school today!",
      virtue_btn: "Reveal a Virtue 🌟",
      virtue_card_header: "Daily Virtue",
      virtue_card_title_init: "Click the Button!",
      virtue_card_desc_init: "Every day is a chance to cultivate positive qualities. Click \"Reveal a Virtue\" to explore how to practice kindness, patience, unity, or justice today.",
      virtue_card_quote_init: '"True peace can only come when we learn to practice love and justice to all."',
      virtue_card_author_init: "— Bahá'í Writings",
      virtue_prompt_title: "Reflection Question",
      virtue_prompt_init: "What quality would you like to focus on today?",
      virtue_footer_1: "Bahá'í Family Virtues Project",
      virtue_footer_2: "Building character, together",
      history_badge: "Our Journey",
      history_title: "Bahá'í Faith in Switzerland & Zug",
      history_subtitle: "The Bahá'í Faith has been present in Switzerland since the beginning of the 20th century. Click the milestones below to discover our history and local roots in Zug.",
      milestone_title_1: "First Swiss Bahá'ís",
      milestone_desc_short_1: "The initial presence of the Faith begins as early Swiss thinkers learn about the teachings of unity and peace.",
      milestone_details_1: "The teachings of the Bahá'í Faith arrived in Switzerland at the dawn of the 20th century, inspiring local searchers who sought international peace and spiritual renewal. Notable early figures established bridges with local associations in Zurich, Bern, and central Switzerland.",
      btn_history_read_more: "Read full history ▾",
      milestone_title_2: "'Abdu'l-Bahá's Swiss Visit",
      milestone_desc_short_2: "'Abdu'l-Bahá, the son of the Faith's founder, visits Switzerland to deliver public lectures on social progress.",
      milestone_details_2: "In September 1911, 'Abdu'l-Bahá visited Geneva and Thonon-les-Bains. He spoke passionately to international groups and peace organizations, emphasizing that the oneness of humanity was the key requirement for world peace.",
      milestone_title_3: "National Assembly Formed",
      milestone_desc_short_3: "The election of the first National Spiritual Assembly coordinates activities across cantons, supporting local groups.",
      milestone_details_3: "With local communities growing in Basel, Bern, Geneva, Zurich, and Lausanne, the first National Spiritual Assembly of the Bahá'ís of Switzerland was elected in 1953, establishing a formal support structure for local initiatives, including those in Central Switzerland.",
      milestone_title_4: "Zug Community Activities",
      milestone_desc_short_4: "Active local groups hosting activities for all ages, contributing to character education and service in Canton Zug.",
      milestone_details_4: "Today, the Zug community consists of local Bahá'ís and friends from diverse national origins, actively engaged in building peaceful neighborhoods, hosting moral classes for kids in Cham, Baar, and Zug, and organising community devotionals.",
      calendar_badge: "Events Schedule",
      calendar_title: "Zug Community Calendar",
      calendar_subtitle: "Discover and join upcoming events, devotionals, and classes happening in the Zug area. Select an event to view details and location.",
      calendar_add_btn: "+ Add Event",
      weekday_mon: "Mon",
      weekday_tue: "Tue",
      weekday_wed: "Wed",
      weekday_thu: "Thu",
      weekday_fri: "Fri",
      weekday_sat: "Sat",
      weekday_sun: "Sun",
      upcoming_events_title: "Upcoming Events in Zug",
      contact_title: "Connect with us.",
      contact_desc: "Our neighborhood activities are open to families, kids, and adults of all backgrounds and paths. Let us know if you have questions or want to join an event!",
      contact_notice_title: "Contact Details Update",
      contact_notice_desc: "Our Swiss-wide local directory is currently being compiled. If you want to connect with a local assembly in your area, please use the contact form or email our national office:",
      contact_office_label: "National Office Email:",
      form_name_label: "Your Name",
      form_error_name: "Please enter your name.",
      form_email_label: "Email Address",
      form_error_email: "Please enter a valid email address.",
      form_city_label: "City / Canton",
      form_error_city: "Please enter your city or canton.",
      form_topic_label: "I'm interested in...",
      form_topic_1: "Children's Classes",
      form_topic_2: "Junior Youth Groups",
      form_topic_3: "Devotional Gatherings",
      form_topic_4: "General Inquiry",
      form_error_topic: "Please select an interest.",
      form_message_label: "Write your message here",
      form_error_message: "Please type your message.",
      form_submit_btn: "Send Message",
      form_success_title: "Message Received",
      form_success_desc: "Thank you for reaching out to the Bahá'í community. We will connect you with a coordinator in your area and get back to you soon.",
      form_success_reset_btn: "Send Another Message",
      footer_brand_desc: "Inspired by the teachings of Bahá'u'lláh to establish peace, eliminate prejudice, and build cooperative communities in Canton Zug.",
      footer_col_1_title: "Explore",
      footer_col_2_title: "Resources",
      footer_col_3_title: "Connect",
      footer_link_intl: "International Website",
      footer_link_nat: "National Switzerland Site",
      footer_copy: "Bahá'ís of Zug. Inspired by building unity. All rights reserved.",
      footer_portal_desc: "Official Canton Zug Portal.",
      admin_portal_link: "Admin Portal 🔒",
      admin_portal_link_logged: "Log Out Admin Portal 🔓",
      admin_btn_edit: "Edit Event",
      admin_btn_delete: "Delete Event",
      login_title: "Admin Portal Login",
      login_subtitle: "Authorized access for Zug community coordinators.",
      login_username_label: "Username",
      login_error_user: "Please enter username.",
      login_password_label: "Password",
      login_error_pass: "Please enter password.",
      login_feedback_error: "Invalid username or password.",
      login_submit: "Sign In",
      editor_title_add: "Add Event",
      editor_title_edit: "Edit Event Details",
      editor_label_title: "Event Title",
      editor_error_title: "Please enter a title.",
      editor_label_category: "Category",
      editor_label_date: "Date",
      editor_error_date: "Select a valid date.",
      editor_label_time: "Time",
      editor_error_time: "Select time.",
      editor_label_desc: "Event Description",
      editor_error_desc: "Please enter a description.",
      editor_label_loc: "Location Name",
      editor_error_loc: "Please enter a location.",
      editor_label_maps: "Google Maps URL",
      editor_error_maps: "Please enter a valid URL.",
      editor_submit: "Save Event"
    },
    de: {
      page_title: "Bahá'í von Zug | Aufbau von Einheit & Gemeinschaft",
      admin_logged_banner: "Als Administrator angemeldet (Kanton Zug Portal)",
      logout_btn: "Abmelden",
      logo_text: "BAHÁ'Í VON ZUG",
      nav_beliefs: "Glauben",
      nav_activities: "Aktivitäten",
      nav_calendar: "Kalender",
      nav_virtues: "Tugendkarte",
      nav_history: "Geschichte",
      nav_contact: "Kontakt",
      nav_contact_mobile: "Kontakt aufnehmen",
      hero_pretitle: "Willkommen in der Bahá'í-Gemeinde Zug",
      hero_quote_1: '"Die Erde ist nur ein Land und alle Menschen seine Bürger."',
      hero_quote_author_1: "— Bahá'u'lláh",
      hero_quote_2: '"Betrachte den Menschen als ein Bergwerk, reich an Edelsteinen von unschätzbarem Wert. Nur die Erziehung kann bewirken, dass es seine Schätze enthüllt..."',
      hero_quote_author_2: "— Bahá'u'lláh",
      hero_quote_3: '"Lege das Fundament der Liebe und der Einheit, denn dies ist die Quelle allen geistigen Wachstums."',
      hero_quote_author_3: "— 'Abdu'l-Bahá",
      hero_btn_explore: "Aktivitäten erkunden",
      hero_btn_calendar: "Veranstaltungskalender",
      hero_img_caption: "Wandgemälde, erstellt von einer Kinderklasse im Kanton Zug",
      beliefs_badge: "Grundprinzipien",
      beliefs_title: "Inspiration für den Aufbau einer besseren Welt.",
      beliefs_subtitle: "Die Lehren des Bahá'í-Glaubens inspirieren Einzelpersonen und Familien in Zug, zum geistigen und materiellen Fortschritt der Gesellschaft beizutragen.",
      principle_title_1: "Einheit in der Vielfalt",
      principle_desc_1: "So wie verschiedenfarbige Blumen einen Garten verschönern, bereichert die Vielfalt der Menschheitsfamilie unsere Welt. Wir glauben an die Überwindung von Vorurteilen aller Art.",
      principle_title_2: "Suche nach Wahrheit",
      principle_desc_2: "Wir glauben an die Harmonie von Wissenschaft und Religion. Die Wissenschaft hilft uns zu verstehen, wie die Dinge funktionieren, während die Religion uns leitet, mit Liebe, Güte und Gerechtigkeit zu handeln.",
      principle_title_3: "Inhärente Würde",
      principle_desc_3: "Jeder Mensch wird mit schönen Eigenschaften geboren – wie Güte, Mut und Wahrhaftigkeit. Bildung ist der Schlüssel, der diese verborgenen Schätze freilegt.",
      callout_title: '"Die Erde ist nur ein Land..."',
      callout_desc: "Die Bahá'í-Lehren befassen sich mit wesentlichen Themen wie der Einheit Gottes und der Religion, der Einheit der Menschheit, der fortschreitenden Entfaltung der religiösen Wahrheit, der Gleichberechtigung von Frauen und Männern, der zentralen Bedeutung der Gerechtigkeit und der Wichtigkeit der Bildung für Kinder weltweit.",
      act_section_badge: "Was wir tun",
      act_section_title: "Engagement für lebendige lokale Gemeinschaften.",
      act_section_subtitle: "Wir arbeiten mit Nachbarn, Freunden und Familien zusammen, um einladende Räume für geistiges Wachstum und Gemeindedienst zu schaffen.",
      act_badge_1: "Kinder (5-10 Jahre)",
      act_title_1: "Kinderklassen",
      act_desc_1: "Spielerische und kreative Klassen, die sich auf die Entwicklung geistiger Tugenden wie Güte, Teilen und Ehrlichkeit konzentrieren. Kinder lernen durch Geschichten, kooperative Spiele, Lieder und Kunst.",
      act_details_1: "Die Klassen helfen Kindern, ihre eigene Würde zu verstehen und moralische Stärke aufzubauen. Im Kanton Zug nehmen Kinder aller Herkunft an diesen Klassen teil, was frühe Gewohnheiten des gegenseitigen Respekts fördert.",
      btn_read_more: "Weiterlesen ▾",
      act_badge_2: "Junioren (11-15 Jahre)",
      act_title_2: "Junioren-Jugendgruppen",
      act_desc_2: "Ein Raum für Teenager, um sich zu treffen, bedeutende Themen (wie Medien, Gruppenzwang und Gerechtigkeit) zu besprechen, ihre Fähigkeiten zu entwickeln und lokale Serviceprojekte zu entwerfen.",
      act_details_2: "Das geistige Ermächtigungsprogramm für Junioren unterstützt Jugendliche in einer entscheidenden Phase des Wachstums. Sie lernen, ihre Umgebung zu analysieren und geistige Prinzipien anzuwenden, um reale Probleme zu lösen.",
      act_badge_3: "Erwachsene & Familien",
      act_title_3: "Andachten",
      act_desc_3: "Einfache Treffen von Freunden und Nachbarn, um Gebete zu teilen, erbauliche Abschnitte zu lesen und geistige Musik zu genießen. Es ist ein friedlicher Raum zum Nachdenken und zur Verbindung der Herzen.",
      act_details_3: "Andachten haben kein formelles Ritual. Gäste sind herzlich eingeladen, Gebete aus ihrem eigenen Glauben oder Schriften zu teilen, oder einfach die friedliche Atmosphäre zu genießen, was die geistige Verbundenheit stärkt.",
      act_badge_4: "Jugend & Erwachsene",
      act_title_4: "Studienkreise",
      act_desc_4: "Kreise in kleinen Gruppen, die geistige Schriften studieren und Themen direkt in die Tat umsetzen. Die Teilnehmer lernen, Kinderklassen zu leiten oder Service-Events zu organisieren.",
      act_details_4: "Studienkreise verbinden Studium und aktiven Dienst. Mit Lehrplänen des Ruhi-Instituts bauen sie die Kapazitäten der Teilnehmer aus, um ihren lokalen Gemeinschaften effektiv zu dienen.",
      virtue_badge: "Interaktives Widget",
      virtue_title: "Entdecken Sie Ihre Tugend des Tages.",
      virtue_subtitle: "Charakterbildung steht im Mittelpunkt der Bahá'í-Gemeinschaft. Unser Tugendkartengenerator ist eine unterhaltsame Art für Kinder, Eltern und Lehrer, gemeinsam über positive Eigenschaften nachzudenken.",
      virtue_tip_label: "Idee für die Familie:",
      virtue_tip_text: "Klicken Sie, um eine Tugend zu enthüllen, und besprechen Sie, wie Sie diese heute beim Abendessen oder in der Schule gemeinsam praktizieren können!",
      virtue_btn: "Eine Tugend enthüllen 🌟",
      virtue_card_header: "Tugend des Tages",
      virtue_card_title_init: "Klicken Sie auf den Button!",
      virtue_card_desc_init: "Jeder Tag ist eine Chance, positive Eigenschaften zu kultivieren. Klicken Sie auf „Eine Tugend enthüllen“, um zu erfahren, wie Sie heute Güte, Geduld, Einheit oder Gerechtigkeit praktizieren können.",
      virtue_card_quote_init: '"Wahrer Friede kann nur kommen, wenn wir lernen, Liebe und Gerechtigkeit gegenüber allen zu praktizieren."',
      virtue_card_author_init: "— Bahá'í-Schriften",
      virtue_prompt_title: "Reflexionsfrage",
      virtue_prompt_init: "Auf welche Eigenschaft möchten Sie sich heute konzentrieren?",
      virtue_footer_1: "Bahá'í-Familientugendprojekt",
      virtue_footer_2: "Gemeinsam Charakter bilden",
      history_badge: "Unser Weg",
      history_title: "Der Bahá'í-Glaube in der Schweiz & Zug",
      history_subtitle: "Der Bahá'í-Glaube ist seit Beginn des 20. Jahrhunderts in der Schweiz präsent. Klicken Sie auf die Meilensteine unten, um unsere Geschichte und unsere lokalen Wurzeln in Zug zu entdecken.",
      milestone_title_1: "Erste Schweizer Bahá'ís",
      milestone_desc_short_1: "Die erste Präsenz des Glaubens beginnt, als frühe Schweizer Denker die Lehren von Einheit und Frieden kennenlernen.",
      milestone_details_1: "Die Lehren des Bahá'í-Glaubens erreichten die Schweiz an der Schwelle zum 20. Jahrhundert und inspirierten Suchende, die nach internationalem Frieden und geistiger Erneuerung strebten. Namhafte frühe Persönlichkeiten bauten Brücken zu lokalen Vereinigungen in Zürich, Bern und der Zentralschweiz.",
      btn_history_read_more: "Ganze Geschichte lesen ▾",
      milestone_title_2: "'Abdu'l-Bahás Besuch in der Schweiz",
      milestone_desc_short_2: "'Abdu'l-Bahá, der Sohn des Gründers des Glaubens, besucht die Schweiz, um öffentliche Vorträge über gesellschaftlichen Fortschritt zu halten.",
      milestone_details_2: "Im September 1911 besuchte 'Abdu'l-Bahá Genf und Thonon-les-Bains. Er sprach leidenschaftlich vor internationalen Gruppen und Friedensorganisationen und betonte, dass die Einheit der Menschheit die Schlüsselbedingung für den Weltfrieden sei.",
      milestone_title_3: "Nationale Vertretung gebildet",
      milestone_desc_short_3: "Die Wahl des ersten Nationalen Geistigen Rates koordiniert die Aktivitäten in den Kantonen und unterstützt lokale Gruppen.",
      milestone_details_3: "Mit wachsenden Gemeinden in Basel, Bern, Genf, Zürich und Lausanne wurde 1953 der erste Nationale Geistige Rat der Bahá'í der Schweiz gewählt, wodurch eine formelle Unterstützungsstruktur für lokale Initiativen, auch in der Zentralschweiz, geschaffen wurde.",
      milestone_title_4: "Aktivitäten der Zuger Gemeinde",
      milestone_desc_short_4: "Aktive lokale Gruppen organisieren Aktivitäten für jedes Alter und tragen zur Charakterbildung und zum Gemeindedienst im Kanton Zug bei.",
      milestone_details_4: "Heute besteht die Zuger Gemeinschaft aus lokalen Bahá'í und Freunden unterschiedlicher Herkunft, die sich aktiv für den Aufbau friedlicher Nachbarschaften einsetzen, Kinderklassen in Cham, Baar und Zug leiten und Andachten organisieren.",
      calendar_badge: "Veranstaltungsplan",
      calendar_title: "Gemeinschaftskalender Zug",
      calendar_subtitle: "Entdecken Sie bevorstehende Veranstaltungen, Andachten und Klassen in Zug und nehmen Sie daran teil. Wählen Sie ein Event aus, um Details und den Standort anzuzeigen.",
      calendar_add_btn: "+ Event hinzufügen",
      weekday_mon: "Mo",
      weekday_tue: "Di",
      weekday_wed: "Mi",
      weekday_thu: "Do",
      weekday_fri: "Fr",
      weekday_sat: "Sa",
      weekday_sun: "So",
      upcoming_events_title: "Bevorstehende Events in Zug",
      contact_title: "Treten Sie mit uns in Verbindung.",
      contact_desc: "Unsere Nachbarschaftsaktivitäten stehen Familien, Kindern und Erwachsenen aller Herkunft und Lebenswege offen. Lassen Sie uns wissen, wenn Sie Fragen haben oder teilnehmen möchten!",
      contact_notice_title: "Aktualisierung der Kontaktdaten",
      contact_notice_desc: "Unser schweizweites Adressverzeichnis wird derzeit erstellt. Wenn Sie sich mit einer lokalen Gemeinde in Verbindung setzen möchten, nutzen Sie das Formular oder schreiben Sie uns:",
      contact_office_label: "E-Mail der Kanzlei:",
      form_name_label: "Ihr Name",
      form_error_name: "Bitte geben Sie Ihren Namen ein.",
      form_email_label: "E-Mail-Adresse",
      form_error_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      form_city_label: "Ort / Kanton",
      form_error_city: "Bitte geben Sie Ihren Ort oder Kanton ein.",
      form_topic_label: "Ich interessiere mich für...",
      form_topic_1: "Kinderklassen",
      form_topic_2: "Junioren-Jugendgruppen",
      form_topic_3: "Andachtsversammlungen",
      form_topic_4: "Allgemeine Anfrage",
      form_error_topic: "Bitte wählen Sie ein Interesse aus.",
      form_message_label: "Schreiben Sie Ihre Nachricht hier",
      form_error_message: "Bitte geben Sie Ihre Nachricht ein.",
      form_submit_btn: "Nachricht senden",
      form_success_title: "Nachricht erhalten",
      form_success_desc: "Vielen Dank für Ihre Kontaktaufnahme. Wir verbinden Sie mit einem Koordinator in Ihrer Nähe und melden uns bald bei Ihnen.",
      form_success_reset_btn: "Weitere Nachricht senden",
      footer_brand_desc: "Inspiriert von den Lehren Bahá'u'lláhs zur Förderung des Friedens, zum Abbau von Vorurteilen und zum Aufbau kooperativer Gemeinschaften im Kanton Zug.",
      footer_col_1_title: "Erkunden",
      footer_col_2_title: "Ressourcen",
      footer_col_3_title: "Verbinden",
      footer_link_intl: "Internationale Website",
      footer_link_nat: "Nationale Website Schweiz",
      footer_copy: "Bahá'í von Zug. Inspiriert durch den Aufbau von Einheit. Alle Rechte vorbehalten.",
      footer_portal_desc: "Offizielles Portal des Kantons Zug.",
      admin_portal_link: "Admin-Portal 🔒",
      admin_portal_link_logged: "Abmelden Admin-Portal 🔓",
      admin_btn_edit: "Event bearbeiten",
      admin_btn_delete: "Event löschen",
      login_title: "Login Admin-Portal",
      login_subtitle: "Autorisierter Zugang für die Koordinatoren der Zuger Gemeinde.",
      login_username_label: "Benutzername",
      login_error_user: "Bitte Benutzernamen eingeben.",
      login_password_label: "Passwort",
      login_error_pass: "Bitte Passwort eingeben.",
      login_feedback_error: "Ungültiger Benutzername oder Passwort.",
      login_submit: "Einloggen",
      editor_title_add: "Event hinzufügen",
      editor_title_edit: "Event-Details bearbeiten",
      editor_label_title: "Event-Titel",
      editor_error_title: "Bitte einen Titel eingeben.",
      editor_label_category: "Kategorie",
      editor_label_date: "Datum",
      editor_error_date: "Bitte ein gültiges Datum wählen.",
      editor_label_time: "Uhrzeit",
      editor_error_time: "Bitte Uhrzeit wählen.",
      editor_label_desc: "Event-Beschreibung",
      editor_error_desc: "Bitte eine Beschreibung eingeben.",
      editor_label_loc: "Veranstaltungsort",
      editor_error_loc: "Bitte einen Ort eingeben.",
      editor_label_maps: "Google Maps URL",
      editor_error_maps: "Bitte eine gültige URL eingeben.",
      editor_submit: "Event speichern"
    }
  };

  function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('bahai_zug_lang', lang);
    
    // Toggle active classes on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update all static nodes with data-tr
    document.querySelectorAll('[data-tr]').forEach(node => {
      const key = node.getAttribute('data-tr');
      if (translations[lang] && translations[lang][key]) {
        if (node.tagName === 'TITLE') {
          document.title = translations[lang][key];
        } else if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
          // If we had placeholder translations
        } else {
          node.innerText = translations[lang][key];
        }
      }
    });

    // Sync button toggles states
    activityExpandBtns.forEach(btn => {
      const content = btn.previousElementSibling;
      const isOpen = btn.classList.contains('open');
      const isDe = currentLang === 'de';
      if (isOpen) {
        btn.innerText = isDe ? 'Weniger anzeigen ▴' : 'Show less ▴';
      } else {
        btn.innerText = isDe ? 'Weiterlesen ▾' : 'Read more ▾';
      }
    });

    timelineBtns.forEach(btn => {
      const content = btn.previousElementSibling;
      const isOpen = btn.classList.contains('open');
      const isDe = currentLang === 'de';
      if (isOpen) {
        btn.innerText = isDe ? 'Geschichte schließen ▴' : 'Close history ▴';
      } else {
        btn.innerText = isDe ? 'Ganze Geschichte lesen ▾' : 'Read full history ▾';
      }
    });

    // Refresh dynamic lists
    renderCalendar();
  }

  // Bind language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

  // ==========================================================================
  // 6. Expandable Activity & Timeline Details
  // ==========================================================================
  
  // Dynamic height transitions for activity cards
  const activityExpandBtns = document.querySelectorAll('.act-expand-btn');

  activityExpandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.previousElementSibling;
      const isOpen = btn.classList.contains('open');
      const isDe = currentLang === 'de';

      if (isOpen) {
        content.style.maxHeight = null;
        btn.classList.remove('open');
        btn.innerText = isDe ? 'Weiterlesen ▾' : 'Read more ▾';
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        btn.classList.add('open');
        btn.innerText = isDe ? 'Weniger anzeigen ▴' : 'Show less ▴';
      }
    });
  });

  // Dynamic height transitions for vertical timeline
  const timelineBtns = document.querySelectorAll('.timeline-toggle-btn');

  timelineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.previousElementSibling;
      const isOpen = btn.classList.contains('open');
      const isDe = currentLang === 'de';

      if (isOpen) {
        content.style.maxHeight = null;
        btn.classList.remove('open');
        btn.innerText = isDe ? 'Ganze Geschichte lesen ▾' : 'Read full history ▾';
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        btn.classList.add('open');
        btn.innerText = isDe ? 'Geschichte schließen ▴' : 'Close history ▴';
      }
    });
  });

  // ==========================================================================
  // 7. Virtues Card Generator Widget
  // ==========================================================================
  const generateBtn = document.getElementById('generate-virtue-btn');
  const cardContainer = document.getElementById('virtue-display-card');
  
  const virtueNameEl = document.getElementById('virtue-name');
  const virtueDescEl = document.getElementById('virtue-desc');
  const virtueIconEl = document.getElementById('virtue-icon');
  const virtueQuoteEl = document.getElementById('virtue-quote');
  const virtueAuthorEl = document.getElementById('virtue-quote-author');
  const virtuePromptEl = document.getElementById('virtue-prompt');

  // Array of kid-friendly and reflective virtues (bilingual)
  const virtuesList = [
    {
      name: 'Kindness',
      name_de: 'Güte',
      icon: '❤️',
      desc: 'Kindness is showing care and love to others. You practice kindness when you share your things, speak gentle words, or help someone who is feeling sad.',
      desc_de: 'Güte bedeutet, anderen Fürsorge und Liebe zu zeigen. Du praktizierst Güte, wenn du deine Sachen teilst, freundliche Worte sprichst oder jemandem hilfst, der traurig ist.',
      quote: '"Blessed is he who preferreth his brother before himself."',
      quote_de: '"Gesegnet ist, wer seinen Bruder sich selbst vorzieht."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'What is one kind thing you can do for a friend or classmate today?',
      prompt_de: 'Was ist eine gute Tat, die du heute für einen Freund oder Klassenkameraden tun kannst?'
    },
    {
      name: 'Truthfulness',
      name_de: 'Wahrhaftigkeit',
      icon: '💎',
      desc: 'Truthfulness is telling the truth and being honest in what we say and do. It builds trust and is the foundation for all other good qualities.',
      desc_de: 'Wahrhaftigkeit bedeutet, die Wahrheit zu sagen und ehrlich zu sein in dem, was wir sagen und tun. Es baut Vertrauen auf und ist das Fundament für alle anderen guten Qualitäten.',
      quote: '"Truthfulness is the foundation of all human virtues."',
      quote_de: '"Wahrhaftigkeit ist das Fundament aller menschlichen Tugenden."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'Why is it important to tell the truth, even when it feels difficult?',
      prompt_de: 'Warum ist es wichtig, die Wahrheit zu sagen, selbst wenn es schwierig erscheint?'
    },
    {
      name: 'Unity',
      name_de: 'Einheit',
      icon: '🕊️',
      desc: 'Unity is working together in harmony and respecting each other\'s differences. Like leaves of one tree or waves of one sea, we are all connected.',
      desc_de: 'Einheit bedeutet, in Harmonie zusammenzuarbeiten und die Unterschiede des anderen zu respektieren. Wie Blätter eines Baumes oder Wellen eines Meeres sind wir alle verbunden.',
      quote: '"So powerful is the light of unity that it can illuminate the whole earth."',
      quote_de: '"So mächtig ist das Licht der Einheit, dass es die ganze Erde erleuchten kann."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'How can you help invite someone new to play or work with you today?',
      prompt_de: 'Wie kannst du heute dazu beitragen, jemanden Neues zum Spielen oder Arbeiten einzuladen?'
    },
    {
      name: 'Justice',
      name_de: 'Gerechtigkeit',
      icon: '⚖️',
      desc: 'Justice is being fair and standing up for what is right. It means making sure everyone gets treated with respect and has what they need to grow.',
      desc_de: 'Gerechtigkeit bedeutet, fair zu sein und für das einzustehen, was richtig ist. Es bedeutet sicherzustellen, dass jeder mit Respekt behandelt wird und hat, was er zum Wachsen braucht.',
      quote: '"The best beloved of all things in My sight is Justice..."',
      quote_de: '"Das Geliebteste aller Dinge in Meiner Sicht ist die Gerechtigkeit..."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'What does fairness look like when you are playing a game with friends?',
      prompt_de: 'Wie sieht Fairness aus, wenn du ein Spiel mit Freunden spielst?'
    },
    {
      name: 'Patience',
      name_de: 'Geduld',
      icon: '⏳',
      desc: 'Patience is waiting calmly when things take time, and keeping a peaceful heart even when faced with difficulties or delays.',
      desc_de: 'Geduld bedeutet, gelassen zu warten, wenn die Dinge Zeit brauchen, und ein friedliches Herz zu bewahren, selbst wenn man mit Schwierigkeiten oder Verzögerungen konfrontiert wird.',
      quote: '"Patience is a key which openeth the door of all achievements."',
      quote_de: '"Geduld ist ein Schlüssel, der die Tür zu allen Errungenschaften öffnet."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'When you feel impatient today, how can taking a deep breath help you stay calm?',
      prompt_de: 'Wenn du dich heute ungeduldig fühlst, wie kann tiefes Einatmen dir helfen, ruhig zu bleiben?'
    },
    {
      name: 'Cooperation',
      name_de: 'Zusammenarbeit',
      icon: '🤝',
      desc: 'Cooperation is working together to achieve a common goal. When we cooperate, we combine our strengths to do things we couldn\'t do alone.',
      desc_de: 'Zusammenarbeit bedeutet, gemeinsam an einem Ziel zu arbeiten. Wenn wir kooperieren, vereinen wir unsere Stärken, um Dinge zu tun, die wir alleine nicht schaffen würden.',
      quote: '"Cooperation and reciprocity are essential properties which are inherent in the unified body..."',
      quote_de: '"Kooperation und Gegenseitigkeit sind wesentliche Eigenschaften, die dem geeinten Körper innewohnen..."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'What is a helpful task you can cooperate on with a family member today?',
      prompt_de: 'Bei welcher hilfreichen Aufgabe kannst du heute mit einem Familienmitglied zusammenarbeiten?'
    },
    {
      name: 'Generosity',
      name_de: 'Großzügigkeit',
      icon: '🎁',
      desc: 'Generosity is sharing what we have with others happily. It isn\'t just about gifts; it means sharing your time, smiles, help, and kind thoughts.',
      desc_de: 'Großzügigkeit bedeutet, das, was wir haben, gerne mit anderen zu teilen. Es geht nicht nur um Geschenke; es bedeutet, Zeit, ein Lächeln, Hilfe und freundliche Gedanken zu teilen.',
      quote: '"Be generous in prosperity, and thankful in adversity."',
      quote_de: '"Sei großzügig im Wohlstand und dankbar im Unglück."',
      author: '— Bahá\'í Writings',
      author_de: '— Bahá\'í-Schriften',
      prompt: 'How can you share your happiness or helper skills with someone today?',
      prompt_de: 'Wie kannst du heute deine Freude oder deine Fähigkeiten als Helfer mit jemandem teilen?'
    }
  ];

  let lastVirtueIndex = -1;

  function generateVirtue() {
    if (!generateBtn || !cardContainer) return;
    let randomIndex;
    
    // Make sure we select a different virtue than the one currently shown
    do {
      randomIndex = Math.floor(Math.random() * virtuesList.length);
    } while (randomIndex === lastVirtueIndex);

    lastVirtueIndex = randomIndex;
    const selectedVirtue = virtuesList[randomIndex];

    // Trigger card flip flip-reveal animation
    cardContainer.classList.add('reveal-anim');

    // Wait until card is rotated halfway (250ms) to swap data
    setTimeout(() => {
      const isDe = currentLang === 'de';
      virtueNameEl.innerText = isDe ? selectedVirtue.name_de : selectedVirtue.name;
      virtueDescEl.innerText = isDe ? selectedVirtue.desc_de : selectedVirtue.desc;
      virtueIconEl.innerText = selectedVirtue.icon;
      virtueQuoteEl.innerText = isDe ? selectedVirtue.quote_de : selectedVirtue.quote;
      virtueAuthorEl.innerText = isDe ? selectedVirtue.author_de : selectedVirtue.author;
      virtuePromptEl.innerText = isDe ? selectedVirtue.prompt_de : selectedVirtue.prompt;
      
      // Remove translation key so it doesn't revert to static init state on switch
      virtueNameEl.removeAttribute('data-tr');
      virtueDescEl.removeAttribute('data-tr');
      virtueQuoteEl.removeAttribute('data-tr');
      virtueAuthorEl.removeAttribute('data-tr');
      virtuePromptEl.removeAttribute('data-tr');
    }, 250);

    // Remove class when animation ends (600ms)
    setTimeout(() => {
      cardContainer.classList.remove('reveal-anim');
    }, 600);
  }

  if (generateBtn && cardContainer) {
    generateBtn.addEventListener('click', generateVirtue);
  }

  // ==========================================================================
  // 8. Contact Inquiry Form Client Validation
  // ==========================================================================
  const contactForm = document.getElementById('bahai-contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const formSuccess = document.getElementById('form-success');
  const formResetBtn = document.getElementById('form-reset-btn');

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function checkFieldValidity(inputElement, checkFn) {
    if (!inputElement) return true;
    const parent = inputElement.parentElement;
    const isValid = checkFn(inputElement.value);
    
    if (!isValid) {
      parent.classList.add('error');
      return false;
    } else {
      parent.classList.remove('error');
      return true;
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('c-name');
      const emailInput = document.getElementById('c-email');
      const cityInput = document.getElementById('c-city');
      const topicInput = document.getElementById('c-topic');
      const messageInput = document.getElementById('c-message');

      const isNotEmpty = val => val.trim().length > 0;
      const isEmailValid = val => validateEmail(val);

      // Perform validation audits
      const nameOk = checkFieldValidity(nameInput, isNotEmpty);
      const emailOk = checkFieldValidity(emailInput, isEmailValid);
      const cityOk = checkFieldValidity(cityInput, isNotEmpty);
      const topicOk = checkFieldValidity(topicInput, isNotEmpty);
      const messageOk = checkFieldValidity(messageInput, isNotEmpty);

      // Setup dynamic listeners to clear warning lines
      if (nameInput) nameInput.addEventListener('input', () => checkFieldValidity(nameInput, isNotEmpty));
      if (emailInput) emailInput.addEventListener('input', () => checkFieldValidity(emailInput, isEmailValid));
      if (cityInput) cityInput.addEventListener('input', () => checkFieldValidity(cityInput, isNotEmpty));
      if (topicInput) topicInput.addEventListener('change', () => checkFieldValidity(topicInput, isNotEmpty));
      if (messageInput) messageInput.addEventListener('input', () => checkFieldValidity(messageInput, isNotEmpty));

      if (nameOk && emailOk && cityOk && topicOk && messageOk) {
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');

        setTimeout(() => {
          contactForm.classList.add('hidden');
          formSuccess.classList.remove('hidden');
          contactForm.reset();
          
          const fields = contactForm.querySelectorAll('.input-field');
          fields.forEach(f => f.classList.remove('error'));
        }, 1500);
      }
    });

    if (formResetBtn) {
      formResetBtn.addEventListener('click', () => {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
      });
    }
  }

  // ==========================================================================
  // 9. Zug Community Calendar & LocalStorage CRUD System
  // ==========================================================================
  
  // Element selectors
  const calendarDaysContainer = document.getElementById('calendar-days');
  const calMonthYearLabel = document.getElementById('cal-month-year');
  const calPrevBtn = document.getElementById('cal-prev-month');
  const calNextBtn = document.getElementById('cal-next-month');
  const upcomingEventsList = document.getElementById('upcoming-events-list');
  
  // Modals
  const eventDetailsModal = document.getElementById('event-details-modal');
  const loginModal = document.getElementById('login-modal');
  const eventEditorModal = document.getElementById('event-editor-modal');
  
  // Admin triggers & Banners & Badges
  const adminPortalLink = document.getElementById('admin-portal-link');
  const adminBanner = document.getElementById('admin-banner');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');
  const adminAddEventBtn = document.getElementById('admin-add-event-btn');
  const adminNavBadge = document.getElementById('admin-nav-badge');
  const adminCalBadge = document.getElementById('admin-cal-badge');
  
  // Close buttons
  const closeDetailsBtn = document.getElementById('close-details-btn');
  const closeLoginBtn = document.getElementById('close-login-btn');
  const closeEditorBtn = document.getElementById('close-editor-btn');
  
  // Login Form
  const adminLoginForm = document.getElementById('admin-login-form');
  const loginUsernameInput = document.getElementById('login-username');
  const loginPasswordInput = document.getElementById('login-password');
  const loginFeedback = document.getElementById('login-feedback');
  
  // Editor Form
  const eventEditorForm = document.getElementById('event-editor-form');
  const editEventIdInput = document.getElementById('edit-event-id');
  const eventTitleInput = document.getElementById('event-title');
  const eventCategorySelect = document.getElementById('event-category');
  const eventDateInput = document.getElementById('event-date');
  const eventTimeInput = document.getElementById('event-time');
  const eventDescTextarea = document.getElementById('event-description');
  const eventLocationInput = document.getElementById('event-location');
  const eventMapsLinkInput = document.getElementById('event-maps-link');
  const editorModalTitle = document.getElementById('editor-modal-title');
  const editorSaveBtn = document.getElementById('editor-save-btn');
  
  // Details Modal Fields
  const eventDetailCategory = document.getElementById('event-detail-category');
  const eventDetailTitle = document.getElementById('event-detail-title');
  const eventDetailDatetime = document.getElementById('event-detail-datetime');
  const eventDetailDesc = document.getElementById('event-detail-desc');
  const eventDetailLocationName = document.getElementById('event-detail-location-name');
  const mapsLinkContainer = document.getElementById('maps-link-container');
  const adminEventActions = document.getElementById('admin-event-actions');
  const adminEditEventBtn = document.getElementById('admin-edit-event-btn');
  const adminDeleteEventBtn = document.getElementById('admin-delete-event-btn');

  // Baseline dates (Defaults to Q3 2026 - July)
  let calendarDate = new Date(2026, 6, 1); // July 2026
  let selectedEvent = null;
  let isAdmin = sessionStorage.getItem('bahai_admin_logged') === 'true';

  // Seed events database if empty (bilingual details)
  const defaultEvents = [
    {
      id: 'event-zug-1',
      title: 'Zugerberg Devotional Gathering',
      title_de: 'Andacht auf dem Zugerberg',
      category: 'devotionals',
      date: '2026-07-05',
      time: '10:00',
      description: 'A serene neighborhood gathering to share prayers, uplifting readings, and reflective music from various traditions. Families and kids are welcome to read or play music. Meet at the main Zugerberg viewpoint area (we will move into the pavilion in case of rain).',
      description_de: 'Ein ruhiges Treffen in der Nachbarschaft, um Gebete, erbauliche Lesungen und meditative Musik aus verschiedenen Traditionen zu teilen. Familien und Kinder sind herzlich eingeladen. Treffpunkt am Aussichtspunkt Zugerberg (bei Regen im Pavillon).',
      location: 'Zugerberg Viewpoint, Zug',
      location_de: 'Aussichtspunkt Zugerberg, Zug',
      mapsLink: 'https://maps.app.goo.gl/vG9Qe2e5Wf2q3nF6A'
    },
    {
      id: 'event-zug-2',
      title: 'Children\'s Moral Virtues Study Class',
      title_de: 'Kinderklasse für moralische Tugenden',
      category: 'children',
      date: '2026-07-12',
      time: '14:00',
      description: 'Children study essential virtues through stories, cooperative games, songs, and painting. Theme of this week: "Kindness and cooperation in the family." Open to all children in Zug ages 5-10.',
      description_de: 'Kinder untersuchen wesentliche Tugenden durch Geschichten, kooperative Spiele, Lieder und Malen. Thema dieser Woche: „Güte und Zusammenarbeit in der Familie“. Offen für alle Kinder in Zug im Alter von 5-10 Jahren.',
      location: 'Gubelstrasse 12, Zug',
      location_de: 'Gubelstrasse 12, Zug',
      mapsLink: 'https://maps.app.goo.gl/9K1tHw8FzK9J4r3x7'
    },
    {
      id: 'event-zug-3',
      title: 'Junior Youth Empowerment Group',
      title_de: 'Empowerment-Gruppe für Junioren',
      category: 'youth',
      date: '2026-07-15',
      time: '18:00',
      description: 'A friendly group discussion circle for adolescents ages 11-15. We are discussing environment care and planning a cooperative local service project to clean up near the lake. Pizza and snacks are provided!',
      description_de: 'Ein freundlicher Gesprächskreis für Jugendliche im Alter von 11-15 Jahren. Wir sprechen über Umweltschutz und planen ein lokales Hilfsprojekt zur Reinigung am See. Pizza und Snacks werden bereitgestellt!',
      location: 'Baar Community Room, Baar (Zug)',
      location_de: 'Gemeinschaftsraum Baar, Baar (Zug)',
      mapsLink: 'https://maps.app.goo.gl/5rT4n2J8Wf2q3eF8B'
    },
    {
      id: 'event-zug-4',
      title: 'Canton Zug Study Circle',
      title_de: 'Studienkreis Kanton Zug',
      category: 'study',
      date: '2026-07-22',
      time: '19:30',
      description: 'Exploring spiritual writings and our capability to serve our neighborhoods. The group will discuss Ruhi Book 1: Reflections on the Life of the Spirit. New participants are welcome to sit in.',
      description_de: 'Gemeinsames Studium geistiger Schriften zur Stärkung unserer Fähigkeit, der Nachbarschaft zu dienen. Die Gruppe bespricht Ruhi-Buch 1: Reflexionen über das Leben des Geistes. Neue Teilnehmer sind herzlich willkommen.',
      location: 'Dufourstrasse Community Hall, Zug',
      location_de: 'Gemeindesaal Dufourstrasse, Zug',
      mapsLink: 'https://maps.app.goo.gl/mR9Wf2T6K9J4r8n6'
    }
  ];

  function getEvents() {
    const stored = localStorage.getItem('bahai_zug_events');
    if (!stored) {
      localStorage.setItem('bahai_zug_events', JSON.stringify(defaultEvents));
      return defaultEvents;
    }
    return JSON.parse(stored);
  }

  function saveEvents(events) {
    localStorage.setItem('bahai_zug_events', JSON.stringify(events));
  }

  // ==========================================================================
  // Calendar Rendering
  // ==========================================================================
  function renderCalendar() {
    if (!calendarDaysContainer) return;

    calendarDaysContainer.innerHTML = '';
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const isDe = currentLang === 'de';

    // Month Year text header
    const monthNamesEn = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthNamesDe = [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ];
    
    const monthNames = isDe ? monthNamesDe : monthNamesEn;
    calMonthYearLabel.innerText = `${monthNames[month]} ${year}`;

    // Get calendar math
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust day index for European Mon-Sun sequence (JS default is Sun=0)
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Stored events
    const allEvents = getEvents();

    // Generate padding empty days
    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day empty';
      calendarDaysContainer.appendChild(emptyCell);
    }

    // Generate monthly days
    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // Highlight today (mock today is July 4, 2026 for showcase, or real system today if matching)
      const systemToday = new Date();
      if (systemToday.getFullYear() === year && systemToday.getMonth() === month && systemToday.getDate() === day) {
        dayCell.classList.add('today');
      } else if (year === 2026 && month === 6 && day === 4) { // Dummified today anchor for July 2026
        dayCell.classList.add('today');
      }

      const dayNumber = document.createElement('span');
      dayNumber.className = 'calendar-day-number';
      dayNumber.innerText = day;
      dayCell.appendChild(dayNumber);

      const eventsContainer = document.createElement('div');
      eventsContainer.className = 'calendar-day-events';

      // Find events matching this day
      const dayEvents = allEvents.filter(ev => ev.date === dateStr);
      
      dayEvents.forEach(event => {
        const label = document.createElement('button');
        label.className = `calendar-event-label ${event.category}`;
        
        // Handle bilingual event rendering
        const displayTitle = isDe && event.title_de ? event.title_de : event.title;
        label.innerText = displayTitle;
        label.title = `${event.time} - ${displayTitle}`;
        
        label.addEventListener('click', (e) => {
          e.stopPropagation();
          openDetailsModal(event);
        });
        
        eventsContainer.appendChild(label);
      });

      dayCell.appendChild(eventsContainer);

      // Clicking cell opens blank event form if admin, or does nothing if user
      dayCell.addEventListener('click', () => {
        if (isAdmin) {
          openEditorModal(null, dateStr);
        }
      });

      calendarDaysContainer.appendChild(dayCell);
    }

    renderUpcomingEventsList(allEvents);
  }

  function renderUpcomingEventsList(events) {
    if (!upcomingEventsList) return;

    upcomingEventsList.innerHTML = '';
    const isDe = currentLang === 'de';
    
    // Sort events by date and time chronological
    const sorted = [...events].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });

    // Take top 4 upcoming events
    const upcoming = sorted.slice(0, 4);

    if (upcoming.length === 0) {
      upcomingEventsList.innerHTML = `<p class="text-muted">${isDe ? 'Derzeit keine geplanten Veranstaltungen.' : 'No scheduled events at this time.'}</p>`;
      return;
    }

    upcoming.forEach(event => {
      const item = document.createElement('div');
      item.className = 'upcoming-event-item';
      
      const localeCode = isDe ? 'de-DE' : 'en-US';
      const formattedDate = new Date(event.date).toLocaleDateString(localeCode, {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
      });

      const displayTitle = isDe && event.title_de ? event.title_de : event.title;
      const displayLocation = isDe && event.location_de ? event.location_de : event.location;
      const displayCategory = isDe && translations.de[`form_topic_${getCategoryIndex(event.category)}`] 
                                ? translations.de[`form_topic_${getCategoryIndex(event.category)}`] 
                                : event.category;

      item.innerHTML = `
        <div class="upcoming-event-header">
          <span class="upcoming-event-badge ${event.category}">${displayCategory}</span>
          <span class="upcoming-event-date">${formattedDate} - ${event.time}</span>
        </div>
        <h4 class="upcoming-event-title text-serif">${displayTitle}</h4>
        <p class="upcoming-event-location">📍 ${displayLocation}</p>
      `;

      item.addEventListener('click', () => {
        openDetailsModal(event);
      });

      upcomingEventsList.appendChild(item);
    });
  }

  function getCategoryIndex(cat) {
    switch (cat) {
      case 'children': return 1;
      case 'youth': return 2;
      case 'devotionals': return 3;
      case 'study': return 4;
      default: return 4;
    }
  }

  // Navigate calendar months
  if (calPrevBtn && calNextBtn) {
    calPrevBtn.addEventListener('click', () => {
      calendarDate.setMonth(calendarDate.getMonth() - 1);
      renderCalendar();
    });

    calNextBtn.addEventListener('click', () => {
      calendarDate.setMonth(calendarDate.getMonth() + 1);
      renderCalendar();
    });
  }

  // ==========================================================================
  // Auth Controls (Login / Logout)
  // ==========================================================================
  function updateAdminUI() {
    const isDe = currentLang === 'de';
    if (isAdmin) {
      body.classList.add('admin-mode-active');
      adminBanner.classList.remove('hidden');
      adminAddEventBtn.classList.remove('hidden');
      adminNavBadge.classList.remove('hidden');
      adminCalBadge.classList.remove('hidden');
      adminPortalLink.innerHTML = isDe ? 'Abmelden Admin-Portal 🔓' : 'Log Out Admin Portal 🔓';
    } else {
      body.classList.remove('admin-mode-active');
      adminBanner.classList.add('hidden');
      adminAddEventBtn.classList.add('hidden');
      adminNavBadge.classList.add('hidden');
      adminCalBadge.classList.add('hidden');
      adminPortalLink.innerHTML = isDe ? 'Admin-Portal 🔒' : 'Admin Portal 🔒';
    }
    renderCalendar();
  }

  if (adminPortalLink) {
    adminPortalLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAdmin) {
        // Logout sequence
        isAdmin = false;
        sessionStorage.setItem('bahai_admin_logged', 'false');
        updateAdminUI();
      } else {
        // Open login
        loginModal.classList.remove('hidden');
        loginUsernameInput.focus();
      }
    });
  }

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdmin = false;
      sessionStorage.setItem('bahai_admin_logged', 'false');
      updateAdminUI();
    });
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = loginUsernameInput.value.trim();
      const password = loginPasswordInput.value.trim();

      if (username === 'admin' && password === 'zug') {
        isAdmin = true;
        sessionStorage.setItem('bahai_admin_logged', 'true');
        loginModal.classList.add('hidden');
        adminLoginForm.reset();
        loginFeedback.classList.add('hidden');
        updateAdminUI();
      } else {
        loginFeedback.classList.remove('hidden');
      }
    });
  }

  // ==========================================================================
  // Event Details Modal
  // ==========================================================================
  function openDetailsModal(event) {
    selectedEvent = event;
    const isDe = currentLang === 'de';

    const displayTitle = isDe && event.title_de ? event.title_de : event.title;
    const displayDesc = isDe && event.description_de ? event.description_de : event.description;
    const displayLocation = isDe && event.location_de ? event.location_de : event.location;
    const displayCategory = isDe && translations.de[`form_topic_${getCategoryIndex(event.category)}`] 
                              ? translations.de[`form_topic_${getCategoryIndex(event.category)}`] 
                              : event.category;

    eventDetailTitle.innerText = displayTitle;
    eventDetailCategory.innerText = displayCategory;
    eventDetailCategory.className = `event-category-badge ${event.category}`;
    
    const localeCode = isDe ? 'de-DE' : 'en-US';
    const formattedDate = new Date(event.date).toLocaleDateString(localeCode, {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    eventDetailDatetime.innerText = `${formattedDate} ${isDe ? 'um' : 'at'} ${event.time}`;
    eventDetailDesc.innerText = displayDesc;
    eventDetailLocationName.innerText = displayLocation;

    // Render maps redirect link
    mapsLinkContainer.innerHTML = '';
    if (event.mapsLink && event.mapsLink.trim().length > 0) {
      const mapBtn = document.createElement('a');
      mapBtn.href = event.mapsLink;
      mapBtn.target = '_blank';
      mapBtn.className = 'btn-maps-redirect';
      mapBtn.innerHTML = isDe ? '🗺️ Auf Google Maps anzeigen' : '🗺️ View on Google Maps';
      mapsLinkContainer.appendChild(mapBtn);
    } else {
      mapsLinkContainer.innerHTML = `<span class="text-muted" style="font-size:0.8rem; font-style:italic;">${isDe ? 'Kein Kartenlink hinterlegt.' : 'Location map link not registered.'}</span>`;
    }

    // Toggle admin actions
    if (isAdmin) {
      adminEventActions.classList.remove('hidden');
    } else {
      adminEventActions.classList.add('hidden');
    }

    eventDetailsModal.classList.remove('hidden');
  }

  // ==========================================================================
  // Event Editor Form Modal
  // ==========================================================================
  function openEditorModal(event = null, dateStr = '') {
    eventDetailsModal.classList.add('hidden'); // Close detail modal if open
    const isDe = currentLang === 'de';
    
    if (event) {
      // Edit mode
      editorModalTitle.innerText = isDe ? translations.de.editor_title_edit : translations.en.editor_title_edit;
      editEventIdInput.value = event.id;
      eventTitleInput.value = event.title;
      eventCategorySelect.value = event.category;
      eventDateInput.value = event.date;
      eventTimeInput.value = event.time;
      eventDescTextarea.value = event.description;
      eventLocationInput.value = event.location;
      eventMapsLinkInput.value = event.mapsLink || '';
      
      // Store German counterparts during editing if they already exist
      eventEditorForm.dataset.titleDe = event.title_de || '';
      eventEditorForm.dataset.descDe = event.description_de || '';
      eventEditorForm.dataset.locDe = event.location_de || '';
    } else {
      // Create mode
      editorModalTitle.innerText = isDe ? translations.de.editor_title_add : translations.en.editor_title_add;
      eventEditorForm.reset();
      editEventIdInput.value = '';
      eventEditorForm.removeAttribute('data-title-de');
      eventEditorForm.removeAttribute('data-desc-de');
      eventEditorForm.removeAttribute('data-loc-de');
      if (dateStr) {
        eventDateInput.value = dateStr;
      }
    }
    
    eventEditorModal.classList.remove('hidden');
  }

  if (adminAddEventBtn) {
    adminAddEventBtn.addEventListener('click', () => {
      openEditorModal();
    });
  }

  if (eventEditorForm) {
    eventEditorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const isDe = currentLang === 'de';

      // Check fields
      const isNotEmpty = val => val.trim().length > 0;
      const titleOk = checkFieldValidity(eventTitleInput, isNotEmpty);
      const dateOk = checkFieldValidity(eventDateInput, isNotEmpty);
      const timeOk = checkFieldValidity(eventTimeInput, isNotEmpty);
      const descOk = checkFieldValidity(eventDescTextarea, isNotEmpty);
      const locOk = checkFieldValidity(eventLocationInput, isNotEmpty);

      // Validate inputs
      if (titleOk && dateOk && timeOk && descOk && locOk) {
        let eventsList = getEvents();
        const id = editEventIdInput.value;

        // Construct standard properties (written in whatever current language the editor is in)
        const typedTitle = eventTitleInput.value.trim();
        const typedDesc = eventDescTextarea.value.trim();
        const typedLoc = eventLocationInput.value.trim();

        // Prepare bilingual nodes: if we are in German, set De props. If English, set English props.
        const eventData = {
          category: eventCategorySelect.value,
          date: eventDateInput.value,
          time: eventTimeInput.value,
          mapsLink: eventMapsLinkInput.value.trim()
        };

        if (isDe) {
          eventData.title_de = typedTitle;
          eventData.description_de = typedDesc;
          eventData.location_de = typedLoc;
          // Retrieve previous English copies or default to same
          eventData.title = eventEditorForm.dataset.titleEn || typedTitle;
          eventData.description = eventEditorForm.dataset.descEn || typedDesc;
          eventData.location = eventEditorForm.dataset.locEn || typedLoc;
        } else {
          eventData.title = typedTitle;
          eventData.description = typedDesc;
          eventData.location = typedLoc;
          // Retrieve previous German copies
          eventData.title_de = eventEditorForm.dataset.titleDe || typedTitle;
          eventData.description_de = eventEditorForm.dataset.descDe || typedDesc;
          eventData.location_de = eventEditorForm.dataset.locDe || typedLoc;
        }

        if (id) {
          // Edit operation
          const index = eventsList.findIndex(ev => ev.id === id);
          if (index !== -1) {
            eventData.id = id;
            eventsList[index] = eventData;
          }
        } else {
          // Create operation
          eventData.id = 'event-zug-' + Date.now();
          eventsList.push(eventData);
        }

        saveEvents(eventsList);
        eventEditorModal.classList.add('hidden');
        renderCalendar();
      }
    });
  }

  // Edit action inside details modal
  if (adminEditEventBtn) {
    adminEditEventBtn.addEventListener('click', () => {
      if (selectedEvent) {
        // Save alternative language tags to form dataset before editing
        eventEditorForm.dataset.titleEn = selectedEvent.title || '';
        eventEditorForm.dataset.descEn = selectedEvent.description || '';
        eventEditorForm.dataset.locEn = selectedEvent.location || '';
        openEditorModal(selectedEvent);
      }
    });
  }

  // Delete action inside details modal
  if (adminDeleteEventBtn) {
    adminDeleteEventBtn.addEventListener('click', () => {
      const isDe = currentLang === 'de';
      const confirmMsg = isDe 
        ? `Sind Sie sicher, dass Sie die Veranstaltung: "${selectedEvent.title_de || selectedEvent.title}" löschen möchten?`
        : `Are you sure you want to delete the event: "${selectedEvent.title}"?`;

      if (selectedEvent && confirm(confirmMsg)) {
        let eventsList = getEvents();
        eventsList = eventsList.filter(ev => ev.id !== selectedEvent.id);
        saveEvents(eventsList);
        eventDetailsModal.classList.add('hidden');
        renderCalendar();
      }
    });
  }

  // ==========================================================================
  // Close Modals Listeners
  // ==========================================================================
  function closeAllModals() {
    eventDetailsModal.classList.add('hidden');
    loginModal.classList.add('hidden');
    eventEditorModal.classList.add('hidden');
    loginFeedback.classList.add('hidden');
    adminLoginForm.reset();
  }

  [closeDetailsBtn, closeLoginBtn, closeEditorBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', closeAllModals);
  });

  // Clicking overlay outer container closes it
  [eventDetailsModal, loginModal, eventEditorModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAllModals();
      });
    }
  });

  // Esc key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });



  // ==========================================================================
  // Initial Page Boot sequence
  // ==========================================================================
  switchLanguage(currentLang);
  updateAdminUI();
});
