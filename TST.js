export class TSTNode {
  constructor(key, left = null, right = null, middle= null) {
    this._key = key;
    this._left = left;
    this._middle = middle;
    this._right = right;
  }
  
  get key() { return this._key; }
  set key(key) { this._key = key; }

  get left() { return this._left; }
  set left(left) { this._left = left; }

  get right() { return this._right; }
  set right(right) { this._right = right; }

  get middle() { return this._middle; }
  set middle(right) { this._middle = right; }
}


const length = Symbol('length');

export class TST {
  
  constructor() {
    this.root = null;
    this[length] = 0;
  }
  
  get len() {
    return this[length];
  }
  insert(val) {
 const tstNode = new TSTNode(val);

 const recurseTST = (node = this.root) => {
  if(node.key === val) {
     if(node.middle) { 
       recurseTST(node.middle);
     }else {
       node.middle = tstNode;
       this[length]++; 
     }
   }
   else if (node.key > val && !node.left) {
  node.left = tstNode;
  this[length]++;
   } 
   else if (node.key > val) {
  recurseTST(node.left);
   } 
   else if (node.key < val && !node.right) {
  node.right = tstNode;
  this[length]++;
   } 
   else if (node.key < val) {
  recurseTST(node.right);
   } 
   
 }
if (!this.root) {
   this.root = tstNode;
   this[length]++;
 } else {
   recurseTST();
 }
}
  delete(val) {
 if (!this.root) {
   return new Error('TST is empty. Cannot delete from empty TST');
 } else {
   let findNode = this.lookup(val);
   
   if(!findNode.parentNode && !findNode.currentNode._left && !findNode.currentNode._right){
     this.root = null;
     findNode.currentNode = null;
     this[length]--;
   }else if (findNode.hasVal && findNode.parentNode) {
    if(findNode.currentNode._key === val && !findNode.currentNode._left && !findNode.currentNode._right){
      findNode.currentNode = null;
      findNode.parentNode.middle = null;
      this[length]--;
    }else if(findNode.currentNode._key === val && findNode.currentNode._left && findNode.currentNode._right){
      const successor = this.findMin(findNode.currentNode.right);
    findNode.currentNode.key = successor.subtree.key;
    successor.parent.left = null;
    this[length]--;
    
      findNode.parentNode.middle = null;
      this[length]--;
    }
  
  else if (!findNode.currentNode.left && !findNode.currentNode.right) {
    const direction = findNode.parentNode && findNode.parentNode.key > val ? 'left' : 'right';
    findNode.parentNode[direction] = null;
    this[length]--;
  }
  
  else if (!!findNode.currentNode.left ^ !!findNode.currentNode.right) {
    const parentToCurNodeDir = findNode.parentNode.key > val ? 'left' : 'right';
    const curNodeToChildDir = findNode.currentNode.left ? 'left' : 'right';
    findNode.parentNode[parentToCurNodeDir] = findNode.currentNode[curNodeToChildDir];
    this[length]--;
  }
  
  else if (findNode.currentNode.left && findNode.currentNode.right) {
    
    const successor = this.findMin(findNode.currentNode.right);
    findNode.currentNode.key = successor.subtree.key;
    successor.parent.left = null;
    this[length]--;
  }
   }
   else {
  return new Error('Node not found.');
   }
 }
}

findMin(subtree = this.root) {
  let parent;
  while (subtree.left) {
    parent = subtree;
    subtree = subtree.left;
  }
  return { subtree, parent };
}
  
  
lookup(val) {
 let response = { hasVal: false, currentNode: null, parentNode: null };
 const lookRecursively = (node = this.root, parent = null) => {
   if (node.key === val) {
     if(node.middle) { lookRecursively(node.middle, node);
                     } else {
         response.hasVal = true;
          response.currentNode = node;
          response.parentNode = parent;
                       
       }
     
  
   } else if (node.left && node.key > val) {
  lookRecursively(node.left, node);
   } else if (node.right && node.key < val) {
  lookRecursively(node.right, node);
   }
 }
lookRecursively();
 return response;
}
  
}
const tst = new TST();




tst.insert(2);
tst.insert(2);
tst.insert(2);
tst.insert(2);
tst.insert(2);
tst.insert(6);
tst.delete(2);
tst.insert(4);
tst.insert(5);
tst.delete(2);

console.log(tst.root) // null
console.log(tst.len)  // 0