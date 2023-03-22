fn main() {
    let nums = &[1, 2, 3, 4, 5];
    let sum = sum_u32(nums);
    println!("Sum: {:?}", sum);

    let nums2 = &[u32::MAX, 1];
    let sum2 = sum_u32(nums2);
    println!("Sum: {:?}", sum2);
}

fn sum_u32(nums: &[u32]) -> Option<u32> {
    let mut sum: u32 = 0;
    for &num in nums {
        sum = sum.checked_add(num)?;
    }
    Some(sum)
}
