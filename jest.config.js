const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  // 告诉Jest需要匹配的文件后缀
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  // 别名设置
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // 匹配哪些文件进行测试
  testMatch: ['**/tests/unit/**/*.spec.ts?(x)'],
  // 不进行匹配的目录
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  // 匹配到 .vue 文件的时候用 vue-jest处理， 匹配到.js文件的时候用 babel-jest 处理
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
}