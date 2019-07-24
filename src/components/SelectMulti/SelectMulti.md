Enables picking zero, one or many options from a list.

The value is an array of `value` values from the `options` array.


```js
import FormBuilder from '../FormBuilder';

// generates random names with spaces
const randomName = (length = 20) => {
  const name = []
  alphabet = '       abcdefghijklmnopqrstuvwz'
  while (name.length < length) {
    name.push(alphabet[Math.floor(Math.random() * alphabet.length)])
  }
  return name.join('')
}

// get ourselves 100 random options, value is (index+1)
const options = []
while (options.length < 100) {
  options.push({ name: randomName(), value: (options.length + 1) })
}

const fields = [
  {
    name: 'sampleField',
    label: 'Sample Field',
    type: 'select-multi',
    options
  },
];

<FormBuilder
  config={{ fields }}
  onSubmit={(values, actions) => {
    alert('submitted, values: ' + JSON.stringify(values))
    actions.setSubmitting(false)
  }}
/>
```


