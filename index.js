const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
require('dotenv').config();

// Bot inicializálás
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Bot kész állapot
client.once('ready', () => {
    console.log(`${client.user.tag} aktiválva`);
    console.log(`Bot ID: ${client.user.id}`);
    console.log('Szolgáltatás elindítva');

    // Státusz beállítás
    client.user.setActivity({
        name: 'HEXORA - digitális portál',
        type: ActivityType.Watching
    });
});

// Új tag üdvözlése
client.on('guildMemberAdd', async (member) => {
    const welcomeChannelId = '1425567299414393012'; // Üdvözlő csatorna ID
    
    const channel = member.guild.channels.cache.get(welcomeChannelId);
    if (!channel) {
        console.log('Üdvözlő csatorna nem található');
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(`Üdv a HEXORA közösségben, ${member.user.username}!`)
        .setDescription(
            '**Felfedezés és kapcsolódás a digitális világban**\n\n' +
            '🔹 **Elérhető szolgáltatások:**\n' +
            '• Szerver, bot vagy weboldal létrehozása\n' +
            '• Közösségek böngészése\n' +
            '• Fejlesztőkkel való kapcsolattartás\n' +
            '• Projekt megosztás\n\n' +
            '✨ **Parancs lista:**\n' +
            '• `!info` - Részletek a projektről\n' +
            '• `!segítség` - Parancsok listája\n' +
            '• `!web` - Webes elérhetőség\n\n' +
            '💎 **HEXORA — Felfedez. Kapcsolódj. Népszerűsít.**'
        )
        .setColor(0x00FF00)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: 'Köszönjük, hogy velünk vagy!' });

    try {
        await channel.send({ embeds: [embed] });
        console.log(`Üdvözlő üzenet elküldve: ${member.user.tag}`);
    } catch (error) {
        console.error('Hiba az üdvözlő üzenet küldésekor:', error);
    }
});

// Üzenet figyelés
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const prefix = '!';
    
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Információs parancs
    if (command === 'info') {
        const embed = new EmbedBuilder()
            .setTitle('HEXORA - Digitális kapu')
            .setDescription('Felfedezés és kapcsolódás a digitális világban')
            .setColor(0x7289DA)
            .addFields(
                {
                    name: '🔹 Szolgáltatások',
                    value: '• Szerver, bot vagy weboldal igénylés\n' +
                           '• Kategóriánkénti böngészés\n' +
                           '• Fejlesztői kapcsolatok\n' +
                           '• Projekt megosztás',
                    inline: false
                },
                {
                    name: '🌐 Elérhetőségek',
                    value: '[Discord Közösség](https://discord.gg/k79S7p7DH7)\n' +
                           '[Web Platform](https://hexora.com) - Előkészületben',
                    inline: false
                },
                {
                    name: '💎 Jelszó',
                    value: '**Felfedez. Kapcsolódj. Népszerűsít.**',
                    inline: false
                }
            )
            .setFooter({ text: 'HEXORA - Közösségépítés' });

        message.reply({ embeds: [embed] });
    }

    // Segítség parancs
    if (command === 'segítség' || command === 'help') {
        const embed = new EmbedBuilder()
            .setTitle('HEXORA Bot - Parancsok')
            .setDescription('Elérhető funkciók listája:')
            .setColor(0x0099FF)
            .addFields(
                {
                    name: 'ℹ️ Információ',
                    value: '`!info` - Projekt információk\n' +
                           '`!segítség` - Parancs lista\n' +
                           '`!web` - Webes linkek',
                    inline: false
                },
                {
                    name: '👋 Kommunikáció',
                    value: '`!üdv` - Üdvözlés\n' +
                           '`!meghívó` - Szerver meghívó',
                    inline: false
                }
            )
            .setFooter({ text: 'HEXORA Bot - Támogatás' });

        message.reply({ embeds: [embed] });
    }

    // Üdvözlés parancs
    if (command === 'üdv' || command === 'hello') {
        message.reply(`Szia ${message.author}! 👋 Üdvözöl a **HEXORA**! 🚀`);
    }

    // Meghívó parancs
    if (command === 'meghívó' || command === 'invite') {
        const embed = new EmbedBuilder()
            .setTitle('HEXORA meghívó')
            .setDescription('Csatlakozz és fedezz fel új lehetőségeket!')
            .setColor(0x5865F2)
            .addFields(
                {
                    name: '✨ Azonnali csatlakozás:',
                    value: 'https://discord.gg/k79S7p7DH7',
                    inline: false
                },
                {
                    name: '💎 Felfedezés',
                    value: '• Discord szerverek\n• Webes projektek\n• Kreatív munkák',
                    inline: true
                },
                {
                    name: '🔗 Kapcsolat',
                    value: '• Fejlesztőkkel\n• Közösségekkel\n• Alkotókkal',
                    inline: true
                }
            );

        message.reply({ embeds: [embed] });
    }

    // Web parancs
    if (command === 'web' || command === 'website') {
        const embed = new EmbedBuilder()
            .setTitle('HEXORA Web Platform')
            .setDescription('Hamarosan aktív! 🚀\n\n' + 'Addig is itt találsz minket:')
            .setColor(0xFFD700)
            .addFields({
                name: '🌐 Discord Közösség',
                value: '[Kattints a belépéshez!](https://discord.gg/k79S7p7DH7)',
                inline: false
            });

        message.reply({ embeds: [embed] });
    }

    // Teszt parancs
    if (command === 'teszt') {
        message.reply('✅ Bot működik! Minden rendben.');
    }
});

// Hibakezelés
client.on('error', (error) => {
    console.error('Discord bot hiba:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Nem kezelt hiba:', error);
});

// Bot indítás
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
    console.error('Bot token hiányzik! Állítsd be a .env fájlban.');
    console.log('Hozz létre egy .env fájlt a következő tartalommal:');
    console.log('BOT_TOKEN=your_bot_token_here');
    process.exit(1);
}

client.login(BOT_TOKEN).catch(error => {
    console.error('Bejelentkezési hiba:', error);
    console.log('Ellenőrizd a bot token érvényességét!');
    process.exit(1);
});
