import type { ValidationOptions } from "class-validator";

/**
 * グループ指定にdefaultを追加したValidationOptionsを返す
 * @param validationOptions
 * @returns
 */
function applyDefaultValidationOptions(
  validationOptions?: ValidationOptions
): ValidationOptions {
  const groups = ["default"];
  if (validationOptions?.groups) {
    groups.push(...validationOptions.groups);
  }

  return {
    ...validationOptions,
    groups: groups,
  };
}

export { applyDefaultValidationOptions };
