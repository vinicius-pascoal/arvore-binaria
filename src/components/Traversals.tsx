export function Traversals({
  preorder,
  inorder,
  postorder,
}: {
  preorder: number[];
  inorder: number[];
  postorder: number[];
}) {
  //add lines between the traversals
  return (
    <div className="mt-6 text-sm space-y-2">
      <p><strong>Preorder:</strong> {preorder.join(", ")}</p>
      <div className="h-[1px] bg-gray-300 my-2" />
      <p><strong>Inorder:</strong> {inorder.join(", ")}</p>
      <div className="h-[1px] bg-gray-300 my-2" />
      <p><strong>Postorder:</strong> {postorder.join(", ")}</p>
    </div>
  );
}
