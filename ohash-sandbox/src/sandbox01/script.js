import '../../style.css'

import { hash, objectHash, murmurHash } from 'ohash'

const resultElem = document.querySelector('#result')

const murmurHashButtonElem = document.querySelector('#murmurHashButton')
const murmurHashSrcElem = document.querySelector('#murmurHashSrc')

const objectHashButton1Elem = document.querySelector('#objectHashButton1')
const objectHashButton2Elem = document.querySelector('#objectHashButton2')

const hashButton1Elem = document.querySelector('#hashButton1')

murmurHashButtonElem.addEventListener('click', () => {
  //String意外だと0になる模様
  resultElem.value = murmurHash(murmurHashSrcElem.value)
})


objectHashButton1Elem.addEventListener('click', () => {
  //人間に解読できる値にしているみたい
  resultElem.value = objectHash({
    stringValue: "123",
    numberValue: 123,
    booleanValue: true,
    dateValue: new Date("2020-01-01"),
    undefinedValue: undefined,
    nullValue: null,
    nested: {
      nestedStringValue: "456",
      nestedNumberValue: 456,
      nestedBooleanValue: false,
      nestedDateValue: new Date("2020-01-02"),
      nested2: {
        nested2StringValue: "789",
        nested2NumberValue: 789,
        nested2BooleanValue: false,
        nested2DateValue: new Date("2020-01-03"),
      }
    }
  })
})


objectHashButton2Elem.addEventListener('click', () => {
  resultElem.value = objectHash("123")
})




hashButton1Elem.addEventListener('click', () => {
  resultElem.value = hash({
    stringValue: "123",
    numberValue: 123,
    booleanValue: true,
    dateValue: new Date("2020-01-01"),
    undefinedValue: undefined,
    nullValue: null,
    nested: {
      nestedStringValue: "456",
      nestedNumberValue: 456,
      nestedBooleanValue: false,
      nestedDateValue: new Date("2020-01-02"),
      nested2: {
        nested2StringValue: "789",
        nested2NumberValue: 789,
        nested2BooleanValue: false,
        nested2DateValue: new Date("2020-01-03"),
      }
    }
  })
})