import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      hero: {
        welcome: "Bienvenue, je suis",
        name: "THARSANAN",
        roles: {
          graphic: "Design Graphique",
          web: "Développement Web",
          comm: "Communication Digitale"
        },
        badges: {
          design: "Design",
          dev: "Développement",
          comm: "Communication"
        },
        buttons: {
          projects: "Mes projets",
          contact: "Me contacter"
        },
        alternance: "En recherche d'une alternance",
        date: "Septembre 2026"
      },
      about: {
        eyebrow: "Qui suis-je ?",
        title_start: "Un parcours entre ",
        title_tech: "technique",
        title_middle: " et ",
        title_comm: "communication",
        paragraph: "Après un début en BUT Métiers du Multimédia et de l'Internet, j'ai choisi de me spécialiser en communication. Ce parcours m'a permis de développer à la fois des compétences techniques et une vision créative orientée vers le digital.",
        cv_link: "Voir mon parcours complet",
        alternance_pill: "En recherche d'alternance · Sept. 2026",
        stats: {
          studies: "Ans d'études",
          exp: "An d'expérience",
          software: "Logiciels",
          passion: "Passionné"
        }
      },
      projects: {
        eyebrow: "Projets Phares",
        title: "Sélection de travaux.",
        view_all: "Voir tous les projets",
        roles: {
          branding: "Branding & Graphic Design",
          web: "Web Dev & Communication"
        },
        desc: {
          tharsh_studio: "Création complète de la charte graphique et de l'identité visuelle de mon studio de création pour son lancement sur Instagram.",
          futsal: "Conception intégrale du site web et branding du club. Un projet de site interactif développé en Vibe Coding (Antigravity)."
        }
      },
      nav: {
        home: "Accueil",
        projects: "Projets",
        skills: "Compétences",
        cv: "Parcours",
        contact: "Contact"
      },
      // New pages translation resources
      cv_page: {
        tag: "Expérience & Formation",
        title_start: "Mon",
        title_end: "Parcours.",
        subtitle: "Une trajectoire mêlant expertise technique, communication stratégique et passion pour le design.",
        download: "Télécharger mon CV",
        view_badge: "Voir le CV",
        education_title: "Formation",
        experience_title: "Expérience",
        quote: "\"L'innovation est le fruit d'une curiosité constante et d'une rigueur créative.\"",
        quote_sub: "Chaque étape de mon parcours a été guidée par l'envie d'apprendre et de relever des défis. Je suis prêt à mettre cette expérience au service de vos projets.",
        skills: {
          autonomy: "Autonomie",
          teamwork: "Travail d'équipe",
          adaptability: "Adaptabilité",
          rigor: "Rigueur",
          creativity: "Créativité"
        },
        education: {
          upec: {
            title: "Licence Professionnelle (Admis)",
            location: "Université Paris-Est Créteil (UPEC)",
            desc: "Spécialisation dans la communication d'intérêt général."
          },
          brel: {
            title: "BTS Communication",
            location: "Lycée Jacques Brel · La Courneuve",
            desc: "Mise en œuvre d'actions de communication, relations avec les prestataires, veille technologique et design graphique."
          },
          mmi: {
            title: "BUT Métiers du Multimédia et de l'Internet",
            location: "IUT de Sénart-Fontainebleau",
            desc: "Développement web, UI/UX Design, audiovisuel et communication multimédia."
          },
          sti2d: {
            title: "Bac STI2D",
            location: "Lycée Paul Le Rolland · Drancy",
            desc: "Spécialité Systèmes d'Information et Numérique."
          }
        },
        experiences: {
          futsal: {
            title: "Communication & Design Graphique",
            company: "Futsal Drancy",
            type: "Stage | Service Civique | Bénévolat",
            missions: [
              "Bénévole (Depuis Janv. 2026) : Soutien événementiel et animation de communauté.",
              "Service Civique (Sept. 2024 — Mai 2025) : Gestion des réseaux sociaux et création de contenu digital.",
              "Stagiaire Communication (Mai — Juin 2025 & Nov — Déc 2025) : Stratégie de visibilité et supports print."
            ]
          },
          banque: {
            title: "Chargé de Clientèle",
            company: "La Banque Postale",
            type: "CDI",
            missions: [
              "Accueil et orientation des clients avec professionnalisme",
              "Vente de produits et services postaux (solutions adaptées)",
              "Gestion du tri et de la distribution sécurisée des colis et lettres"
            ]
          },
          osi: {
            title: "Community Manager — Photographe",
            company: "Objectif Sciences International",
            type: "Stage | Bénévolat",
            missions: [
              "Stagiaire (Mars — Avril 2023) puis Bénévole (Depuis Mai 2023).",
              "Couverture photographique et vidéo du Forum de Genève au Palais des Nations (ONU).",
              "Gestion des réseaux sociaux et valorisation des actions de diplomatie scientifique.",
              "Réalisation d'interviews de délégués internationaux et chercheurs pour Terra Scientifica.",
              "Création de contenus digitaux pour promouvoir l'éducation aux sciences participatives.",
              "Soutien à la communication événementielle lors de salons et conférences internationales."
            ]
          },
          parkours: {
            title: "Tuteur Indépendant",
            company: "Parkours",
            type: "Indépendant",
            missions: [
              "Accompagnement et soutien pédagogique des élèves",
              "Aide à l'organisation et optimisation des méthodes d'apprentissage"
            ]
          }
        }
      },
      skills_page: {
        tag: "Expertise",
        title_start: "Mes",
        title_end: "Compétences.",
        subtitle: "Un mix polyvalent entre design créatif, communication stratégique et développement technique.",
        stickers: {
          creative: "Créatif",
          technical: "Technique",
          tools: "Outils"
        },
        categories: {
          graphic: {
            title: "Design Graphique",
            desc: "Maîtrise de la suite Adobe (Ps, Ai, Id) pour créer des visuels percutants."
          },
          web: {
            title: "Développement Web",
            desc: "Conception de sites modernes avec React, HTML5 et CSS3/Tailwind."
          },
          comm: {
            title: "Communication",
            desc: "Élaboration de stratégies de com et gestion des réseaux sociaux."
          },
          uiux: {
            title: "UI/UX Design",
            desc: "Création d'interfaces intuitives centrées sur l'utilisateur."
          },
          motion: {
            title: "Motion Design",
            desc: "Animations fluides avec After Effects pour dynamiser vos contenus."
          },
          tools: {
            title: "Maîtrise des outils",
            desc: "À l'aise avec les logiciels de création, de communication et de gestion."
          }
        },
        software: {
          title: "Logiciels",
          highlighted: "maîtrisés",
          ps: "Retouche photo, montage, création visuelle",
          ae: "Motion design, animations",
          pr: "Montage vidéo, édition professionnelle",
          ai: "Création vectorielle, logos, affiches",
          id: "Mise en page, supports print",
          cv: "Création rapide et efficace",
          wp: "Rédaction et gestion de contenu",
          html_css: "Structure et style web moderne"
        },
        languages: {
          title: "Langues",
          highlighted: "parlées",
          fr: { name: "Français", info: "Bilingue — C2" },
          en: { name: "Anglais", info: "Intermédiaire — B2" },
          tamil: { name: "Tamoul", info: "Langue maternelle — C2" },
          de: { name: "Allemand", info: "Débutant — A1" }
        }
      },
      projets_page: {
        tag: "Réalisations",
        title_start: "Découvrez",
        title_end: "mon univers.",
        subtitle: "Une collection de projets (principalement des sites web et designs) illustrant ma polyvalence, ma passion pour la création et mon utilisation d'outils numériques modernes.",
        stickers: {
          creative: "Créativité",
          design: "Design"
        },
        explore: "Explorer",
        tags: {
          branding_graphic: "Branding & Graphic Design",
          web_comm: "Web Dev & Communication",
          branding_packaging: "Branding & Packaging",
          uiux: "Interface Design",
          audiovisual: "Audiovisuel & Montage",
          strategy_design: "Stratégie & Design",
          creativity: "Créativité Libre"
        },
        list: {
          tharsh_studio: {
            title: "Tharsh Studio",
            desc: "Création de la charte graphique et de l'identité visuelle de mon studio de création pour son lancement sur Instagram."
          },
          futsal: {
            title: "Futsal Drancy",
            desc: "Refonte complète de l'identité numérique et création d'un site officiel en Vibe Coding (Antigravity)."
          },
          alda: {
            title: "Alda Bière",
            desc: "Création complète de l'identité visuelle de la marque sur Figma et développement du site vitrine en HTML, CSS et JavaScript."
          },
          ux: {
            title: "UI/UX Works",
            desc: "Sélection de sites web interactifs (BTS Révision, HopePower) développés en Vibe Coding (Antigravity/Framer)."
          },
          sans_bavures: {
            title: "Sans Bavures",
            desc: "Production, montage et intégration web pour un reportage multimédia interactif."
          },
          bts_com: {
            title: "BTS Com",
            desc: "Portfolio de projets de communication et maquettes web interactives conçues durant mes études."
          },
          perso: {
            title: "Créations Perso",
            desc: "Explorations graphiques, posters de films et maquettes web expérimentales."
          }
        }
      },
      contact_page: {
        tag: "Contact",
        title_start: "Parlons de votre",
        title_end: "prochain projet.",
        subtitle: "Que vous ayez une idée précise ou que vous souhaitiez explorer des possibilités, je suis là pour vous accompagner.",
        sticker: "Réseau",
        tooltip: "Copier dans le presse-papiers",
        labels: {
          name: "Nom complet",
          email: "Email",
          phone: "Téléphone",
          subject: "Sujet",
          message: "Message"
        },
        buttons: {
          send: "Envoyer le message",
          sending: "Envoi en cours…",
          another: "Envoyer un autre message"
        },
        status: {
          sending_toast: "Envoi de votre message…",
          success: "Message envoyé !",
          success_desc: "Merci pour votre message. Je reviens vers vous très rapidement.",
          error: "Une erreur est survenue. Veuillez réessayer."
        }
      },
      footer: {
        marquee: ["DESIGN DIGITAL", "LICENCE PRO COM", "DIRECTION ARTISTIQUE", "CREATIVE PORTFOLIO"],
        profile: {
          student: "Futur étudiant en Licence Pro Communication.",
          search: "En recherche d'une alternance dans la communication digitale."
        },
        clock: "Paris, FR :",
        nav_title: "Navigation",
        contact_title: "Contact",
        socials_title: "Réseaux",
        copied: "Email copié !",
        copyright: "© 2026 Tharsanan · Design · Développement · Communication",
        back_to_top: "Retour en haut"
      },
      photo_page: {
        tag: "Galerie",
        title_start: "Photo",
        title_end: "graphie.",
        subtitle: "À travers l'objectif, je cherche à capturer l'invisible."
      },
      project_details: {
        next: "Projet suivant",
        explore: "Découvrir",
        labels: {
          role: "Rôle",
          period: "Période",
          tools: "Outils",
          type: "Type",
          context: "Contexte",
          focus: "Focus",
          theme: "Thème",
          launch: "Lancement",
          destination: "Destination"
        },
        alda: {
          role: "Branding & Packaging",
          period: "Jan. 2023 – Juin 2023",
          type: "Projet universitaire",
          concept_title: "Concept de marque artisanale.",
          para1: "Projet collaboratif de création d'une marque de bière artisanale. Notre équipe a conçu toute l'identité visuelle sur Figma et développé la vitrine web en utilisant les langages du web (HTML, CSS et JavaScript).",
          para2: "Mon rôle s'est concentré sur la création du logo, des étiquettes et du packaging, en veillant à ce que chaque élément visuel reflète l'histoire et l'authenticité de la bière Alda.",
          card1_title: "Branding & Design",
          card1_desc: "Développement d'un nom évocateur et d'un univers visuel cohérent sur tous les supports promotionnels (affiches, réseaux sociaux).",
          card2_title: "Marketing & Lancement",
          card2_desc: "Élaboration d'un plan de lancement complet incluant une stratégie de communication et l'organisation d'une dégustation fictive."
        },
        bts_com: {
          context: "Lycée Jacques Brel",
          period: "2024 — 2026",
          type: "Design Graphique",
          concept_title: "Théorie et pratique créative.",
          para1: "Dans le cadre de mon BTS Communication, j'ai conçu de nombreux supports de communication et maquettes web en intégrant le web design à ma réflexion stratégique et mon exécution graphique.",
          para2: "De la création d'affiches publicitaires à la conception de mockups pour diverses marques, ce parcours me permet de maîtriser l'ensemble de la chaîne graphique.",
          card1_title: "Conception Visuelle",
          card1_desc: "Maîtrise des outils de création vectorielle et de retouche d'image.",
          card2_title: "Supports Print",
          card2_desc: "Réalisation de flyers, brochures et affiches conformes aux contraintes techniques.",
          gallery_tag: "Print & Branding",
          gallery_title: "Mockups & Com Visuelle"
        },
        futsal: {
          role: "Chargé de Communication",
          period: "2024 — Présent",
          context: "Service Civique & CDD",
          concept_title: "Structurer la communication d'un club de sport.",
          para1: "J'ai rejoint le Futsal Drancy avec pour mission de professionnaliser l'image du club. Du Service Civique au CDD, j'ai mis en place une stratégie globale incluant la création du premier site web officiel en Vibe Coding (avec Antigravity).",
          visit_website: "Découvrir le site web",
          card1_title: "Web Design",
          card1_desc: "Premier site officiel du club.",
          card2_title: "Contenu",
          card2_desc: "Photos & Vidéos terrain.",
          card3_title: "Événementiel",
          card3_desc: "Téléthon & Fête de la ville.",
          card4_title: "Branding",
          card4_desc: "Équipements & Logo.",
          gallery_tags: {
            branding: "Identité visuelle",
            branding_title: "Branding & Équipements",
            comm: "Communication & Événements",
            comm_title: "Affiches & Campagnes",
            life: "Vie du Club",
            life_title: "Action Sociale & Festive",
            social: "Social Media",
            social_title: "Réseaux Sociaux"
          }
        },
        perso: {
          type: "Créations Libres",
          focus: "Illustrations & Posters",
          theme: "Cinéma & Culture",
          concept_title: "Expression libre.",
          para1: "Mes projets personnels me permettent d'explorer de nouvelles techniques de design visuel et d'intégration web, me donnant la liberté d'expérimenter sur des maquettes de sites web et de rendre hommage aux œuvres qui m'inspirent, notamment le cinéma sud-indien.",
          para2: "Chaque poster est le fruit d'un travail sur la composition, la typographie et la gestion des couleurs pour capturer l'essence de l'œuvre originale.",
          card1_title: "Direction Artistique",
          card1_desc: "Exploration de styles graphiques variés, du minimalisme au néon-synthwave.",
          card2_title: "Traitement d'Image",
          card2_desc: "Manipulation avancée de photos et création de montages complexes sur Photoshop.",
          gallery_tag: "Cinéma & Créations",
          gallery_title: "Posters & Illustrations"
        },
        sans_bavures: {
          role: "Montage & Production",
          period: "Sept. 2023 – Janv. 2024",
          type: "Reportage Multimédia",
          concept_title: "Informer & Sensibiliser.",
          para1: "Projet collaboratif visant à produire un reportage multimédia interactif sur un sujet d'actualité. Mon rôle a combiné la production technique, le montage audiovisuel et l'intégration web.",
          para2: "J'ai utilisé Adobe Premiere Pro pour synchroniser les séquences, ajuster la colorimétrie et intégrer des transitions dynamiques, tout en assurant une narration immersive.",
          card1_title: "Montage & Vidéo",
          card1_desc: "Utilisation de Premiere Pro pour le montage, l'étalonnage et la synchronisation audio-visuelle du reportage.",
          card2_title: "Voix-off & Design",
          card2_desc: "Traduction du script en anglais, enregistrement de la voix-off et création de visuels via Photoshop et Illustrator."
        },
        tharsh_studio: {
          role: "Direction Artistique & Graphisme",
          launch: "Juin 2026",
          destination: "Compte Instagram Professionnel",
          badge: "Identité de marque",
          concept_title: "Une empreinte créative unique.",
          para1: "Pour accompagner le lancement de mon compte Instagram professionnel destiné à valoriser mes réalisations créatives, j'ai conçu l'identité visuelle de Tharsh Studio.",
          para2: "L'objectif était de bâtir une marque personnelle moderne, épurée et hautement flexible, capable de s'adapter aux différentes thématiques de design (web, graphisme, audiovisuel) tout en conservant une forte cohérence visuelle.",
          card1_title: "Identité de Marque",
          card1_desc: "Design d'un logotype construit sur grille avec une typographie géométrique soignée et une palette chromatique équilibrée.",
          card2_title: "Système Modulaire",
          card2_desc: "Création de fonds texturés personnalisés, de motifs géométriques et d'une structure de moodboard pour assurer la cohérence visuelle du feed Instagram.",
          chromatic: "Modularité Chromatique",
          variations: "Variations du Logotype",
          variations_desc: "Découvrez comment le logotype s'adapte dynamiquement selon les contrastes et les supports de diffusion.",
          tabs: {
            signature: "Signature Bleu",
            dark: "Sombre",
            light: "Clair"
          },
          labels: {
            signature: "Version Signature (Bleu Royal)",
            dark: "Version Sombre (Noir/Gris)",
            light: "Version Claire (Blanc)"
          },
          charter_tag: "Charte Visuelle",
          charter_title: "Pages de la charte graphique",
          charter_desc: "Défilez pour parcourir l'ensemble des slides de la charte visuelle.",
          download_title: "Télécharger la charte complète",
          download_desc: "Consultez le guide de marque complet en haute résolution pour découvrir en détail la typographie, la palette de couleurs CMJN/RVB/HEX, le moodboard d'inspiration et les déclinaisons de mise en page.",
          download_btn: "Télécharger le PDF (7.4 Mo)",
          gallery_tags: {
            charter: "Charte Visuelle",
            charter_title: "Slides de la charte graphique",
            mockups: "Mockups & Mises en situation",
            mockups_title: "Mockups de l'identité visuelle"
          }
        },
        ux: {
          period: "Temps Libre",
          type: "Projets Personnels",
          concept_title: "Expérimentations et développement web.",
          para1: "Réalisés en Vibe Coding durant mon temps libre, ces projets (principalement des sites web) combinent ma créativité avec des outils d'IA avancés comme Antigravity et des plateformes comme Framer pour concevoir et itérer rapidement des interfaces interactives.",
          card1_title: "HTML & CSS",
          card1_desc: "Maîtrise des structures sémantiques et des mises en page complexes (Flexbox, Grid) pour des interfaces fluides et responsives.",
          card2_title: "React & JS",
          card2_desc: "Développement d'applications web modernes utilisant React pour une gestion dynamique de l'état et des interactions fluides.",
          card3_title: "Vibe Coding & IA",
          card3_desc: "Conception rapide et intégration de sites modernes en exploitant des technologies d'IA (Antigravity) et des outils comme Framer.",
          futsal: {
            tag: "Développement & Design",
            title: "Site Web Futsal Drancy",
            desc: "Conception intégrale du premier site officiel du club. Utilisation de technologies modernes pour offrir une expérience fluide, de la présentation des équipes aux inscriptions en ligne.",
            btn: "Voir le site live"
          },
          bts: {
            tag: "Plateforme Web",
            title: "BTS Révision",
            desc: "Conception d'une plateforme de révision complète pour les étudiants. Focus sur l'organisation des ressources et la facilité de navigation sur mobile.",
            btn: "Voir le site live"
          },
          hope: {
            tag: "UI/UX Mockup",
            title: "HopePower",
            desc: "Prototype haute-fidélité réalisé dans le cadre de mon BTS Communication pour un projet d'études. Conception d'une interface mobile pour un site solidaire fictif, avec un focus sur le parcours utilisateur (UX flow) et la cohérence visuelle.",
            btn: "Voir le mockup live"
          }
        }
      }
    }
  },
  en: {
    translation: {
      hero: {
        welcome: "Welcome, I am",
        name: "THARSANAN",
        roles: {
          graphic: "Graphic Design",
          web: "Web Development",
          comm: "Digital Communication"
        },
        badges: {
          design: "Design",
          dev: "Web Development",
          comm: "Communication"
        },
        buttons: {
          projects: "My projects",
          contact: "Contact me"
        },
        alternance: "Looking for an apprenticeship",
        date: "September 2026"
      },
      about: {
        eyebrow: "Who am I?",
        title_start: "A path between ",
        title_tech: "technical skills",
        title_middle: " and ",
        title_comm: "communication",
        paragraph: "After starting with a BUT in Multimedia and Internet, I chose to specialize in communication. This path allowed me to develop both technical skills and a creative vision oriented towards digital media.",
        cv_link: "View my full background",
        alternance_pill: "Looking for an apprenticeship · Sept. 2026",
        stats: {
          studies: "Years of study",
          exp: "Year of experience",
          software: "Softwares",
          passion: "Passionate"
        }
      },
      projects: {
        eyebrow: "Featured Projects",
        title: "Selected works.",
        view_all: "View all projects",
        roles: {
          branding: "Branding & Graphic Design",
          web: "Web Dev & Communication"
        },
        desc: {
          tharsh_studio: "Complete creation of the graphic charter and visual identity of my creative studio for its launch on Instagram.",
          futsal: "Integral website design and club branding. An interactive site project developed with Vibe Coding (Antigravity)."
        }
      },
      nav: {
        home: "Home",
        projects: "Projects",
        skills: "Skills",
        cv: "Journey",
        contact: "Contact"
      },
      // New pages translation resources
      cv_page: {
        tag: "Experience & Education",
        title_start: "My",
        title_end: "Journey.",
        subtitle: "A trajectory mixing technical expertise, strategic communication, and a passion for design.",
        download: "Download my CV",
        view_badge: "View CV",
        education_title: "Education",
        experience_title: "Experience",
        quote: "\"Innovation is the fruit of constant curiosity and creative rigor.\"",
        quote_sub: "Every step of my journey has been guided by the desire to learn and take on challenges. I am ready to bring this experience to your projects.",
        skills: {
          autonomy: "Autonomy",
          teamwork: "Teamwork",
          adaptability: "Adaptability",
          rigor: "Rigor",
          creativity: "Creativity"
        },
        education: {
          upec: {
            title: "Professional Licence (Admitted)",
            location: "University of Paris-Est Créteil (UPEC)",
            desc: "Specializing in public interest communication."
          },
          brel: {
            title: "BTS Communication",
            location: "Jacques Brel High School · La Courneuve",
            desc: "Implementation of communication actions, service provider relations, technology watch, and graphic design."
          },
          mmi: {
            title: "BUT Multimedia and Internet Careers",
            location: "IUT of Sénart-Fontainebleau",
            desc: "Web development, UI/UX Design, audiovisual, and multimedia communication."
          },
          sti2d: {
            title: "STI2D Baccalaureate",
            location: "Paul Le Rolland High School · Drancy",
            desc: "Specialized in Information and Digital Systems."
          }
        },
        experiences: {
          futsal: {
            title: "Communication & Graphic Design",
            company: "Futsal Drancy",
            type: "Internship | Civic Service | Volunteering",
            missions: [
              "Volunteer (Since Jan 2026): Event support and community management.",
              "Civic Service (Sept 2024 — May 2025): Social media management and digital content creation.",
              "Communication Intern (May — June 2025 & Nov — Dec 2025): Visibility strategy and print support materials."
            ]
          },
          banque: {
            title: "Customer Relationship Officer",
            company: "La Banque Postale",
            type: "Permanent Contract",
            missions: [
              "Greeting and guiding customers with professionalism",
              "Selling postal products and services (tailored solutions)",
              "Managing sorting and secure delivery of parcels and mail"
            ]
          },
          osi: {
            title: "Community Manager — Photographer",
            company: "Objectif Sciences International",
            type: "Internship | Volunteering",
            missions: [
              "Intern (March — April 2023) then Volunteer (Since May 2023).",
              "Photo and video coverage of the Geneva Forum at the Palace of Nations (UN).",
              "Social media management and promotion of scientific diplomacy actions.",
              "Conducting interviews with international delegates and researchers for Terra Scientifica.",
              "Creating digital content to promote participatory science education.",
              "Supporting event communication at international fairs and conferences."
            ]
          },
          parkours: {
            title: "Independent Tutor",
            company: "Parkours",
            type: "Freelance",
            missions: [
              "Academic support and tutoring for students",
              "Assisting in organization and learning methods optimization"
            ]
          }
        }
      },
      skills_page: {
        tag: "Expertise",
        title_start: "My",
        title_end: "Skills.",
        subtitle: "A versatile mix between creative design, strategic communication, and technical development.",
        stickers: {
          creative: "Creative",
          technical: "Technical",
          tools: "Tools"
        },
        categories: {
          graphic: {
            title: "Graphic Design",
            desc: "Proficiency in Adobe Creative Suite (Ps, Ai, Id) to create impactful visuals."
          },
          web: {
            title: "Web Development",
            desc: "Designing modern websites using React, HTML5, and CSS3/Tailwind."
          },
          comm: {
            title: "Communication",
            desc: "Developing communication strategies and managing social networks."
          },
          uiux: {
            title: "UI/UX Design",
            desc: "Creating intuitive and user-centric interfaces."
          },
          motion: {
            title: "Motion Design",
            desc: "Smooth animations using After Effects to dynamize your contents."
          },
          tools: {
            title: "Tool Mastery",
            desc: "Proficient in design, communication, and management software."
          }
        },
        software: {
          title: "Mastered",
          highlighted: "softwares",
          ps: "Photo editing, manipulation, visual creation",
          ae: "Motion design, animations",
          pr: "Video editing, professional editing",
          ai: "Vector design, logos, posters",
          id: "Layout, print support materials",
          cv: "Quick and efficient design",
          wp: "Content writing and management",
          html_css: "Modern web structure and styling"
        },
        languages: {
          title: "Spoken",
          highlighted: "languages",
          fr: { name: "French", info: "Bilingual — C2" },
          en: { name: "English", info: "Intermediate — B2" },
          tamil: { name: "Tamil", info: "Native tongue — C2" },
          de: { name: "German", info: "Beginner — A1" }
        }
      },
      projets_page: {
        tag: "Works",
        title_start: "Discover",
        title_end: "my universe.",
        subtitle: "A collection of projects (mainly websites and designs) illustrating my versatility, my passion for creation, and my use of modern digital tools.",
        stickers: {
          creative: "Creativity",
          design: "Design"
        },
        explore: "Explore",
        tags: {
          branding_graphic: "Branding & Graphic Design",
          web_comm: "Web Dev & Communication",
          branding_packaging: "Branding & Packaging",
          uiux: "Interface Design",
          audiovisual: "Audiovisual & Editing",
          strategy_design: "Strategy & Design",
          creativity: "Free Creativity"
        },
        list: {
          tharsh_studio: {
            title: "Tharsh Studio",
            desc: "Creation of the graphic charter and visual identity of my creative studio for its launch on Instagram."
          },
          futsal: {
            title: "Futsal Drancy",
            desc: "Complete digital identity redesign and official website creation in Vibe Coding (Antigravity)."
          },
          alda: {
            title: "Alda Beer",
            desc: "Complete creation of the brand's visual identity on Figma and development of the showcase site in HTML, CSS, and JavaScript."
          },
          ux: {
            title: "UI/UX Works",
            desc: "Selection of interactive websites (BTS Revision, HopePower) developed in Vibe Coding (Antigravity/Framer)."
          },
          sans_bavures: {
            title: "Sans Bavures",
            desc: "Production, editing, and web integration for an interactive multimedia report."
          },
          bts_com: {
            title: "BTS Com",
            desc: "Portfolio of communication projects and interactive web mockups designed during my studies."
          },
          perso: {
            title: "Personal Creations",
            desc: "Graphic explorations, movie posters, and experimental web mockups."
          }
        }
      },
      contact_page: {
        tag: "Contact",
        title_start: "Let's talk about your",
        title_end: "next project.",
        subtitle: "Whether you have a clear idea or want to explore possibilities, I am here to guide you.",
        sticker: "Network",
        tooltip: "Copy to clipboard",
        labels: {
          name: "Full name",
          email: "Email",
          phone: "Phone",
          subject: "Subject",
          message: "Message"
        },
        buttons: {
          send: "Send Message",
          sending: "Sending…",
          another: "Send another message"
        },
        status: {
          sending_toast: "Sending your message…",
          success: "Message sent!",
          success_desc: "Thank you for your message. I will get back to you very quickly.",
          error: "An error occurred. Please try again."
        }
      },
      footer: {
        marquee: ["DIGITAL DESIGN", "LP COMMUNICATION", "ART DIRECTION", "CREATIVE PORTFOLIO"],
        profile: {
          student: "Future LP Communication student.",
          search: "Looking for an apprenticeship in digital communication."
        },
        clock: "Paris, FR:",
        nav_title: "Navigation",
        contact_title: "Contact",
        socials_title: "Socials",
        copied: "Email copied!",
        copyright: "© 2026 Tharsanan · Design · Development · Communication",
        back_to_top: "Back to top"
      },
      photo_page: {
        tag: "Gallery",
        title_start: "Photo",
        title_end: "graphy.",
        subtitle: "Through the lens, I seek to capture the invisible."
      },
      project_details: {
        next: "Next project",
        explore: "Discover",
        labels: {
          role: "Role",
          period: "Period",
          tools: "Tools",
          type: "Type",
          context: "Context",
          focus: "Focus",
          theme: "Theme",
          launch: "Launch",
          destination: "Destination"
        },
        alda: {
          role: "Branding & Packaging",
          period: "Jan. 2023 – June 2023",
          type: "University project",
          concept_title: "Craft brand concept.",
          para1: "Collaborative project to create a craft beer brand. Our team designed the entire visual identity on Figma and developed the showcase site using web languages (HTML, CSS, and JavaScript).",
          para2: "My role focused on creating the logo, labels, and packaging, ensuring that each visual element reflected the history and authenticity of Alda beer.",
          card1_title: "Branding & Design",
          card1_desc: "Development of an evocative name and a consistent visual universe across all promotional media (posters, social networks).",
          card2_title: "Marketing & Launch",
          card2_desc: "Elaboration of a complete launch plan including a communication strategy and the organization of a mock tasting."
        },
        bts_com: {
          context: "Jacques Brel High School",
          period: "2024 — 2026",
          type: "Graphic Design",
          concept_title: "Theory and creative practice.",
          para1: "As part of my BTS Communication, I designed numerous communication media and web mockups, integrating web design into my strategic thinking and graphic execution.",
          para2: "From creating advertising posters to designing mockups for various brands, this journey allows me to master the entire graphic chain.",
          card1_title: "Visual Design",
          card1_desc: "Mastery of vector creation and image editing tools.",
          card2_title: "Print Media",
          card2_desc: "Creation of flyers, brochures, and posters complying with technical constraints.",
          gallery_tag: "Print & Branding",
          gallery_title: "Mockups & Visual Com"
        },
        futsal: {
          role: "Communication Officer",
          period: "2024 — Present",
          context: "Civic Service & CDD",
          concept_title: "Structuring the communication of a sports club.",
          para1: "I joined Futsal Drancy with the mission to professionalize the club's image. From Civic Service to CDD, I set up a global strategy including the creation of the first official website using Vibe Coding (with Antigravity).",
          visit_website: "Discover the website",
          card1_title: "Web Design",
          card1_desc: "First official website of the club.",
          card2_title: "Content",
          card2_desc: "Field photos & videos.",
          card3_title: "Events",
          card3_desc: "Telethon & City Festival.",
          card4_title: "Branding",
          card4_desc: "Equipment & Logo.",
          gallery_tags: {
            branding: "Visual Identity",
            branding_title: "Branding & Equipment",
            comm: "Communication & Events",
            comm_title: "Posters & Campaigns",
            life: "Club Life",
            life_title: "Social & Festive Action",
            social: "Social Media",
            social_title: "Social Networks"
          }
        },
        perso: {
          type: "Free Creations",
          focus: "Illustrations & Posters",
          theme: "Cinema & Culture",
          concept_title: "Free expression.",
          para1: "My personal projects allow me to explore new visual design and web integration techniques, giving me the freedom to experiment with website mockups and pay tribute to the works that inspire me, including South Indian cinema.",
          para2: "Each poster is the result of work on composition, typography, and color management to capture the essence of the original work.",
          card1_title: "Art Direction",
          card1_desc: "Exploration of various graphic styles, from minimalism to neon-synthwave.",
          card2_title: "Image Processing",
          card2_desc: "Advanced photo manipulation and creation of complex montages in Photoshop.",
          gallery_tag: "Cinema & Creations",
          gallery_title: "Posters & Illustrations"
        },
        sans_bavures: {
          role: "Editing & Production",
          period: "Sept. 2023 – Jan. 2024",
          type: "Multimedia Report",
          concept_title: "Inform & Raise Awareness.",
          para1: "Collaborative project aimed at producing an interactive multimedia report on a current topic. My role combined technical production, audiovisual editing, and web integration.",
          para2: "I used Adobe Premiere Pro to synchronize sequences, adjust color grading, and integrate dynamic transitions, while ensuring an immersive narrative.",
          card1_title: "Editing & Video",
          card1_desc: "Use of Premiere Pro for editing, color grading, and audio-visual synchronization of the report.",
          card2_title: "Voice-over & Design",
          card2_desc: "Translation of the script into English, recording the voice-over, and creating visuals using Photoshop and Illustrator."
        },
        tharsh_studio: {
          role: "Art Direction & Graphic Design",
          launch: "June 2026",
          destination: "Professional Instagram Account",
          badge: "Brand Identity",
          concept_title: "A unique creative footprint.",
          para1: "To support the launch of my professional Instagram account intended to showcase my creative achievements, I designed the visual identity of Tharsh Studio.",
          para2: "The goal was to build a modern, clean, and highly flexible personal brand, capable of adapting to different design themes (web, graphic design, audiovisual) while maintaining strong visual consistency.",
          card1_title: "Brand Identity",
          card1_desc: "Design of a grid-constructed logotype with a clean geometric typography and balanced color palette.",
          card2_title: "Modular System",
          card2_desc: "Creation of custom textured backgrounds, geometric patterns, and a moodboard structure to ensure visual consistency for the Instagram feed.",
          chromatic: "Chromatic Modularity",
          variations: "Logotype Variations",
          variations_desc: "Discover how the logotype dynamically adapts according to contrast and distribution media.",
          tabs: {
            signature: "Signature Blue",
            dark: "Dark",
            light: "Light"
          },
          labels: {
            signature: "Signature Version (Royal Blue)",
            dark: "Dark Version (Black/Grey)",
            light: "Light Version (White)"
          },
          charter_tag: "Visual Charter",
          charter_title: "Visual Charter Slides",
          charter_desc: "Scroll to browse all slides of the visual charter.",
          download_title: "Download Full Charter",
          download_desc: "Consult the complete brand guide in high resolution to discover in detail the typography, the CMYK/RGB/HEX color palette, the inspiration moodboard, and the layout variations.",
          download_btn: "Download PDF (7.4 MB)",
          gallery_tags: {
            charter: "Visual Charter",
            charter_title: "Visual Charter Slides",
            mockups: "Mockups & Situations",
            mockups_title: "Visual Identity Mockups"
          }
        },
        ux: {
          period: "Free Time",
          type: "Personal Projects",
          concept_title: "Experiments and web development.",
          para1: "Developed in Vibe Coding during my free time, these projects (mainly websites) combine my creativity with advanced AI tools like Antigravity and platforms like Framer to design and quickly iterate interactive interfaces.",
          card1_title: "HTML & CSS",
          card1_desc: "Mastery of semantic structures and complex layouts (Flexbox, Grid) for fluid and responsive interfaces.",
          card2_title: "React & JS",
          card2_desc: "Development of modern web applications using React for dynamic state management and smooth interactions.",
          card3_title: "Vibe Coding & AI",
          card3_desc: "Rapid design and integration of modern sites leveraging AI technologies (Antigravity) and tools like Framer.",
          futsal: {
            tag: "Development & Design",
            title: "Futsal Drancy Website",
            desc: "Complete design of the club's first official site. Using modern technologies to offer a smooth experience, from team presentation to online registrations.",
            btn: "See live site"
          },
          bts: {
            tag: "Web Platform",
            title: "BTS Revision",
            desc: "Design of a comprehensive review platform for students. Focus on resource organization and ease of navigation on mobile.",
            btn: "See live site"
          },
          hope: {
            tag: "UI/UX Mockup",
            title: "HopePower",
            desc: "High-fidelity prototype produced as part of my BTS Communication for a study project. Design of a mobile interface for a fictitious solidarity site, with a focus on the user journey (UX flow) and visual coherence.",
            btn: "See live mockup"
          }
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // French as default
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
