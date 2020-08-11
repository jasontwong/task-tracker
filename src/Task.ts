import * as vscode from "vscode";
import * as path from "path";

export class Task extends vscode.TreeItem {
  constructor(public label: string, public isSelected: boolean) {
    super(label, vscode.TreeItemCollapsibleState.None);
  }

  get command(): vscode.Command {
    return {
      arguments: [this],
      command: "task-tracker.toggleTask",
      title: "toggle",
    };
  }

  get iconPath(): { dark: string; light: string } {
    if (this.isSelected) {
      return {
        dark: path.join(
          __filename,
          "..",
          "..",
          "media",
          "dark",
          "checkbox-checked.png"
        ),
        light: path.join(
          __filename,
          "..",
          "..",
          "media",
          "light",
          "checkbox-checked.png"
        ),
      };
    }

    return {
      dark: path.join(__filename, "..", "..", "media", "dark", "checkbox.png"),
      light: path.join(
        __filename,
        "..",
        "..",
        "media",
        "light",
        "checkbox.png"
      ),
    };
  }
}
