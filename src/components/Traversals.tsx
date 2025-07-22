export function Traversals({
  preorder,
  inorder,
  postorder,
}: {
  preorder: number[];
  inorder: number[];
  postorder: number[];
}) {
  return (
    <div className="mt-6 text-sm space-y-2">
      <p><strong>Preorder:</strong> {preorder.join(", ")}</p>
      <p><strong>Inorder:</strong> {inorder.join(", ")}</p>
      <p><strong>Postorder:</strong> {postorder.join(", ")}</p>
    </div>
  );
}
