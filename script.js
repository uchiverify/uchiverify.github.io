/**
 * UChiVerify Website - Main JavaScript
 * Handles tabs, FAQ navigation, commands, search, and demo animation
 */

// State
let currentFAQArticle = null;
let currentCommand = null;
let animationTimeout = null;

// DOM Elements
const faqList = document.getElementById('faq-list');
const faqArticle = document.getElementById('faq-article');
const faqSearchInput = document.getElementById('faq-search');

const commandsList = document.getElementById('commands-list');
const commandArticle = document.getElementById('command-article');
const commandsSearchInput = document.getElementById('commands-search');

/**
 * Initialize everything when DOM is ready
 */
function init() {
    initTabs();
    initCommands();
    initFAQ();
    initDemoAnimation();
    initCommandsShowcase();
    setupSmoothScroll();
}

/**
 * Initialize tab switching
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
}

/**
 * Initialize Commands section
 */
function initCommands() {
    renderCommandsList();
    setupCommandsSearch();
}

/**
 * Render the commands list in the sidebar
 */
function renderCommandsList() {
    commandsList.innerHTML = '';

    botCommands.forEach(command => {
        const li = document.createElement('li');
        li.dataset.commandId = command.id;

        const link = document.createElement('a');
        link.href = `#command-${command.id}`;
        link.innerHTML = `<code>${command.command}</code>`;
        link.dataset.commandId = command.id;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            displayCommand(command);
            window.history.pushState({}, '', `#command-${command.id}`);
        });

        li.appendChild(link);
        commandsList.appendChild(li);
    });
}

/**
 * Display a specific command
 * @param {Object} command - The command object to display
 */
function displayCommand(command) {
    currentCommand = command;

    const content = `
        <h2>${command.command}</h2>
        <p><strong>Description:</strong> ${command.description}</p>
        <p><strong>Required Permissions:</strong> <code>${command.permissions}</code></p>
        ${command.usage}
    `;

    commandArticle.innerHTML = content;

    // Update active state in sidebar
    const allLinks = commandsList.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.dataset.commandId === command.id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Scroll to top of content area on mobile
    if (window.innerWidth <= 1024) {
        commandArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Setup the commands search functionality
 */
function setupCommandsSearch() {
    commandsSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterList(commandsList, botCommands, searchTerm);
    });
}

/**
 * Initialize the FAQ system
 */
function initFAQ() {
    renderFAQList();
    setupFAQSearch();

    // Load article or command from URL hash if present
    const hash = window.location.hash.substring(1);
    if (hash) {
        if (hash.startsWith('command-')) {
            const commandId = hash.replace('command-', '');
            const command = botCommands.find(c => c.id === commandId);
            if (command) {
                // Switch to commands tab
                document.querySelector('[data-tab="commands"]').click();
                setTimeout(() => displayCommand(command), 100);
            }
        } else {
            const article = faqArticles.find(a => a.id === hash);
            if (article) {
                // Switch to FAQ tab
                document.querySelector('[data-tab="faq"]').click();
                setTimeout(() => displayFAQArticle(article), 100);
            }
        }
    }
}

/**
 * Render the FAQ list in the sidebar
 */
function renderFAQList() {
    faqList.innerHTML = '';

    faqArticles.forEach(article => {
        const li = document.createElement('li');
        li.dataset.articleId = article.id;

        const link = document.createElement('a');
        link.href = `#${article.id}`;
        link.textContent = article.title;
        link.dataset.articleId = article.id;

        link.addEventListener('click', (e) => {
            e.preventDefault();
            displayFAQArticle(article);
            window.history.pushState({}, '', `#${article.id}`);
        });

        li.appendChild(link);
        faqList.appendChild(li);
    });
}

/**
 * Display a specific FAQ article
 * @param {Object} article - The article object to display
 */
