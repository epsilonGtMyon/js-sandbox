import { Required } from "../common/validation/decorator/required/required";
import { HalfNum } from "../common/validation/decorator/halfNum/halfNum";
import { MaxArraySize } from "../common/validation/decorator/maxArraySize/maxArraySize";
import { MaxLength } from "../common/validation/decorator/maxLength/maxLength";
import { ValidateNested } from "class-validator";

class Sandbox01Form {
  @Required()
  @MaxLength(5)
  public firstname?: string;

  @Required()
  @MaxLength(5)
  public familyname?: string;

  @Required()
  @HalfNum()
  @MaxLength(5)
  public age?: string;

  @MaxArraySize(3)
  @ValidateNested({
    always: true, //alwaysをつけておかないとgroup指定のときに動かない
  })
  public skills?: Sandbox01Skill[];

  @ValidateNested({
    always: true, //alwaysをつけておかないとgroup指定のときに動かない
  })
  public pet?: Sandbox01Pet;
}

class Sandbox01Skill {
  @Required()
  @MaxLength(10)
  public skillName?: string;

  @Required()
  @HalfNum()
  @MaxLength(3)
  public skillLevel?: string;
}

class Sandbox01Pet {
  @MaxLength(5, {
    groups: ["pet"],
  })
  public petName1?: string;

  @MaxLength(5, {
    groups: ["pet"],
  })
  public petName2?: string;
}

export { Sandbox01Form, Sandbox01Skill, Sandbox01Pet };
