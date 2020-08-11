// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { TaskProvider } from "./task-provider";
import { getState } from "./utils";
import { Task } from "./Task";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "task-tracker" is now active!');

  const provider = new TaskProvider(vscode.workspace.rootPath, context);
  const treeView = vscode.window.createTreeView("task-tracker", {
    treeDataProvider: provider,
  });

  let addTask = vscode.commands.registerCommand(
    "task-tracker.addTask",
    async () => {
      const data = await vscode.window.showInputBox();
      if (data && data.trim() !== "") {
        const state = getState(context);
        let tasks: Task[] = state.get("tasks", []);
        tasks.push(new Task(data.trim(), false));
        state.update("tasks", tasks);
        provider.refresh();
      }
    }
  );

  let toggleTask = vscode.commands.registerCommand(
    "task-tracker.toggleTask",
    (resource: Task) => {
      const state = getState(context);
      let tasks: Task[] = state.get("tasks", []);

      for (let task of tasks) {
        if (task.label === resource.label) {
          task.isSelected = !task.isSelected;
        }
      }

      state.update("tasks", tasks);
      provider.refresh();
    }
  );

  let deleteTask = vscode.commands.registerCommand(
    "task-tracker.deleteTask",
    (resource: Task) => {
      const state = getState(context);
      const tasks: Task[] = state.get("tasks", []);
      const newTasks: Task[] = tasks.filter(
        (task) => task.label !== resource.label
      );

      state.update("tasks", newTasks);
      provider.refresh();
    }
  );

  let editTask = vscode.commands.registerCommand(
    "task-tracker.editTask",
    async (resource: Task) => {
      const data = await vscode.window.showInputBox({ value: resource.label });
      if (data && data.trim() !== "" && data !== resource.label) {
        const state = getState(context);
        let tasks: Task[] = state.get("tasks", []);

        for (let task of tasks) {
          if (task.label === resource.label) {
            task.label = data.trim();
          }
        }

        state.update("tasks", tasks);
        provider.refresh();
      }
    }
  );

  context.subscriptions.push(addTask, toggleTask, deleteTask, editTask);
}

// this method is called when your extension is deactivated
export function deactivate() {}
