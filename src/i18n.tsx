import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'de' | 'en' | 'fr' | 'it';

export const translations = {
  de: {
    meta: {
      title: 'Putzen Bern | Umzug & Reinigung',
      description: 'Professionelle Umzüge und Reinigungen in Bern. Ihr Partner für stressfreie Wohnungswechsel, Geschäftsraumreinigungen und mehr.'
    },
    nav: {
      home: 'Home',
      services: 'Leistungen',
      about: 'Über uns',
      references: 'Referenzen',
      faq: 'FAQ',
      book: 'Termin buchen',
      offerte: 'Offerte anfragen'
    },
    hero: {
      title1: 'Stressfreier ',
      title2: 'Umzug,',
      title3: ' makelloser ',
      title4: 'Glanz.',
      desc: 'Wir organisieren sorgenfreie Umzüge und professionelle Reinigungen für Wohn- und Geschäftsräume in Bern und Umgebung. Ein Ansprechpartner, alles aus einer Hand.',
      cta: 'Termin buchen'
    },
    trust: {
      title1: 'Eine Frage ',
      title2: 'des Vertrauens.',
      desc: 'Die Qualität unserer Arbeit spiegelt sich nicht nur in der Sauberkeit wider, sondern auch in der Loyalität unserer Schweizer Kunden.',
      stat1: 'Erfolgreiche Umzüge und Reinigungen in Bern',
      stat2: 'Jahre Expertise in Reinigung und Transport',
      stat3: 'Stammkunden, die uns regelmässig vertrauen'
    },
    about: {
      philosophy_label: 'Die Putzen Philosophie',
      title1: 'Ein reibungsloser Start ',
      title2: 'in organisierte Räume.',
      p1: 'Mit Schweizer Präzision und organisierter Planung nehmen wir Ihnen die Last von den Schultern. Ob reibungsloser Umzug von A nach B, die besenreine Räumung oder die Tiefenreinigung mit Abgabegarantie – wir sorgen für einen stressfreien Wechsel, sodass Sie in Ihrem neuen Zuhause entspannt ankommen.',
      p2: 'Wir setzen auf umweltfreundliche Mittel, modernstes Equipment und ein festes Team, das Ihre Privatsphäre respektiert. Qualität, die man sieht – und spürt.',
      cta: 'Mehr erfahren'
    },
    services: {
      title1: 'Spezialisierte ',
      title2: 'Leistungen.',
      desc: 'Massgeschneiderte Reinigungs- und Umzugskonzepte, entwickelt für den stressfreien Wechsel und die individuellen Ansprüche unterschiedlicher Umgebungen.',
      items: [
        { title: 'Wohnraumreinigung', desc: 'Tiefenreinigung und Pflege für Ihr Zuhause. Wir behandeln Ihre persönlichen Räume mit grösstem Respekt, nutzen exklusive, umweltfreundliche Produkte und achten auf jedes Detail.' },
        { title: 'Geschäftsräume', desc: 'Smarte Workspaces, die Produktivität fördern. Wir schaffen makellose Umgebungen für Büros, Praxen und Boutiquen im Herzen von Bern.' },
        { title: 'Umzugsreinigung', desc: 'Ein makelloses Umfeld für neue Anfänge. Umfassende Tiefenreinigung mit Abgabegarantie für Wohnungen und Häuser bei Mieterwechseln.' },
        { title: 'Rundum-Umzüge', desc: 'Stressfreier Umzug von A bis Z. Mit sorgfältiger Planung, sicherem Transport und professioneller Handhabung garantieren wir einen reibungslosen Wohnungswechsel.' },
        { title: 'Fenster- & Glasreinigung', desc: 'Streifenfreie Sicht für brillante Räume. Wir sorgen für saubere, strahlende Fenster, Glaswände und Rahmen, die Licht und Klarheit hereinlassen.' },
        { title: 'Baureinigung', desc: 'Spezialreinigung nach Neu- oder Umbauten. Wir beseitigen unschönen Bauschutt, hartnäckigen Feinstaub und Farbreste restlos, damit Ihre Räume schnellstmöglich bezugsbereit sind.' }
      ]
    },
    process: {
      title1: 'Der Weg zum ',
      title2: 'stressfreien Wechsel.',
      desc: 'Ein transparenter und strukturierter Prozess für Reinigungsprozesse und Umzüge – von der ersten Beratung bis zur finalen Abnahme.',
      items: [
        { title: 'Planung & Offerte', desc: 'Nach einer Anfrage oder Besichtigung erstellen wir einen massgeschneiderten Plan und ein transparentes Angebot – ganz unverbindlich per E-Mail.' },
        { title: 'Ausführung & Logistik', desc: 'Ob gründliche Tiefenreinigung oder sicherer Möbeltransport: Unsere Fachkräfte arbeiten mit grösster Sorgfalt, professionellem Equipment und ökologischen Methoden.' },
        { title: 'Übergabe & Garantie', desc: 'Wir übergeben Ihre alten oder neuen Räume makellos. Bei Umzugsreinigungen profitieren Sie von der definitiven Abnahmegarantie für eine stressfreie Verwaltung.' }
      ]
    },
    references: {
      title1: 'Worte unserer ',
      title2: 'Kunden.',
      desc: 'Vertrauen basiert auf konsistenten Ergebnissen. Lesen Sie, was Kunden über unsere Arbeit in Bern berichten.',
      items: [
        { quote: 'Der komplette Umzug lief einwandfrei – von der sicheren Verpackung bis zur schlüsselfertigen Wohnungsabgabe. Wir mussten uns wirklich um gar nichts kümmern.', author: 'Elena M.', role: 'CEO, Architektur AG' },
        { quote: 'Die Liebe zum Detail und die Diskretion des Teams sind bemerkenswert. Sowohl beim Transport unserer Möbel als auch bei der Reinigung der neuen Räume sensationell.', author: 'Marc & Sophie T.', role: 'Privatkunden, Kirchenfeld' },
        { quote: 'Ökologisch, präzise und absolut zuverlässig. Für unsere Boutique in der Altstadt und schnelle Transporte kommt kein anderer Partner mehr in Frage.', author: 'David H.', role: 'Inhaber, Concept Store' }
      ]
    },
    before_after: {
      title1: 'Sichtbare ',
      title2: 'Resultate.',
      desc: 'Überzeugen Sie sich selbst von der Qualität unserer Arbeit. Die Resultate unserer Tiefenreinigungen sprechen für sich – vorher und nachher im direkten Vergleich.',
      slider_handle: 'Ziehen zum Vergleichen',
      before: 'Vorher',
      after: 'Nachher'
    },
    calculator: {
      title1: 'Preis ',
      title2: 'kalkulieren.',
      desc: 'Erhalten Sie in wenigen Sekunden eine unverbindliche Kostenschätzung für Ihr Projekt.',
      service_label: 'Dienstleistung',
      service_cleaning: 'Endreinigung',
      service_moving: 'Umzug',
      service_both: 'Umzug & Reinigung',
      rooms_label: 'Anzahl Zimmer',
      sqm_label: 'Wohnfläche (m²)',
      calculate_btn: 'Kosten berechnen',
      estimate_title: 'Geschätzte Kosten:',
      estimate_disclaimer: '*Dies ist ein Richtwert. Für eine genaue Offerte kontaktieren Sie uns gerne.',
      chf: 'CHF'
    },
    service_area: {
      title1: 'Ganze ',
      title2: 'Schweiz.',
      desc: 'Wir sind in Bern, Zürich, Basel, Luzern und der gesamten Schweiz für Sie im Einsatz – pünktlich, zuverlässig und direkt bei Ihnen vor Ort.',
      regions: ['Köniz', 'Ostermundigen', 'Muri b. Bern', 'Bümpliz', 'Worb', 'Belp', 'Ittigen', 'Münsingen', 'Thun', 'Wabern', 'Liebefeld', 'Kehrsatz', 'Zürich', 'Basel', 'Luzern']
    },
    team: {
      title1: 'Wer wir ',
      title2: 'sind.',
      desc: 'Ein eingespieltes Team aus Profis, die Sauberkeit und Zuverlässigkeit leben. Wir legen Wert auf Diskretion, Gründlichkeit und ein freundliches Auftreten.',
      member1_name: 'Elena Rostova',
      member1_role: 'Qualitätsmanagement',
      member2_name: 'Marco Weber',
      member2_role: 'Operations & Logistik'
    },
    guarantee: {
      badge: 'Mit Abnahmegarantie'
    },
    stats: {
      stat1_num: '1.2k+',
      stat1_text: 'Gereinigte Objekte',
      stat2_num: '100%',
      stat2_text: 'Abnahmegarantie',
      stat3_num: '10',
      stat3_text: 'Jahre Expertise'
    },
    marquee: ['ECO-FRIENDLY', 'PREMIUM SERVICE', 'ZUVERLÄSSIG', 'DISKRET', 'FLEXIBEL', 'SCHNELL'],
    gallery: {
      title1: 'Unser ',
      title2: 'Auge fürs Detail.',
      desc: 'Einblicke in unsere tägliche Arbeit. Wir hinterlassen nichts als makellose Sauberkeit.'
    },
    contact_form: {
      title1: 'Lassen Sie uns ',
      title2: 'sprechen.',
      desc: 'Haben Sie Fragen oder möchten Sie direkt ein Angebot anfordern? Schreiben Sie uns.',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      submit: 'Nachricht senden',
      success: 'Vielen Dank für Ihre Nachricht.',
      error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
    },
    faq: {
      title1: 'Häufige ',
      title2: 'Fragen.',
      desc: 'Alles, was Sie über unsere Arbeitsweise, Konditionen und Standards wissen müssen.',
      items: [
        { q: 'Wie setzen sich Ihre Preise zusammen?', a: 'Unsere Preise sind so individuell wie Ihre Räume und Anforderungen. Da jeder Umzug oder Raum unterschiedliche Ansprüche stellt, erstellen wir kein Pauschalangebot. Ein verbindliches Angebot erhalten Sie nach einer kostenlosen Besichtigung oder einer ersten Kontaktaufnahme per E-Mail.' },
        { q: 'Bieten Sie Umzug und Reinigung als Kombi-Paket an?', a: 'Ja, absolut. Unser Rundum-Service umfasst den vollständigen, sicheren Transport Ihrer Möbel gepaart mit einer professionellen Endreinigung mit Abgabegarantie in Ihrer alten Wohnung. Sie haben nur einen Ansprechpartner für alles.' },
        { q: 'Bringen Sie Ihre eigenen Reinigungsmittel und das Packmaterial mit?', a: 'Ja, für Reinigungen bringen wir alle benötigten Utensilien und ökologischen Reinigungsmittel mit. Für Umzüge stellen wir bei Bedarf professionelles Verpackungsmaterial und sichern Ihre Möbel fachgerecht ab.' },
        { q: 'Sind Sie auch am Wochenende verfügbar?', a: 'Für Geschäftsräume und bei dringenden Umzügen oder Umzugsreinigungen bieten wir nach Absprache auch Wochenendtermine an, um den laufenden Betrieb so wenig wie möglich zu stören.' }
      ]
    },
    cta: {
      title1: 'Bereit für einen ',
      title2: 'entspannten Start?',
      desc: 'Unsere Preise sind so individuell wie Ihre Räume. Für ein verbindliches Angebot kontaktieren Sie uns gerne ',
      desc_email: 'per E-Mail',
      desc_or: ', ',
      desc_whatsapp: 'WhatsApp',
      desc_or2: ' oder buchen Sie direkt einen ',
      desc_book: 'Besichtigungstermin',
      desc_dot: '.',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
      book: 'Termin buchen',
      wa_msg: 'Hallo, ich interessiere mich für einen Besichtigungstermin.',
      mail_subject: 'Termin buchen',
      image_alt: 'Lächelnde Reinigungskraft',
      form_desc: 'Füllen Sie unser Online-Formular aus – wir melden uns innert 24 Stunden mit einer unverbindlichen Offerte bei Ihnen.'
    },
    footer: {
      slogan: 'Schweizer Handwerk in jedem Raum.',
      nav: 'Navigation',
      socials: 'Socials',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      terms: 'AGB',
      title1: 'Starten Sie den ',
      title2: 'Dialog.'
    },
    cookie: {
      message: 'Diese Website verwendet Cookies für ein optimales Nutzererlebnis. Mit der Nutzung stimmen Sie unserer Datenschutzerklärung zu.',
      accept: 'Akzeptieren',
      decline: 'Ablehnen'
    }
  },
  en: {
    meta: {
      title: 'Putzen Bern | Moving & Cleaning',
      description: 'Professional moving and cleaning services in Bern. Your partner for stress-free relocations, commercial cleaning, and more.'
    },
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      references: 'References',
      faq: 'FAQ',
      book: 'Book Appointment',
      offerte: 'Request Quote'
    },
    hero: {
      title1: 'Stress-free ',
      title2: 'moving,',
      title3: ' flawless ',
      title4: 'shine.',
      desc: 'We organize worry-free moves and professional cleaning for residential and commercial spaces in and around Bern. One contact person, everything from a single source.',
      cta: 'Book Appointment'
    },
    trust: {
      title1: 'A Matter ',
      title2: 'of Trust.',
      desc: 'The quality of our work is reflected not only in cleanliness but also in the loyalty of our Swiss clients.',
      stat1: 'Successful moves and cleanings in Bern',
      stat2: 'Years expertise in cleaning and transport',
      stat3: 'Regular clients who trust us'
    },
    about: {
      philosophy_label: 'Our Philosophy',
      title1: 'A smooth start ',
      title2: 'in organized spaces.',
      p1: 'With Swiss precision and organized planning, we take the weight off your shoulders. Whether a smooth move from A to B, broom-clean clearance, or deep cleaning with a handover guarantee – we ensure a stress-free transition so you can relax in your new home.',
      p2: 'We rely on eco-friendly products, state-of-the-art equipment, and a dedicated team that respects your privacy. Quality you can see – and feel.',
      cta: 'Learn more'
    },
    services: {
      title1: 'Specialized ',
      title2: 'Services.',
      desc: 'Tailor-made cleaning and moving concepts, developed for a stress-free transition and the individual demands of different environments.',
      items: [
        { title: 'Residential Cleaning', desc: 'Deep cleaning and fabric care for your home. We treat your personal spaces with the utmost respect, use exclusive, eco-friendly products, and pay attention to every detail.' },
        { title: 'Commercial Spaces', desc: 'Smart workspaces that promote productivity. We create spotless environments for offices, practices, and boutiques in the heart of Bern.' },
        { title: 'Move-out Cleaning', desc: 'A flawless environment for new beginnings. Comprehensive deep cleaning with a handover guarantee for apartments and houses during tenant changes.' },
        { title: 'All-round Moves', desc: 'Stress-free moving from A to Z. With careful planning, secure transport, and professional handling, we guarantee a smooth transition.' },
        { title: 'Window & Glass Cleaning', desc: 'Streak-free views for brilliant spaces. We ensure clean, radiant windows, glass walls, and frames that let in light and clarity.' },
        { title: 'Construction Cleaning', desc: 'Specialized cleaning after new builds or renovations. We completely remove unsightly debris, stubborn fine dust, and paint residues, making your spaces ready for occupancy as quickly as possible.' }
      ]
    },
    process: {
      title1: 'The path to a ',
      title2: 'stress-free change.',
      desc: 'A transparent and structured process for cleaning and moving – from the first consultation to the final handover.',
      items: [
        { title: 'Planning & Offer', desc: 'Following an inquiry or viewing, we create a tailored plan and a transparent offer – completely non-binding via email.' },
        { title: 'Execution & Logistics', desc: 'Whether thorough deep cleaning or secure furniture transport: our professionals work with the utmost care, professional equipment, and ecological methods.' },
        { title: 'Handover & Guarantee', desc: 'We hand over your old or new spaces flawlessly. For move-out cleanings, you benefit from our definitive handover guarantee for stress-free management.' }
      ]
    },
    references: {
      title1: 'Words from our ',
      title2: 'Clients.',
      desc: 'Trust is based on consistent results. Read what clients say about our work in Bern.',
      items: [
        { quote: 'The entire move went flawlessly – from secure packaging to turnkey apartment handover. We really didn\'t have to worry about a thing.', author: 'Elena M.', role: 'CEO, Architecture Ltd' },
        { quote: 'The team\'s attention to detail and discretion are remarkable. Sensational both in transporting our furniture and cleaning the new spaces.', author: 'Marc & Sophie T.', role: 'Private Clients, Kirchenfeld' },
        { quote: 'Ecological, precise, and absolutely reliable. For our boutique in the old town and quick transports, no other partner comes into question.', author: 'David H.', role: 'Owner, Concept Store' }
      ]
    },
    before_after: {
      title1: 'Visible ',
      title2: 'Results.',
      desc: 'See the quality of our work for yourself. The results of our deep cleaning speak for themselves – before and after in direct comparison.',
      slider_handle: 'Drag to compare',
      before: 'Before',
      after: 'After'
    },
    calculator: {
      title1: 'Calculate ',
      title2: 'Price.',
      desc: 'Get a non-binding cost estimate for your project in just a few seconds.',
      service_label: 'Service',
      service_cleaning: 'Move-out Cleaning',
      service_moving: 'Moving',
      service_both: 'Moving & Cleaning',
      rooms_label: 'Number of Rooms',
      sqm_label: 'Living Area (m²)',
      calculate_btn: 'Calculate Costs',
      estimate_title: 'Estimated Costs:',
      estimate_disclaimer: '*This is a guideline value. Please contact us for a precise quote.',
      chf: 'CHF'
    },
    service_area: {
      title1: 'All of ',
      title2: 'Switzerland.',
      desc: 'We operate in Bern, Zürich, Basel, Luzern and throughout Switzerland – punctual, reliable and right at your door.',
      regions: ['Köniz', 'Ostermundigen', 'Muri b. Bern', 'Bümpliz', 'Worb', 'Belp', 'Ittigen', 'Münsingen', 'Thun', 'Wabern', 'Liebefeld', 'Kehrsatz', 'Zürich', 'Basel', 'Luzern']
    },
    team: {
      title1: 'Who we ',
      title2: 'are.',
      desc: 'A well-coordinated team of professionals who live cleanliness and reliability. We value discretion, thoroughness, and a friendly appearance.',
      member1_name: 'Elena Rostova',
      member1_role: 'Quality Management',
      member2_name: 'Marco Weber',
      member2_role: 'Operations & Logistics'
    },
    guarantee: {
      badge: 'With Handover Guarantee'
    },
    stats: {
      stat1_num: '1.2k+',
      stat1_text: 'Cleaned Properties',
      stat2_num: '100%',
      stat2_text: 'Handover Guarantee',
      stat3_num: '10',
      stat3_text: 'Years Expertise'
    },
    marquee: ['ECO-FRIENDLY', 'PREMIUM SERVICE', 'RELIABLE', 'DISCREET', 'FLEXIBLE', 'FAST'],
    gallery: {
      title1: 'Our ',
      title2: 'eye for detail.',
      desc: 'Insights into our daily work. We leave nothing but immaculate cleanliness.'
    },
    contact_form: {
      title1: 'Let\'s ',
      title2: 'talk.',
      desc: 'Do you have questions or want to request a quote directly? Write to us.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
      success: 'Thank you for your message.',
      error: 'An error occurred. Please try again.'
    },
    faq: {
      title1: 'Frequently Asked ',
      title2: 'Questions.',
      desc: 'Everything you need to know about our working methods, conditions, and standards.',
      items: [
        { q: 'How are your prices structured?', a: 'Our prices are as individual as your spaces and requirements. Because every move or space has different needs, we do not offer flat rates. You will receive a binding offer after a free viewing or initial contact via email.' },
        { q: 'Do you offer moving and cleaning as a combined package?', a: 'Yes, absolutely. Our all-round service includes the complete, secure transport of your furniture coupled with professional final cleaning with a handover guarantee in your old apartment. You have just one contact person for everything.' },
        { q: 'Do you bring your own cleaning supplies and packing material?', a: 'Yes, for cleaning we bring all necessary utensils and ecological cleaning products. For moves, we provide professional packing material as needed and secure your furniture properly.' },
        { q: 'Are you available on weekends?', a: 'For commercial spaces and urgent moves or move-out cleanings, we also offer weekend appointments by arrangement to disrupt ongoing operations as little as possible.' }
      ]
    },
    cta: {
      title1: 'Ready for a ',
      title2: 'relaxed start?',
      desc: 'Our prices are as individual as your spaces. For a binding quote, please contact us ',
      desc_email: 'via email',
      desc_or: ', ',
      desc_whatsapp: 'WhatsApp',
      desc_or2: ' or directly book a ',
      desc_book: 'viewing appointment',
      desc_dot: '.',
      whatsapp: 'WhatsApp',
      email: 'Email',
      book: 'Book Appointment',
      wa_msg: 'Hello, I am interested in booking a viewing appointment.',
      mail_subject: 'Book Appointment',
      image_alt: 'Smiling cleaning professional',
      form_desc: 'Fill out our online form – we will get back to you within 24 hours with a non-binding quote.'
    },
    footer: {
      slogan: 'Swiss craftsmanship in every room.',
      nav: 'Navigation',
      socials: 'Socials',
      contact: 'Contact',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      imprint: 'Imprint',
      terms: 'Terms of Service',
      title1: 'Start the ',
      title2: 'dialogue.'
    },
    cookie: {
      message: 'This website uses cookies to provide the best possible experience. By continuing, you agree to our privacy policy.',
      accept: 'Accept',
      decline: 'Decline'
    }
  },
  fr: {
    meta: {
      title: 'Putzen Bern | Déménagement & Nettoyage',
      description: 'Services professionnels de déménagement et de nettoyage à Berne. Votre partenaire pour des déménagements sans stress, nettoyage commercial et plus.'
    },
    nav: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      references: 'Références',
      faq: 'FAQ',
      book: 'Réserver',
      offerte: 'Demander un devis'
    },
    hero: {
      title1: 'Déménagement ',
      title2: 'sans stress,',
      title3: ' propreté ',
      title4: 'impeccable.',
      desc: 'Nous organisons des déménagements sans soucis et des nettoyages professionnels pour les espaces résidentiels et commerciaux à Berne et dans les environs. Un seul interlocuteur pour tout.',
      cta: 'Réserver'
    },
    trust: {
      title1: 'Une question ',
      title2: 'de confiance.',
      desc: 'La qualité de notre travail se reflète non seulement dans la propreté, mais aussi dans la fidélité de nos clients suisses.',
      stat1: 'Déménagements et nettoyages réussis à Berne',
      stat2: 'Années d\'expertise dans le nettoyage et le transport',
      stat3: 'Clients réguliers qui nous font confiance'
    },
    about: {
      philosophy_label: 'La Philosophie Putzen',
      title1: 'Un départ serein ',
      title2: 'dans des espaces organisés.',
      p1: 'Avec une précision suisse et une planification organisée, nous vous soulageons de ce fardeau. Qu\'il s\'agisse d\'un déménagement fluide d\'un point A à un point B, d\'un débarras ou d\'un nettoyage en profondeur avec garantie de remise – nous assurons une transition sans stress.',
      p2: 'Nous misons sur des produits respectueux de l\'environnement, un équipement de pointe et une équipe dédiée qui respecte votre vie privée. Une qualité qui se voit – et se ressent.',
      cta: 'En savoir plus'
    },
    services: {
      title1: 'Services ',
      title2: 'Spécialisés.',
      desc: 'Des concepts de nettoyage et de déménagement sur mesure, conçus pour un changement sans stress et les exigences de différents environnements.',
      items: [
        { title: 'Nettoyage Résidentiel', desc: 'Nettoyage en profondeur pour votre maison. Nous traitons vos espaces personnels avec le plus grand respect, utilisons des produits exclusifs et écologiques et prêtons attention à chaque détail.' },
        { title: 'Espaces Commerciaux', desc: 'Des espaces de travail intelligents qui favorisent la productivité. Nous créons des environnements impeccables pour les bureaux, les cabinets et les boutiques au cœur de Berne.' },
        { title: 'Nettoyage de Déménagement', desc: 'Un environnement impeccable pour un nouveau départ. Nettoyage en profondeur complet avec garantie de remise pour les appartements et les maisons lors des changements de locataires.' },
        { title: 'Déménagements Complets', desc: 'Déménagement sans stress de A à Z. Avec une planification minutieuse, un transport sécurisé et une manipulation professionnelle, nous garantissons un changement de logement fluide.' },
        { title: 'Nettoyage de Vitres', desc: 'Une vue sans traces pour des espaces brillants. Nous assurons des fenêtres rayonnantes, des parois en verre et cadres propres qui laissent entrer la lumière et la clarté.' },
        { title: 'Nettoyage de Fin de Chantier', desc: 'Nettoyage spécialisé après constructions ou rénovations. Nous éliminons complètement les débris, la poussière fine tenace et les résidus de peinture, rendant vos espaces prêts à être occupés le plus rapidement possible.' }
      ]
    },
    process: {
      title1: 'Le chemin vers ',
      title2: 'une transition sans stress.',
      desc: 'Un processus transparent et structuré pour le nettoyage et les déménagements – de la première consultation à la remise finale.',
      items: [
        { title: 'Planification & Offre', desc: 'Suite à une demande ou une visite, nous créons un plan sur mesure et une offre transparente – sans engagement par e-mail.' },
        { title: 'Exécution & Logistique', desc: 'Que ce soit un nettoyage en profondeur complet ou un transport sécurisé de meubles : nos professionnels travaillent avec le plus grand soin, un équipement pro et des méthodes écologiques.' },
        { title: 'Remise & Garantie', desc: 'Nous remettons vos anciens ou nouveaux espaces dans un état impeccable. Pour les nettoyages de déménagement, vous bénéficiez de notre garantie de remise définitive pour une gestion sans stress.' }
      ]
    },
    references: {
      title1: 'Les mots de ',
      title2: 'nos clients.',
      desc: 'La confiance repose sur des résultats cohérents. Lisez ce que les clients disent de notre travail à Berne.',
      items: [
        { quote: 'L\'ensemble du déménagement s\'est déroulé sans faille, de l\'emballage sécurisé à la remise de l\'appartement clé en main. Nous n\'avons vraiment eu à nous soucier de rien.', author: 'Elena M.', role: 'PDG, Architecture SA' },
        { quote: 'L\'attention aux détails et la discrétion de l\'équipe sont remarquables. Sensationnel tant pour le transport de nos meubles que pour le nettoyage des nouveaux espaces.', author: 'Marc & Sophie T.', role: 'Clients Privés, Kirchenfeld' },
        { quote: 'Écologique, précis et d\'une fiabilité absolue. Pour notre boutique de la vieille ville et les transports rapides, aucun autre partenaire n\'égale leurs services.', author: 'David H.', role: 'Propriétaire, Concept Store' }
      ]
    },
    before_after: {
      title1: 'Résultats ',
      title2: 'visibles.',
      desc: 'Constatez par vous-même la qualité de notre travail. Les résultats de nos nettoyages en profondeur parlent d\'eux-mêmes – avant et après en comparaison directe.',
      slider_handle: 'Glisser pour comparer',
      before: 'Avant',
      after: 'Après'
    },
    calculator: {
      title1: 'Calculer ',
      title2: 'le prix.',
      desc: 'Obtenez une estimation de coût sans engagement pour votre projet en quelques secondes.',
      service_label: 'Service',
      service_cleaning: 'Nettoyage de fin de bail',
      service_moving: 'Déménagement',
      service_both: 'Déménagement & Nettoyage',
      rooms_label: 'Nombre de pièces',
      sqm_label: 'Surface (m²)',
      calculate_btn: 'Calculer les coûts',
      estimate_title: 'Coûts estimés :',
      estimate_disclaimer: '*Ceci est une valeur indicative. Veuillez nous contacter pour un devis précis.',
      chf: 'CHF'
    },
    service_area: {
      title1: 'Toute la ',
      title2: 'Suisse.',
      desc: 'Nous intervenons à Berne, Zürich, Bâle, Lucerne et partout en Suisse – ponctuels, fiables et directement chez vous.',
      regions: ['Köniz', 'Ostermundigen', 'Muri b. Bern', 'Bümpliz', 'Worb', 'Belp', 'Ittigen', 'Münsingen', 'Thun', 'Wabern', 'Liebefeld', 'Kehrsatz', 'Zürich', 'Basel', 'Luzern']
    },
    team: {
      title1: 'Qui nous ',
      title2: 'sommes.',
      desc: 'Une équipe de professionnels bien coordonnée qui vit la propreté et la fiabilité. Nous valorisons la discrétion, la minutie et une apparence amicale.',
      member1_name: 'Elena Rostova',
      member1_role: 'Gestion de la qualité',
      member2_name: 'Marco Weber',
      member2_role: 'Opérations & Logistique'
    },
    guarantee: {
      badge: 'Avec garantie de remise'
    },
    stats: {
      stat1_num: '1.2k+',
      stat1_text: 'Propriétés nettoyées',
      stat2_num: '100%',
      stat2_text: 'Garantie de remise',
      stat3_num: '10',
      stat3_text: 'Ans d\'expertise'
    },
    marquee: ['ÉCO-RESPONSABLE', 'SERVICE PREMIUM', 'FIABLE', 'DISCRET', 'FLEXIBLE', 'RAPIDE'],
    gallery: {
      title1: 'Notre ',
      title2: 'souci du détail.',
      desc: 'Aperçus de notre travail quotidien. Nous ne laissons qu\'une propreté immaculée.'
    },
    contact_form: {
      title1: 'Parlons ',
      title2: 'ensemble.',
      desc: 'Vous avez des questions ou souhaitez demander un devis directement ? Écrivez-nous.',
      name: 'Nom',
      email: 'E-mail',
      message: 'Message',
      submit: 'Envoyer',
      success: 'Merci pour votre message.',
      error: 'Une erreur s\'est produite. Veuillez réessayer.'
    },
    faq: {
      title1: 'Questions ',
      title2: 'Fréquentes.',
      desc: 'Tout ce que vous devez savoir sur nos méthodes de travail, conditions et normes.',
      items: [
        { q: 'Comment vos prix sont-ils structurés ?', a: 'Nos prix sont aussi individuels que vos espaces et exigences. Étant donné que chaque déménagement ou espace a des besoins différents, nous n\'offrons pas de forfaits préétablis. Vous recevrez une offre engageante après une visite gratuite ou un premier contact par e-mail.' },
        { q: 'Proposez-vous le déménagement et le nettoyage comme offre combinée ?', a: 'Oui, tout à fait. Notre service complet inclut le transport sécurisé et intégral de vos meubles associé à un nettoyage final professionnel de votre ancien appartement avec garantie de remise. Vous n\'avez qu\'un seul interlocuteur pour tout.' },
        { q: 'Apportez-vous vos propres produits de nettoyage et le matériel d\'emballage ?', a: 'Oui, pour le nettoyage, nous apportons tous les ustensiles nécessaires et produits écologiques. Pour les déménagements, nous fournissons le matériel d\'emballage professionnel au besoin et sécurisons vos meubles de façon adéquate.' },
        { q: 'Êtes-vous également disponibles le week-end ?', a: 'Pour les espaces commerciaux et les déménagements urgents, nous proposons également des rendez-vous le week-end sur accord, afin de perturber le moins possible vos opérations en cours.' }
      ]
    },
    cta: {
      title1: 'Prêt pour un ',
      title2: 'départ serein ?',
      desc: 'Nos prix sont aussi individuels que vos espaces. Pour une offre engageante, contactez-nous ',
      desc_email: 'par e-mail',
      desc_or: ', ',
      desc_whatsapp: 'WhatsApp',
      desc_or2: ' ou réservez directement une ',
      desc_book: 'visite',
      desc_dot: '.',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      book: 'Réserver',
      wa_msg: 'Bonjour, je suis intéressé(e) par la réservation d\'une visite.',
      mail_subject: 'Réserver un rendez-vous',
      image_alt: 'Professionnelle de nettoyage souriante',
      form_desc: 'Remplissez notre formulaire en ligne – nous vous répondrons dans les 24 heures avec un devis sans engagement.'
    },
    footer: {
      slogan: 'L\'artisanat suisse dans chaque pièce.',
      nav: 'Navigation',
      socials: 'Réseaux Sociaux',
      contact: 'Contact',
      rights: 'Tous droits réservés.',
      privacy: 'Confidentialité',
      imprint: 'Mentions légales',
      terms: 'CGV',
      title1: 'Entamer le ',
      title2: 'dialogue.'
    },
    cookie: {
      message: 'Ce site utilise des cookies pour vous offrir la meilleure expérience possible. En continuant, vous acceptez notre politique de confidentialité.',
      accept: 'Accepter',
      decline: 'Refuser'
    }
  },
  it: {
    meta: {
      title: 'Putzen Bern | Traslochi & Pulizie',
      description: 'Servizi professionali di trasloco e pulizia a Berna. Il tuo partner per trasferimenti senza stress, pulizie commerciali e altro ancora.'
    },
    nav: {
      home: 'Home',
      services: 'Servizi',
      about: 'Chi siamo',
      references: 'Referenze',
      faq: 'FAQ',
      book: 'Prenota un Appuntamento',
      offerte: 'Richiedi un preventivo'
    },
    hero: {
      title1: 'Trasloco ',
      title2: 'senza stress,',
      title3: ' pulizia ',
      title4: 'impeccabile.',
      desc: 'Organizziamo traslochi spensierati e pulizie professionali per spazi residenziali e commerciali a Berna e dintorni. Un unico referente, tutto da una sola fonte.',
      cta: 'Prenota un Appuntamento'
    },
    trust: {
      title1: 'Una questione ',
      title2: 'di fiducia.',
      desc: 'La qualità del nostro lavoro si riflette non solo nella pulizia, ma anche nella fedeltà dei nostri clienti svizzeri.',
      stat1: 'Traslochi e pulizie di successo a Berna',
      stat2: 'Anni di esperienza in pulizie e trasporti',
      stat3: 'Clienti abituali che si fidano di noi'
    },
    about: {
      philosophy_label: 'La Filosofia Putzen',
      title1: 'Un inizio sereno ',
      title2: 'in spazi organizzati.',
      p1: 'Con precisione svizzera e pianificazione organizzata, ti togliamo il peso dalle spalle. Che si tratti di un trasloco fluido da A a B, di uno sgombero o di una pulizia profonda con garanzia di consegna, assicuriamo un cambio senza stress, così potrai rilassarti nella tua nuova casa.',
      p2: 'Ci affidiamo a prodotti ecologici, attrezzature all\'avanguardia e a un team dedicato che rispetta la tua privacy. Qualità che puoi vedere e sentire.',
      cta: 'Scopri di più'
    },
    services: {
      title1: 'Servizi ',
      title2: 'Specializzati.',
      desc: 'Concetti di pulizia e trasloco su misura, sviluppati per un cambio senza stress e per le esigenze individuali di diversi ambienti.',
      items: [
        { title: 'Pulizia Residenziale', desc: 'Pulizia profonda e cura della tua casa. Trattiamo i tuoi spazi personali con il massimo rispetto, utilizziamo prodotti esclusivi ed ecologici e prestiamo attenzione ad ogni dettaglio.' },
        { title: 'Spazi Commerciali', desc: 'Ambienti di lavoro intelligenti che promuovono la produttività. Creiamo ambienti impeccabili per uffici, studi e boutique nel cuore di Berna.' },
        { title: 'Pulizia di Trasloco', desc: 'Un ambiente impeccabile per nuovi inizi. Pulizia profonda completa con garanzia di consegna per appartamenti e case durante il cambio di inquilino.' },
        { title: 'Traslochi Completi', desc: 'Trasloco senza stress dalla A alla Z. Con una pianificazione accurata, un trasporto sicuro e una gestione professionale, garantiamo un cambio di casa senza intoppi.' },
        { title: 'Pulizia Vetri e Finestre', desc: 'Vista senza aloni per spazi brillanti. Assicuriamo finestre pulite e radiose, pareti in vetro e infissi che lasciano entrare luce e chiarezza.' },
        { title: 'Pulizia Post-Costruzione', desc: 'Pulizia specializzata dopo nuove costruzioni o ristrutturazioni. Rimuoviamo completamente detriti sgradevoli, polvere fine ostinata e residui di vernice, rendendo i tuoi spazi pronti per essere occupati il più rapidamente possibile.' }
      ]
    },
    process: {
      title1: 'La strada verso un ',
      title2: 'cambio senza stress.',
      desc: 'Un processo trasparente e strutturato per pulizie e traslochi – dalla prima consulenza alla consegna finale.',
      items: [
        { title: 'Pianificazione & Offerta', desc: 'Dopo una richiesta o un sopralluogo, creiamo un piano su misura e un\'offerta trasparente – senza alcun impegno via e-mail.' },
        { title: 'Esecuzione & Logistica', desc: 'Che si tratti di una pulizia profonda o di un trasporto sicuro di mobili: i nostri professionisti lavorano con la massima cura, attrezzature professionali e metodi ecologici.' },
        { title: 'Consegna & Garanzia', desc: 'Consegniamo i tuoi spazi vecchi o nuovi in modo impeccabile. Per le pulizie di trasloco, benefici della nostra garanzia di consegna definitiva per una gestione senza stress.' }
      ]
    },
    references: {
      title1: 'Le parole dei ',
      title2: 'nostri Clienti.',
      desc: 'La fiducia si basa su risultati costanti. Leggi cosa dicono i clienti del nostro lavoro a Berna.',
      items: [
        { quote: 'L\'intero trasloco è andato alla perfezione, dall\'imballaggio sicuro alla consegna dell\'appartamento chiavi in mano. Non abbiamo davvero dovuto preoccuparci di nulla.', author: 'Elena M.', role: 'CEO, Architecture AG' },
        { quote: 'L\'attenzione ai dettagli e la discrezione del team sono notevoli. Sensazionali sia nel trasporto dei nostri mobili che nella pulizia dei nuovi spazi.', author: 'Marc & Sophie T.', role: 'Clienti Privati, Kirchenfeld' },
        { quote: 'Ecologico, preciso e assolutamente affidabile. Per la nostra boutique nel centro storico e trasporti veloci, nessun altro partner è paragonabile.', author: 'David H.', role: 'Proprietario, Concept Store' }
      ]
    },
    before_after: {
      title1: 'Risultati ',
      title2: 'visibili.',
      desc: 'Scopri di persona la qualità del nostro lavoro. I risultati delle nostre pulizie profonde parlano da soli: prima e dopo a confronto diretto.',
      slider_handle: 'Trascina per confrontare',
      before: 'Prima',
      after: 'Dopo'
    },
    calculator: {
      title1: 'Calcolare ',
      title2: 'il prezzo.',
      desc: 'Ottieni una stima dei costi senza impegno per il tuo progetto in pochi secondi.',
      service_label: 'Servizio',
      service_cleaning: 'Pulizia di fine locazione',
      service_moving: 'Trasloco',
      service_both: 'Trasloco e Pulizia',
      rooms_label: 'Numero di stanze',
      sqm_label: 'Superficie (m²)',
      calculate_btn: 'Calcolare i costi',
      estimate_title: 'Costi stimati:',
      estimate_disclaimer: '*Questo è un valore indicativo. Contattaci per un preventivo preciso.',
      chf: 'CHF'
    },
    service_area: {
      title1: 'Tutta la ',
      title2: 'Svizzera.',
      desc: 'Operiamo a Berna, Zurigo, Basilea, Lucerna e in tutta la Svizzera – puntuali, affidabili e direttamente da voi.',
      regions: ['Köniz', 'Ostermundigen', 'Muri b. Bern', 'Bümpliz', 'Worb', 'Belp', 'Ittigen', 'Münsingen', 'Thun', 'Wabern', 'Liebefeld', 'Kehrsatz', 'Zürich', 'Basel', 'Luzern']
    },
    team: {
      title1: 'Chi ',
      title2: 'siamo.',
      desc: 'Un team di professionisti ben coordinato che vive la pulizia e l\'affidabilità. Apprezziamo la discrezione, la meticolosità e un aspetto cordiale.',
      member1_name: 'Elena Rostova',
      member1_role: 'Gestione della qualità',
      member2_name: 'Marco Weber',
      member2_role: 'Operazioni e Logistica'
    },
    guarantee: {
      badge: 'Con garanzia di consegna'
    },
    stats: {
      stat1_num: '1.2k+',
      stat1_text: 'Proprietà pulite',
      stat2_num: '100%',
      stat2_text: 'Garanzia di consegna',
      stat3_num: '10',
      stat3_text: 'Anni di esperienza'
    },
    marquee: ['ECO-FRIENDLY', 'SERVIZIO PREMIUM', 'AFFIDABILE', 'DISCRETO', 'FLESSIBILE', 'VELOCE'],
    gallery: {
      title1: 'Il nostro ',
      title2: 'occhio per i dettagli.',
      desc: 'Approfondimenti sul nostro lavoro quotidiano. Lasciamo solo una pulizia immacolata.'
    },
    contact_form: {
      title1: 'Parliamo ',
      title2: 'insieme.',
      desc: 'Hai domande o vuoi richiedere un preventivo direttamente? Scrivici.',
      name: 'Nome',
      email: 'Email',
      message: 'Messaggio',
      submit: 'Invia',
      success: 'Grazie per il tuo messaggio.',
      error: 'Si è verificato un errore. Riprova.'
    },
    faq: {
      title1: 'Domande ',
      title2: 'Frequenti.',
      desc: 'Tutto ciò che devi sapere sui nostri metodi di lavoro, condizioni e standard.',
      items: [
        { q: 'Come sono strutturati i vostri prezzi?', a: 'I nostri prezzi sono individuali come i vostri spazi e le vostre esigenze. Poiché ogni trasloco o spazio ha esigenze diverse, non offriamo tariffe forfettarie. Riceverai un\'offerta vincolante dopo un sopralluogo gratuito o un primo contatto via e-mail.' },
        { q: 'Offrite trasloco e pulizia come pacchetto combinato?', a: 'Sì, assolutamente. Il nostro servizio completo include il trasporto completo e sicuro dei vostri mobili unito a una pulizia finale professionale con garanzia di consegna nel vostro vecchio appartamento. Avete un solo referente per tutto.' },
        { q: 'Portate i vostri prodotti per la pulizia e il materiale da imballaggio?', a: 'Sì, per le pulizie portiamo tutti gli utensili necessari e prodotti ecologici. Per i traslochi, forniamo materiale da imballaggio professionale secondo necessità e mettiamo in sicurezza i vostri mobili in modo adeguato.' },
        { q: 'Siete disponibili anche nei fine settimana?', a: 'Per gli spazi commerciali e per traslochi o pulizie di trasloco urgenti, offriamo anche appuntamenti nel fine settimana su accordo, per interrompere il meno possibile le operazioni in corso.' }
      ]
    },
    cta: {
      title1: 'Pronto per un ',
      title2: 'inizio rilassato?',
      desc: 'I nostri prezzi sono individuali come i vostri spazi. Per un\'offerta vincolante contattaci ',
      desc_email: 'via e-mail',
      desc_or: ', ',
      desc_whatsapp: 'WhatsApp',
      desc_or2: ' o prenota direttamente un ',
      desc_book: 'appuntamento per un sopralluogo',
      desc_dot: '.',
      whatsapp: 'WhatsApp',
      email: 'E-Mail',
      book: 'Prenota un Appuntamento',
      wa_msg: 'Salve, sono interessato/a a prenotare un appuntamento per un sopralluogo.',
      mail_subject: 'Prenota appuntamento',
      image_alt: 'Professionista delle pulizie sorridente',
      form_desc: 'Compila il nostro modulo online – ti risponderemo entro 24 ore con un preventivo senza impegno.'
    },
    footer: {
      slogan: 'Artigianato svizzero in ogni stanza.',
      nav: 'Navigazione',
      socials: 'Social',
      contact: 'Contatti',
      rights: 'Tutti i diritti riservati.',
      privacy: 'Privacy',
      imprint: 'Note legali',
      terms: 'Condizioni generali',
      title1: 'Inizia il ',
      title2: 'dialogo.'
    },
    cookie: {
      message: 'Questo sito utilizza cookie per offrirti la migliore esperienza possibile. Continuando, accetti la nostra informativa sulla privacy.',
      accept: 'Accetta',
      decline: 'Rifiuta'
    }
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.de;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', translations[language].meta.description);
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
