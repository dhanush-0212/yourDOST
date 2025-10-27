# Second Largest Number Finder

## Description
This Java program reads an integer `n` (the number of elements) followed by `n` integers from standard input. It then finds and prints the second largest number in the array. If there is no second largest number (e.g., all elements are the same or there are fewer than 2 distinct elements), it prints -1.

## Approach
The program uses a single-pass algorithm to find the second largest number efficiently:
- Initialize two variables: `max` and `second_max` to `Integer.MIN_VALUE`.
- Iterate through each number in the array:
  - If the current number is greater than `max`, update `second_max` to the old `max` and set `max` to the current number.
  - Else if the current number is greater than `second_max` and not equal to `max`, update `second_max`.
- After the loop, if `second_max` is still `Integer.MIN_VALUE`, return -1; otherwise, return `second_max`.

This approach ensures O(n) time complexity and O(1) extra space complexity, making it efficient for large inputs.

## Sample Input/Output

### Sample Input 1:
```
5
1 3 2 5 4
```

### Sample Output 1:
```
4
```
**Explanation:** The numbers are 1, 3, 2, 5, 4. The largest is 5, and the second largest is 4.

### Sample Input 2:
```
3
7 7 7
```

### Sample Output 2:
```
-1
```
**Explanation:** All numbers are the same, so there is no second largest number.

### Sample Input 3:
```
2
10 20
```

### Sample Output 3:
```
10
```
**Explanation:** The largest is 20, and the second largest is 10.

## How to Run
1. Compile the program: `javac SecondLargestNum.java`
2. Run the program: `java SecondLargestNum`
3. Enter the input as specified above.


