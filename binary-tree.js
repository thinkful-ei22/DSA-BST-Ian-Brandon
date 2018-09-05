'use strict';


class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the treen and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right){
      return this;
    }
    return this.right._findMax();
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }
}

//-------------------Height of BST------------------------//

//input binary tree
//output number


function bstHeight (tree){
  return Math.max(tree.left && bstHeight(tree.left), tree.right && bstHeight(tree.right))+1;
}


function bstHeight2(tree) {
  if (tree.left && tree.right) {
    return Math.max(bstHeight2(tree.left), bstHeight2(tree.right)) + 1;
  }

  if (tree.left) {
    return bstHeight2(tree.left) + 1;
  }
  if (tree.right) {
    return bstHeight2(tree.right) + 1;
  }
  return 1;
}
// const sortedArrayToBST = (sortedArray, start=0, end=sortedArray.length-1) => {

//   if (start > end){
//     return;
//   }

//   let middle = Math.floor(start+end/2);

//   let bst = new BinarySearchTree(sortedArray[middle]);
//   bst.left



//   return bst;
// };

//---------is it BST-------------//
const isItBST = (tree, min, max) => {
  if (min !== undefined && tree.key < min) {
    return false;
  }
  if (max !== undefined && tree.key > max) {
    return false;
  }
  if (tree.left && !isItBST(tree.left, min, tree.key)){
    return false;
  }
  if (tree.right && !isItBST(tree.right, tree.key, max)) {
    return false;
  }
  return true;
};

//-----------3rd largest Node---------//

/*
               [1,2,3,4,5,6,7,8,9]

                  5
                /   \
               3     7
              /     /  \
             2     6    8
            /
           1
          /
         0

- Find largest node (9)
- Find the parent of that node (8)
*/



const thirdLargestNode = (tree) => {

  let thirdLargest;
  const max = tree._findMax();

  if (max.parent.left){
    thirdLargest = max.parent.left;
  }
  else{
    thirdLargest = max.parent.parent;
  }
  return thirdLargest.value;
};

//----------------balanced tree-----------------
//input tree
//boolean output
//find the farthest away and find differece from other node?

const balancedTree2 = tree => {
    let min = tree._findMin();
    let max = tree._findMax();
    let minHeight = bstHeight(min);
    let maxHeight = bstHeight(max);
    console.log("minHeight", minHeight);
    console.log("maxHeight", maxHeight)
    if(Math.abs( minHeight - maxHeight) > 1 ){
        return false;
    } else {
        return true;
    }
}






const main = () => {


  let testTree = new BinarySearchTree(6, 6);
  //   testTree.left = new BinarySearchTree(2, 'z');
  //   testTree.right = new BinarySearchTree(4, 'z');
  testTree.insert(1, 1);
  testTree.insert(2, 2);
  testTree.insert(3, 3);
  testTree.insert(4, 4);
  testTree.insert(6, 6);
  testTree.insert(7, 7);
  testTree.insert(8, 8);
//   testTree.insert(9, 9);


  console.log(testTree);
  // console.log(testTree.left);
  //   console.log('The height of the search tree is',bstHeight2(testTree));
    // console.log(isItBST(testTree));

//   console.log(thirdLargestNode(testTree));
  console.log(balancedTree2(testTree));

};

main();