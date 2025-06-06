const assert = require("assert");

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const myExtension = require("../extension");

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test("Hello World Command Test", async () => {
    // 执行Hello World命令
    await vscode.commands.executeCommand(
      "fish-island-vscode-plugin.helloWorld"
    );
    // 这个测试主要是确保命令能正常执行，不会抛出异常
    // 实际的消息框显示很难在自动化测试中验证
  });
});
