import java.util.Scanner;

/**
 * This program finds the second largest number in an array of integers.
 * It reads input from the user: first an integer n (number of elements),
 * followed by n integers. It then computes and prints the second largest number,
 * or -1 if there is no second largest (e.g., all elements are the same or n < 2).
 */
class SecondLargestNum {
    public static void main(String[] args) {
        // Create a Scanner object to read input from standard input (System.in)
        Scanner scan = new Scanner(System.in);

        // Read the number of elements in the array
        int n = scan.nextInt();

        // Initialize an array to store the n integers
        int[] arr = new int[n];

        // Read n integers into the array
        for (int i = 0; i < n; i++) {
            arr[i] = scan.nextInt();
        }

        scan.close();

        int ans = helper(arr);

        System.out.println(ans);
    }

    /**
     * Helper method to find the second largest number in the array.
     **/

    public static int helper(int[] arr) {
        // Initialize max and second_max to the smallest possible integer value
        int max = Integer.MIN_VALUE;
        int second_max = Integer.MIN_VALUE;

        if(arr.length<2) return -1;

        for (int num : arr) {
            // If the current number is greater than max, update second_max to the old max,
            // and set max to the current number
            if (num > max) {
                second_max = max;
                max = num;
            }
            // Else if the current number is greater than second_max and not equal to max,
            // update second_max
            else if (num > second_max && num != max) {
                second_max = num;
            }
        }

        // If second_max is still Integer.MIN_VALUE, it means there was no second distinct maximum
        if (second_max == Integer.MIN_VALUE) return -1;

        // Return the second largest number
        return second_max;
    }
}
