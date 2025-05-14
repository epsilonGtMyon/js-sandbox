import {
  type ValidationArguments,
  type ValidationOptions,
  type ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator,
} from "class-validator";
import { applyDefaultValidationOptions } from "../applyDefaultValidationOptions";

// 以下を定義する。
// ・チェック用関数
// ・カスタムチェッククラス
// ・カスタムチェックのデコレーター

/**
 * チェックで利用される関数
 *
 * @param value
 * @returns
 */
function validateRequired(value: any) {
  if (value == null) {
    return false;
  }
  if (value === "") {
    return false;
  }
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }
  return true;
}

/**
 * 必須チェックを行うクラス
 */
@ValidatorConstraint({ name: "required", async: false })
class RequiredConstraint implements ValidatorConstraintInterface {
  validate(value: any, _validationArguments?: ValidationArguments) {
    // 実際のチェックは関数に任せる。
    return validateRequired(value);
  }

  /**
   * Gets default message when validation for this constraint fail.
   */
  defaultMessage(_validationArguments?: ValidationArguments) {
    return "必須です。";
  }
}

/**
 * 必須チェックのデコレーター
 *
 * @param validationOptions
 * @returns
 */
function Required(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: applyDefaultValidationOptions(validationOptions),
      constraints: [],
      // 実際のチェックはカスタムチェックのクラスに任せる。
      validator: RequiredConstraint,
    });
  };
}


export { validateRequired, RequiredConstraint, Required };
