export default function(vscode) {
  return vscode.languages.registerCompletionItemProvider('plaintext', {
    provideCompletionItems(document, position) {
        const completionItem1 = new vscode.CompletionItem('Hello World!');
        const completionItem2 = new vscode.CompletionItem('World Peace!');
        return [completionItem1, completionItem2];
    }
  });
}