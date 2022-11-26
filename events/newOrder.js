const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { CREATED_CATEGORY } = require('../config.json');

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
                            \n⌛ **Deadline de la commande :** ${interaction.fields.getTextInputValue('deadlineDate_Id')}
                            \n🗄️ **Status de la commande :** À réaliser`
                        )
                        .setColor('DarkBlue')
                        .setFooter({ text: `Bot créé par @Anathos#7090`, iconURL: "https://avatars.githubusercontent.com/u/83123402?v=4" })
                        .setTimestamp()
                    
                    const rows = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('move_Id')
                                .setLabel('Déplacer la commande')
                                .setStyle(ButtonStyle.Success)
                        ).addComponents(
                            new ButtonBuilder()
                                .setCustomId('cdc_Id')
                                .setLabel('Ajouter le CDC')
                                .setStyle(ButtonStyle.Primary)
                        ).addComponents(
                            new ButtonBuilder()
                                .setCustomId('modify_Id')
                                .setLabel('Modifier la commande')
                                .setStyle(ButtonStyle.Secondary)
                        ).addComponents(
                            new ButtonBuilder()
                                .setCustomId('delete_Id')
                                .setLabel('Supprimer la commande')
                                .setStyle(ButtonStyle.Danger)
                        )

                    await interaction.guild.channels.cache.get(channel.id).send({ embeds: [embed], components: [rows] });
                    interaction.reply({ content: `✅Votre commande a été envoyée dans le salon <#${channel.id}>`, ephemeral: true});
                });
            }
        }
    }
}