function displayFAQArticle(article) {
    currentFAQArticle = article;

    // Update content
    faqArticle.innerHTML = article.content;

    // Update active state in sidebar
    const allLinks = faqList.querySelectorAll('a');
    allLinks.forEach(link => {
        if (link.dataset.articleId === article.id) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Scroll to top of content area on mobile
    if (window.innerWidth <= 1024) {
        faqArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Setup the FAQ search functionality
 */
function setupFAQSearch() {
    faqSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterList(faqList, faqArticles, searchTerm);
    });
}

/**
 * Generic filter function for lists
 * @param {HTMLElement} listElement - The ul element to filter
 * @param {Array} dataArray - The array of data objects
 * @param {string} searchTerm - The search term
 */
function filterList(listElement, dataArray, searchTerm) {
    const listItems = listElement.querySelectorAll('li');

    listItems.forEach(li => {
        const link = li.querySelector('a');
        const itemId = link.dataset.articleId || link.dataset.commandId;
        const item = dataArray.find(d => d.id === itemId);

        if (!item) return;

        const title = link.textContent.toLowerCase();
        const contentText = item.content ? stripHtml(item.content).toLowerCase() : '';
        const description = item.description ? item.description.toLowerCase() : '';

        const matches = title.includes(searchTerm) ||
                       contentText.includes(searchTerm) ||
                       description.includes(searchTerm);

        if (matches || searchTerm === '') {
            li.classList.remove('hidden');
        } else {
            li.classList.add('hidden');
        }
    });

    // Show "no results" message if all items are hidden
    const visibleItems = listElement.querySelectorAll('li:not(.hidden)');
    let noResultsMsg = listElement.querySelector('.no-results');

    if (visibleItems.length === 0 && searchTerm !== '') {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('li');
            noResultsMsg.className = 'no-results';
            noResultsMsg.style.padding = '1rem';
            noResultsMsg.style.color = '#666';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.textContent = 'No results found';
            listElement.appendChild(noResultsMsg);
        }
    } else if (noResultsMsg) {
        noResultsMsg.remove();
    }
}

/**
 * Initialize the demo animation
 */
function initDemoAnimation() {
    const replayBtn = document.getElementById('replay-btn');
    const demoSection = document.querySelector('.demo-section');
    let hasPlayed = false;

    // Use Intersection Observer to trigger animation when section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Start animation when section is at least 30% visible and hasn't played yet
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasPlayed) {
                hasPlayed = true;
                setTimeout(() => {
                    playAnimation();
                }, 500);
            }
        });
    }, {
        threshold: [0.3], // Trigger when 30% visible
        rootMargin: '0px'
    });

    // Start observing the demo section
    observer.observe(demoSection);

    // Replay button
    replayBtn.addEventListener('click', () => {
        resetAnimation();
        // Small delay to ensure reset completes
        setTimeout(() => {
            playAnimation();
        }, 100);
    });
}

/**
 * Play the verification animation sequence
 * Sequence: Discord Embed → UChicago Sign-In → Discord Profile with Role
 */
function playAnimation() {
    const cursor = document.getElementById('demo-cursor');
    const verifyBtn = document.getElementById('demo-verify-btn');
    const signinBtn = document.getElementById('demo-signin-btn');
    const confettiContainer = document.getElementById('confetti-container');
    const discordProfile = document.getElementById('discord-profile');
    const discordEmbed = document.querySelector('.discord-embed');
    const uchicagoSignin = document.getElementById('uchicago-signin');

    // PHASE 1: Discord Embed - Cursor clicks "Verify Now"
    // Step 1: Show and move cursor to Verify button (0-1.2s)
    cursor.style.opacity = '1';
    cursor.style.left = '20px';
    cursor.style.top = '20px';

    setTimeout(() => {
        const container = document.querySelector('.demo-animation');
        const containerRect = container.getBoundingClientRect();
        const btnRect = verifyBtn.getBoundingClientRect();
        const targetX = btnRect.left - containerRect.left + btnRect.width / 2;
        const targetY = btnRect.top - containerRect.top + btnRect.height / 2;

        cursor.style.transition = 'left 1s ease-in-out, top 1s ease-in-out';
        cursor.style.left = targetX + 'px';
        cursor.style.top = targetY + 'px';
    }, 100);

    // Step 2: Click animation on Verify button (1.2s)
    setTimeout(() => {
        cursor.style.transform = 'scale(0.9)';
        verifyBtn.style.transform = 'scale(0.95)';
    }, 1200);

    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
        verifyBtn.style.transform = 'scale(1)';
    }, 1400);

    // Step 3: Fade out Discord embed (1.6s)
    setTimeout(() => {
        discordEmbed.style.transition = 'opacity 0.5s ease-out';
        discordEmbed.style.opacity = '0';
    }, 1600);

    // PHASE 2: UChicago Sign-In Page
    // Step 4: Show UChicago sign-in page (2.1s)
    setTimeout(() => {
        discordEmbed.style.display = 'none';
        uchicagoSignin.style.transition = 'opacity 0.5s ease-in';
        uchicagoSignin.style.opacity = '1';
    }, 2100);

    // Step 5: Move cursor to input field (2.9s) - added more delay for layout
    setTimeout(() => {
        const container = document.querySelector('.demo-animation');
        const containerRect = container.getBoundingClientRect();
        const inputField = document.getElementById('cnetid-input');
        const inputRect = inputField.getBoundingClientRect();
        const targetX = inputRect.left - containerRect.left + 30;
        const targetY = inputRect.top - containerRect.top + inputRect.height / 2;

        cursor.style.transition = 'left 0.8s ease-in-out, top 0.8s ease-in-out';
        cursor.style.left = targetX + 'px';
        cursor.style.top = targetY + 'px';
    }, 2900);

    // Step 6: Click on input field (3.8s)
    setTimeout(() => {
        const inputField = document.getElementById('cnetid-input');
        inputField.focus({ preventScroll: true });
        cursor.style.transform = 'scale(0.9)';
        // Visual feedback on input field click
        inputField.style.borderColor = '#800000';
        inputField.style.boxShadow = '0 0 0 2px rgba(128, 0, 0, 0.2)';
    }, 3800);

    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
        const inputField = document.getElementById('cnetid-input');
        inputField.style.boxShadow = 'none';
    }, 3950);

    // Step 7: Type "phil" character by character (4.1s - 4.7s)
    const username = "phil";
    const inputField = document.getElementById('cnetid-input');

    username.split('').forEach((char, index) => {
        setTimeout(() => {
            inputField.value += char;
        }, 4100 + (index * 150));
    });

    // Step 8: Move cursor to Next button (4.9s)
    setTimeout(() => {
        const container = document.querySelector('.demo-animation');
        const containerBounds = container.getBoundingClientRect();
        const signinBtnRect = signinBtn.getBoundingClientRect();
        const targetX = signinBtnRect.left - containerBounds.left + signinBtnRect.width / 2;
        const targetY = signinBtnRect.top - containerBounds.top + signinBtnRect.height / 2;

        cursor.style.transition = 'left 0.8s ease-in-out, top 0.8s ease-in-out';
        cursor.style.left = targetX + 'px';
        cursor.style.top = targetY + 'px';
    }, 4900);

    // Step 9: Click animation on Next button (5.8s)
    setTimeout(() => {
        cursor.style.transform = 'scale(0.9)';
        signinBtn.style.transform = 'scale(0.98)';
    }, 5800);

    setTimeout(() => {
        cursor.style.transform = 'scale(1)';
        signinBtn.style.transform = 'scale(1)';
    }, 5950);

    // Step 10: Show confetti (6.1s)
    setTimeout(() => {
        createConfetti(confettiContainer);
    }, 6100);

    // Step 11: Fade out sign-in page and cursor (6.4s)
    setTimeout(() => {
        uchicagoSignin.style.transition = 'opacity 0.5s ease-out';
        uchicagoSignin.style.opacity = '0';
        cursor.style.opacity = '0';
    }, 6400);

    // PHASE 3: Discord Profile with Role
    // Step 12: Clear input field and show Discord profile with verified role (6.9s)
    setTimeout(() => {
        // Clear the input field before showing next screen
        inputField.value = '';

        uchicagoSignin.style.display = 'none';
        discordProfile.style.transition = 'opacity 0.6s ease-in';
        discordProfile.style.opacity = '1';
    }, 6900);

    // Step 13: Clear confetti (9.7s)
    setTimeout(() => {
        const confettiPieces = confettiContainer.querySelectorAll('.confetti');
        confettiPieces.forEach(piece => {
            piece.style.transition = 'opacity 0.5s ease-out';
            piece.style.opacity = '0';
        });
    }, 9700);
}

/**
 * Create confetti particles
 * @param {HTMLElement} container - The container to add confetti to
 */
