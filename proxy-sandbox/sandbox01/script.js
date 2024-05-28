(function () {
  // ----------------------------------
  const value01Elem = document.getElementById("value01");
  const value02Elem = document.getElementById("value02");
  const executeButtonElem = document.getElementById("executeButton");

  // --
  const plainValue01Elem = document.getElementById("plainValue01");
  const plainValue02Elem = document.getElementById("plainValue02");
  const getValue01Elem = document.getElementById("getValue01");
  const getValue02Elem = document.getElementById("getValue02");
  const setValue01Elem = document.getElementById("setValue01");
  const setValue02Elem = document.getElementById("setValue02");
  const getSetValue01Elem = document.getElementById("getSetValue01");
  const getSetValue02Elem = document.getElementById("getSetValue02");

  const plainObj = createObj();
  const getObj = new Proxy(createObj(), {
    get(target, prop, receiver) {
      if (prop === "value01") {
        return `get:${target[prop]}`;
      }
      return Reflect.get(...arguments);
    },
  });

  const setObj = new Proxy(createObj(), {
    set(obj, prop, value) {
      if (prop === "value02") {
        obj[prop] = `set:${value}`;
        return true;
      }
      return Reflect.set(...arguments);
    },
  });

  const getSetObj = new Proxy(createObj(), {
    get(target, prop, receiver) {
      if (prop === "value01") {
        return `get:${target[prop]}`;
      }
      return Reflect.get(...arguments);
    },
    set(obj, prop, value) {
      if (prop === "value02") {
        obj[prop] = `set:${value}`;
        return true;
      }
      return Reflect.set(...arguments);
    },
  })

  function createObj() {
    return {
      value01: "",
      value02: "",
    };
  }

  function applyValues() {
    const value01 = value01Elem.value;
    const value02 = value02Elem.value;

    // ---------------------
    plainObj.value01 = value01
    plainObj.value02 = value02
    
    getObj.value01 = value01
    getObj.value02 = value02
    
    setObj.value01 = value01
    setObj.value02 = value02

    getSetObj.value01 = value01
    getSetObj.value02 = value02

    // ---------------------
    plainValue01Elem.textContent = plainObj.value01
    plainValue02Elem.textContent = plainObj.value02
    getValue01Elem.textContent = getObj.value01
    getValue02Elem.textContent = getObj.value02
    setValue01Elem.textContent = setObj.value01
    setValue02Elem.textContent = setObj.value02
    getSetValue01Elem.textContent = getSetObj.value01
    getSetValue02Elem.textContent = getSetObj.value02

  }

  executeButtonElem.addEventListener("click", () => {
    applyValues();
  });
})();
