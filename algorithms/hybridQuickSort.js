function insertionSort(arr, start, end) {
    for (let i = start + 1; i < end + 1; i++) {
        let val = arr[i]
        let j = i
        while (j > start && arr[j - 1][1] > val[1]) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = val
    }
}




//Partition Function of QuickSort
function partition(arr, start, end) {
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i][1] < pivotValue[1]) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            pivotIndex++;
        }
    }

    [arr[pivotIndex]   , arr[end] ] = [arr[end], arr[pivotIndex]   ]
    return pivotIndex;
}


//Quick Sort is effective for large array but insertion is more effective for smaller array.
//Therefore, we will use insertion sort if lenght of array is less than a thresshold(let's say 10),
//else use quickSort
hybridSort = (arr, start, end) => {
    while (start < end) {
        // If the size of the array is less
        // than threshold apply insertion sort
        // and stop recursion
        if (end - start + 1 < 10) {
            insertionSort(arr, start, end)
            break
        } else {
            let pivot = partition(arr, start, end)
            if (pivot - start < end - pivot) {
                hybridSort(arr, start, pivot - 1)
                start = pivot + 1
            } else {
                hybridSort(arr, pivot + 1, end)
                high = pivot - 1
            }
        }
    }
}

module.exports = hybridSort

// // Testing
// arr = [
//     [ '6292626d41ee0fa2e9c19808', 0.8728437414199335 ],
//     [ '6292626d41ee0fa2e9c19778', 0.9255322481734951 ],
//     [ '6292626d41ee0fa2e9c1961c', 0.9292194349144394 ],
//     [ '6292626c41ee0fa2e9c195ec', 0.8334429644276751 ],
//     [ '6292626a41ee0fa2e9c19064', 0.824037034920393 ]
//   ]
// hybridSort(arr,0,4)
// console.log(arr)