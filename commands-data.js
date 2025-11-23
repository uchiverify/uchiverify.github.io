/**
 * Bot Commands Data Structure
 *
 * To add a new command:
 * 1. Add a new object to the botCommands array
 * 2. Provide a command name (e.g., "/setchannel")
 * 3. Provide a description
 * 4. Provide usage examples if applicable
 * 5. Provide permissions required
 */

const botCommands = [
    {
        id: 'setchannel',
        command: '/setchannel',
        description: 'Set up the verification channel in your server',
        usage: `
            <h3>Usage</h3>
            <p>Simply type <code>/setchannel</code> in the channel where you want the verification prompt to appear.</p>

            <h3>What it does</h3>
            <ul>
                <li>Posts a verification prompt in the current channel</li>
                <li>Creates the "UChicago Verified" role if it doesn't exist (requires bot to have Manage Roles permission)</li>
                <li>Allows users to click "Verify Now" to start the verification process</li>
            </ul>

            <h3>Requirements</h3>
            <ul>
                <li>You must have <code>Administrator</code> permissions or be the server owner</li>
                <li>The bot must have <code>View Channel</code> and <code>Send Messages</code> permissions in the channel</li>
                <li>The bot should have <code>Manage Roles</code> permission to create/assign the verified role</li>
            </ul>
        `,
        permissions: 'Administrator'
    },
    {
        id: 'help',
        command: '/help',
        description: 'Get help with the bot',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/help</code> to get an invite to our support Discord server..</p>
        `,
        permissions: 'None'
    },
    {
        id: 'scav',
        command: '/scav',
        description: 'Get random UChicago Scavenger Hunt items',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/scav</code> to get a random item from UChicago's famous Scavenger Hunt.</p>

            <h3>What it does</h3>
            <ul>
                <li>Displays a random item from past Scavenger Hunt lists</li>
                <li>Shows the item description and point value</li>
                <li>Great for nostalgia or inspiration for future hunts</li>
            </ul>

            <h3>Example Output</h3>
            <p><strong>Item 2011.52</strong><br>
            Seventeen magazine's "Traumarama" column featuring the most embarrassing moments of Ernest Hemingway, Ayn Rand, H.P. Lovecraft, and Batman.<br>
            <em>Points: 4 points</em></p>
        `,
        permissions: 'None'
    },
    {
        id: 'thingstodo',
        command: '/thingstodo',
        description: 'Discover upcoming events at UChicago',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/thingstodo</code> to see upcoming events and activities at UChicago.</p>

            <h3>What it does</h3>
            <ul>
                <li>Shows upcoming campus events, performances, and activities</li>
                <li>Displays event details including date, time, and location</li>
                <li>Helps you stay connected with the UChicago community</li>
            </ul>

            <h3>Example Output</h3>
            <p><strong>Keila Strong: Closet Chronicles</strong><br>
            Date & Time: Sunday, November 23, 2025 at 12:00 AM<br>
            Location: Logan Center for the Arts</p>
        `,
        permissions: 'None'
    },
    {
        id: 'shadydealer',
        command: '/shadydealer',
        description: 'Get latest articles from the Chicago Shady Dealer',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/shadydealer</code> to read satirical articles from UChicago's humor publication.</p>

            <h3>What it does</h3>
            <ul>
                <li>Fetches articles from the Chicago Shady Dealer's archive</li>
                <li>Displays the article title and author</li>
                <li>Provides a link to read the full article</li>
                <li>Brings UChicago's unique brand of humor to your server</li>
            </ul>

            <h3>About</h3>
            <p>The Chicago Shady Dealer is UChicago's satirical newspaper, delivering campus humor since 2004.</p>
        `,
        permissions: 'None'
    },
    {
        id: 'daysinquarter',
        command: '/daysinquarter',
        description: 'See how many days are left in the current quarter',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/daysinquarter</code> to see how many days remain until the end of the quarter.</p>

            <h3>What it does</h3>
            <ul>
                <li>Calculates days remaining in the current academic quarter</li>
                <li>Shows a visual countdown</li>
                <li>Provides motivation to keep going</li>
                <li>Helps you track academic progress and plan ahead</li>
            </ul>

            <h3>Note</h3>
            <p>Based on UChicago's quarter system schedule. Perfect for those final week pushes!</p>
        `,
        permissions: 'None'
    },
    {
        id: 'finalsmotivation',
        command: '/finalsmotivation',
        description: 'Get motivational content to power through finals',
        usage: `
            <h3>Usage</h3>
            <p>Type <code>/finalsmotivation</code> when you need a boost during finals week.</p>

            <h3>What it does</h3>
            <ul>
                <li>Sends motivational messages and images</li>
                <li>Helps lift spirits during stressful finals periods</li>
                <li>Reminds you that you can do it!</li>
                <li>Perfect for sharing in study group channels</li>
            </ul>

            <h3>When to use</h3>
            <p>Best used during finals week or when you need a quick morale boost. Remember: psets psets psets phil!</p>
        `,
        permissions: 'None'
    }
];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = botCommands;
}
