function sortList() {
    var jobs, i, switching, jobs, shouldSwitch, dir, switchcount = 0;
    jobs = document.getElementById("list").children;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    // Make a loop that will continue until no switching has been done:
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      // Loop through all list-items:
      for (i = 0; i < (jobs.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Check if the next item should switch place with the current item,
        based on the sorting direction (asc or desc): */
        if (dir == "asc") {
          if (Number(jobs[i].getElementsByClassName("salary")[0].innerHTML) > Number(jobs[i + 1].getElementsByClassName("salary")[0].innerHTML)) {
            /* If next item is alphabetically lower than current item,
            mark as a switch and break the loop: */
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(jobs[i].getElementsByClassName("salary")[0].innerHTML) < Number(jobs[i + 1].getElementsByClassName("salary")[0].innerHTML)) {
            /* If next item is alphabetically higher than current item,
            mark as a switch and break the loop: */
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        jobs[i].parentNode.insertBefore(jobs[i + 1], jobs[i]);
        switching = true;
        // Each time a switch is done, increase switchcount by 1:
        switchcount ++;
      } else {
  
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }