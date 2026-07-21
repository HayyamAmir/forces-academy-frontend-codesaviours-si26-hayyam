// ==========================================
// PRINT RESULT TABLE
// ==========================================

function printResult() {

    let printContents = document.getElementById("printResult").innerHTML;

    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    location.reload();

}