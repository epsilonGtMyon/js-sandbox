class QueryString {
  static _stringifyInternal(searchParams, key, value) {
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean") {
      searchParams.append(key, value);
    } else if (value == null) {
      //null,undefinedの時はクエリ文字列に追加しない
    } else if (Array.isArray(value)) {
      let index = 0;
      for (let elem of value) {
        //配列の場合は 各要素に対して再帰的に適用
        QueryString._stringifyInternal(searchParams, `${key}[${index}]`, elem);
        index++;
      }
    } else {
      //object
      for (let objKey in value) {
        const objValue = value[objKey];
        const paramKey = key === "" ? objKey : `${key}.${objKey}`;

        QueryString._stringifyInternal(searchParams, paramKey, objValue);
      }
    }
  }

  /**
   * クエリ文字列を作成します。
   * @param {*} data
   */
  static stringify(data) {
    if (data == null) {
      //null or undefined
      return "";
    }

    const searchParams = new URLSearchParams();
    QueryString._stringifyInternal(searchParams, "", data);
    return searchParams.toString();
  }

  //----------------------------------------

  /**
   * 配列であるか？
   * @param {String} keyName
   */
  static _isArrayKey(keyName) {
    return /^.+\[\d+\]$/.test(keyName);
  }

  /**
   * 配列の場合 aaa[1]の1のインデックス部分を取得
   * @param {String} keyName
   */
  static _getArrayIndex(keyName) {
    const arrayIndexStr = keyName.match(/^.+\[(\d+)\]$/)[1];
    return Number(arrayIndexStr);
  }

  /**
   * 配列の場合 aaa[1]のaaaの部分を取得
   * @param {String} keyName
   */
  static _getArrayKey(keyName) {
    return keyName.match(/^(.+)\[\d+\]$/)[1];
  }

  static _parseInternal(parentObj, keys, index, value) {
    const currentKey = keys[index];
    //配列であるか？
    const isArray = QueryString._isArrayKey(currentKey);

    const hasNext = keys.length > index + 1;

    if (isArray) {
      //配列の場合

      //配列のキー部分
      const arrayKey = QueryString._getArrayKey(currentKey);
      //配列のインデックス部分
      const arrayIndex = QueryString._getArrayIndex(currentKey);

      //まだ配列が作られてなければ作る
      if (parentObj[arrayKey] === undefined) {
        parentObj[arrayKey] = [];
      }
      //インデックス部分まで長さが到達してなかったら拡張
      const currentLength = parentObj[arrayKey].length;
      for (let i = currentLength; i < arrayIndex + 1; i++) {
        parentObj[arrayKey].push(null);
      }

      if (hasNext) {
        if (parentObj[arrayKey][arrayIndex] == null) {
          parentObj[arrayKey][arrayIndex] = {};
        }
        
        QueryString._parseInternal(
          parentObj[arrayKey][arrayIndex],
          keys,
          index + 1,
          value
        );
      } else {
        parentObj[arrayKey][arrayIndex] = value;
      }
    } else {
      if (hasNext) {
        if (parentObj[currentKey] == null) {
          parentObj[currentKey] = {};
        }

        QueryString._parseInternal(
          parentObj[currentKey],
          keys,
          index + 1,
          value
        );
      } else {
        parentObj[currentKey] = value;
      }
    }
  }

  /**
   * クエリ文字列からオブジェクトを作成します。
   * @param {String} queryString
   */
  static parse(queryString) {
    const param = new URLSearchParams(queryString);

    const obj = {};

    const entries = param.entries();
    for (let ent of entries) {
      const key = ent[0];
      const value = ent[1];

      const keys = key.split(".");
      QueryString._parseInternal(obj, keys, 0, value);
    }

    return obj;
  }
}
