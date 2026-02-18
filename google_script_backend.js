/**
 * GOOGLE APPS SCRIPT CODE
 * 
 * Instructions:
 * 1. Open the Google Sheet connected to your Admin Dashboard.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any code in Code.gs and PASTE the code below.
 * 4. Save the project.
 * 5. Click "Deploy" button (blue button top right) > "New deployment".
 * 6. Click the gear icon next to "Select type" > "Web app".
 * 7. Description: "Proto-Thon Backend".
 * 8. Execute as: "Me" (your email).
 * 9. Who has access: "Anyone" (CRITICAL: Must be Anyone).
 * 10. Click "Deploy".
 * 11. Authorize access if prompted.
 * 12. COPY the "Web App URL" (starts with https://script.google.com/macros/s/...).
 * 13. Paste this URL into 'protothon-registration.html' at line configured for SCRIPT_URL.
 */

function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var doc = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = doc.getSheetByName("Participants");

        // Create sheet if it doesn't exist
        if (!sheet) {
            sheet = doc.insertSheet("Participants");
            // Add Headers
            sheet.appendRow(["Timestamp", "Team Name", "Leader Name", "Email", "Phone", "Year", "Department", "College", "City", "State", "Team Size"]);
        }

        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;

        var data = JSON.parse(e.postData.contents);
        var newRow = [];
        var timestamp = new Date();

        // Map data to headers
        // Simple fixed column order mapping for robustness
        newRow.push(timestamp);
        newRow.push(data.teamName);
        newRow.push(data.teamLeaderName);
        newRow.push(data.email);
        newRow.push(data.phone);
        newRow.push(data.year);
        newRow.push(data.department);
        newRow.push(data.college);
        newRow.push(data.city);
        newRow.push(data.state);
        newRow.push(data.teamSize);

        sheet.appendRow(newRow);

        return ContentService
            .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ "result": "error", "error": e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}
