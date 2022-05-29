function searchFromList() {
    var input, filter, ul, li, input, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    items = document.getElementById("list").children;
    

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < items.length; i++) {
        txtValue = items[i].textContent || items[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        items[i].style.display = "";
        } else {
        items[i].style.display = "none";
        }
    }
}