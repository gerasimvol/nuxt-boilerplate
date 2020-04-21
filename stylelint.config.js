module.exports = {
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    // https://github.com/twitter/recess/blob/master/lib/lint/strict-property-order.js
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ],
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'no-descending-specificity': null
  }
}
