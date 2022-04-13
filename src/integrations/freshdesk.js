clockifyButton.render('.page-actions__left:not(.clockify)', { observe: true }, function (elem) {
        //holt den Ticket Typ
        var type = "";
        if( $("div[data-test-id='tkt-properties-ticket_type'] .ember-power-select-selected-item")) {
               type = $("div[data-test-id='tkt-properties-ticket_type'] .ember-power-select-selected-item").innerText;
        }
        //holt die Info ob es abrechenbar ist
        const billable = $("div[data-test-id='tkt-properties-cf_nicht_abrechenbar'] input").value;
        //holt den Firmennamen ab
        const company = $(".company-info a")?.innerText ?? "WIRDUZEN.DIGITAL GmbH";
        //holt die Freshdesk Id aus dem Link zur Firma ab
        const companyFreshdeskID = /[^/]*$/.exec($(".company-info a")?.getAttribute('href'))[0] ?? "101000312311";
        //holt den Betreff vom Ticket
        const ticketheading = $(".ticket-subject-heading").innerText;
        //holt die Ticket ID
        const ticket = $(".breadcrumb__item.active").innerText;
        //Beschreibung vom Ticket mit wichtigsten Infos
        const desc = ticket + " / " + ticketheading;
        //Ticketnummer plus Ticketname
        const ticketname = "[#" + ticket + "] " + desc;

        var link;
        /*Interne Aufgaben werden in ein zentrales Projekt und nicht abrechenbar angelegt*/
        if (type == "Interne Arbeiten") {

                link = clockifyButton.createButton({
                        description: ticketheading,
                        projectName: "WIRDUZEN Interne Arbeiten",
                        taskName: desc
                });
                console.log("type: Interne Arbeiten");
        }
        /*Anfragen für SW Plugins werden in ein zentrales Projekt und nicht abrechenbar angelegt*/
        else if(type == "Store Plugins") {
                link = clockifyButton.createButton({
                        description: ticketheading,
                        projectName: "WIRDUZEN Shopware Plugin Support",
                        taskName: desc
                });
                console.log("type: store Plugins");
        }
        /*Aufträge werden in ein Projekt Pro Kunden geladen und nicht abrechenbar angelegt, da sie über den Auftrag selbst
            abgerechnet werden*/
        else if(type == "Erweiterung / Anpassung / Auftrag") {
                 link = clockifyButton.createButton(ticketheading,"Aufträge " + company, desc, false);
                console.log("type: Aufträge");
        }
        else {

                console.log("type: NO TYPE");

                link = clockifyButton.createButton({
                        description: ticketheading,
                        projectName: "Support " + company,
                        taskName : desc
                });
        }

        console.log("type: " + type + "| company: " + company);

        link.style.marginLeft = "10px";
        link.style.display = "inline-flex";
        link.style.verticalAlign = "middle";
        elem.append(link);
});