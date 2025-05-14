import {
  type ValidationArguments,
  type ValidationOptions,
  type ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator,
} from "class-validator";
import { applyDefaultValidationOptions } from "../applyDefaultValidationOptions";

/**
 * チェックで利用される関数
 * 
 * @param value 
 * @param max 
 * @returns 
 */
function validateMaxLength(value: string | null | undefined, max: number) {
  if (value == null || value === "") {
    return true;
  }

  // いろいろあってこっちのが正確
  return [...value].length <= max;
}

/**
 * 最大文字列長チェックを行うクラス
 */
@ValidatorConstraint({ name: "maxLength", async: false })
class MaxLengthConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | null | undefined,
    validationArguments?: ValidationArguments
  ) {
    const max: number = validationArguments?.constraints[0];
    return validateMaxLength(value, max);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(validationArguments?: ValidationArguments) {
    const max: number = validationArguments?.constraints[0];
    return `${max}文字以内で入力してください。`;
  }
}

/**
 * 最大文字列長チェックのデコレーター
 * 
 * @param max 
 * @param validationOptions 
 * @returns 
 */
function MaxLength(max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: applyDefaultValidationOptions(validationOptions),
      constraints: [max],
      validator: MaxLengthConstraint,
    });
  };
}

export { validateMaxLength, MaxLengthConstraint, MaxLength };