function createConfetti(container) {
    const colors = ['#800000', '#a51c30', '#FFD700', '#FFA500', '#FF6347'];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = confetti.style.width;

        container.appendChild(confetti);

        // Animate confetti
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const velocity = Math.random() * 200 + 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        confetti.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        setTimeout(() => {
            confetti.style.opacity = '1';
            confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`;
        }, 50);
    }
}

/**
 * Reset the animation to initial state
 */
function resetAnimation() {
    const cursor = document.getElementById('demo-cursor');
    const verifyBtn = document.getElementById('demo-verify-btn');
    const signinBtn = document.getElementById('demo-signin-btn');
    const confettiContainer = document.getElementById('confetti-container');
    const discordProfile = document.getElementById('discord-profile');
    const discordEmbed = document.querySelector('.discord-embed');
    const uchicagoSignin = document.getElementById('uchicago-signin');

    // Clear confetti
    confettiContainer.innerHTML = '';

    // Reset input field
    const inputField = document.getElementById('cnetid-input');
    if (inputField) {
        inputField.value = '';
        inputField.style.borderColor = '';
        inputField.style.boxShadow = '';
    }

    // Reset cursor
    cursor.style.transition = 'none';
    cursor.style.opacity = '0';
    cursor.style.left = '20px';
    cursor.style.top = '20px';
    cursor.style.transform = 'scale(1)';

    // Reset buttons
    verifyBtn.style.transform = 'scale(1)';
    signinBtn.style.transform = 'scale(1)';

    // Reset Discord embed (show)
    discordEmbed.style.display = 'block';
    discordEmbed.style.transition = 'none';
    discordEmbed.style.opacity = '1';

    // Reset UChicago sign-in (hide)
    uchicagoSignin.style.display = 'block';
    uchicagoSignin.style.transition = 'none';
    uchicagoSignin.style.opacity = '0';

    // Reset Discord profile (hide)
    discordProfile.style.transition = 'none';
    discordProfile.style.opacity = '0';

    // Force reflow
    void cursor.offsetWidth;
}

/**
 * Setup smooth scrolling for the scroll indicator
 */
function setupSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.demo-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize infinite commands showcase
 */
function initCommandsShowcase() {
    const commandsData = [
        {
            command: '/scav',
            response: {
                title: 'Item 2014(2).128',
                description: 'Fingerpainting with your forehead, 3:00 p.m. Thursday in Reynolds South Lounge. Is it too late to make Gorby jokes? Yes. Yes it is.',
                fields: [
                    { name: 'Points', value: 'Four-head points for participation. Three-head points for quality' }
                ]
            }
        },
        {
            command: '/thingstodo',
            response: {
                title: 'Game Day at Ja\'Grill',
                description: 'There\'s a ton of NCAA football games this Saturday, and Ja\' Grill in Harper Court is the place to be for all-day wing and beer',
                fields: [
                    { name: 'Date & Time', value: 'Saturday, December 6, 2025' },
                    { name: 'Location', value: '1510 E. Harper Court, Chicago, IL, 60615, United States' }
                ]
            }
        },
        {
            command: '/shadydealer',
            response: {
                title: 'Santa Looking to Split Uber from Midway',
                description: 'By Emily Feigenbaum'
            }
        },
        {
            command: '/daysinquarter',
            response: {
                title: 'DAY NUMBER 55 OF AUTUMN QUARTER! 🔔',
                description: 'There are 19 days, 7 hours, 36 minutes, and 9 seconds remaining in Autumn quarter.',
                image: 'assets/days.png'
            }
        },
        {
            command: '/finalsmotivation',
            response: {
                title: 'psets psets psets phil!',
                description: '',
                image: 'assets/cats.png'
            }
        }
    ];

    let currentCommandIndex = 0;
    let isAnimatingCommands = false;

    function createUserMessage(command, skipAnimation = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'command-message';
        if (skipAnimation) {
            messageDiv.style.opacity = '1';
        }
        messageDiv.innerHTML = `
            <div class="command-avatar user-command-avatar"></div>
            <div class="command-content">
                <div class="command-header">
                    <span class="command-author">Phil the Phoenix</span>
                    <span class="command-timestamp">Today at 12:05 PM</span>
                </div>
                <div class="command-text">${command}</div>
            </div>
        `;
        return messageDiv;
    }

    function createBotMessage(response, skipAnimation = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'command-message';
        if (skipAnimation) {
            messageDiv.style.opacity = '1';
        }

        let fieldsHTML = '';
        if (response.fields && response.fields.length > 0) {
            fieldsHTML = response.fields.map(field => `
                <div class="embed-field">
                    <div class="embed-field-name">${field.name}</div>
                    <div class="embed-field-value">${field.value}</div>
                </div>
            `).join('');
        }

        let imageHTML = '';
        if (response.image) {
            imageHTML = `<img src="${response.image}" alt="${response.title}" class="embed-image">`;
        }

        messageDiv.innerHTML = `
            <div class="bot-command-avatar">
                <img src="assets/logo.png" alt="Bot Avatar">
            </div>
            <div class="command-content">
                <div class="command-header">
                    <span class="command-author">UChiVerify</span>
                    <span class="command-bot-badge">APP</span>
                    <span class="command-timestamp">Today at 12:05 PM</span>
                </div>
                <div class="command-embed">
                    <div class="embed-title">${response.title}</div>
                    ${response.description ? `<div class="embed-description">${response.description}</div>` : ''}
                    ${fieldsHTML}
                    ${imageHTML}
                </div>
            </div>
        `;
        return messageDiv;
    }

    async function typeCommand(element, text) {
        const commandTextElement = element.querySelector('.command-text');
        commandTextElement.textContent = '';

        for (let i = 0; i < text.length; i++) {
            commandTextElement.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 80));
        }
    }

    async function playCommandAnimation() {
        if (isAnimatingCommands) return;
        isAnimatingCommands = true;

        const messagesContainer = document.getElementById('commands-messages');
        const commandData = commandsData[currentCommandIndex];

        // Clear existing messages
        messagesContainer.innerHTML = '';
        messagesContainer.style.transition = 'none';
        messagesContainer.style.transform = 'translateY(0)';
        void messagesContainer.offsetWidth;
        messagesContainer.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        // Add user message with placeholder text
        const userMessage = createUserMessage('');
        messagesContainer.appendChild(userMessage);

        // Type out the command
        await typeCommand(userMessage, commandData.command);

        // Wait a moment after typing
        await new Promise(resolve => setTimeout(resolve, 500));

        // Add bot message
        const botMessage = createBotMessage(commandData.response);
        messagesContainer.appendChild(botMessage);

        isAnimatingCommands = false;
    }

    function initializeFirstCommand() {
        const messagesContainer = document.getElementById('commands-messages');
        const commandData = commandsData[0];

        // Show first command statically (no animation)
        const userMessage = createUserMessage(commandData.command, true);
        const botMessage = createBotMessage(commandData.response, true);

        messagesContainer.appendChild(userMessage);
        messagesContainer.appendChild(botMessage);
    }

    // Initialize with first command showing
    initializeFirstCommand();

    // Setup navigation buttons
    const prevBtn = document.getElementById('commands-prev');
    const nextBtn = document.getElementById('commands-next');

    if (prevBtn) {
        prevBtn.addEventListener('click', async () => {
            if (isAnimatingCommands) return;
            currentCommandIndex = (currentCommandIndex - 1 + commandsData.length) % commandsData.length;
            await playCommandAnimation();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', async () => {
            if (isAnimatingCommands) return;
            currentCommandIndex = (currentCommandIndex + 1) % commandsData.length;
            await playCommandAnimation();
        });
    }
}

/**
 * Strip HTML tags from a string
 * @param {string} html - HTML string
 * @returns {string} Plain text without HTML tags
 */
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

/**
 * Handle browser back/forward buttons
 */
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        if (hash.startsWith('command-')) {
            const commandId = hash.replace('command-', '');
            const command = botCommands.find(c => c.id === commandId);
            if (command) {
                document.querySelector('[data-tab="commands"]').click();
                setTimeout(() => displayCommand(command), 100);
            }
        } else {
            const article = faqArticles.find(a => a.id === hash);
            if (article) {
                document.querySelector('[data-tab="faq"]').click();
                setTimeout(() => displayFAQArticle(article), 100);
            }
        }
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
