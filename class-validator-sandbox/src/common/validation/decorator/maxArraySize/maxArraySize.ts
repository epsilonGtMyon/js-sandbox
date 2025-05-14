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
function validateMaxArraySize(value: Array<unknown> | null | undefined, max: number) {
  if (value == null) {
    return true;
  }

  return value.length <= max;
}

/**
 * 最大配列サイズチェックを行うクラス
 */
@ValidatorConstraint({ name: "maxArraySize", async: false })
class MaxArraySizeConstraint implements ValidatorConstraintInterface {
  validate(
    value: Array<unknown> | null | undefined,
    validationArguments?: ValidationArguments
  ) {
    const max: number = validationArguments?.constraints[0];
    return validateMaxArraySize(value, max);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(validationArguments?: ValidationArguments) {
    const max: number = validationArguments?.constraints[0];
    return `${max}個以下にしてください。`;
  }
}

/**
 * 最大配列サイズチェックのデコレーター
 * 
 * @param max 
 * @param validationOptions 
 * @returns 
 */
function MaxArraySize(max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: applyDefaultValidationOptions(validationOptions),
      constraints: [max],
      validator: MaxArraySizeConstraint,
    });
  };
}

export { validateMaxArraySize, MaxArraySizeConstraint, MaxArraySize };