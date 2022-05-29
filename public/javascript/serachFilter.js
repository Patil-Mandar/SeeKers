function serachFilter(inputTag,ListTagParent) {
    var input, filter, ul, li, input, i, txtValue;
    input = document.getElementById(inputTag);
    filter = input.value.toUpperCase();
    select = document.getElementById(ListTagParent);
    options = select.getElementsByTagName('option');


    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < options.length; i++) {
        txtValue = options[i].textContent || options[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        options[i].style.display = "";
        } else {
        options[i].style.display = "none";
        }
    }
}