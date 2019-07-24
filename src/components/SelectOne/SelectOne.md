Use this to select one value from a finite list of values.

Each option needs a name and a value. Either specify `options` as an array of options,
or set `useOptionsFn` to true and supply a function `optionsFn`, see example further below.

TODO: Groups of options are not supported yet, but may be added in a later release.

```js
import FormBuilder from '../FormBuilder';

const options = [
  {
    name: 'Option 1',
    value: 'val1'
  },
  {
    name: 'Option 2',
    value: 'val2'
  },
]

const fields = [
  {
    name: 'select1',
    label: 'Select one element...',
    type: 'select-one',
    options
  },
  {
    name: 'continent',
    label: 'Select (2) (with default value)',
    type: 'select-one',
    options: [
      { name: 'Europe', value: 'e' },
      { name: 'Africa', value: 'a' }
    ]
  }
];

<FormBuilder
  config={{ fields }}
  initialValues={{ continent: 'a' }}
  onSubmit={(values, actions) => {
    alert('submitted, values: ' + JSON.stringify(values))
    actions.setSubmitting(false)
  }}
/>
```

### Searchable Options

By specifying `searchable: true`, options become searchable. This is useful when the list of options grows large.

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
    type: 'select-one',
    searchable: true,
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


### Providing options via a function

We can also specify a function for the options, `optionsFn`:
It must return an array, or a promise that resolves to an array.
`optionsFn` is used if and only if `useOptionsFn` is true.

TODO: This is supposed to be used together with the form editor, which
is not yet available...

Note that `optionsFn.code` is evaluated to determine the options,
and is supposed to be ES5 compatible. `optionsFn.src` should represent the same code,
but in ES6 or higher; the idea is that
the form editor keeps `src` as the user-editable source,
where `code` is the transpiled code that can be eval'ed in any browser.

```js
import FormBuilder from '../FormBuilder';

const fields = [
    {
      "label": "Some Field",
      "name": "field1",
      "type": "text"
    },
    {
      "label": "Some number",
      "name": "number",
      "type": "number"
    },
    {
      "options": [
        {
          "name": "Africa",
          "value": "africa"
        },
        {
          "name": "North America",
          "value": "north-america"
        }
      ],
      "label": "Continent (1)",
      "name": "continent",
      "type": "select-one"
    },
    {
      "options": [
        {
          "name": "Africa",
          "value": "africa"
        }
      ],
      "useOptionsFn": true,
      "optionsFn": {
        "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar _default =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(props) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", [{\n              name: 'Europe ' + props.bla,\n              value: 'EU'\n            }, {\n              name: 'Asia',\n              value: 'asia'\n            }]);\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nexports[\"default\"] = _default;",
        "src": "export default async props => {\n    // await new Promise(res => setTimeout(res, 300))\n    return [\n        {\n            name: 'Europe ' + props.bla,\n            value: 'EU'\n        },\n        {\n            name: 'Asia',\n            value: 'asia'\n        }\n    ]\n}\n"
      },
      "label": "Continent (2)",
      "name": "continent2",
      "type": "select-one"
    }
  ];

<FormBuilder
  config={{ fields }}
  onSubmit={(values, actions) => {
    alert('submitted, values: ' + JSON.stringify(values))
    actions.setSubmitting(false)
  }}
  bla={42}
/>
```
