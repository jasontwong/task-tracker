import * as vscode from "vscode";

export function getState(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("task-tracker");

  if (config.get("useGlobalTasks")) {
    return context.globalState;
  } else {
    return context.workspaceState;
  }
}
