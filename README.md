# 🎨 Portfolio Tharsanan — Guide d'utilisation

## 📁 Structure des fichiers

```
portfolio/
├── index.html     ← Page principale (tout le contenu)
├── style.css      ← Tout le design et les couleurs
├── script.js      ← Animations et interactions
├── images/        ← Crée ce dossier pour tes photos !
└── README.md      ← Ce fichier
```

---

## ✏️ Comment personnaliser

### 1. Ta photo de profil (Hero section)
Dans `index.html`, trouve ce commentaire :
```html
<!-- Remplace src par ta vraie photo : <img src="images/photo.jpg" alt="Tharsanan" /> -->
```
- Crée un dossier `images/` dans ton projet
- Mets ta photo dedans (ex: `photo.jpg`)
- Remplace le bloc `<div class="photo-placeholder">` par :
```html
<img src="images/photo.jpg" alt="Tharsanan" />
```

### 2. Tes projets
Pour chaque projet, remplace les `<div class="img-placeholder">` par :
```html
<img src="images/projet1.jpg" alt="Nom du projet" />
```
Et modifie le titre, la description, et le lien.

### 3. Ton email et réseaux
Cherche `tharsanan@email.com` dans index.html et remplace par ton vrai email.
Fais pareil pour les liens LinkedIn et Behance.

### 4. Les couleurs
Dans `style.css`, tout en haut, change les variables :
```css
--blue: #1B4FFF;        /* Bleu principal */
--blue-light: #5B8DFF;  /* Bleu clair */
```

---

## 🚀 Mettre en ligne sur GitHub Pages (gratuit)

1. Crée un compte sur https://github.com
2. Crée un nouveau repository nommé : `tharsanan.github.io`
3. Uploade tes 3 fichiers (index.html, style.css, script.js) + ton dossier images
4. Va dans Settings → Pages → Source : Deploy from main branch
5. Ton site est en ligne sur : **https://tharsanan.github.io** 🎉

---

## 📧 Contact formulaire
Le formulaire simule l'envoi pour l'instant.
Pour un vrai envoi d'email gratuit, utilise https://formspree.io :
- Crée un compte gratuit sur Formspree
- Remplace `id="contactForm"` par :
```html
<form action="https://formspree.io/f/TONCODE" method="POST">
```
(supprime alors le script JS du formulaire dans script.js)
