import * as prism from 'prismjs'

// Plugins
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/show-language/prism-show-language'

// Theme
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript'

export default function setupPrism(context) {
  context.$prism = prism
}
