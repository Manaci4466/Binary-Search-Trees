/*******BINARY SEARCH TREES*******/
const Node = (value) => {
    let right;
    let left;
    return {value,right,left}
}

const Tree = (array) => {
    let rootNode;
    
    function buildTree(start = 0,end = array.length - 1,arr = array){
        // base case (smallest version of problem)
        let root;
        if(start > end)return null;
        let mid = Math.ceil((start + end) / 2);
        root = Node(arr[mid]);
        root.left = buildTree(start, mid - 1,arr);
        root.right = buildTree(mid + 1,end,arr);
        return rootNode = root;
    }

    function prettyPrint(node = rootNode,prefix = " ", isLeft = true){
        if (node === null) {
            return;
          }
          if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
          }
          console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
          if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
          }
    }

    function getRootNode(){
        return rootNode;
    }

    function insert(value){
        rootNode = insertRec(value);
    }

    function insertRec(key,node = rootNode){
        if(node === null)return node = Node(key);
        if(key < node.value){
            node.left = insert(key,node.left);
        }
        else  if(key > node.value){
            node.right = insert(key,node.right);
        }
        return node;
    }

    function deleteNode(k,root = rootNode){
        if (root === null) {
            return root;
          }
         
          // Recursive calls for ancestors of
          // node to be deleted
          if (root.value > k) {
            root.left = deleteNode(k,root.left);
            return root;
          } else if (root.value < k) {
            root.right = deleteNode(k,root.right);
            return root;
          }
         
          // We reach here when root is the node
          // to be deleted.
         
          // If one of the children is empty
          if (root.left === null) {
            let temp = root.right;
            delete root;
            return temp;
          } else if (root.right === null) {
            let temp = root.left;
            delete root;
            return temp;
          }
         
          // If both children exist
          else {
            let succParent = root;
         
            // Find successor
            let succ = root.right;
            while (succ.left !== null) {
              succParent = succ;
              succ = succ.left;
            }
         
            // Delete successor.  Since successor
            // is always left child of its parent
            // we can safely make successor's right
            // right child as left of its parent.
            // If there is no succ, then assign
            // succ.right to succParent.right
            if (succParent !== root) {
              succParent.left = succ.right;
            } else {
              succParent.right = succ.right;
            }
         
            // Copy Successor Data to root
            root.value = succ.value;
         
            // Delete Successor and return root
            delete succ;
            return root;
          }
        
    }

    function find(value,root = rootNode){
        if(!root)return;
        if(root.value === value)return true;
        return find(value,root.left) || find(value,root.right) ? true : false;
    }

    function levelOrder(root = rootNode){
        var h = height(root);
        var i;
        for(i = 1; i <= h; i++){
           printCurrentLevel(root, i);
        }
    }

    function printCurrentLevel(root = rootNode , level) {
        if (root == null)
            return;
        if (level == 1)
            console.log(root.value + " ");
        else if (level > 1) {
            printCurrentLevel(root.left, level - 1);
            printCurrentLevel(root.right, level - 1);
        }
    }

    function inorder(node = rootNode){
        if(node != null){
            inorder(node.left)
            console.log(`here ${node.value}`);
            inorder(node.right);
        }
    }

    function preorder(node = rootNode){
        if(node != null){
            console.log(`here${node.value}`);
            preorder(node.left);
            preorder(node.right);
        }
    }

    function postorder(node = rootNode){
        if(node != null){   
            postorder(node.left);
            postorder(node.right);
            console.log(`here${node.value}`);
        }
    }

    function height(root = rootNode){
        if(root == null)
        return 0;
        return Math.max(height(root.left), height(root.right)) + 1;
    }

    function isBalanced(root = rootNode){
        if(!root)return true;
         
        let lh = height(root.left);
        let rh = height(root.right);
        if(Math.abs(lh - rh) <= 1 && isBalanced(root.left) == true && isBalanced(root.right) == true) return true;     
        return false;
        
    }

    function rebalance(root = rootNode){
        let nodes = [];
        storeBSTNodes(root, nodes);
   
        // Constructs BST from nodes[]
        let n = nodes.length;
        return rootNode = buildTree(0, n - 1,nodes);
    }

    function storeBSTNodes(root = rootNode, nodes)
    {
        // Base case
        if (root == null)
            return;
   
        // Store nodes in Inorder (which is sorted
        // order for BST)
        storeBSTNodes(root.left, nodes);
        nodes.push(root.value);
        storeBSTNodes(root.right, nodes);
    }

    return{rebalance,isBalanced,height,postorder,preorder,inorder,insert,deleteNode,levelOrder,find,buildTree,prettyPrint,getRootNode}
}
// Balanced bst
const bst = Tree([1,2,3,4,4,5,6,7]);
console.log(bst.buildTree());
bst.insert(12);
bst.rebalance();
bst.inorder();
