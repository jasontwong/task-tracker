import * as vscode from "vscode";
import { getState } from "./utils";
import { Task } from "./Task";

export class TaskProvider implements vscode.TreeDataProvider<Task> {
  constructor(
    private workspaceRoot: string | undefined,
    private context: vscode.ExtensionContext
  ) {}

  getTreeItem(element: Task): vscode.TreeItem {
    return new Task(element.label, element.isSelected);
  }

  getChildren(element?: Task): Thenable<Task[]> {
    return Promise.resolve(this.getTasks());
  }

  private _onDidChangeTreeData: vscode.EventEmitter<
    Task | undefined
  > = new vscode.EventEmitter<Task | undefined>();
  readonly onDidChangeTreeData: vscode.Event<Task | undefined> = this
    ._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }

  private getTasks(): Task[] {
    const state = getState(this.context);
    let tasks: Task[] = state.get("tasks", []);

    return tasks;
  }
}
