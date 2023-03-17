fn bubble_sort<T: PartialOrd>(arr: &mut [T]) {
    let n = arr.len();
    for i in 0..n {
        for j in 0..n-i-1 {
            if arr[j] > arr[j+1] {
                arr.swap(j, j+1);
            }
        }
    }
}

fn main() {
    // test1
    let mut arr_i32 = [3, 8, 2, 5, 1, 9, 6];
    bubble_sort(&mut arr_i32);
    println!("Sorted result: {:?}", arr_i32);

    // test2
    let mut arr = ["dog", "boy", "apple", "tag", "font", "people"];
    bubble_sort(&mut arr);
    println!("Sorted result: {:?}", arr);
}
