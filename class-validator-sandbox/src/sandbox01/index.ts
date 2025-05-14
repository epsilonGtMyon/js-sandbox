import "reflect-metadata";
import "../style.css";

import { validate } from "class-validator";
import { Sandbox01Form, Sandbox01Pet, Sandbox01Skill } from "./sandbox01Form";

const firstnameElem = document.getElementById("firstname") as HTMLInputElement;
const familynameElem = document.getElementById(
  "familyname"
) as HTMLInputElement;
const ageElem = document.getElementById("age") as HTMLInputElement;
const skillsElem = document.getElementById("skills") as HTMLTableElement;
const addSkillButtonElem = document.getElementById(
  "addSkillButton"
) as HTMLButtonElement;
const registerButtonElem = document.getElementById(
  "registerButton"
) as HTMLButtonElement;
const registerPetOnlyButtonElem = document.getElementById(
  "registerPetOnlyButton"
) as HTMLButtonElement;

const petName1Elem = document.getElementById("petName1") as HTMLInputElement;
const petName2Elem = document.getElementById("petName2") as HTMLInputElement;

// -----------------------

// スキル追加ボタン押されたときにテーブルに行追加
addSkillButtonElem.addEventListener("click", () => {
  const tbody = skillsElem.querySelector("tbody")!;

  const tr = document.createElement("tr");

  // -------------------------
  const td1 = document.createElement("td");
  const input1 = document.createElement("input");
  input1.classList.add("skillName");
  input1.maxLength = 20;
  td1.appendChild(input1);
  tr.appendChild(td1);

  // -------------------------
  const td2 = document.createElement("td");
  const input2 = document.createElement("input");
  input2.classList.add("skillLevel");
  input2.maxLength = 5;
  td2.appendChild(input2);
  tr.appendChild(td2);

  // -------------------------
  const td3 = document.createElement("td");
  const button3 = document.createElement("button");
  button3.textContent = "削除";
  button3.addEventListener("click", () => {
    tr.remove();
  });
  td3.appendChild(button3);
  tr.appendChild(td3);

  // ----
  tbody.appendChild(tr);
});

// 登録
registerButtonElem.addEventListener("click", async () => {
  clearConsole();
  const form = createForm();

  const errors = await validate(form, {
    // default, pet両方とも
    groups: ["default", "pet"], 
    validationError: {
      target: false,
      value: false,
    },
    //↓プロパティごとに１つのみ
    stopAtFirstError: true,
  });

  console.log(errors);
  log(JSON.stringify(errors, null, 2));
});

// ペットのみ登録
registerPetOnlyButtonElem.addEventListener("click", async () => {
  clearConsole();
  const form = createForm();

  const errors = await validate(form, {
    // petだけ
    groups: ["pet"],
    validationError: {
      target: false,
      value: false,
    },
    stopAtFirstError: true,
  });

  console.log(errors);
  log(JSON.stringify(errors, null, 2));
});

// -----------------
// フォームの作成

function createForm(): Sandbox01Form {
  const form = new Sandbox01Form();
  form.firstname = firstnameElem.value;
  form.familyname = familynameElem.value;
  form.age = ageElem.value;
  form.skills = createSkills();
  form.pet = createPet();
  return form;
}

function createSkills(): Sandbox01Skill[] {
  const trList = skillsElem.querySelectorAll("tbody tr");
  const skills: Sandbox01Skill[] = [];
  for (const tr of trList) {
    const skill = new Sandbox01Skill();
    skill.skillName = (
      tr.querySelector(".skillName") as HTMLInputElement
    ).value;
    skill.skillLevel = (
      tr.querySelector(".skillLevel") as HTMLInputElement
    ).value;
    skills.push(skill);
  }
  return skills;
}

function createPet(): Sandbox01Pet {
  const pet = new Sandbox01Pet();
  pet.petName1 = petName1Elem.value;
  pet.petName2 = petName2Elem.value;
  return pet;
}

// -----------------
// console

const consoleElem = document.getElementById("console") as HTMLDivElement;

function clearConsole() {
  while (consoleElem.firstChild) {
    consoleElem.removeChild(consoleElem.firstChild);
  }
}

function log(text: string) {
  const div = document.createElement("div");
  div.textContent = text;
  consoleElem.append(div);
  consoleElem.parentElement?.scrollTo(
    0,
    consoleElem.parentElement?.scrollHeight
  );
}
