# UChiVerify Website

A modern, maroon-themed website for the UChiVerify Discord bot, designed for GitHub Pages.

## Features

- Modern, responsive design with maroon color scheme
- Hero section with call-to-action buttons
- Interactive FAQ system with search functionality
- Two-column layout for easy navigation
- Smooth scrolling and animations
- Mobile-friendly
- Modular architecture for easy maintenance

## Setup

### Logo

Place your logo image at `assets/logo.png`. The logo should ideally be:
- PNG format with transparent background
- Square aspect ratio (e.g., 512x512px)
- The current design expects the UChiVerify phoenix logo

### GitHub Pages Deployment

1. Push all files to your GitHub repository
2. Go to repository Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select your main branch and root folder
5. Click Save

Your site will be live at `https://yourusername.github.io/uchiverify/`

## File Structure

```
uchiverify/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript for interactivity
├── faq-data.js         # Modular FAQ data structure
├── assets/
│   └── logo.png        # Bot logo image
└── README.md           # This file
```

## Adding New FAQ Articles

To add a new FAQ article, edit `faq-data.js`:

1. Open `faq-data.js`
2. Add a new object to the `faqArticles` array:

```javascript
{
    id: 'unique-id',
    title: 'Article Title',
    content: `
        <h2>Article Title</h2>
        <p>Your content here...</p>
    `
}
```

### Content Formatting

The content field supports HTML. Use these tags for formatting:

- `<h2>` - Main article title
- `<h3>`, `<h4>` - Section headings
- `<p>` - Paragraphs
- `<ul>`, `<ol>`, `<li>` - Lists
- `<code>` - Inline code (e.g., `/setchannel`)
- `<a href="..." target="_blank" rel="noopener noreferrer">` - External links

### Example Article

```javascript
{
    id: 'example-article',
    title: 'Example Article',
    content: `
        <h2>Example Article</h2>
        <p>This is a paragraph with <code>inline code</code>.</p>

        <h3>A Section</h3>
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
        </ul>

        <p>Visit our <a href="https://discord.gg/syNk2wNp2x" target="_blank" rel="noopener noreferrer">support server</a>.</p>
    `
}
```

## Customization

### Colors

Edit CSS variables in `styles.css` (lines 2-10) to change the color scheme:

```css
:root {
    --maroon-primary: #800000;
    --maroon-dark: #5c0000;
    --maroon-light: #a51c30;
    /* ... other colors */
}
```

### Buttons

Update button URLs in `index.html`:
- Add to Discord: Line 18
- Support Server: Line 24

### Footer

Edit footer text in `index.html` (line 52).

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Chrome Mobile)
- Supports screens from 320px to 4K

## Performance

- Lightweight (~40KB total uncompressed)
- No external dependencies
- Pure HTML, CSS, and vanilla JavaScript
- Fast load times on GitHub Pages

## License

This website is for the UChiVerify Discord bot.

---

Built with modern web standards and love for UChicago.
