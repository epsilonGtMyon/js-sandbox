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
function validateHalfAlphaNum(value: string | null | undefined) {
  if (value == null || value === "") {
    // 空の場合はOK
    return true;
  }

  return /^[a-zA-Z0-9]*$/.test(value);
}

/**
 * 半角英数チェックを行うクラス
 */
@ValidatorConstraint({ name: "halfAlphaNum", async: false })
class HalfAlphaNumConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | null | undefined,
    _validationArguments?: ValidationArguments
  ) {
    return validateHalfAlphaNum(value);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(_validationArguments?: ValidationArguments) {
    return "半角英数で入力してください。";
  }
}

/**
 * 半角英数チェックのデコレーター
 * 
 * @param validationOptions 
 * @returns 
 */
function HalfAlphaNum(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: applyDefaultValidationOptions(validationOptions),
      constraints: [],
      validator: HalfAlphaNumConstraint,
    });
  };
}

export { validateHalfAlphaNum, HalfAlphaNumConstraint, HalfAlphaNum };