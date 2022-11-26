const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { CREATED_CATEGORY, IN_PROGRESS_CATEGORY, BILLING_CATEGORY, FINISH_CATEGORY } = require('../config.json');

module.exports = {
    name : 'interactionCreate',
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.customId === 'move_Id') {
                if (interaction.channel.parentId === CREATED_CATEGORY) {
                    await interaction.channel.setParent(IN_PROGRESS_CATEGORY);
                    interaction.reply({ content: '✅ Le ticket a bien été déplacé.', ephemeral: true });
                } else if (interaction.channel.parentId === IN_PROGRESS_CATEGORY) {
                    await interaction.channel.setParent(BILLING_CATEGORY);
                    interaction.reply({ content: '✅ Le ticket a bien été déplacé.', ephemeral: true });
                } else if (interaction.channel.parentId === BILLING_CATEGORY) {
                    await interaction.channel.setParent(FINISH_CATEGORY);
                    interaction.reply({ content: '✅ Le ticket a bien été déplacé.', ephemeral: true });
                } else if (interaction.channel.parentId === FINISH_CATEGORY) {
                    interaction.reply({ content: 'Ce ticket ne peut plus être déplacé', ephemeral: true });
                }
            } else if (interaction.customId === 'delete_Id') {
                interaction.channel.delete();
                interaction.reply({ content: '✅Ticket supprimé', ephemeral: true});
            } else if (interaction.customId === 'modify_Id') {
                interaction.reply({ content: '🚧Cette fonctionnalité n\'est pas encore disponible', ephemeral: true});
            } else if (interaction.customId === 'cdc_Id') {
                const modal = new ModalBuilder()
                    .setCustomId('cdcModal')
                    .setTitle(`Création d'une commande`);
                
                const cdcLink = new TextInputBuilder()
                    .setCustomId('cdcLink_Id')
                    .setLabel("Lien vers le cahier des charges")
                    .setPlaceholder(`Insérez le lien ici`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                
                modal.addComponents(new ActionRowBuilder().addComponents(cdcLink));

                await interaction.showModal(modal);
            }
        } else if (interaction.isModalSubmit()) {
            if (interaction.customId === 'cdcModal') {
                const messages = await interaction.channel.messages.fetch();
                const lastMessage = messages.first();

                const rows = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('move_Id')
                            .setLabel('Déplacer la commande')
                            .setStyle(ButtonStyle.Success)
                    ).addComponents(
                        new ButtonBuilder()
                            .setLabel('Lien vers le CDC')
                            .setURL(`${interaction.fields.getTextInputValue('cdcLink_Id')}`)
                            .setStyle(ButtonStyle.Link)
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

                lastMessage.edit({ embeds: [lastMessage.embeds[0]], components: [rows] });
                interaction.reply({ content: `✅ Votre cahier des charges a bien été enregistré : ${interaction.fields.getTextInputValue('cdcLink_Id')}`, ephemeral: true });
            }
        }
    }
}