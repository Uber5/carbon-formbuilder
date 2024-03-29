const { readdirSync } = require('fs')
const path = require('path')

// make all (?) carbon components available in context
const carbonComponents = readdirSync(path.join(__dirname, 'node_modules/carbon-components-react/lib/components'))
const context = {}
for (const c of carbonComponents) {
  context[c] = path.resolve(__dirname, 'node_modules/carbon-components-react/lib/components', c)
}

module.exports = {
  // serverPort: 6070,
  styleguideDir: 'docs',
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'U5 Formbuilder',
      content: 'docs/intro.md',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    },
    {
      name: 'Form Components',
      content: 'docs/ui.md',
      components: 'src/components/**/[A-Z]*.js',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    },
    {
      name: 'Validation',
      content: 'docs/validation.md',
    },
    {
      name: 'Plugging In Field Types',
      content: 'docs/custom-fields.md',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    }
  ],
  context: context,
  // TODO: moduleAliases not required for now, we add components we need to the context, see above
  moduleAliases: {
    'carbon-components-react': path.resolve(__dirname, 'node_modules/carbon-components-react'),
    'carbon-icons': path.resolve(__dirname, 'node_modules/carbon-icons'),
    'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    'u5-carbon-components-react': path.resolve(__dirname, 'node_modules/u5-carbon-components-react'),
  },
  require: [
    path.join(__dirname, 'node_modules/carbon-components/css/carbon-components.min.css'),
    path.join(__dirname, 'src/main.css')
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}
