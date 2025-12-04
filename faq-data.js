/**
 * FAQ Data Structure
 *
 * To add a new FAQ article:
 * 1. Add a new object to the faqArticles array
 * 2. Provide an id (unique, lowercase with hyphens)
 * 3. Provide a title (shown in the sidebar)
 * 4. Provide content (HTML string with the article content)
 *
 * The content supports HTML tags for formatting:
 * - <h3>, <h4> for headings
 * - <p> for paragraphs
 * - <ul>, <li> for lists
 * - <code> for inline code
 * - <a> for links
 */

const faqArticles = [
    {
        id: 'setting-up',
        title: 'Setting the bot up',
        content: `
            <h2>Setting the bot up</h2>
            <p>Any user with <code>Administrator</code> permissions can set the bot up. To send a verification prompt in your preferred channel, type <code>/setchannel</code> and the bot will respond by posting a prompt for users to verify.</p>

            <p>You should have a role titled <code>UChicago Verified</code> set up in the server. If you don't, and UChiVerify has the proper permissions, the bot will do it for you.</p>

            <h3>Common Use Case</h3>
            <p>The most common use for the Bot by servers is setting a channel that users who do not have <code>UChicago Verified</code> can view and those who do have the role cannot. At the same time, the rest of the server is set to the inverse where only verified users can view it. This avoids bots that are unverified from DMing verified server users because they can only access the server's member list of unverified users.</p>
        `
    },
    {
        id: 'setchannel-error',
        title: 'The bot returns an error when I run /setchannel',
        content: `
            <h2>The bot returns an error when I run /setchannel</h2>
            <p>If you're experiencing issues with the <code>/setchannel</code> command, ensure the following:</p>

            <ul>
                <li>UChiVerify has permissions to both <strong>View</strong> and <strong>Chat</strong> in the channel you are using the command in.</li>
                <li>You are the server owner or hold a role with <code>Administrator</code> permissions turned on.</li>
            </ul>

            <p>If both of these are true and it still won't work, send a message in the <a href="https://discord.gg/syNk2wNp2x" target="_blank" rel="noopener noreferrer">support server</a>.</p>
        `
    },
    {
        id: 'role-assignment',
        title: "The bot won't assign roles!",
        content: `
            <h2>The bot won't assign roles!</h2>
            <p>If the bot is not assigning roles to verified users, please check the following:</p>

            <ul>
                <li>UChiVerify has permissions to <code>Manage Roles</code> and can view both the verification channel and at least one channel where verified members have access.</li>
                <li>UChiVerify is online (check if the bot appears online in your server).</li>
            </ul>

            <p>If both of these conditions are met and it still won't work, send a message in the <a href="https://discord.gg/syNk2wNp2x" target="_blank" rel="noopener noreferrer">support server</a>.</p>
        `
    },
    {
        id: 'access-denied',
        title: 'The bot returns error "access_denied" when I go to verify',
        content: `
            <h2>The bot returns error "access_denied" when I go to verify</h2>
            <p>If you receive an "access_denied" error when attempting to verify, this means you are not currently in the authorized users list.</p>

            <p>To resolve this issue, please send a direct message with your CNET name, or share it in the <a href="https://discord.gg/syNk2wNp2x" target="_blank" rel="noopener noreferrer">support server</a>, and you will be added to the list of authorized users.</p>
        `
    },
    {
        id: 'group-distinction',
        title: 'Can I distinguish between groups of UChicago people?',
        content: `
            <h2>Can I distinguish between groups of UChicago people?</h2>
            <p>No. UChicago directory data is sensitive and the bot cannot distinguish between groups of people (such as students, faculty, staff, or different classes).</p>

            <p>The bot can only verify that someone is associated with UChicago through the university directory, but cannot provide additional details about their status or affiliation level.</p>
        `
    },
    {
        id: 'add-bot',
        title: 'How do I add the bot?',
        content: `
            <h2>How do I add the bot?</h2>
            <p>Adding UChiVerify to your Discord server is simple!</p>

            <ol>
                <li>Click the following link: <a href="https://discord.com/oauth2/authorize?client_id=1347436993503559691" target="_blank" rel="noopener noreferrer">Add UChiVerify to Discord</a></li>
                <li>Select the server you want to add the bot to</li>
                <li>Review the permissions and click "Authorize"</li>
                <li>Complete the CAPTCHA if prompted</li>
            </ol>

            <p>Once added, use the <code>/setchannel</code> command in your desired verification channel to get started!</p>
        `
    },
    {
        id: 'data-storage',
        title: 'Does UChiVerify store my information?',
        content: `
            <h2>Does UChiVerify store my information?</h2>
            <p>This question comes up a lot so I figure I show the capabilities of the bot, what the bot does, and what the bot actually stores.</p>

            <h3>Information the bot has the capability of accessing:</h3>
            <pre><code>{'sub': 'random_hash_here',
'name': 'Phil Bird Phoenix',
'locale': 'en_US',
'email': 'phoenix@uchicago.edu',
'nickname': 'Phil',
'preferred_username': 'phoenix@uchicago.edu',
'given_name': 'Phil',
'middle_name': 'Bird',
'family_name': 'Phoenix',
'zoneinfo': 'America/Chicago',
'updated_at': 1742582820,
'email_verified': True
}</code></pre>

            <h3>Information the bot actually accesses to verify your status:</h3>
            <pre><code>{'sub': 'random_hash_here',
'email': 'phoenix@uchicago.edu',
'email_verified': True
}</code></pre>

            <h3>Information the bot stores permanently:</h3>
            <pre><code>{}</code></pre>

            <p>UChiVerify may temporarily store the data it uses to verify your status in logs, which persist only as long as UChiVerify is online. The bot restarts for updates every few hours or so. This temporary buffer is for troubleshooting issues if you ever run into problems using UChiVerify.</p>

        `
    }
];

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = faqArticles;
}
