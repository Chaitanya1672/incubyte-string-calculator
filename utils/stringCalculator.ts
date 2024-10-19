type ParsedInput = {
  delimiter: string;
  numbersStr: string;
};

export const parseInput = (numbers: string): ParsedInput => {
  //sanitize to escape of backslash `\`
  numbers = numbers.replace(/\\n/g, "\n");

  if (numbers.startsWith("//")) {
    const firstNewLine = numbers.indexOf("\n");
    return {
      delimiter: numbers.substring(2, firstNewLine),
      numbersStr: numbers.substring(firstNewLine + 1),
    };
  }
  return {
    delimiter: ",",
    numbersStr: numbers,
  };
};

export const parseNumbers = (
  numbersStr: string,
  delimiter: string
): number[] => {
  const normalizedStr = numbersStr.replace(/\n/g, delimiter);
  return normalizedStr.split(delimiter).map((num) => parseInt(num));
};

export const validateNegativeNumbers = (numbers: number[]): void => {
  const negativeNumbers = numbers.filter((num) => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(",")}`
    );
  }
};

export const add = (numbers: string): number => {
  if (numbers === "") return 0;

  const {delimiter, numbersStr} = parseInput(numbers);
  const nums = parseNumbers(numbersStr, delimiter);
  validateNegativeNumbers(nums);

  return nums.reduce((sum, num) => sum + num, 0);
};
