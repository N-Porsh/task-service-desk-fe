const uri = ' http://localhost:3000/';

// form elements
const openModalButton = "#openModal";
const titleInputSelector = "input[name=title]";
const emailInputSelector = "input[name=email]";
const statusDDSelector = "select[name=status]";
const statusDDSelectorBlockedValue = 'select[name="status"] option[value="CLOSED"]';
const priorityDDSelector = "select[name=priority]";
const priorityDDSelectorValue = 'select[name="priority"] option[value="NORMAL"]';
const descriptionTextAreaSelector = "textarea[name=description]";
const submitButton = "button.is-primary.button";
const editButton = "table .is-info.button";

module.exports = {
    'open page and verify title': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible("body")
            .assert.titleContains("Simple Service Desk")
            .assert.containsText(".title", "Tickets")
    },

    'step 1: create new ticket': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible(openModalButton)
            .click(openModalButton)
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(titleInputSelector, 'Lo')
            .assert.containsText("p.help.is-danger", 'Min 3 characters!')
            .setValue(titleInputSelector, "calization missing")
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .setValue(emailInputSelector, 'test')
            .assert.containsText("p.help.is-danger", 'Valid email required!')
            .setValue(emailInputSelector, "@example.com")
            .assert.attributeEquals(submitButton, 'disabled', "true")
            .click(priorityDDSelectorValue)
            .assert.attributeEquals(submitButton, 'disabled', null)
            .setValue(descriptionTextAreaSelector, "add l10n or i18n")
            .click(submitButton)
    },
    'step 2: open edit page and verify default data': function (browser) {
        browser
            .url(uri)
            .waitForElementVisible("table")
            .click(editButton)
            .assert.urlContains("ticket/")
            .assert.containsText(".title", "Ticket ID:")
            .assert.elementPresent(statusDDSelector, "Status Dropdown is present")
    },

    'step 3: Change ticket status to blocked and verify that it is removed from the list': function (browser) {
        let rowsBefore = null;
        browser
            .url(uri)
            .waitForElementVisible("table")
            .elements('css selector', 'table tr', function (result) {
                rowsBefore = result.value.length;
            })
            .click(editButton)
            .waitForElementVisible(statusDDSelector)
            .click(statusDDSelectorBlockedValue)
            .click(submitButton)
            .elements('css selector', 'table tr', function (result) {
                this.assert.equal(result.value.length, rowsBefore - 1, 'amount of rows changed as expected');
            })
    },
}