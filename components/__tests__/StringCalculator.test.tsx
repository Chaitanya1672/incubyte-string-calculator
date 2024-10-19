import {describe, it, expect} from "vitest";
import {add, validateNegativeNumbers} from "../../utils/stringCalculator";

describe("String Calculator Functions", () => {
  describe("Main add function", () => {
    it("should return 0 for empty string", () => {
      expect(add("")).toBe(0);
    });

    it("should return the number itself for single number", () => {
      expect(add("1")).toBe(1);
    });

    it("should return sum for two numbers", () => {
      expect(add("1,5")).toBe(6);
    });

    it("should handle three numbers", () => {
      expect(add("1,2,3")).toBe(6);
    });

    it("should handle many numbers", () => {
      expect(add("1,2,3,4,5,6,7,8,9")).toBe(45);
    });

    it("should handle new line as delimiter", () => {
      expect(add("1\n2,3")).toBe(6);
    });

    it("should handle custom delimiter", () => {
      expect(add("//;\n1;2")).toBe(3);
    });

    it("should handle NaN", () => {
      expect(add("//\n1;2")).toBe(3);
    });
  });

  describe("Helper Functions", () => {
    describe("validateNegativeNumbers", () => {
      it("should throw error for single negative number", () => {
        expect(() => validateNegativeNumbers([-1, 2, 3])).toThrow(
          "negative numbers not allowed -1"
        );
      });

      it("should throw error with all negative numbers", () => {
        expect(() => validateNegativeNumbers([1, -2, 3, -4])).toThrow(
          "negative numbers not allowed -2,-4"
        );
      });

      it("should not throw for positive numbers", () => {
        expect(() => validateNegativeNumbers([1, 2, 3])).not.toThrow();
      });
    });
  });
});
