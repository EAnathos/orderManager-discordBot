const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
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
                const modal = new ModalBuilder()
                    .setCustomId('myModal2')
                    .setTitle(`Création d'une commande`);
        
                // Create the text input components
                const clientName = new TextInputBuilder()
                    .setCustomId('clientOrder_Id')
                    // The label is the prompt the user sees for this input
                    .setLabel("Client de la commande")
                    // set a placeholder string to prompt the user
                    .setPlaceholder(`Insérer le pseudo de votre client`)
                    // Short means only a single line of text, Paragraph means a multi-line text entry
                    .setStyle(TextInputStyle.Short)
                    // require a value in this input field
                    .setRequired(true);

                const serverName = new TextInputBuilder()
                    .setCustomId('serverName_Id')
                    .setLabel("Nom du serveur de la commande")
                    .setPlaceholder(`Insérer le nom du serveur`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const pluginName = new TextInputBuilder()
                    .setCustomId('pluginName_Id')
                    .setLabel("Nom du plugin de la commande")
                    .setPlaceholder(`Insérer le nom du plugin`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const orderPrice = new TextInputBuilder()
                    .setCustomId('orderPrice_Id')
                    .setLabel("Prix de la commande")
                    .setPlaceholder(`Insérer le prix de votre commande`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                const deadlineDate = new TextInputBuilder()
                    .setCustomId('deadlineDate_Id')
                    .setLabel("deadline de la commande")
                    .setPlaceholder(`Insérer la deadline de votre commande`)
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);
                
                const firstActionRow = new ActionRowBuilder().addComponents(clientName);
                const secondActionRow = new ActionRowBuilder().addComponents(serverName);
                const thirdActionRow = new ActionRowBuilder().addComponents(pluginName);
                const fourthActionRow = new ActionRowBuilder().addComponents(orderPrice);
                const fifthActionRow = new ActionRowBuilder().addComponents(deadlineDate);;

                modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

                await interaction.showModal(modal);    
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
            } else if (interaction.customId === 'myModal2') {
                const messages = await interaction.channel.messages.fetch();
                const lastMessage = messages.first();

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

                lastMessage.edit({ embeds: [embed] });
                interaction.reply({ content: `✅ Votre commande a bien été modifiée`, ephemeral: true });
            }   
        }
    }
}