const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('create a new order !'),
	async execute(interaction) {
		const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle(`Création d'une commande`);
        
        // Create the text input components
		const clientName = new TextInputBuilder()
            .setCustomId('clientOrderId')
            // The label is the prompt the user sees for this input
            .setLabel("Client de la commande")
            // set a placeholder string to prompt the user
            .setPlaceholder(`Insérer le pseudo de votre client ?`)
            // Short means only a single line of text, Paragraph means a multi-line text entry
            .setStyle(TextInputStyle.Short)
            // require a value in this input field
            .setRequired(true);

        const serverName = new TextInputBuilder()
            .setCustomId('serverOrderId')
            .setLabel("Serveur de la commande")
            .setPlaceholder(`Insérer le nom du serveur de votre client ?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const serverVersion = new TextInputBuilder()
            .setCustomId('serverOrderId')
            .setLabel("Serveur de la commande")
            .setPlaceholder(`Insérer le nom du serveur de votre client ?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const orderPrice = new TextInputBuilder()
            .setCustomId('orderPriceId')
            .setLabel("Prix de la commande")
            .setPlaceholder(`Insérer le prix de votre commande ?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const deadlineDate = new TextInputBuilder()
            .setCustomId('deadlineDateId')
            .setLabel("deadline de la commande")
            .setPlaceholder(`Insérer la deadline de votre commande ?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const cdcGoogleLink = new TextInputBuilder()
            .setCustomId('cdcGoogleLinkId')
            .setLabel("lien du cahier des charges")
            .setPlaceholder(`Insérer le lien vers votre cahier des charges ?`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        
        const firstActionRow = new ActionRowBuilder().addComponents(clientName);
        const secondActionRow = new ActionRowBuilder().addComponents(serverName);
        const thirdActionRow = new ActionRowBuilder().addComponents(serverVersion);
        const fourthActionRow = new ActionRowBuilder().addComponents(orderPrice);
        const fifthActionRow = new ActionRowBuilder().addComponents(deadlineDate);
        const sixthdActionRow = new ActionRowBuilder().addComponents(cdcGoogleLink);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow, sixthdActionRow);

        await interaction.showModal(modal);
	},
};
