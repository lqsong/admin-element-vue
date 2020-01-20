module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    // 'plugin:vue/recommended',
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  /**
  * 自定义规则
  * http://eslint.cn/docs/user-guide/configuring#configuring-rules
  * http://eslint.cn/docs/rules/
  * ● 基本使用方式
  * "off" 或者0 关闭规则
  * "warn" 或者1 将规则打开为警告（不影响退出代码）
  * "error" 或者2 将规则打开为错误（触发时退出代码为1）
  * 如：'no-restricted-syntax': 0, // 表示关闭该规则
  * ● 如果某项规则，有额外的选项，可以通过数组进行传递，而数组的第一位必须是错误级别。如0,1,2
  * 如 'semi': ['error', 'never'], never就是额外的配置项
  * ● 也可直接用别人的：
  * 如->饿了么：https://github.com/ElemeFE/eslint-config-elemefe
  * 如->VUE：https://github.com/vuejs/eslint-config-vue  
  */
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'error',
    'eqeqeq': ["error", "always", {"null": "ignore"}], // 要求使用 === 和 !==
    'no-redeclare': 'error', // 禁止多次声明同一变量
    'no-label-var': 'error', // 禁用与变量同名的标签
    'no-unused-vars': 'error', // 禁止出现未使用过的变量
    'no-use-before-define': 'error', // 禁止在变量定义之前使用它们

    // Stylistic Issues
    'semi': ["error", "always"], // 要求或禁止使用分号代替 ASI ["always" (默认) 要求在语句末尾使用分号]
    "semi-spacing": ["error", {"before": false, "after": true}], // 强制分号之前和之后使用一致的空格
    'array-bracket-spacing': ['error', 'never'], // 强制数组方括号中使用一致的空格
    'comma-dangle': ["error", "never"] // 要求或禁止末尾逗号 [never,禁止]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
