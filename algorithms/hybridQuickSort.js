function insertionSort(arr, low, start) {
    for (let i = low + 1; i < start + 1; i++) {
        let val = arr[i]
        let j = i
        while (j > low && arr[j - 1][1] > val[1]) {
            arr[j] = arr[j - 1]
            j--;
        }
        arr[j] = val
    }
}




//Partition Function of QuickSort
function partition(arr, low, high) {
    const pivotValue = arr[high];
    let j = low;
    for (let i = low; i < high; i++) {
        if (arr[i][1] < pivotValue[1]) {
            let temp = arr[j]
            arr[j] = arr[i]
            arr[i] = temp
            j++;
        }
    }

    let temp = arr[j]
        arr[j] = arr[high]
        arr[high] = temp
    return j;
}


//Quick Sort is effective for large array but insertion is more effective for smaller array.
//Therefore, we will use insertion sort if lenght of array is less than a thresshold(let's say 10),
//else use quickSort
const hybridSort = (arr, low, high) => {
    while (low < high) {
        // If the size of the array is less
        // than threshold apply insertion sort
        // and stop recursion
        if (high - low + 1 < 10) {
            insertionSort(arr, low, high)
            break;
        } else {
            let pivot = partition(arr, low, high)
            if (pivot - low < high - pivot) {
                hybridSort(arr, low, pivot - 1)
                low = pivot + 1
            } else {
                hybridSort(arr, pivot + 1, high)
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