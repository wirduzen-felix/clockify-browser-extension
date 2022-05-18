function render() {
  setTimeout(() => {
    clockifyButton.render('.page-actions__left:not(.clockify)', {observe: true}, function (elem) {
      /*console.log("ELEMENTS: ");
      console.log($("div[data-test-id='tkt-properties-cf_nicht_abrechenbar'] input").is(":checked"));
      console.log($("input[name='customFields.cf_nicht_abrechenbar']").is(":checked"));*/

      //holt den Ticket Typ
      var type = "";
      if ($("div[data-test-id='tkt-properties-ticket_type'] .ember-power-select-selected-item")) {
        type = $("div[data-test-id='tkt-properties-ticket_type'] .ember-power-select-selected-item").innerText;
      }
      //holt die Info ob es abrechenbar ist
      const billable = !($("input[name='customFields.cf_nicht_abrechenbar']").checked);
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
          taskName: desc,
          billable: false
        });
        console.log("type: Interne Arbeiten");
      }
      /*Anfragen für SW Plugins werden in ein zentrales Projekt und nicht abrechenbar angelegt*/
      else if (type == "Store Plugins") {
        link = clockifyButton.createButton({
          description: ticketheading,
          projectName: "WIRDUZEN Shopware Plugin Support",
          taskName: desc,
          billable: false
        });
        console.log("type: store Plugins");
      }
      /*Aufträge werden in ein Projekt Pro Kunden geladen und nicht abrechenbar angelegt, da sie über den Auftrag selbst
          abgerechnet werden*/
      else if (type == "Auftrag aus weclapp") {
        link = clockifyButton.createButton(ticketheading, "Aufträge " + company, desc, false);
        console.log("type: Aufträge");
      } else {
        console.log("type: NO TYPE");

        link = clockifyButton.createButton({
          description: ticketheading,
          projectName: "Support " + company,
          taskName: desc,
          billable
        });
      }

      console.log("type: " + type + "| company: " + company);

      link.style.marginLeft = "10px";
      link.style.display = "inline-flex";
      link.style.verticalAlign = "middle";
      elem.append(link);
    });
  }, 1000);
}

render();

// PAIN ;(
// FIXME: Aktuell wird der Observer mehrfach registriert. Das sollte irgendwie abgefangen werden
setTimeout(() => {
  console.log("REGISTERING OBSERVER")
  let observer = new MutationObserver(clockifyDebounce((mutations, observer) => {
    console.log("CHANGE DETECTED");
    document.querySelector("#clockifyButton").remove();
    document.querySelector(".clockify").classList.remove("clockify");
    render();
    observer.disconnect();
  }, 1000));
  observer.observe(document.querySelector(".ticket-subject-heading"), {
    childList: true,
    subtree: true,
    characterData: true
  })
}, 1000)

