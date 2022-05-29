function sortList() {
    var jobs, i, switching, jobs, shouldSwitch, dir, switchcount = 0;
    jobs = document.getElementById("list").children;
    switching = true;
    dir = "asc";
    // Make a loop that will continue until no switching has been done
    while (switching) {
      switching = false;
      for (i = 0; i < (jobs.length - 1); i++) {
        shouldSwitch = false;
        if (dir == "asc") {
          if (Number(jobs[i].getElementsByClassName("salary")[0].innerHTML) > Number(jobs[i + 1].getElementsByClassName("salary")[0].innerHTML)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (Number(jobs[i].getElementsByClassName("salary")[0].innerHTML) < Number(jobs[i + 1].getElementsByClassName("salary")[0].innerHTML)) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        jobs[i].parentNode.insertBefore(jobs[i + 1], jobs[i]);
        switching = true;
        switchcount ++;
      } else {
  
        // If no switching has been done AND the direction is "asc",
        // set the direction to "desc" and run the while loop again.
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }