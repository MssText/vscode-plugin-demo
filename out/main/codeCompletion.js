"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(vscode) {
    return vscode.languages.registerCompletionItemProvider('plaintext', {
        provideCompletionItems(document, position) {
            const completionItem1 = new vscode.CompletionItem('Hello World!');
            const completionItem2 = new vscode.CompletionItem('World Peace!');
            return [completionItem1, completionItem2];
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=codeCompletion.js.map