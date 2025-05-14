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
 * @returns 
 */
function validateNum(value: string | null | undefined) {
  if (value == null || value === "") {
    // 空の場合はOK
    return true;
  }

  return /^[0-9]*$/.test(value);
}

/**
 * 半角英数チェックを行うクラス
 */
@ValidatorConstraint({ name: "halfNum", async: false })
class HalfNumConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | null | undefined,
    _validationArguments?: ValidationArguments
  ) {
    return validateNum(value);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(_validationArguments?: ValidationArguments) {
    return "半角数値で入力してください。";
  }
}

/**
 * 半角数値チェックのデコレーター
 * 
 * @param validationOptions 
 * @returns 
 */
function HalfNum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: applyDefaultValidationOptions(validationOptions),
      constraints: [],
      validator: HalfNumConstraint,
    });
  };
}

export { validateNum, HalfNumConstraint, HalfNum };