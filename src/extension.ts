// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { TextDecoder } from "util";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "vscode-extension-groups" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "hellSvelte",
        "Hello Svelte",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      // And set its HTML content
      panel.webview.html = await getWebviewContent();
    }
  );

  context.subscriptions.push(disposable);
}

async function getWebviewContent() {
  const index = path.resolve(__dirname, "webview", "index.html");
  const encodedContents = await vscode.workspace.fs.readFile(
    vscode.Uri.file(index)
  );
  const contents = new TextDecoder("utf-8").decode(encodedContents);

  return contents;
}

// this method is called when your extension is deactivated
export function deactivate() {}
