const { EmbedBuilder, ButtonBuilder } = require('discord.js');
const { CREATED_CATEGORY, COMMAND_CHANNEL } = require('../config.json');

module.exports = {
    name : 'interactionCreate',
    async execute(interaction) {
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'myModal') {
                await interaction.guild.channels.create({
                    name : `Commande de ${interaction.fields.getTextInputValue('clientOrder_Id')}`,
                    parent: CREATED_CATEGORY,
                }).then(async (channel) => {
                    const embed = new EmbedBuilder()
                        .setTitle(`Commande demandée par ${interaction.fields.getTextInputValue('clientOrder_Id')}`)
                        .setDescription(
                            `⚜️ **Nom du serveur :** ${interaction.fields.getTextInputValue('serverName_Id')}
                            \n🎫 **Nom du plugin :** ${interaction.fields.getTextInputValue('pluginName_Id')}
                            \n💵 **Prix de la commande :** ${interaction.fields.getTextInputValue('orderPrice_Id')} €
                            \n⌛ **Deadline de la commande :** ${interaction.fields.getTextInputValue('deadlineDate_Id')}`
                        )
                        .setColor('DarkPurple')
                        .setFooter({ text: `Bot créé par @Anathos#7090`, iconURL: "https://avatars.githubusercontent.com/u/83123402?v=4" })
                        .setTimestamp()

                    await interaction.guild.channels.cache.get(channel.id).send({ embeds: [embed] });
                    interaction.reply({ content: `✅Votre commande a été envoyée dans le salon <#${channel.id}>`, ephemeral: true});
                });
            }
        }
    }
}