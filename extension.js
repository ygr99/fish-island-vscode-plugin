// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// 保存WebView面板的引用
let fishIslandPanel = undefined;

/**
 * 创建并显示摸鱼岛WebView面板
 * @param {vscode.ExtensionContext} context
 */
function createFishIslandPanel(context) {
  // 如果面板已经存在，则显示它
  if (fishIslandPanel) {
    fishIslandPanel.reveal(vscode.ViewColumn.One);
    return;
  }

  // 创建新的WebView面板
  fishIslandPanel = vscode.window.createWebviewPanel(
    "fishIslandView", // 标识符
    "摸鱼岛", // 面板标题
    vscode.ViewColumn.One, // 显示在编辑器的哪一列
    {
      enableScripts: true, // 允许JavaScript
      retainContextWhenHidden: true, // 隐藏时保留内容
    }
  );

  // 设置WebView内容
  fishIslandPanel.webview.html = getWebviewContent();

  // 当面板被关闭时清除引用
  fishIslandPanel.onDidDispose(
    () => {
      fishIslandPanel = undefined;
    },
    null,
    context.subscriptions
  );
}

/**
 * 获取WebView的HTML内容
 */
function getWebviewContent() {
  return `<!DOCTYPE html>
  <html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>摸鱼岛</title>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
  </head>
  <body>
    <iframe src="https://yucoder.cn/chat" frameborder="0" allowfullscreen></iframe>
  </body>
  </html>`;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "fish-island-vscode-plugin" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "fish-island-vscode-plugin.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("我要开发摸鱼岛 VSCode 插件");
    }
  );

  // 注册打开摸鱼岛命令
  const openFishIslandCmd = vscode.commands.registerCommand(
    "fish-island-vscode-plugin.openFishIsland",
    function () {
      createFishIslandPanel(context);
    }
  );

  // 注册视图提供程序
  const fishIslandViewProvider = vscode.window.registerWebviewViewProvider(
    "fishIslandView",
    {
      resolveWebviewView(webviewView) {
        webviewView.webview.options = {
          enableScripts: true,
        };
        webviewView.webview.html = getWebviewContent();
      },
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(openFishIslandCmd);
  context.subscriptions.push(fishIslandViewProvider);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
